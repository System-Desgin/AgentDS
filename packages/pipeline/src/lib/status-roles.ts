import { contrastRatio, parseHex } from "./color";

/**
 * Give an entry the status colors it never declared.
 *
 * Roughly a sixth of the catalog shipped no `success`/`warning`/`error`, and
 * the sample screens filled the gap with hard-coded IBM Carbon values — so a
 * Notion or GitHub preview rendered Carbon's green and red. The values exist in
 * these systems' own sources; they were simply never carried into the entry.
 * This picks them out of the captured palette by hue, keeping only members that
 * read at WCAG AA on the system's surface.
 */

/** Hue windows (degrees) for each status family. */
const STATUS_HUES: Record<string, [number, number]> = {
  success: [80, 170],
  warning: [25, 65],
  error: [330, 20],
};

/** Names that already satisfy a role, so it is not added twice. */
export const ROLE_ALIASES: Record<string, string[]> = {
  success: ["success", "positive", "ok", "green"],
  warning: ["warning", "attention", "caution"],
  error: ["error", "danger", "negative", "critical"],
};

function hsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((c) => c / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return { h: h < 0 ? h + 360 : h, s, l };
}

function inWindow(h: number, [start, end]: [number, number]): boolean {
  return start <= end ? h >= start && h <= end : h >= start || h <= end;
}

/**
 * Choose a source color for `role` that clears AA on `surface`. Among the
 * qualifying members the most saturated wins, so the pick reads as a status
 * color rather than a muted neutral that happens to sit in the hue window.
 */
export function pickStatusColor(
  role: keyof typeof STATUS_HUES,
  sourceColors: Iterable<string>,
  surface: string,
): string | null {
  const window = STATUS_HUES[role] as [number, number];
  const candidates: Array<{ hex: string; saturation: number }> = [];
  for (const hex of sourceColors) {
    const c = hsl(hex);
    if (!c || c.s < 0.35 || c.l < 0.15 || c.l > 0.85) continue;
    if (!inWindow(c.h, window)) continue;
    if (contrastRatio(hex, surface) < 4.5) continue;
    candidates.push({ hex, saturation: c.s });
  }
  candidates.sort((a, b) => b.saturation - a.saturation);
  return candidates[0]?.hex ?? null;
}

/** Roles an entry is missing, given the color token names it declares. */
export function missingRoles(declared: string[]): string[] {
  return Object.entries(ROLE_ALIASES)
    .filter(([, aliases]) => !declared.some((name) => aliases.includes(name)))
    .map(([role]) => role);
}

/**
 * Insert color tokens at the end of the front-matter `colors:` block, matching
 * the quoting style already used there so the file stays diff-clean.
 */
export function addColorTokens(markdown: string, additions: Record<string, string>): string {
  if (Object.keys(additions).length === 0) return markdown;
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => l === "colors:");
  if (start === -1) return markdown;

  let end = start + 1;
  while (end < lines.length && /^ {2}\S/.test(lines[end] ?? "")) end += 1;

  const quoted = /:\s*"#/.test(lines[start + 1] ?? "");
  const inserted = Object.entries(additions).map(([name, value]) =>
    quoted ? `  ${name}: "${value.toUpperCase()}"` : `  ${name}: ${value.toUpperCase()}`,
  );
  return [...lines.slice(0, end), ...inserted, ...lines.slice(end)].join("\n");
}

/**
 * Append a short prose bullet documenting the added tokens. A DESIGN.md whose
 * front matter declares tokens the prose never mentions is incomplete, and the
 * linter expects color claims to reference tokens by name.
 */
export function documentStatusTokens(
  markdown: string,
  additions: Record<string, string>,
  surface: string,
): string {
  const names = Object.keys(additions);
  if (names.length === 0) return markdown;

  const heading = "\n## Colors\n";
  const index = markdown.indexOf(heading);
  if (index === -1) return markdown;
  const sectionStart = index + heading.length;
  const nextHeading = markdown.indexOf("\n## ", sectionStart);
  const end = nextHeading === -1 ? markdown.length : nextHeading;

  const parts = names
    .map((name) => `\`{colors.${name}}\` (${(additions[name] as string).toUpperCase()})`)
    .join(", ");
  const ratios = names
    .map((name) => contrastRatio(additions[name] as string, surface).toFixed(1))
    .join(" / ");

  const bullet =
    `- **status colors** — ${parts} are the observed status hues, each holding ` +
    `${ratios}:1 on \`{colors.surface}\` so they can carry text as well as fills.\n`;

  return `${markdown.slice(0, end).replace(/\n+$/, "\n")}${bullet}${markdown.slice(end)}`;
}
