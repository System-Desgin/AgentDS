import { flattenTokens } from "./parse-dtcg";
import type { ExtractResult, RawTokenMap } from "../model/tokens";

/**
 * Extract tokens from raw JSON token files hosted in a repository (e.g.
 * raw.githubusercontent.com URLs). Each URL's tokens are namespaced by the file
 * name to avoid clashes.
 */
export async function extractRepoJson(urls: string[], extractedAt: string): Promise<ExtractResult> {
  const rawTokens: RawTokenMap = {};
  const usedFiles: string[] = [];
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) continue;
    let json: unknown;
    try {
      json = await res.json();
    } catch {
      continue;
    }
    const namespace = (url.split("/").pop() ?? "tokens")
      .replace(/\.json$/i, "")
      .replace(/[^a-z0-9]+/gi, "_");
    const before = Object.keys(rawTokens).length;
    flattenTokens(json, namespace, rawTokens);
    if (Object.keys(rawTokens).length > before) usedFiles.push(url);
  }
  return { rawTokens, files: usedFiles, extractedAt };
}
