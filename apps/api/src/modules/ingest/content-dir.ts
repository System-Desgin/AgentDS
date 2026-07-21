import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

/**
 * Locate the content directory. Priority: explicit CONTENT_DIR env (Docker
 * bakes it at /app/content), then walking up from cwd looking for a
 * `content/official` folder (dev, where cwd is apps/api or the repo root).
 */
export function resolveContentDir(configured?: string): string | null {
  if (configured) {
    return existsSync(join(configured, "official")) ? resolve(configured) : null;
  }
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
