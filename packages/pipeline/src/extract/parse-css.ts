import type { RawTokenMap } from "../model/tokens";

// Match `--token-name: value;` (or `... }`) declarations. Values can't span
// braces, so this never crosses rule boundaries. No code is executed.
const CSS_VAR_RE = /--([a-z0-9-]+)\s*:\s*([^;{}]+?)\s*(?:;|})/gi;

/**
 * Parse CSS custom properties into a flat token map. Keeps the FIRST occurrence
 * of each variable — for design-system stylesheets the default (e.g. light/white)
 * theme is declared first in `:root`, so first-wins grounds that theme. Safe:
 * a pure regex parse, never evaluates the stylesheet.
 */
export function parseCssVars(css: string, prefix = ""): RawTokenMap {
  const out: RawTokenMap = {};
  let match: RegExpExecArray | null;
  CSS_VAR_RE.lastIndex = 0;
  while ((match = CSS_VAR_RE.exec(css)) !== null) {
    const name = match[1];
    const value = match[2]?.trim();
    if (name === undefined || value === undefined) continue;
    const key = prefix ? `${prefix}.--${name}` : `--${name}`;
    if (!(key in out)) out[key] = value;
  }
  return out;
}
