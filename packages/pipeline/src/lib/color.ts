/**
 * Perceptual color comparison for content verification.
 *
 * `verify` asks "is the hex in this DESIGN.md actually a color the source
 * uses?" — a question raw hex equality answers badly (#767572 vs #78736F look
 * identical but differ in every channel). CIEDE2000 gives a defensible
 * threshold instead of eyeballing, so QA sign-off can cite a number.
 */

/** Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` into 0-255 RGB. Alpha is dropped. */
export function parseHex(input: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{3,8})$/i.exec(input.trim());
  if (!m) return null;
  let hex = m[1] as string;
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .slice(0, 3)
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (hex.length === 8) hex = hex.slice(0, 6);
  if (hex.length !== 6) return null;
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

/** Normalize any parseable color string to lowercase `#rrggbb`, or null. */
export function normalizeHex(input: string): string | null {
  const rgb = parseHex(input);
  if (!rgb) return null;
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

const clamp255 = (n: number): number => Math.max(0, Math.min(255, Math.round(n)));

const toHex = (rgb: [number, number, number]): string =>
  `#${rgb.map((c) => clamp255(c).toString(16).padStart(2, "0")).join("")}`;

/** Numeric arguments of a CSS color function, ignoring any `/ alpha` part. */
function colorFunctionArgs(value: string, name: string): number[] | null {
  const pattern = new RegExp(`^${name}a?\\(([^)]*)\\)`, "i");
  const body = pattern.exec(value.trim())?.[1];
  if (body === undefined) return null;
  const args = body
    .split("/")[0]
    ?.trim()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (!args?.length) return null;
  return args.map((arg) => {
    const n = Number.parseFloat(arg);
    return Number.isFinite(n) ? n : Number.NaN;
  });
}

const isPercent = (value: string, index: number): boolean =>
  (
    value
      .split("/")[0]
      ?.trim()
      .split(/[\s,]+/)
      .filter(Boolean)[index] ?? ""
  ).includes("%");

/** `hsl(h s% l%)` / `hsl(h, s%, l%)` → `#rrggbb`. */
export function hslToHex(value: string): string | null {
  const args = colorFunctionArgs(value, "hsl");
  if (!args || args.length < 3 || args.slice(0, 3).some(Number.isNaN)) return null;
  const [h, s, l] = args as [number, number, number];
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = light - c / 2;
  const table: Array<[number, number, number]> = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  const [r, g, b] = table[Math.floor(hp) % 6] as [number, number, number];
  return toHex([(r + m) * 255, (g + m) * 255, (b + m) * 255]);
}

function linearToSrgb(channel: number): number {
  const c = channel <= 0.0031308 ? channel * 12.92 : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
  return c * 255;
}

/** OKLab → sRGB, per Björn Ottosson's reference matrices. */
function oklabToHex(lightness: number, a: number, b: number): string {
  const l = Math.pow(lightness + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(lightness - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(lightness - 0.0894841775 * a - 1.291485548 * b, 3);
  return toHex([
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ]);
}

/**
 * `oklch(L C H)` → `#rrggbb`. Tailwind v4 emits its entire default palette in
 * oklch, so a capture that cannot read it misses most of a modern site.
 */
export function oklchToHex(value: string): string | null {
  const args = colorFunctionArgs(value, "oklch");
  if (!args || args.length < 3 || args.slice(0, 3).some(Number.isNaN)) return null;
  const body = /^oklch\(([^)]*)\)/i.exec(value.trim())?.[1] ?? "";
  const [rawL, c, h] = args as [number, number, number];
  const lightness = isPercent(body, 0) ? rawL / 100 : rawL;
  const hueRad = (h * Math.PI) / 180;
  return oklabToHex(lightness, c * Math.cos(hueRad), c * Math.sin(hueRad));
}

/** `oklab(L a b)` → `#rrggbb`. */
export function oklabToHexValue(value: string): string | null {
  const args = colorFunctionArgs(value, "oklab");
  if (!args || args.length < 3 || args.slice(0, 3).some(Number.isNaN)) return null;
  const body = /^oklab\(([^)]*)\)/i.exec(value.trim())?.[1] ?? "";
  const [rawL, a, b] = args as [number, number, number];
  return oklabToHex(isPercent(body, 0) ? rawL / 100 : rawL, a, b);
}

/** `rgb(r g b)` / `rgb(r, g, b)` → `#rrggbb`. Percentage channels supported. */
export function rgbToHex(value: string): string | null {
  const args = colorFunctionArgs(value, "rgb");
  if (!args || args.length < 3 || args.slice(0, 3).some(Number.isNaN)) return null;
  const body = /^rgba?\(([^)]*)\)/i.exec(value.trim())?.[1] ?? "";
  const channels = args.slice(0, 3).map((n, i) => (isPercent(body, i) ? (n / 100) * 255 : n));
  return toHex(channels as [number, number, number]);
}

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** CIE L*a*b* (D65, 2° observer). */
export function hexToLab(hex: string): [number, number, number] | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear) as [number, number, number];

  // sRGB -> XYZ (D65), then normalized by the D65 white point.
  const x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  const y = (r * 0.2126729 + g * 0.7151522 + b * 0.072175) / 1.0;
  const z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883;

  const f = (t: number): number => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const [fx, fy, fz] = [f(x), f(y), f(z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

const deg = (rad: number): number => (rad * 180) / Math.PI;
const rad = (d: number): number => (d * Math.PI) / 180;

export type Lab = [number, number, number];

/**
 * CIEDE2000 difference between two L*a*b* colors, per Sharma, Wu & Dalal
 * (2005). Exported so the implementation can be checked against the published
 * reference pairs rather than only against our own colors.
 */
export function deltaELab(labA: Lab, labB: Lab): number {
  const [l1, a1, b1] = labA;
  const [l2, a2, b2] = labB;

  const avgL = (l1 + l2) / 2;
  const c1 = Math.hypot(a1, b1);
  const c2 = Math.hypot(a2, b2);
  const avgC = (c1 + c2) / 2;

  const g = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
  const a1p = a1 * (1 + g);
  const a2p = a2 * (1 + g);
  const c1p = Math.hypot(a1p, b1);
  const c2p = Math.hypot(a2p, b2);
  const avgCp = (c1p + c2p) / 2;

  const hp = (ap: number, bp: number): number => {
    if (ap === 0 && bp === 0) return 0;
    const h = deg(Math.atan2(bp, ap));
    return h >= 0 ? h : h + 360;
  };
  const h1p = hp(a1p, b1);
  const h2p = hp(a2p, b2);

  const cProduct = c1p * c2p;
  let avgHp: number;
  if (cProduct === 0) {
    avgHp = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    avgHp = (h1p + h2p) / 2;
  } else {
    avgHp = (h1p + h2p + (h1p + h2p < 360 ? 360 : -360)) / 2;
  }

  const t =
    1 -
    0.17 * Math.cos(rad(avgHp - 30)) +
    0.24 * Math.cos(rad(2 * avgHp)) +
    0.32 * Math.cos(rad(3 * avgHp + 6)) -
    0.2 * Math.cos(rad(4 * avgHp - 63));

  let deltaHp: number;
  if (cProduct === 0) {
    deltaHp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    deltaHp = h2p - h1p;
  } else {
    deltaHp = h2p - h1p + (h2p <= h1p ? 360 : -360);
  }

  const deltaLp = l2 - l1;
  const deltaCp = c2p - c1p;
  const deltaHBar = 2 * Math.sqrt(cProduct) * Math.sin(rad(deltaHp) / 2);

  const sl = 1 + (0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;

  const deltaTheta = 30 * Math.exp(-Math.pow((avgHp - 275) / 25, 2));
  const rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const rt = -rc * Math.sin(rad(2 * deltaTheta));

  return Math.sqrt(
    Math.pow(deltaLp / sl, 2) +
      Math.pow(deltaCp / sc, 2) +
      Math.pow(deltaHBar / sh, 2) +
      rt * (deltaCp / sc) * (deltaHBar / sh),
  );
}

/**
 * CIEDE2000 difference between two hex colors. Returns Infinity when either
 * side is unparseable so callers treat it as "no match" rather than "perfect".
 *
 * Bands used by `verify`: 0 exact, ≤2 the same color at rounding precision,
 * ≤5 the right family at the wrong step, >5 a color the source does not use.
 */
export function deltaE(hexA: string, hexB: string): number {
  const labA = hexToLab(hexA);
  const labB = hexToLab(hexB);
  if (!labA || !labB) return Number.POSITIVE_INFINITY;
  return deltaELab(labA, labB);
}

/**
 * A bare `r,g,b` / `r g b` channel triplet — the form systems use when a token
 * is meant to be composed as `rgb(var(--token) / <alpha>)`. Arco and Tailwind
 * both publish their palette this way, so a hex-only scan sees no color at all.
 * Only whole values are accepted, so numeric lists like spacing scales that
 * happen to have three entries are not mistaken for colors.
 */
export function tripletToHex(value: string): string | null {
  const parts = value.trim().split(/\s*,\s*|\s+/);
  if (parts.length !== 3) return null;
  const channels = parts.map((p) => Number(p));
  if (channels.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return toHex(channels as [number, number, number]);
}

/** Alpha-composite `hex` at `alpha` over an opaque background. */
export function compositeOver(hex: string, alpha: number, background: string): string | null {
  const fg = parseHex(hex);
  const bg = parseHex(background);
  if (!fg || !bg) return null;
  const a = Math.max(0, Math.min(1, alpha));
  return toHex([
    fg[0] * a + bg[0] * (1 - a),
    fg[1] * a + bg[1] * (1 - a),
    fg[2] * a + bg[2] * (1 - a),
  ]);
}

/**
 * `color-mix(in oklch, #000000, transparent 46%)` → the base color and the
 * alpha it ends up at. Figma's entire site theme is expressed this way, so a
 * capture that cannot read it concludes the site has no palette at all.
 * Mixes between two real colors are not handled — only the transparent form,
 * which is the one used as an alpha shorthand.
 */
export function colorMixTransparent(value: string): { hex: string; alpha: number } | null {
  const body = /^color-mix\(\s*in\s+[\w-]+\s*,(.*)\)\s*$/is.exec(value.trim())?.[1];
  if (body === undefined) return null;

  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of body) {
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);
  if (parts.length !== 2) return null;

  const sides = parts.map((p) => {
    const trimmed = p.trim();
    const pct = /(-?[\d.]+)%\s*$/.exec(trimmed);
    const colorText = pct ? trimmed.slice(0, pct.index).trim() : trimmed;
    return { colorText, percent: pct ? Number(pct[1]) : null };
  });

  const transparentIndex = sides.findIndex((s) => /^transparent$/i.test(s.colorText));
  if (transparentIndex === -1) return null;
  const colorSide = sides[1 - transparentIndex];
  const transparentSide = sides[transparentIndex];
  if (!colorSide || !transparentSide) return null;

  const hex = anyColorToHex(colorSide.colorText);
  if (!hex) return null;

  // Percentages may be stated on either side; a missing one is the remainder.
  const transparentShare =
    transparentSide.percent ?? (colorSide.percent === null ? 50 : 100 - colorSide.percent);
  return { hex, alpha: Math.max(0, Math.min(1, 1 - transparentShare / 100)) };
}

/** Every color notation, as one regex, for scanning inside token values. */
const ANY_COLOR_RE = /#[0-9a-fA-F]{3,8}\b|(?:rgba?|hsla?|oklch|oklab)\([^)]*\)/g;

/** Parse any single CSS color notation to `#rrggbb`. */
export function anyColorToHex(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) return normalizeHex(trimmed);
  if (/^rgba?\(/i.test(trimmed)) return rgbToHex(trimmed);
  if (/^hsla?\(/i.test(trimmed)) return hslToHex(trimmed);
  if (/^oklch\(/i.test(trimmed)) return oklchToHex(trimmed);
  if (/^oklab\(/i.test(trimmed)) return oklabToHexValue(trimmed);
  return null;
}

/**
 * Every distinct color appearing in a collection of token values. Used to judge
 * whether an extraction actually recovered a palette — a handful of colors
 * means the adapter missed the real token files, not that the source has a tiny
 * palette. Covers every notation design systems publish in, because a scan that
 * only understands hex reports rich sources (Spectrum, Arco) as empty.
 */
export function collectHexes(values: Iterable<unknown>): Set<string> {
  const colors = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string") continue;
    for (const match of value.matchAll(ANY_COLOR_RE)) {
      const hex = anyColorToHex(match[0]);
      if (hex) colors.add(hex);
    }
    const triplet = tripletToHex(value);
    if (triplet) colors.add(triplet);
  }
  return colors;
}

/** Relative luminance per WCAG 2.x. */
export function luminance(hex: string): number | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colors; 0 when either is unparseable. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return 0;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Nearest color in `candidates` to `target`, with its CIEDE2000 distance. */
export function nearestColor(
  target: string,
  candidates: Iterable<string>,
): { hex: string; distance: number } | null {
  let best: { hex: string; distance: number } | null = null;
  for (const candidate of candidates) {
    const distance = deltaE(target, candidate);
    if (!Number.isFinite(distance)) continue;
    if (!best || distance < best.distance) best = { hex: candidate, distance };
  }
  return best;
}
