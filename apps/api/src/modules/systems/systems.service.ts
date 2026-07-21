import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  buildPaginationMeta,
  type License,
  type Links,
  type ListSystemsQuery,
  type PaginatedEnvelope,
  type Provenance,
  type SystemCountersDto,
  type SystemDetail,
  type SystemListItem,
  type TokenSummary,
} from "@agentds/shared";
import { etagOf } from "../../common/etag";
import type { Env } from "../../config/env.schema";
import type { Prisma, System } from "../../generated/prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { EventsService } from "../events/events.service";
import { resolveContentDir } from "../ingest/content-dir";

/** Raw artifacts served per entry (PRD F-4) with their exact content types. */
export const SYSTEM_ARTIFACTS = {
  "design.md": { filename: "DESIGN.md", contentType: "text/markdown; charset=utf-8" },
  "tokens.json": { filename: "tokens.json", contentType: "application/json; charset=utf-8" },
  "tailwind.css": { filename: "tailwind.css", contentType: "text/css; charset=utf-8" },
  "bundle.zip": { filename: "bundle.zip", contentType: "application/zip" },
} as const;
export type ArtifactName = keyof typeof SYSTEM_ARTIFACTS;

export interface ArtifactFile {
  buffer: Buffer;
  contentType: string;
  etag: string;
}

/** Content folder per catalog path (mirrors the pipeline layout). */
const CONTENT_DIRNAME: Record<string, string> = {
  official: "official",
  "brand-look": "brand-looks",
};

type SystemWithCategories = System & { categories: { categoryId: string }[] };

@Injectable()
export class SystemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
    private readonly events: EventsService,
  ) {}

  /**
   * Published catalog list with filters + pagination (PRD F-1/F-4). The whole
   * matching set is loaded and sorted in memory: the catalog is capped at a few
   * hundred entries, and the "most-fetched" sort needs counter data that lives
   * outside the systems table.
   */
  async list(query: ListSystemsQuery): Promise<PaginatedEnvelope<SystemListItem>> {
    const where: Prisma.SystemWhereInput = { status: "published" };
    if (query.path) where.path = query.path;
    if (query.license) where.licenseSpdx = { equals: query.license, mode: "insensitive" };
    if (query.category) where.categories = { some: { categoryId: query.category } };
    if (query.q) {
      where.OR = [
        { name: { contains: query.q, mode: "insensitive" } },
        { maker: { contains: query.q, mode: "insensitive" } },
        { summary: { contains: query.q, mode: "insensitive" } },
        { description: { contains: query.q, mode: "insensitive" } },
      ];
    }

    const rows = await this.prisma.db.system.findMany({
      where,
      include: { categories: { select: { categoryId: true } } },
    });
    const fetches = await this.fetchCounts(rows.map((r) => r.slug));

    const sorted =
      query.sort === "most-fetched"
        ? [...rows].sort(
            (a, b) =>
              (fetches.get(b.slug) ?? 0) - (fetches.get(a.slug) ?? 0) ||
              a.name.localeCompare(b.name),
          )
        : [...rows].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const start = (query.page - 1) * query.limit;
    const page = sorted.slice(start, start + query.limit);

    return {
      data: page.map((row) => this.toListItem(row, fetches.get(row.slug) ?? 0)),
      meta: buildPaginationMeta(sorted.length, query.page, query.limit),
    };
  }

  /** Full metadata + parsed token summary (PRD F-4). Published entries only. */
  async detail(slug: string): Promise<SystemDetail> {
    const row = await this.prisma.db.system.findUnique({
      where: { slug },
      include: { categories: { select: { categoryId: true } }, lintReport: true },
    });
    if (!row || row.status !== "published") {
      throw new NotFoundException(`No published system "${slug}"`);
    }

    const counters = await this.prisma.db.counter.findMany({ where: { slug } });
    const counts: SystemCountersDto = { download: 0, copy: 0, api_fetch: 0 };
    for (const counter of counters) {
      if (counter.type in counts) counts[counter.type as keyof SystemCountersDto] = counter.count;
    }

    const license: License = {
      spdx: row.licenseSpdx,
      url: row.licenseUrl,
      ...(row.licenseNotes ? { notes: row.licenseNotes } : {}),
    };

    return {
      slug: row.slug,
      name: row.name,
      path: row.path,
      maker: row.maker,
      summary: row.summary,
      description: row.description,
      categories: row.categories.map((c) => c.categoryId),
      tags: row.tags,
      best_for: row.bestFor,
      license,
      provenance: row.provenance as unknown as Provenance,
      links: row.links as unknown as Links,
      restricted: row.restricted,
      ...(row.restrictedReason ? { restricted_reason: row.restrictedReason } : {}),
      status: row.status,
      spec_version: row.specVersion,
      token_summary: row.tokenSummary as unknown as TokenSummary | null,
      lint: row.lintReport
        ? {
            errors: row.lintReport.errors,
            warnings: row.lintReport.warnings,
            infos: row.lintReport.info,
            linted_at: row.lintReport.lintedAt.toISOString(),
          }
        : null,
      counters: counts,
      updated_at: row.updatedAt.toISOString(),
    };
  }

  /**
   * Raw artifact for a published entry. 404 unknown/unpublished/missing file,
   * 451 + JSON reason for restricted entries (PRD F-4). Increments the
   * api_fetch counter in the background on success.
   */
  async getArtifact(slug: string, artifact: ArtifactName): Promise<ArtifactFile> {
    const row = await this.prisma.db.system.findUnique({
      where: { slug },
      select: {
        status: true,
        path: true,
        restricted: true,
        restrictedReason: true,
        fileEtags: true,
      },
    });
    if (!row || row.status !== "published") {
      throw new NotFoundException(`No published system "${slug}"`);
    }
    if (row.restricted) {
      throw new HttpException(
        {
          statusCode: 451,
          error: "Unavailable For Legal Reasons",
          message: row.restrictedReason ?? "This entry is restricted and cannot be served.",
        },
        451,
      );
    }

    const contentDir = resolveContentDir(this.config.get("CONTENT_DIR", { infer: true }));
    const dirname = CONTENT_DIRNAME[row.path];
    if (!contentDir || !dirname) {
      throw new NotFoundException("Content directory unavailable");
    }
    const spec = SYSTEM_ARTIFACTS[artifact];
    const filePath = join(contentDir, dirname, slug, spec.filename);
    if (!existsSync(filePath)) {
      throw new NotFoundException(`Artifact ${artifact} not available for "${slug}"`);
    }

    const buffer = await readFile(filePath);
    const etags = (row.fileEtags ?? {}) as Record<string, string>;
    const etag = etags[artifact] ?? etagOf(buffer);

    this.events.incrementInBackground(slug, "api_fetch");
    return { buffer, contentType: spec.contentType, etag };
  }

  private toListItem(row: SystemWithCategories, fetches: number): SystemListItem {
    return {
      slug: row.slug,
      name: row.name,
      path: row.path,
      maker: row.maker,
      summary: row.summary,
      categories: row.categories.map((c) => c.categoryId),
      tags: row.tags,
      license_spdx: row.licenseSpdx,
      restricted: row.restricted,
      fetches,
      updated_at: row.updatedAt.toISOString(),
    };
  }

  private async fetchCounts(slugs: string[]): Promise<Map<string, number>> {
    if (slugs.length === 0) return new Map();
    const counters = await this.prisma.db.counter.findMany({
      where: { slug: { in: slugs }, type: "api_fetch" },
    });
    return new Map(counters.map((c) => [c.slug, c.count]));
  }
}
