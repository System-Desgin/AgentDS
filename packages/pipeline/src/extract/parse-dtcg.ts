import type { RawTokenMap } from "../model/tokens";

/**
 * Flatten a token tree into `{ "a.b.c": value }`. Handles both W3C DTCG tokens
 * (leaf nodes carry `$value`) and plain nested maps (leaf is a string/number).
 * `$`-prefixed metadata keys are ignored. Pure — no I/O.
 */
export function flattenTokens(tree: unknown, prefix = "", out: RawTokenMap = {}): RawTokenMap {
  if (tree === null || typeof tree !== "object") return out;
  const obj = tree as Record<string, unknown>;

  if ("$value" in obj) {
    const value = obj.$value;
    if (typeof value === "string" || typeof value === "number") {
      out[prefix] = value;
    } else if (value !== undefined) {
      out[prefix] = JSON.stringify(value);
    }
    return out;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      flattenTokens(value, path, out);
    } else if (typeof value === "string" || typeof value === "number") {
      out[path] = value;
    }
  }
  return out;
}
