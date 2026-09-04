import { contrastRatio, deltaE, nearestColor } from "./color";

/**
 * Replace published color values that the source does not actually use with
 * the real value from the source, without breaking accessibility.
 *
 * A naive "snap to nearest source color" is wrong on its own: several entries
 * deliberately darkened a brand color so body text would clear WCAG AA, and
 * snapping back to the brand value would silently reintroduce a contrast
 * failure the linter treats as a publish blocker. So the pass grounds every
 * value in the source first, then repairs any component pair that fell below
 * AA by choosing the closest source color that clears it — the result is both
 * traceable to the source and accessible.
 */

/** Distance at which a published value already counts as the source value. */
export const GROUNDED_DELTA = 2;
const AA_NORMAL = 4.5;

/** A component's text-on-background pairing, by token name. */
export interface ContrastPair {
  component: string;
  textToken: string;
  backgroundToken: string;
}

export interface ColorChange {
  token: string;
  from: string;
  to: string;
  /** How far the published value sat from the nearest source color. */
  deltaE: number;
  /** Set when the source value was re-picked to keep a component pair at AA. */
  contrastRepair?: { component: string; against: string; ratio: number };
}

export interface GroundResult {
  colors: Record<string, string>;
  changes: ColorChange[];
  /** Pairs still below AA after grounding — reported, never silently shipped. */
  unresolved: Array<{ component: string; ratio: number }>;
}

/**
 * Extract `{colors.x}` token references for component pairs that put text on a
 * background, which are exactly the pairs the DESIGN.md linter checks.
 */
export function contrastPairs(
  components: Record<string, Record<string, string | number>>,
): ContrastPair[] {
  const ref = (value: string | number | undefined): string | null => {
    if (typeof value !== "string") return null;
    return /^\{colors\.([\w-]+)\}$/.exec(value.trim())?.[1] ?? null;
  };
  const pairs: ContrastPair[] = [];
  for (const [component, spec] of Object.entries(components)) {
    const textToken = ref(spec["textColor"]);
    const backgroundToken = ref(spec["backgroundColor"]);
    if (textToken && backgroundToken) pairs.push({ component, textToken, backgroundToken });
  }
  return pairs;
}

/**
 * Ground every color in `published` against `sourceColors`, preserving AA on
 * `pairs`. Values already within `GROUNDED_DELTA` of a source color are left
 * untouched so a correction never churns a value that is already right.
 */
export function groundColors(
  published: Record<string, string>,
  sourceColors: Iterable<string>,
  pairs: ContrastPair[] = [],
): GroundResult {
  const palette = [...sourceColors];
  const grounded: Record<string, string> = { ...published };
  const changes = new Map<string, ColorChange>();

  for (const [token, value] of Object.entries(published)) {
    const match = nearestColor(value, palette);
    if (!match || match.distance <= GROUNDED_DELTA) continue;
    grounded[token] = match.hex;
    changes.set(token, {
      token,
      from: value,
      to: match.hex,
      deltaE: Number(match.distance.toFixed(2)),
    });
  }

  // Repair contrast regressions the grounding pass introduced.
  const unresolved: Array<{ component: string; ratio: number }> = [];
  for (const pair of pairs) {
    const background = grounded[pair.backgroundToken];
    const text = grounded[pair.textToken];
    if (!background || !text) continue;
    if (contrastRatio(text, background) >= AA_NORMAL) continue;

    // Prefer the source color closest to what was published, among those that
    // clear AA against this background — keeps the author's intent visible.
    const original = published[pair.textToken] ?? text;
    const viable = palette
      .filter((candidate) => contrastRatio(candidate, background) >= AA_NORMAL)
      .map((candidate) => ({ candidate, distance: deltaE(original, candidate) }))
      .sort((a, b) => a.distance - b.distance);

    const best = viable[0];
    if (!best) {
      unresolved.push({
        component: pair.component,
        ratio: Number(contrastRatio(text, background).toFixed(2)),
      });
      continue;
    }
    grounded[pair.textToken] = best.candidate;
    changes.set(pair.textToken, {
      token: pair.textToken,
      from: original,
      to: best.candidate,
      deltaE: Number(best.distance.toFixed(2)),
      contrastRepair: {
        component: pair.component,
        against: background,
        ratio: Number(contrastRatio(best.candidate, background).toFixed(2)),
      },
    });
  }

  return {
    colors: grounded,
    changes: [...changes.values()].filter((c) => c.from.toLowerCase() !== c.to.toLowerCase()),
    unresolved,
  };
}

