import { collectHexes } from "../lib/color";
import type { NormalizedTokens, RawTokenMap, TypographyScale } from "../model/tokens";

const MAX_COLORS = 96;
const MAX_TYPOGRAPHY_STYLES = 48;
const MAX_ROUNDED = 32;
const MAX_SPACING = 64;

const SEMANTIC_PATH_RE =
  /(?:^|[._-])(?:primary|secondary|action|interactive|link|focus|background|surface|layer|field|text|icon|border|brand|success|warning|error|danger|info)(?:[._-]|$)/i;
const SPACING_PATH_RE = /(?:^|[._-])(?:space|spacing|gap|gutter|padding|margin)(?:[._-]|$)/i;
const RADIUS_PATH_RE = /(?:^|[._-])(?:radius|radii|rounded)(?:[._-]|$)/i;
const LENGTH_RE = /-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em)\b/gi;

export interface NormalizationStats {
  strategy: "design-md-candidates-v1";
  inputTokenCount: number;
  selectedSourceCount: number;
  ignoredSourceCount: number;
  output: {
    colors: number;
    typography: number;
    rounded: number;
    spacing: number;
    components: number;
  };
}

export interface NormalizationResult {
  tokens: NormalizedTokens;
  stats: NormalizationStats;
}

function candidateName(path: string): string {
  const withoutFileNamespace = path.includes(".") ? path.slice(path.indexOf(".") + 1) : path;
  return (
    withoutFileNamespace
      .replace(/^--/, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 80) || "token"
  );
}

function rankedEntries(rawTokens: RawTokenMap): Array<[string, string | number]> {
  return Object.entries(rawTokens).sort(([pathA], [pathB]) => {
    const score = (path: string): number =>
      (SEMANTIC_PATH_RE.test(path) ? 100 : 0) +
      (path.includes("--") ? 20 : 0) -
      (/_\d+$/.test(path) ? 10 : 0) -
      path.length / 1_000;
    return score(pathB) - score(pathA) || pathA.localeCompare(pathB);
  });
}

function addCandidate(target: Record<string, string>, rawName: string, value: string): boolean {
  const base = candidateName(rawName);
  if (target[base] === value) return false;
  if (!(base in target)) {
    target[base] = value;
    return true;
  }

  for (let suffix = 2; suffix < 100; suffix += 1) {
    const name = `${base}-${suffix}`;
    if (target[name] === value) return false;
    if (!(name in target)) {
      target[name] = value;
      return true;
    }
  }
  return false;
}

