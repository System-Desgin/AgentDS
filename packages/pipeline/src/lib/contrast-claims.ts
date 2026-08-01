import { contrastRatio, normalizeHex } from "./color";

/**
 * Keep the contrast ratios stated in DESIGN.md prose true after a color has
 * been re-grounded.
 *
 * The prose quotes measured ratios ("holds 4.6:1 on `{colors.surface}`"), so
 * correcting a token's value silently invalidates every sentence about it.
 * Publishing a wrong accessibility number is worse than publishing a wrong
 * swatch, so each claim is recomputed from the tokens it names — and any claim
 * whose pair cannot be resolved is reported rather than quietly left stale.
 */

export interface ClaimUpdate {
  from: string;
  to: string;
  foreground: string;
  background: string;
}

export interface ClaimResult {
  text: string;
  updated: ClaimUpdate[];
  /** Claims left untouched because their color pair was not determinable. */
  stale: string[];
}

/** `4.5:1` stated as the WCAG threshold itself, not as a measurement. */
function isThresholdStatement(context: string): boolean {
  return /wcag|\bAA\b|must (?:pass|meet)|at least|minimum|below|above/i.test(context);
}

const RATIO_RE = /(\d+(?:\.\d+)?)\s*:\s*1/g;
const TOKEN_REF_RE = /\{colors\.([\w-]+)\}/g;

/** Named grounds that appear in prose instead of a token reference. */
const IMPLICIT_GROUNDS: Array<[RegExp, string]> = [
  [/\bpure white\b|\bon white\b/i, "#ffffff"],
  [/\bon black\b/i, "#000000"],
];

/**
 * Recompute every measured ratio in `markdown` against `colors`.
 *
 * Bullets carry their subject as `- **token (`#HEX`)** — …`, and a claim's
 * other side is the nearest color reference before it. Ranges ("5.6:1 to
 * 9.7:1") and claims with no resolvable ground are left alone and reported.
 */
export function recomputeContrastClaims(
  markdown: string,
  colors: Record<string, string>,
): ClaimResult {
  const byToken = new Map<string, string>();
  for (const [token, value] of Object.entries(colors)) {
    const hex = normalizeHex(value);
    if (hex) byToken.set(token, hex);
  }

  const updated: ClaimUpdate[] = [];
  const stale: string[] = [];

  // Process bullet by bullet so a claim resolves against its own subject.
  const blocks = markdown.split(/\n(?=- \*\*)/);
  const rewritten = blocks.map((block) => {
    const subjectHexes = [
      ...block.slice(0, block.indexOf("—") + 1).matchAll(/`(#[0-9a-fA-F]{6})`/g),
    ]
      .map((m) => normalizeHex(m[1] as string))
      .filter((h): h is string => h !== null);

    const ratios = [...block.matchAll(RATIO_RE)];
    if (ratios.length === 0) return block;

    // A range of ratios in one sentence has no single pair to recompute.
    const hasRange = /\d+(?:\.\d+)?\s*:\s*1\s+to\s+\d+(?:\.\d+)?\s*:\s*1/.test(block);

    let result = "";
    let cursor = 0;
    for (const match of ratios) {
      const index = match.index ?? 0;
      const before = block.slice(0, index);
      const after = block.slice(index + match[0].length);
      const context = `${before.slice(-140)} ${after.slice(0, 60)}`;

      result += block.slice(cursor, index);
      cursor = index + match[0].length;

      if (isThresholdStatement(context) || hasRange) {
        if (hasRange) stale.push(match[0]);
        result += match[0];
        continue;
      }

      // The ground: an explicit token after the ratio, else a named color.
      const groundToken = /^\s*(?:on|with|against)\s+`?\{colors\.([\w-]+)\}/.exec(after)?.[1];
      let background = groundToken ? byToken.get(groundToken) : undefined;
      if (!background) {
        for (const [pattern, hex] of IMPLICIT_GROUNDS) {
          if (pattern.test(after.slice(0, 40))) {
            background = hex;
            break;
          }
        }
      }

      // The subject: nearest preceding token reference, else the bullet header.
      const priorRefs = [...before.matchAll(TOKEN_REF_RE)];
      const lastRef = priorRefs[priorRefs.length - 1]?.[1];
      const foreground =
        (lastRef && byToken.get(lastRef) !== background ? byToken.get(lastRef) : undefined) ??
        subjectHexes.find((hex) => hex !== background);

      if (!background || !foreground) {
        stale.push(match[0]);
        result += match[0];
        continue;
      }

      const actual = contrastRatio(foreground, background);
      const rendered = `${actual.toFixed(1)}:1`;
      if (rendered !== match[0].replace(/\s*:\s*/, ":")) {
        updated.push({ from: match[0], to: rendered, foreground, background });
      }
      result += rendered;
    }
    result += block.slice(cursor);
    return result;
  });

  return { text: rewritten.join("\n"), updated, stale };
}
