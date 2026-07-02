/** A flat map of source token paths → primitive values (colors, sizes, etc.). */
export type RawTokenMap = Record<string, string | number>;

/** One typography scale entry in the DESIGN.md front-matter shape. */
export interface TypographyScale {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number | string;
  letterSpacing?: string;
}

/**
 * The curated token model that maps 1:1 onto DESIGN.md front matter. Extraction
 * produces a best-effort draft; generation + human QA refine it (the compact
 * DESIGN.md is a distillation of a system's tokens, not a raw dump).
 */
export interface NormalizedTokens {
  colors: Record<string, string>;
  typography: Record<string, TypographyScale>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, Record<string, string>>;
}

/** Result of an extraction run: raw tokens + resolved provenance details. */
export interface ExtractResult {
  rawTokens: RawTokenMap;
  files: string[];
  resolvedVersion?: string;
  extractedAt: string;
}
