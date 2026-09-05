import type { RawTokenMap } from "../model/tokens";

function isNameCharacter(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122) ||
    char === "-"
  );
}

function isCssWhitespace(char: string): boolean {
  return char === " " || char === "\t" || char === "\n" || char === "\r" || char === "\f";
}

/**
 * Parse CSS custom properties into a flat token map. Keeps the FIRST occurrence
 * of each variable — for design-system stylesheets the default (e.g. light/white)
 * theme is declared first in `:root`, so first-wins grounds that theme. Safe:
 * a linear text parse, never evaluates the stylesheet. Avoiding a backtracking
 * expression keeps runtime bounded even when a remote stylesheet is hostile.
 */
export function parseCssVars(css: string, prefix = ""): RawTokenMap {
  const out: RawTokenMap = {};
  let cursor = 0;

  while (cursor < css.length) {
    const declarationStart = css.indexOf("--", cursor);
    if (declarationStart === -1) break;

    const nameStart = declarationStart + 2;
    let nameEnd = nameStart;
    while (nameEnd < css.length && isNameCharacter(css[nameEnd] as string)) nameEnd += 1;
    if (nameEnd === nameStart) {
      cursor = nameStart;
      continue;
    }

    cursor = nameEnd;
    while (cursor < css.length && isCssWhitespace(css[cursor] as string)) cursor += 1;
    if (css[cursor] !== ":") continue;

    cursor += 1;
    while (cursor < css.length && isCssWhitespace(css[cursor] as string)) cursor += 1;
    const valueStart = cursor;
    while (cursor < css.length && css[cursor] !== ";" && css[cursor] !== "}") cursor += 1;
    if (cursor === css.length || cursor === valueStart) continue;

    const name = css.slice(nameStart, nameEnd);
    const value = css.slice(valueStart, cursor).trim();
    const key = prefix ? `${prefix}.--${name}` : `--${name}`;
    if (!(key in out)) out[key] = value;

    cursor += 1;
  }
  return out;
}
