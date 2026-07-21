import type { DesignTokens } from "./front-matter";

/** Reduced typography level for summaries — enough for a type-scale preview. */
export interface TypographySummaryLevel {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

/**
 * Parsed token summary served on `GET /v1/systems/{slug}` (PRD F-4) and used
 * by catalog preview cards. Computed at ingest from DESIGN.md front matter —
 * never at request time.
 */
export interface TokenSummary {
  name?: string;
  description?: string;
  /** Unique font families across all typography levels, in first-use order. */
  fonts: string[];
  colors: Record<string, string>;
  typography: Record<string, TypographySummaryLevel>;
  spacing: Record<string, string | number>;
  rounded: Record<string, string | number>;
  counts: {
    colors: number;
    typography: number;
    spacing: number;
    rounded: number;
    components: number;
  };
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

/** Distill DESIGN.md front matter into the summary the API stores and serves. */
export function buildTokenSummary(tokens: DesignTokens): TokenSummary {
  const colors = tokens.colors ?? {};
  const typography = tokens.typography ?? {};
  const spacing = tokens.spacing ?? {};
  const rounded = tokens.rounded ?? {};
  const components = tokens.components ?? {};

  const fonts: string[] = [];
  const typographySummary: Record<string, TypographySummaryLevel> = {};
  for (const [level, style] of Object.entries(typography)) {
    const fontFamily = asOptionalString(style["fontFamily"]);
    if (fontFamily && !fonts.includes(fontFamily)) fonts.push(fontFamily);
    const summary: TypographySummaryLevel = {};
    if (fontFamily) summary.fontFamily = fontFamily;
    const fontSize = asOptionalString(style["fontSize"]);
    if (fontSize) summary.fontSize = fontSize;
    const weight = style["fontWeight"];
    if (typeof weight === "string" || typeof weight === "number") summary.fontWeight = weight;
    typographySummary[level] = summary;
  }

  const result: TokenSummary = {
    fonts,
    colors,
    typography: typographySummary,
    spacing,
    rounded,
    counts: {
      colors: Object.keys(colors).length,
      typography: Object.keys(typography).length,
      spacing: Object.keys(spacing).length,
      rounded: Object.keys(rounded).length,
      components: Object.keys(components).length,
    },
  };
  if (tokens.name) result.name = tokens.name;
  if (tokens.description) result.description = tokens.description;
  return result;
}
