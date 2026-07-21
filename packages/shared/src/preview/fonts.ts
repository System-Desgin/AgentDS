/**
 * Google Fonts loading for type specimens (PRD F-2): catalog systems name real
 * families; licensed ones load from Google Fonts, proprietary ones fall back
 * to a substitute (docs/04-DATA-SOURCES.md §5 — never serve proprietary font
 * binaries). Keys are lowercase for lookup.
 */
const PROPRIETARY_SUBSTITUTES: Record<string, string> = {
  "sf pro": "Inter",
  "sf pro text": "Inter",
  "sf pro display": "Inter",
  "segoe ui": "Open Sans",
  "segoe ui variable": "Open Sans",
  "salesforce sans": "Inter",
  "helvetica neue": "Inter",
  helvetica: "Inter",
  arial: "Inter",
  "styrene a": "Inter",
  "styrene b": "Inter",
  sodosans: "Open Sans",
  "circular std": "Inter",
  circular: "Inter",
  graphik: "Inter",
};

/** Families known to exist on Google Fonts (the Tier-1/2 catalog set). */
const GOOGLE_FAMILIES = new Set(
  [
    "IBM Plex Sans",
    "IBM Plex Mono",
    "IBM Plex Serif",
    "Roboto",
    "Roboto Flex",
    "Roboto Mono",
    "Inter",
    "Open Sans",
    "Noto Sans",
    "Mona Sans",
    "Figtree",
    "Geist",
    "Geist Mono",
    "Source Sans 3",
    "Source Serif 4",
    "Source Code Pro",
    "JetBrains Mono",
    "Space Grotesk",
    "Public Sans",
    "Fira Code",
    "Fira Sans",
    "Poppins",
    "Nunito Sans",
    "Work Sans",
    "DM Sans",
    "Manrope",
    "Rubik",
    "Mulish",
    "Karla",
  ].map((f) => f.toLowerCase()),
);

const GENERIC_KEYWORDS = new Set([
  "system-ui",
  "sans-serif",
  "serif",
  "monospace",
  "ui-monospace",
  "ui-sans-serif",
  "ui-serif",
]);

/**
 * Resolve a token fontFamily to the family the preview should load/render:
 * the family itself when it's on Google Fonts, its documented substitute when
 * proprietary, or null (system-font fallback) when unknown.
 */
export function resolvePreviewFamily(fontFamily: string): string | null {
  const first = (fontFamily.split(",")[0] ?? "").trim().replace(/^["']|["']$/g, "");
  if (!first || GENERIC_KEYWORDS.has(first.toLowerCase())) return null;
  const key = first.toLowerCase();
  if (GOOGLE_FAMILIES.has(key)) return first;
  const substitute = PROPRIETARY_SUBSTITUTES[key];
  if (substitute) return substitute;
  return null;
}

/** CSS font-family stack for a specimen, always ending in a generic family. */
export function previewFontStack(fontFamily: string): string {
  const resolved = resolvePreviewFamily(fontFamily);
  const generic = /mono/i.test(fontFamily)
    ? "ui-monospace, monospace"
    : /serif/i.test(fontFamily) && !/sans/i.test(fontFamily)
      ? "Georgia, serif"
      : "system-ui, sans-serif";
  return resolved ? `"${resolved}", ${generic}` : generic;
}

/**
 * Google Fonts css2 URL covering every loadable family in a typography block.
 * Returns null when nothing needs loading (all-system fallbacks).
 */
export function googleFontsUrl(
  fontFamilies: string[],
  weights: number[] = [400, 500, 600],
): string | null {
  const families = [
    ...new Set(fontFamilies.map(resolvePreviewFamily).filter((f): f is string => f !== null)),
  ];
  if (families.length === 0) return null;
  const params = families
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@${weights.join(";")}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