function structuredValue(value: string | number): Record<string, unknown> | null {
  if (typeof value !== "string" || !value.trim().startsWith("{")) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function colorValue(value: string | number): string | null {
  const colors = collectHexes([value]);
  if (colors.size === 1) return [...colors][0] ?? null;

  const structured = structuredValue(value);
  const components = structured?.components;
  if (
    structured?.colorSpace === "srgb" &&
    Array.isArray(components) &&
    components.length >= 3 &&
    components.slice(0, 3).every((component) => typeof component === "number")
  ) {
    const channels = (components.slice(0, 3) as number[]).map((component) =>
      Math.max(0, Math.min(255, Math.round(component <= 1 ? component * 255 : component))),
    );
    return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  }
  return null;
}

function lengthValue(value: string | number): string | null {
  const structured = structuredValue(value);
  if (
    typeof structured?.value === "number" &&
    typeof structured.unit === "string" &&
    /^(?:px|rem|em)$/i.test(structured.unit)
  ) {
    return `${structured.value}${structured.unit.toLowerCase()}`;
  }
  if (typeof value !== "string") return null;
  if (value.trim() === "0") return "0";
  const matches = value.match(LENGTH_RE) ?? [];
  return matches.length === 1 ? (matches[0]?.toLowerCase() ?? null) : null;
}

function typographyProperty(path: string): keyof TypographyScale | null {
  if (/font[._-]?family/i.test(path)) return "fontFamily";
  if (/font[._-]?size/i.test(path)) return "fontSize";
  if (/font[._-]?weight/i.test(path)) return "fontWeight";
  if (/line[._-]?height/i.test(path)) return "lineHeight";
  if (/letter[._-]?spacing/i.test(path)) return "letterSpacing";
  return null;
}

function typographyStyleName(path: string): string {
  return candidateName(
    path.replace(
      /(?:[._-])?(?:font[._-]?(?:family|size|weight)|line[._-]?height|letter[._-]?spacing)(?:[._-])?/gi,
      "-",
    ),
  );
}

function typographyValue(
  property: keyof TypographyScale,
  value: unknown,
): TypographyScale[keyof TypographyScale] | null {
  if (property === "fontWeight") {
    const number = typeof value === "number" ? value : Number(value);
    return Number.isFinite(number) ? number : null;
  }
  if (property === "lineHeight") {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return null;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
    return lengthValue(value);
  }
  if (property === "fontSize" || property === "letterSpacing") {
    return typeof value === "string" ? lengthValue(value) : null;
  }
  return typeof value === "string" && !/^var\(/i.test(value.trim()) ? value.trim() : null;
}

function addTypographyCandidate(
  typography: Record<string, TypographyScale>,
  styleName: string,
  property: keyof TypographyScale,
  value: unknown,
): boolean {
  const normalized = typographyValue(property, value);
  if (normalized === null) return false;
  const style = (typography[styleName] ??= {});
  if (style[property] !== undefined) return false;
  Object.assign(style, { [property]: normalized });
  return true;
}

/**
 * Convert a flat, source-extracted token map into a bounded DESIGN.md-shaped
 * candidate model. Values are parsed from source literals only: this stage
 * categorizes and normalizes representation, while generation + human QA own
 * the semantic distillation into the final compact token set.
 */
export function normalizeRawTokens(rawTokens: RawTokenMap): NormalizationResult {
  const colors: Record<string, string> = {};
  const typography: Record<string, TypographyScale> = {};
  const rounded: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const selectedSources = new Set<string>();

  for (const [path, value] of rankedEntries(rawTokens)) {
    if (Object.keys(colors).length < MAX_COLORS) {
      const color = colorValue(value);
      if (color && addCandidate(colors, path, color)) selectedSources.add(path);
    }

    const structured = structuredValue(value);
    if (structured && Object.keys(typography).length < MAX_TYPOGRAPHY_STYLES) {
      const styleName = candidateName(path);
      for (const property of [
        "fontFamily",
        "fontSize",
        "fontWeight",
        "lineHeight",
        "letterSpacing",
      ] as const) {
        if (addTypographyCandidate(typography, styleName, property, structured[property])) {
          selectedSources.add(path);
        }
      }
    }

    const property = typographyProperty(path);
    if (property && Object.keys(typography).length < MAX_TYPOGRAPHY_STYLES) {
      if (addTypographyCandidate(typography, typographyStyleName(path), property, value)) {
        selectedSources.add(path);
      }
    }

    const length = lengthValue(value);
    if (
      length &&
      RADIUS_PATH_RE.test(path) &&
      Object.keys(rounded).length < MAX_ROUNDED &&
      addCandidate(rounded, path, length)
    ) {
      selectedSources.add(path);
    }
    if (
      length &&
      !property &&
      SPACING_PATH_RE.test(path) &&
      Object.keys(spacing).length < MAX_SPACING &&
      addCandidate(spacing, path, length)
    ) {
      selectedSources.add(path);
    }
  }

  for (const [name, style] of Object.entries(typography)) {
    if (Object.keys(style).length === 0) delete typography[name];
  }

  const tokens: NormalizedTokens = {
    colors,
    typography,
    rounded,
    spacing,
    components: {},
  };
  return {
    tokens,
    stats: {
      strategy: "design-md-candidates-v1",
      inputTokenCount: Object.keys(rawTokens).length,
      selectedSourceCount: selectedSources.size,
      ignoredSourceCount: Math.max(0, Object.keys(rawTokens).length - selectedSources.size),
      output: {
        colors: Object.keys(colors).length,
        typography: Object.keys(typography).length,
        rounded: Object.keys(rounded).length,
        spacing: Object.keys(spacing).length,
        components: 0,
      },
    },
  };
}
