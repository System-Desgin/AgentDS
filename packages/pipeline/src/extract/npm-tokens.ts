import { flattenTokens } from "./parse-dtcg";
import { parseCssVars } from "./parse-css";
import { collectHexes } from "../lib/color";
import { rankTokenFiles, sweepColors, type FileEntry } from "./source-sweep";
import type { ExtractResult, RawTokenMap } from "../model/tokens";

const JSDELIVR_META = "https://data.jsdelivr.com/v1/packages/npm";
const JSDELIVR_CDN = "https://cdn.jsdelivr.net/npm";
const MAX_TOKEN_FILES = 40;
const MAX_CSS_FILES = 12;
const MAX_SCRIPT_FILES = 16;
/** Below this many distinct colors, an extraction has not found a real palette. */
export const MIN_PALETTE_COLORS = 12;

interface JsdelivrNode {
  type: "file" | "directory";
  name: string;
  size?: number;
  files?: JsdelivrNode[];
}

/** Flatten the package listing to `{ path, size }`; size drives rank tiebreaks. */
function collectPaths(nodes: JsdelivrNode[], prefix = ""): FileEntry[] {
  const paths: FileEntry[] = [];
  for (const node of nodes) {
    const path = `${prefix}/${node.name}`;
    if (node.type === "directory" && node.files) {
      paths.push(...collectPaths(node.files, path));
    } else if (node.type === "file") {
      paths.push({ path, size: node.size ?? 0 });
    }
  }
  return paths;
}

/** Heuristic: is this a JSON file likely to contain design tokens? */
export function isTokenFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (!lower.endsWith(".json")) return false;
  if (/package\.json|tsconfig|node_modules|schema|manifest/.test(lower)) return false;
  return /token|theme|palette|colou?r|primitive|design|scale|spacing|typography|variables|(^|\/)index[^/]*\.json$/.test(
    lower,
  );
}

/**
 * Any stylesheet in the package, including Sass/Less sources — Semi publishes
 * its palette as `.scss` and nothing else. The old name-based filter skipped
 * the exact files several systems keep their palette in (Arco's
 * `dist/css/arco.css`, Moon's `lib/moon-base.css`), so candidates are ranked
 * rather than excluded.
 */
export function isCssTokenFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (!/\.(css|scss|sass|less)$/.test(lower)) return false;
  return !/node_modules/.test(lower);
}

/**
 * Script modules that may compile a palette into object literals — Fluent,
 * Backstage and Base Web all ship tokens this way and no JSON at all.
 * Source maps are excluded: same values, ten times the bytes.
 */
export function isScriptTokenFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (!/\.(js|mjs|cjs|ts)$/.test(lower)) return false;
  if (/\.d\.ts$/.test(lower) || /node_modules|\.map$/.test(lower)) return false;
  return true;
}

/**
 * Extract tokens from a published npm package via the jsDelivr CDN (no tarball
 * unpacking): list files, pick the token-shaped JSON, fetch and flatten them.
 * Each file's tokens are namespaced by the sanitized file path to avoid clashes.
 */
export async function extractNpmTokens(
  pkg: string,
  version: string,
  extractedAt: string,
): Promise<ExtractResult> {
  const treeRes = await fetch(`${JSDELIVR_META}/${pkg}@${version}`);
  if (!treeRes.ok) {
    throw new Error(`jsDelivr metadata failed for ${pkg}@${version} (${treeRes.status})`);
  }
  const tree = (await treeRes.json()) as { files: JsdelivrNode[] };
  const allPaths = collectPaths(tree.files);

  const rawTokens: RawTokenMap = {};
  const usedFiles: string[] = [];
  const namespaceOf = (path: string): string =>
    path
      .replace(/\.(json|css|m?js|cjs|ts)$/i, "")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+/, "");

  const paletteSize = (): number => collectHexes(Object.values(rawTokens)).size;

  const fetchFile = async (path: string): Promise<string | null> => {
    const res = await fetch(`${JSDELIVR_CDN}/${pkg}@${version}${path}`);
    return res.ok ? res.text() : null;
  };

  const absorb = (path: string, tokens: RawTokenMap): void => {
    const before = Object.keys(rawTokens).length;
    for (const [key, value] of Object.entries(tokens)) {
      if (!(key in rawTokens)) rawTokens[key] = value;
    }
    if (Object.keys(rawTokens).length > before) usedFiles.push(path);
  };

  // DTCG/JSON first — it carries the best token names.
  for (const path of rankTokenFiles(allPaths.filter((f) => isTokenFile(f.path))).slice(
    0,
    MAX_TOKEN_FILES,
  )) {
    const text = await fetchFile(path);
    if (text === null) continue;
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      continue;
    }
    const parsed: RawTokenMap = {};
    flattenTokens(json, namespaceOf(path), parsed);
    absorb(path, parsed);
  }

  // Escalate through the other formats a design system might publish in, and
  // stop as soon as a real palette has been recovered. Plenty of packages ship
  // a token-shaped JSON holding almost no color (a highlight theme, an icon
  // manifest) while the palette lives in CSS or a compiled ES module — Arco,
  // Fluent, Moon and Backstage between them cover every combination.
  if (paletteSize() < MIN_PALETTE_COLORS) {
    for (const path of rankTokenFiles(allPaths.filter((f) => isCssTokenFile(f.path))).slice(
      0,
      MAX_CSS_FILES,
    )) {
      const css = await fetchFile(path);
      if (css === null) continue;
      const ns = namespaceOf(path);
      absorb(path, { ...parseCssVars(css, ns), ...sweepColors(css, ns) });
    }
  }

  if (paletteSize() < MIN_PALETTE_COLORS) {
    for (const path of rankTokenFiles(allPaths.filter((f) => isScriptTokenFile(f.path))).slice(
      0,
      MAX_SCRIPT_FILES,
    )) {
      const source = await fetchFile(path);
      if (source === null) continue;
      absorb(path, sweepColors(source, namespaceOf(path)));
    }
  }

  return { rawTokens, files: usedFiles, resolvedVersion: version, extractedAt };
}
