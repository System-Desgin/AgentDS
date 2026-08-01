import type { RawTokenMap } from "../model/tokens";
import { tripletToHex } from "../lib/color";
import { colorOf } from "./site-css";

/**
 * Harvest color tokens from a package's own source text.
 *
 * Design systems publish their palette in whatever format suits their build:
 * DTCG JSON, CSS custom properties, or a plain ES module of objects (Fluent,
 * Backstage, Base Web all do the last one). The JSON-only adapter silently
 * recovered nothing from those, which read downstream as "unverifiable" rather
 * than "we didn't look". This sweeps CSS and JS/TS alike for named color
 * values. It is a regex scan — package code is never evaluated.
 */

/** `key: "#hex"` / `'key': 'rgb(...)'` — the shape token modules compile to. */
const NAMED_COLOR_RE =
  /["']?([A-Za-z_$][\w$-]*|\d+)["']?\s*:\s*["'](#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|oklch|oklab)\([^)'"]*\))["']/g;

/** Assignments like `export const brandBlue = '#0f6cbd'`. */
const CONST_COLOR_RE =
  /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*["'](#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|oklch|oklab)\([^)'"]*\))["']/g;

/**
 * Preprocessor variable declarations — `$blue-5: #3491fa` (Sass) and
 * `@blue-5: #3491fa` (Less). Several systems publish their palette only as
 * stylesheet sources; Semi ships nothing but `.scss`.
 */
const PREPROCESSOR_COLOR_RE =
  /(?:[$@]|--)([A-Za-z_][\w-]*)\s*:\s*(#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|oklch|oklab)\([^)]*\)|\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3})\s*(?:;|$)/gm;

/**
 * Sass map entries whose color sits inside a call — Material's token files are
 * all `'error40': if($exclude-hardcoded-values, null, #b3261e)`, so the value
 * never appears adjacent to the key.
 */
const SASS_MAP_COLOR_RE = /["']([\w-]+)["']\s*:\s*[^;{}\n]{0,80}?(#[0-9a-fA-F]{3,8})\b/g;

/** Any color literal, for sources that expose no usable key. */
const BARE_COLOR_RE = /(#[0-9a-fA-F]{6}\b|(?:rgba?|hsla?|oklch|oklab)\([^)'"]{0,80}\))/g;

const sanitize = (name: string): string =>
  name.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");

/**
 * Extract named colors from source text. Named matches win; bare literals fill
 * in only when a file yields no named ones, so a stylesheet of hard-coded
 * values still contributes its palette without swamping real token names.
 */
export function sweepColors(source: string, namespace: string): RawTokenMap {
  const out: RawTokenMap = {};
  const put = (key: string, value: string): void => {
    const hex = colorOf(value) ?? tripletToHex(value);
    if (!hex) return;
    const base = namespace ? `${namespace}.${key}` : key;
    // Token modules nest families that reuse leaf names (`blue.dark`,
    // `green.dark`), so a plain first-wins map would keep one color per leaf
    // name and silently discard the rest of the palette. Distinct values get
    // their own suffixed key; a repeat of the same value is a genuine no-op.
    if (!(base in out)) {
      out[base] = hex;
      return;
    }
    if (out[base] === hex) return;
    for (let n = 2; n < 500; n += 1) {
      const candidate = `${base}_${n}`;
      if (!(candidate in out)) {
        out[candidate] = hex;
        return;
      }
      if (out[candidate] === hex) return;
    }
  };

  for (const re of [NAMED_COLOR_RE, CONST_COLOR_RE, PREPROCESSOR_COLOR_RE, SASS_MAP_COLOR_RE]) {
    for (const [, name, value] of source.matchAll(re)) {
      if (name && value) put(sanitize(name), value);
    }
  }

  if (Object.keys(out).length === 0) {
    let index = 0;
    for (const [literal] of source.matchAll(BARE_COLOR_RE)) {
      put(`literal_${index}`, literal);
      index += 1;
      if (index > 600) break;
    }
  }

  return out;
}

/** A candidate file from a package listing. */
export interface FileEntry {
  path: string;
  size: number;
}

/**
 * Score a candidate on its file name and directory. Scoring the basename
 * separately matters: in a package like `@material/web` almost every path
 * contains "tokens", so a whole-path match carries no signal and the real
 * `_md-ref-palette.scss` ranks level with every component stub.
 */
export function scoreTokenFile(path: string): number {
  const lower = path.toLowerCase();
  const base = lower.split("/").pop() ?? lower;
  let value = 0;

  if (/palette|colou?r|scheme|primitive/.test(base)) value += 14;
  if (/token|theme|variable|foundation/.test(base)) value += 8;
  if (/global|base|core|default|root|ref/.test(base)) value += 4;
  if (/\/tokens?\//.test(lower)) value += 6;
  if (/\/(dist|lib|es|esm|build|src)\//.test(lower)) value += 2;

  if (/\.min\.|\.map$/.test(lower)) value -= 8;
  if (/test|spec|example|demo|story|stories|locale|icon/.test(lower)) value -= 20;
  // Per-component files are the trap: `.../ColorPicker/style/index.css` scores
  // high on "color" while holding none of the system's palette, `_md-comp-*`
  // only re-references other tokens, and `.../internal/forced-colors-styles.css`
  // is an accessibility override. All outrank the real bundle unless demoted.
  if (/\/(style|styles|internal|components?)\//.test(lower)) value -= 14;
  if (/-comp-|forced-colors|high-contrast|print/.test(lower)) value -= 14;
  return value;
}

/**
 * Rank candidates most-token-dense first. Size breaks ties because packages
 * routinely ship a short re-export stub next to the file that holds the actual
 * values (`tokens/_md-ref-palette.scss` forwards to the versioned one), and the
 * stub wins any name-based comparison.
 */
export function rankTokenFiles(files: Array<FileEntry | string>): string[] {
  const entries: FileEntry[] = files.map((f) => (typeof f === "string" ? { path: f, size: 0 } : f));
  return entries
    .sort(
      (a, b) =>
        scoreTokenFile(b.path) - scoreTokenFile(a.path) ||
        b.size - a.size ||
        a.path.length - b.path.length,
    )
    .map((e) => e.path);
}
