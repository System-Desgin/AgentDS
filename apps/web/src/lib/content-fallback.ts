import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  buildTokenSummary,
  extractDesignFrontMatter,
  validateMeta,
  type Meta,
  type SystemDetail,
  type SystemListItem,
} from "@agentds/shared";
import { parse as parseYaml } from "yaml";

/**
 * Graceful degradation (Phase 3 checklist): when the API is unreachable, the
 * site serves the content files bundled with the deployment instead of
 * erroring. Published entries only — the same gate the API enforces. Counters
 * and lint metadata are API-side, so fallback values are conservative.
 */

interface FallbackEntry {
  meta: Meta;
  detail: SystemDetail;
  designMd: string;
}

const CONTENT_PATHS = [
  { dirname: "official", path: "official" },
  { dirname: "brand-looks", path: "brand-look" },
] as const;

function findContentDir(): string | null {
  const configured = process.env["CONTENT_DIR"];
  if (configured && existsSync(join(configured, "official"))) return configured;
  let dir = process.cwd();
  for (let depth = 0; depth < 12; depth += 1) {
    const candidate = join(dir, "content");
    if (existsSync(join(candidate, "official"))) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

let cache: Promise<Map<string, FallbackEntry>> | null = null;

async function loadEntries(): Promise<Map<string, FallbackEntry>> {
  const entries = new Map<string, FallbackEntry>();
  const contentDir = findContentDir();
  if (!contentDir) return entries;

  for (const { dirname: sub, path } of CONTENT_PATHS) {
    const root = join(contentDir, sub);
    if (!existsSync(root)) continue;
    const folders = (await readdir(root, { withFileTypes: true }))
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    for (const folder of folders) {
      try {
        const dir = join(root, folder);
        const parsed = validateMeta(parseYaml(await readFile(join(dir, "meta.yaml"), "utf8")));
        if (!parsed.success) continue;
        const meta = parsed.data;
        if (meta.status !== "published" || meta.slug !== folder || meta.path !== path) continue;

        const designMd = await readFile(join(dir, "DESIGN.md"), "utf8");
        const frontMatter = extractDesignFrontMatter(designMd);

        entries.set(meta.slug, {
          meta,
          designMd,
          detail: {
            slug: meta.slug,
            name: meta.name,
            path: meta.path,
            maker: meta.maker,
            summary: meta.summary,
            description: meta.description,
            categories: meta.categories,
            tags: meta.tags,
            best_for: meta.best_for,
            license: meta.license,
            provenance: meta.provenance,
            links: meta.links,
            restricted: meta.restricted,
            ...(meta.restricted_reason ? { restricted_reason: meta.restricted_reason } : {}),
            status: meta.status,
            spec_version: meta.spec_version,
            token_summary: frontMatter ? buildTokenSummary(frontMatter) : null,
            lint: null,
            counters: { download: 0, copy: 0, api_fetch: 0 },
            updated_at: new Date(meta.provenance.extracted_at).toISOString(),
          },
        });
      } catch {
        // Fallback is best-effort: skip unreadable entries silently.
      }
    }
  }
  return entries;
}

function entriesOnce(): Promise<Map<string, FallbackEntry>> {
  cache ??= loadEntries();
  return cache;
}

export interface FallbackListQuery {
  path?: string;
  category?: string;
  q?: string;
  license?: string;
  page: number;
  limit: number;
}

export async function fallbackListSystems(
  query: FallbackListQuery,
): Promise<{ data: SystemListItem[]; total: number }> {
  const all = [...(await entriesOnce()).values()];
  const q = query.q?.toLowerCase();
  const filtered = all.filter(({ meta }) => {
    if (query.path && meta.path !== query.path) return false;
    if (query.category && !(meta.categories as string[]).includes(query.category)) return false;
    if (query.license && meta.license.spdx.toLowerCase() !== query.license.toLowerCase())
      return false;
    if (
      q &&
      ![meta.name, meta.maker, meta.summary, meta.description].join("\n").toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });

  filtered.sort((a, b) => a.meta.name.localeCompare(b.meta.name));
  const start = (query.page - 1) * query.limit;
  const page = filtered.slice(start, start + query.limit);

  return {
    data: page.map(({ meta, detail }) => {
      const displayFont = detail.token_summary?.fonts[0];
      return {
        slug: meta.slug,
        name: meta.name,
        path: meta.path,
        maker: meta.maker,
        summary: meta.summary,
        categories: meta.categories,
        tags: meta.tags,
        license_spdx: meta.license.spdx,
        restricted: meta.restricted,
        fetches: 0,
        palette: Object.values(detail.token_summary?.colors ?? {}).slice(0, 5),
        ...(displayFont ? { display_font: displayFont } : {}),
        updated_at: detail.updated_at,
      };
    }),
    total: filtered.length,
  };
}

export async function fallbackGetSystem(slug: string): Promise<SystemDetail | null> {
  return (await entriesOnce()).get(slug)?.detail ?? null;
}

export async function fallbackGetDesignMd(slug: string): Promise<string | null> {
  const entry = (await entriesOnce()).get(slug);
  if (!entry || entry.meta.restricted) return null;
  return entry.designMd;
}

export async function fallbackCategoryCounts(): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  for (const { meta } of (await entriesOnce()).values()) {
    for (const category of meta.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return counts;
}

export async function fallbackAllSlugs(): Promise<string[]> {
  return [...(await entriesOnce()).keys()];
}
