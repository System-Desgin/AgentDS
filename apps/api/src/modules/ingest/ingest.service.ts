import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import JSZip from "jszip";
import {
  PURPOSE_CATEGORY_LABELS,
  buildLicenseNotice,
  buildTokenSummary,
  extractDesignFrontMatter,
  validateMeta,
  type Meta,
} from "@agentds/shared";
import { parse as parseYaml } from "yaml";
import { etagOf } from "../../common/etag";
import type { Env } from "../../config/env.schema";
import type { Prisma } from "../../generated/prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { resolveContentDir } from "./content-dir";

/** Artifacts every ingestible entry must carry (pipeline output). */
const REQUIRED_FILES = ["DESIGN.md", "meta.yaml", "tokens.json", "tailwind.css"] as const;

/** Content subfolder → meta `path` value. */
const CONTENT_PATHS = [
  { dirname: "official", path: "official" },
  { dirname: "brand-looks", path: "brand-look" },
] as const;

interface LintReportFile {
  findings: unknown[];
  summary: { errors: number; warnings: number; infos: number };
}

export interface IngestSkip {
  slug: string;
  reason: string;
}

export interface IngestSummary {
  scanned: number;
  ingested: number;
  skipped: IngestSkip[];
  /** Slugs present in the DB but no longer on disk — demoted to draft. */
  demoted: string[];
}

/**
 * Re-syncs the database from the content directory baked into the image
 * (PRD F-5). Invalid entries are skipped with logged errors and never
 * partially published; entries missing from disk are demoted to draft.
 * Also pre-builds each entry's bundle.zip (gitignored, served by the API).
 */
