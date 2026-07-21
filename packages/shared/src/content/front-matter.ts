import { parse as parseYaml } from "yaml";
import { z } from "zod";

/**
 * Loose schema for DESIGN.md YAML front matter (spec version "alpha").
 * Deliberately tolerant — the official linter is the normative gate; consumers
 * here (API token summaries, web preview cards) only need safe typed access.
 */
export const designTokensSchema = z.looseObject({
  version: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  colors: z.record(z.string(), z.string()).optional(),
  typography: z
    .record(z.string(), z.record(z.string(), z.union([z.string(), z.number()])))
    .optional(),
  rounded: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  spacing: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  components: z
    .record(z.string(), z.record(z.string(), z.union([z.string(), z.number()])))
    .optional(),
});
export type DesignTokens = z.infer<typeof designTokensSchema>;

/**
 * Extract and parse the YAML front matter of a DESIGN.md document.
 * Returns null when the document has no front matter or it fails to parse —
 * callers decide whether that is an error (ingest skips such entries).
 */
export function extractDesignFrontMatter(markdown: string): DesignTokens | null {
  const normalized = markdown.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---")) return null;
  const end = normalized.indexOf("\n---", 3);
  if (end === -1) return null;

  try {
    const raw: unknown = parseYaml(normalized.slice(normalized.indexOf("\n") + 1, end + 1));
    const parsed = designTokensSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
