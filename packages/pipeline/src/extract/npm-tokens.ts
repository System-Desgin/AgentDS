import { flattenTokens } from "./parse-dtcg";
import { parseCssVars } from "./parse-css";
import type { ExtractResult, RawTokenMap } from "../model/tokens";

const JSDELIVR_META = "https://data.jsdelivr.com/v1/packages/npm";
const JSDELIVR_CDN = "https://cdn.jsdelivr.net/npm";
const MAX_TOKEN_FILES = 40;
const MAX_CSS_FILES = 6;

interface JsdelivrNode {
  type: "file" | "directory";
  name: string;
  files?: JsdelivrNode[];
}

function collectPaths(nodes: JsdelivrNode[], prefix = ""): string[] {
  const paths: string[] = [];
  for (const node of nodes) {
    const path = `${prefix}/${node.name}`;
    if (node.type === "directory" && node.files) {
      paths.push(...collectPaths(node.files, path));
    } else if (node.type === "file") {
      paths.push(path);
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
 * Heuristic: is this a CSS file likely to define token custom properties?
 * Prefer non-minified stylesheets (readable, same values).
 */
export function isCssTokenFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (!lower.endsWith(".css") || lower.endsWith(".min.css")) return false;
  if (/node_modules/.test(lower)) return false;
  return /token|theme|variable|style|index|core|root/.test(lower);
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
  const tokenPaths = allPaths.filter(isTokenFile).slice(0, MAX_TOKEN_FILES);
  const cssPaths = allPaths.filter(isCssTokenFile).slice(0, MAX_CSS_FILES);

  const rawTokens: RawTokenMap = {};
  const usedFiles: string[] = [];
  const namespaceOf = (path: string): string =>
    path
      .replace(/\.(json|css)$/i, "")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+/, "");

  for (const path of tokenPaths) {
    const fileRes = await fetch(`${JSDELIVR_CDN}/${pkg}@${version}${path}`);
    if (!fileRes.ok) continue;
    let json: unknown;
    try {
      json = await fileRes.json();
    } catch {
      continue;
    }
    const before = Object.keys(rawTokens).length;
    flattenTokens(json, namespaceOf(path), rawTokens);
    if (Object.keys(rawTokens).length > before) usedFiles.push(path);
  }

  // JSON tokens are richer; only fall back to CSS custom properties when no JSON
  // tokens were found (e.g. Carbon ships resolved values only in css/styles.css).
  if (Object.keys(rawTokens).length === 0) {
    for (const path of cssPaths) {
      const fileRes = await fetch(`${JSDELIVR_CDN}/${pkg}@${version}${path}`);
      if (!fileRes.ok) continue;
      const css = await fileRes.text();
      const before = Object.keys(rawTokens).length;
      Object.assign(rawTokens, parseCssVars(css, namespaceOf(path)));
      if (Object.keys(rawTokens).length > before) usedFiles.push(path);
    }
  }

  return { rawTokens, files: usedFiles, resolvedVersion: version, extractedAt };
}