@Injectable()
export class IngestService {
  private readonly logger = new Logger(IngestService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async ingestAll(): Promise<IngestSummary> {
    const contentDir = resolveContentDir(this.config.get("CONTENT_DIR", { infer: true }));
    if (!contentDir) {
      throw new Error("Content directory not found (set CONTENT_DIR or run from the repo).");
    }

    const summary: IngestSummary = { scanned: 0, ingested: 0, skipped: [], demoted: [] };
    const seenSlugs: string[] = [];

    await this.seedCategories();

    for (const { dirname, path } of CONTENT_PATHS) {
      const root = join(contentDir, dirname);
      if (!existsSync(root)) continue;
      const entries = (await readdir(root, { withFileTypes: true }))
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();

      for (const folder of entries) {
        summary.scanned += 1;
        const dir = join(root, folder);
        try {
          const result = await this.ingestEntry(dir, folder, path, seenSlugs);
          if (result === "ok") {
            summary.ingested += 1;
            seenSlugs.push(folder);
          } else {
            summary.skipped.push({ slug: folder, reason: result });
            this.logger.error(`Skipped ${path}/${folder}: ${result}`);
          }
        } catch (error) {
          const reason = `unexpected error: ${String(error)}`;
          summary.skipped.push({ slug: folder, reason });
          this.logger.error(`Skipped ${path}/${folder}: ${reason}`);
        }
      }
    }

    // Entries that disappeared from disk must never stay published.
    const missing = await this.prisma.db.system.findMany({
      where: { slug: { notIn: seenSlugs }, status: "published" },
      select: { slug: true },
    });
    if (missing.length > 0) {
      await this.prisma.db.system.updateMany({
        where: { slug: { in: missing.map((m) => m.slug) } },
        data: { status: "draft" },
      });
      summary.demoted = missing.map((m) => m.slug);
      this.logger.warn(`Demoted to draft (missing from disk): ${summary.demoted.join(", ")}`);
    }

    this.logger.log(
      `Ingest done: ${summary.ingested}/${summary.scanned} ingested, ` +
        `${summary.skipped.length} skipped, ${summary.demoted.length} demoted.`,
    );
    return summary;
  }

  /** Ingest one entry folder; returns "ok" or a skip reason. */
  private async ingestEntry(
    dir: string,
    folder: string,
    path: (typeof CONTENT_PATHS)[number]["path"],
    seenSlugs: string[],
  ): Promise<string> {
    for (const file of REQUIRED_FILES) {
      if (!existsSync(join(dir, file))) return `missing ${file}`;
    }

    const metaResult = validateMeta(parseYaml(await readFile(join(dir, "meta.yaml"), "utf8")));
    if (!metaResult.success) {
      const issues = metaResult.error.issues
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
      return `invalid meta.yaml — ${issues}`;
    }
    const meta = metaResult.data;

    if (meta.slug !== folder) return `slug "${meta.slug}" does not match folder name`;
    if (meta.path !== path) return `path "${meta.path}" does not match content folder`;
    if (seenSlugs.includes(meta.slug)) return "duplicate slug already ingested";

    const lintPath = join(dir, "lint-report.json");
    if (!existsSync(lintPath)) return "missing lint-report.json";
    const lint = JSON.parse(await readFile(lintPath, "utf8")) as LintReportFile;
    if (typeof lint.summary?.errors !== "number") return "malformed lint-report.json";
    if (lint.summary.errors > 0) return `lint report has ${lint.summary.errors} error(s)`;

    const designMd = await readFile(join(dir, "DESIGN.md"), "utf8");
    const frontMatter = extractDesignFrontMatter(designMd);
    if (!frontMatter) return "DESIGN.md front matter missing or unparseable";
    const tokenSummary = buildTokenSummary(frontMatter);

    const tokensJson = await readFile(join(dir, "tokens.json"));
    const tailwindCss = await readFile(join(dir, "tailwind.css"));
    const bundle = await this.buildBundle(dir, designMd, tokensJson, tailwindCss, meta);

    const fileEtags: Record<string, string> = {
      "design.md": etagOf(Buffer.from(designMd, "utf8")),
      "tokens.json": etagOf(tokensJson),
      "tailwind.css": etagOf(tailwindCss),
      ...(bundle ? { "bundle.zip": etagOf(bundle) } : {}),
    };

    await this.upsert(meta, tokenSummary, fileEtags, lint);
    return "ok";
  }

  /** Pre-build bundle.zip next to the entry; null when the write fails. */
  private async buildBundle(
    dir: string,
    designMd: string,
    tokensJson: Buffer,
    tailwindCss: Buffer,
    meta: Meta,
  ): Promise<Buffer | null> {
    const zip = new JSZip();
    zip.file("DESIGN.md", designMd);
    zip.file("tokens.json", tokensJson);
    zip.file("tailwind.css", tailwindCss);
    zip.file("meta.yaml", await readFile(join(dir, "meta.yaml"), "utf8"));
    zip.file("LICENSE-NOTICE.txt", buildLicenseNotice(meta));
    const buffer = await zip.generateAsync({
      type: "nodebuffer",
      // Deterministic output so the bundle ETag is stable across re-ingests.
      compression: "DEFLATE",
    });
    try {
      await writeFile(join(dir, "bundle.zip"), buffer);
      return buffer;
    } catch (error) {
      this.logger.error(`Could not write bundle.zip for ${meta.slug}: ${String(error)}`);
      return null;
    }
  }

  private async upsert(
    meta: Meta,
    tokenSummary: unknown,
    fileEtags: Record<string, string>,
    lint: LintReportFile,
  ): Promise<void> {
    const common = {
      path: meta.path,
      name: meta.name,
      maker: meta.maker,
      summary: meta.summary,
      description: meta.description,
      tags: meta.tags,
      bestFor: meta.best_for,
      licenseSpdx: meta.license.spdx,
      licenseUrl: meta.license.url,
      licenseNotes: meta.license.notes ?? null,
      provenance: meta.provenance as Prisma.InputJsonValue,
      links: meta.links as Prisma.InputJsonValue,
      restricted: meta.restricted,
      restrictedReason: meta.restricted_reason ?? null,
      status: meta.status,
      specVersion: meta.spec_version,
      tokenSummary: tokenSummary as Prisma.InputJsonValue,
      fileEtags: fileEtags as Prisma.InputJsonValue,
    };

    const system = await this.prisma.db.system.upsert({
      where: { slug: meta.slug },
      create: { slug: meta.slug, ...common },
      update: common,
    });

    await this.prisma.db.systemCategory.deleteMany({ where: { systemId: system.id } });
    await this.prisma.db.systemCategory.createMany({
      data: meta.categories.map((categoryId) => ({ systemId: system.id, categoryId })),
    });

    const lintData = {
      errors: lint.summary.errors,
      warnings: lint.summary.warnings,
      info: lint.summary.infos,
      findings: (lint.findings ?? []) as Prisma.InputJsonValue,
      lintedAt: new Date(),
    };
    await this.prisma.db.lintReport.upsert({
      where: { systemId: system.id },
      create: { systemId: system.id, ...lintData },
      update: lintData,
    });
  }

  private async seedCategories(): Promise<void> {
    for (const [id, label] of Object.entries(PURPOSE_CATEGORY_LABELS)) {
      await this.prisma.db.category.upsert({
        where: { id },
        create: { id, label },
        update: { label },
      });
    }
  }
}