/**
 * Build the old→new hex substitution applied across an entry's files. A value
 * shared by several tokens must resolve to a single replacement or the
 * rewrite would corrupt the tokens it was not meant to touch, so ambiguous
 * values are dropped and reported to the caller instead.
 */
export function substitutionMap(
  changes: ColorChange[],
  published: Record<string, string> = {},
): {
  map: Map<string, string>;
  ambiguous: string[];
} {
  const changeByToken = new Map(changes.map((change) => [change.token, change]));
  const byValue = new Map<string, Set<string>>();
  for (const change of changes) {
    const from = change.from.toLowerCase();
    const set = byValue.get(from) ?? new Set<string>();
    set.add(change.to.toLowerCase());
    byValue.set(from, set);
  }

  // A value may also belong to a token that did not change. A global rewrite
  // would then corrupt that unchanged token (for example, changing
  // `on-action: #fff` must not also darken `surface: #fff`). Add every token's
  // intended result so shared values become ambiguous and stay out of the
  // global substitution pass.
  for (const [token, value] of Object.entries(published)) {
    const from = value.toLowerCase();
    const targets = byValue.get(from);
    if (!targets) continue;
    targets.add((changeByToken.get(token)?.to ?? value).toLowerCase());
  }

  const map = new Map<string, string>();
  const ambiguous: string[] = [];
  for (const [from, targets] of byValue) {
    if (targets.size === 1) map.set(from, [...targets][0] as string);
    else ambiguous.push(from);
  }
  return { map, ambiguous };
}

/**
 * Rewrite color declarations by token name inside YAML front matter. This is
 * the safe path for shared values that cannot be substituted globally.
 */
export function applyColorTokenChanges(markdown: string, changes: ColorChange[]): string {
  if (changes.length === 0) return markdown;
  const replacements = new Map(changes.map((change) => [change.token, change.to]));
  const lines = markdown.split("\n");
  let inFrontMatter = lines[0]?.trim() === "---";
  let inColors = false;

  return lines
    .map((line, index) => {
      if (index === 0) return line;
      if (inFrontMatter && line.trim() === "---") {
        inFrontMatter = false;
        inColors = false;
        return line;
      }
      if (!inFrontMatter) return line;
      if (line === "colors:") {
        inColors = true;
        return line;
      }
      if (inColors && !/^ {2}\S/.test(line)) inColors = false;
      if (!inColors) return line;

      const token = /^ {2}([A-Za-z0-9_-]+)\s*:/.exec(line)?.[1];
      const replacement = token ? replacements.get(token) : undefined;
      if (!replacement) return line;
      return line.replace(/#[0-9a-fA-F]{6}\b/, (match) => {
        const wasUpper = match.slice(1) === match.slice(1).toUpperCase();
        return wasUpper ? replacement.toUpperCase() : replacement.toLowerCase();
      });
    })
    .join("\n");
}

/**
 * Apply the substitution to any text that embeds hex values (front matter,
 * prose, QA tables). Matching and replacing in one pass avoids the chained
 * rewrite a sequence of string replacements would produce when one color's new
 * value is another color's old value. Original letter case is preserved.
 */
export function applySubstitution(text: string, map: Map<string, string>): string {
  if (map.size === 0) return text;
  return text.replace(/#[0-9a-fA-F]{6}\b/g, (match) => {
    const replacement = map.get(match.toLowerCase());
    if (!replacement) return match;
    const wasUpper = match.slice(1) === match.slice(1).toUpperCase();
    return wasUpper ? replacement.toUpperCase() : replacement;
  });
}
