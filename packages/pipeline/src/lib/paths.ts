import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { SystemPath } from "@agentds/shared";

/** Folder name under content/ for each catalog path. */
export const CONTENT_DIRNAME: Record<SystemPath, string> = {
  official: "official",
  "brand-look": "brand-looks",
};

/**
 * Walk up from a starting directory to the monorepo root, identified by
 * `pnpm-workspace.yaml`. Robust to the CLI's working directory.
 */
export function findRepoRoot(startDir: string = __dirname): string {
  let dir = startDir;
  for (let depth = 0; depth < 12; depth += 1) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("Could not locate the repo root (pnpm-workspace.yaml not found).");
}

/** Absolute path to a catalog entry's folder. */
export function contentDirFor(path: SystemPath, slug: string): string {
  return resolve(findRepoRoot(), "content", CONTENT_DIRNAME[path], slug);
}

/**
 * Resolve an existing entry folder by slug, searching both catalog paths.
 * Returns the absolute dir and its catalog path, or null if not found.
 */
export function findEntryDir(slug: string): { dir: string; path: SystemPath } | null {
  const root = findRepoRoot();
  for (const path of ["official", "brand-look"] as const) {
    const dir = resolve(root, "content", CONTENT_DIRNAME[path], slug);
    if (existsSync(dir)) return { dir, path };
  }
  return null;
}
