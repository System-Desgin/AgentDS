import type { ExtractResult, RawTokenMap } from "../model/tokens";
import {
  colorMixTransparent,
  compositeOver,
  hslToHex,
  normalizeHex,
  oklabToHexValue,
  oklchToHex,
  rgbToHex,
} from "../lib/color";

/**
 * Brand Look capture: harvest a public site's declared design tokens from its
 * own CSS (docs/04-DATA-SOURCES.md §5, step 2). Modern product sites publish a
 * `--color-*` / `--radius-*` custom-property layer in their stylesheets, which
 * is the closest thing to a ground truth we can cite without a headless
 * browser. Everything fetched is public CSS text; no assets, no fonts, no
 * logos are downloaded, and nothing is copied into published prose.
 *
 * This replaces the "hand-author it" placeholder that made css-analysis the
 * only unverifiable path in the pipeline.
 */

/** Caps so a capture can never turn into an unbounded crawl of a site. */
const MAX_STYLESHEETS_PER_PAGE = 40;
const MAX_CSS_BYTES = 4 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 20_000;
const USER_AGENT = "AgentDS-pipeline/0.1 (+https://agent-ds.oday-bakkour.com; catalog capture)";

export interface SiteCapture extends ExtractResult {
  /** Every distinct `#rrggbb` a custom property resolves to. */
  colors: string[];
  /** Raw `font-family` declaration values, deduped. */
  fontStacks: string[];
  /** Distinct border-radius lengths, normalized to px. */
  radii: number[];
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": USER_AGENT, accept: "text/html,text/css,*/*" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.length > MAX_CSS_BYTES ? text.slice(0, MAX_CSS_BYTES) : text;
  } catch {
    return null;
  }
}

/** Stylesheet URLs referenced by a page, resolved against the page URL. */
export function stylesheetUrls(html: string, pageUrl: string): string[] {
  const urls = new Set<string>();
  const linkTag = /<link\b[^>]*>/gi;
  for (const [tag] of html.matchAll(linkTag)) {
    if (!/\brel\s*=\s*["']?[^"'>]*stylesheet/i.test(tag)) continue;
    const href = /\bhref\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (!href) continue;
    try {
      urls.add(new URL(href, pageUrl).toString());
    } catch {
      /* skip unresolvable hrefs */
    }
  }
  return [...urls].slice(0, MAX_STYLESHEETS_PER_PAGE);
}

/** Contents of every inline `<style>` block on a page. */
export function inlineStyles(html: string): string[] {
  return [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1] ?? "");
}

function tagEnd(html: string, tagStart: number): number {
  let quote: '"' | "'" | null = null;
  for (let index = tagStart + 1; index < html.length; index += 1) {
    const char = html[index];
    if (quote !== null) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === ">") {
      return index;
    }
  }
  return -1;
}

function tagIdentity(tag: string): { closing: boolean; name: string } {
  let cursor = 1;
  const closing = tag[cursor] === "/";
  if (closing) cursor += 1;
  while (cursor < tag.length && /\s/.test(tag[cursor] as string)) cursor += 1;
  const start = cursor;
  while (cursor < tag.length) {
    const char = tag[cursor] as string;
    const code = char.charCodeAt(0);
    const isNameChar =
      (code >= 48 && code <= 57) ||
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      char === "-";
    if (!isNameChar) break;
    cursor += 1;
  }
  return { closing, name: tag.slice(start, cursor).toLowerCase() };
}

function isHtmlWhitespace(char: string | undefined): boolean {
  return char === " " || char === "\t" || char === "\n" || char === "\r" || char === "\f";
}

/** Tags outside script bodies, parsed without treating remote HTML as markup. */
function presentationTags(html: string): string[] {
  const tags: string[] = [];
  const lower = html.toLowerCase();
  let cursor = 0;

  while (cursor < html.length) {
    const start = html.indexOf("<", cursor);
    if (start === -1) break;

    if (html.startsWith("<!--", start)) {
      const commentEnd = html.indexOf("-->", start + 4);
      if (commentEnd === -1) break;
      cursor = commentEnd + 3;
      continue;
    }

    const end = tagEnd(html, start);
    if (end === -1) break;
    const tag = html.slice(start, end + 1);
    const identity = tagIdentity(tag);

    if (!identity.closing && identity.name === "script") {
      let searchFrom = end + 1;
      let closingStart = -1;
      while (searchFrom < html.length) {
        const candidate = lower.indexOf("</script", searchFrom);
        if (candidate === -1) break;
        const boundary = lower[candidate + 8];
        if (boundary === ">" || isHtmlWhitespace(boundary)) {
          closingStart = candidate;
          break;
        }
        searchFrom = candidate + 8;
      }
      if (closingStart === -1) break;
      const closingEnd = tagEnd(html, closingStart);
      if (closingEnd === -1) break;
      cursor = closingEnd + 1;
      continue;
    }

    tags.push(tag);
    cursor = end + 1;
  }

  return tags;
}

/**
 * CSS declarations and literal colors attached directly to public markup.
 *
 * Some sites render their palette through server-side SVG icons instead of a
 * stylesheet. Those `fill`, `stroke`, and gradient-stop attributes are just as
 * observable as a CSS declaration. Script bodies are removed first so colors
 * in serialized CMS data or JavaScript source never enter the evidence set.
 */
export function inlinePresentationValues(html: string): string[] {
  const values: string[] = [];
  const vectorTags = new Set([
    "svg",
    "g",
    "path",
    "rect",
    "circle",
    "ellipse",
    "line",
    "polyline",
    "polygon",
    "stop",
    "text",
    "use",
  ]);

  for (const tag of presentationTags(html)) {
    for (const match of tag.matchAll(/\bstyle\s*=\s*(["'])(.*?)\1/gi)) {
      if (match[2]) values.push(match[2]);
    }
    const identity = tagIdentity(tag);
    if (identity.closing || !vectorTags.has(identity.name)) continue;
    for (const match of tag.matchAll(/\b(?:fill|stroke|stop-color)\s*=\s*(["'])(.*?)\1/gi)) {
      if (match[2]) values.push(match[2]);
    }
  }

  return values;
}

/**
 * Custom-property declarations (`--name: value`) in source order. Values keep
 * their raw text so `var()` chains can be resolved afterwards.
 */
export function customProperties(css: string): Map<string, string[]> {
  const props = new Map<string, string[]>();
  const decl = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)/g;
  for (const match of css.matchAll(decl)) {
    const name = (match[1] as string).trim();
    const value = (match[2] as string).trim();
    if (!value) continue;
    const bucket = props.get(name);
    if (bucket) {
      if (!bucket.includes(value)) bucket.push(value);
    } else {
      props.set(name, [value]);
    }
  }
  return props;
}

/**
 * Resolve `var(--a, fallback)` references to a literal, following chains up to
 * a small depth. Sites theme the same variable per mode, so a name may hold
 * several values; the first declaration wins and the rest stay reachable via
 * the map for reporting.
 */
export function resolveValue(value: string, props: Map<string, string[]>, depth = 0): string {
  if (depth > 6) return value;
  const varRef = /var\(\s*(--[A-Za-z0-9_-]+)\s*(?:,\s*([^)]*))?\)/;
  const match = varRef.exec(value);
  if (!match) return value.trim();
  const referenced = props.get(match[1] as string)?.[0];
  const fallback = match[2]?.trim();
  const replacement = referenced ?? fallback ?? "";
  return resolveValue(value.replace(varRef, replacement), props, depth + 1);
}

const NAMED_COLORS: Record<string, string> = {
  white: "#ffffff",
  black: "#000000",
  transparent: "",
};

/**
 * Any literal color a value resolves to, as `#rrggbb`. Covers every notation
 * production sites actually ship: hex, `rgb()`, `hsl()`, and the OKLab family
 * that Tailwind v4 and newer design systems emit.
 */
export function colorOf(value: string): string | null {
  const trimmed = value.trim();
  const named = NAMED_COLORS[trimmed.toLowerCase()];
  if (named !== undefined) return named || null;
  const hex = /#[0-9a-fA-F]{3,8}\b/.exec(trimmed);
  if (hex) return normalizeHex(hex[0]);
  if (/^rgba?\(/i.test(trimmed)) return rgbToHex(trimmed);
  if (/^hsla?\(/i.test(trimmed)) return hslToHex(trimmed);
  if (/^oklch\(/i.test(trimmed)) return oklchToHex(trimmed);
  if (/^oklab\(/i.test(trimmed)) return oklabToHexValue(trimmed);
  return null;
}

/** Length in px, for `12px` / `0.75rem` / `0`. Root font size assumed 16px. */
export function lengthToPx(value: string): number | null {
  const m = /^(-?[\d.]+)(px|rem|em)?$/.exec(value.trim());
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  const unit = m[2] ?? "px";
  if (unit === "px") return n;
  return n * 16;
}

/** `font-family` declaration values found in a stylesheet. */
export function fontFamilies(css: string): string[] {
  const out = new Set<string>();
  for (const match of css.matchAll(/font-family\s*:\s*([^;{}]+)/gi)) {
    const value = (match[1] as string).trim();
    if (value && !value.startsWith("var(") && value !== "inherit") out.add(value);
  }
  return [...out];
}

/** `border-radius` lengths found in a stylesheet, in px. */
function borderRadii(css: string): number[] {
  const out = new Set<number>();
  for (const match of css.matchAll(/border-radius\s*:\s*([^;{}]+)/gi)) {
    for (const part of (match[1] as string).trim().split(/\s+/)) {
      const px = lengthToPx(part);
      // Pill radii (9999px and friends) carry no scale information.
      if (px !== null && px > 0 && px <= 64) out.add(px);
    }
  }
  return [...out].sort((a, b) => a - b);
}

/**
 * Capture the declared token layer of one or more public pages.
 * Returns a flat `RawTokenMap` (custom property → resolved literal) plus the
 * distinct colors / font stacks / radii used for verification.
 */
export async function captureSiteCss(urls: string[], extractedAt: string): Promise<SiteCapture> {
  const sources: string[] = [];
  const sheets: string[] = [];

  for (const pageUrl of urls) {
    const html = await fetchText(pageUrl);
    if (html === null) continue;
    sources.push(pageUrl);
    sheets.push(...inlineStyles(html), ...inlinePresentationValues(html));
    for (const href of stylesheetUrls(html, pageUrl)) {
      if (sources.includes(href)) continue;
      const css = await fetchText(href);
      if (css === null) continue;
      sources.push(href);
      sheets.push(css);
    }
  }

  const combined = sheets.join("\n");
  const props = customProperties(combined);

  /**
   * A translucent token renders as different colors on light and dark ground,
   * and a site theme built from them (Figma's is entirely `color-mix` with
   * `transparent`) has no literal palette at all. Record both composites so the
   * effective colors a visitor actually sees are part of the ground truth.
   */
  const addColor = (raw: string, colors: Set<string>): void => {
    const hex = colorOf(raw);
    if (hex) {
      colors.add(hex);
      return;
    }
    const mix = colorMixTransparent(raw);
    if (!mix) return;
    for (const ground of ["#ffffff", "#000000"]) {
      const composited = compositeOver(mix.hex, mix.alpha, ground);
      if (composited) colors.add(composited);
    }
  };

  const rawTokens: RawTokenMap = {};
  const colors = new Set<string>();
  for (const [name, values] of props) {
    const resolved = resolveValue(values[0] as string, props);
    if (!resolved) continue;
    rawTokens[name] = resolved;
    for (const value of values) {
      addColor(resolveValue(value, props), colors);
    }
  }

  // Literal colors declared outside the custom-property layer still count as
  // observed: older or partially-tokenized sites hard-code them in rules.
  const LITERALS =
    /#[0-9a-fA-F]{6}\b|(?:rgba?|hsla?|oklch|oklab)\([^)]*\)|color-mix\((?:[^()]|\([^()]*\))*\)/gi;
  for (const match of combined.matchAll(LITERALS)) {
    addColor(match[0], colors);
  }

  const radii = new Set<number>(borderRadii(combined));
  for (const value of Object.values(rawTokens)) {
    if (typeof value !== "string") continue;
    const px = lengthToPx(value);
    if (px !== null && px > 0 && px <= 64) radii.add(px);
  }

  return {
    rawTokens,
    files: sources,
    extractedAt,
    colors: [...colors].sort(),
    fontStacks: fontFamilies(combined),
    radii: [...radii].sort((a, b) => a - b),
  };
}
