import { describe, expect, it } from "vitest";
import {
  collectHexes,
  deltaE,
  deltaELab,
  hexToLab,
  hslToHex,
  nearestColor,
  normalizeHex,
  oklabToHexValue,
  oklchToHex,
  parseHex,
  rgbToHex,
  type Lab,
} from "./color";

describe("parseHex / normalizeHex", () => {
  it("expands shorthand and drops alpha", () => {
    expect(parseHex("#fff")).toEqual([255, 255, 255]);
    expect(normalizeHex("#0F62FE")).toBe("#0f62fe");
    expect(normalizeHex("#0000000d")).toBe("#000000");
  });

  it("rejects non-colors", () => {
    expect(parseHex("blue")).toBeNull();
    expect(normalizeHex("#12345")).toBeNull();
  });
});

describe("hexToLab", () => {
  it("places the sRGB endpoints at the L* extremes", () => {
    const white = hexToLab("#ffffff");
    const black = hexToLab("#000000");
    expect(white?.[0]).toBeCloseTo(100, 1);
    expect(black?.[0]).toBeCloseTo(0, 1);
  });
});

describe("deltaELab", () => {
  /**
   * Reference pairs from Sharma, Wu & Dalal (2005), "The CIEDE2000
   * Color-Difference Formula" — the cases chosen to exercise the hue-rotation
   * and arc-averaging branches that naive implementations get wrong.
   */
  const REFERENCE: Array<[Lab, Lab, number]> = [
    [[50, 2.6772, -79.7751], [50, 0, -82.7485], 2.0425],
    [[50, 3.1571, -77.2803], [50, 0, -82.7485], 2.8615],
    [[50, 2.8361, -74.02], [50, 0, -82.7485], 3.4412],
    [[50, -1.3802, -84.2814], [50, 0, -82.7485], 1.0],
    [[50, 2.5, 0], [50, 0, -2.5], 4.3065],
    [[50, 2.5, 0], [73, 25, -18], 27.1492],
    [[50, 2.5, 0], [50, 3.1736, 0.5854], 1.0],
    [[60.2574, -34.0099, 36.2677], [60.4626, -34.1751, 39.4387], 1.2644],
    [[2.0776, 0.0795, -1.135], [0.9033, -0.0636, -0.5514], 0.9082],
  ];

  it.each(REFERENCE)("matches the published value for %j vs %j", (a, b, expected) => {
    expect(deltaELab(a, b)).toBeCloseTo(expected, 3);
  });

  it("is symmetric", () => {
    const a: Lab = [50, 2.6772, -79.7751];
    const b: Lab = [50, 0, -82.7485];
    expect(deltaELab(a, b)).toBeCloseTo(deltaELab(b, a), 10);
  });
});

describe("deltaE", () => {
  it("is zero for identical colors", () => {
    expect(deltaE("#1d72c9", "#1D72C9")).toBe(0);
  });

  it("puts the sRGB endpoints at the top of the scale", () => {
    expect(deltaE("#ffffff", "#000000")).toBeCloseTo(100, 0);
  });

  it("flags a near-miss gray as drift, not a match", () => {
    // Shipped on-surface-variant vs Notion's real --color-gray-500.
    const d = deltaE("#767572", "#78736f");
    expect(d).toBeGreaterThan(2);
    expect(d).toBeLessThanOrEqual(5);
  });

  it("separates different steps of the same ramp", () => {
    // Shipped border-strong vs Notion's --color-gray-400.
    expect(deltaE("#cfcdc9", "#a39e98")).toBeGreaterThan(5);
  });

  it("separates a fabricated blue from the source blue", () => {
    expect(deltaE("#1d72c9", "#097fe8")).toBeGreaterThan(5);
  });

  it("returns Infinity when a side is unparseable", () => {
    expect(deltaE("#ffffff", "not-a-color")).toBe(Number.POSITIVE_INFINITY);
  });
});

describe("CSS color notations", () => {
  it("converts hsl in both syntaxes", () => {
    expect(hslToHex("hsl(0, 100%, 50%)")).toBe("#ff0000");
    expect(hslToHex("hsl(210 100% 50%)")).toBe("#0080ff");
    expect(hslToHex("hsla(120, 100%, 25%, 0.5)")).toBe("#008000");
  });

  it("converts rgb, including percentage channels", () => {
    expect(rgbToHex("rgb(55, 53, 47)")).toBe("#37352f");
    expect(rgbToHex("rgb(0 0 0 / 8%)")).toBe("#000000");
    expect(rgbToHex("rgb(100%, 0%, 0%)")).toBe("#ff0000");
  });

  it("converts oklch to the expected sRGB primaries", () => {
    // Reference values from the CSS Color 4 conversion of sRGB red/green/blue.
    expect(oklchToHex("oklch(0.62796 0.25768 29.234)")).toBe("#ff0000");
    expect(oklchToHex("oklch(0.86644 0.29483 142.495)")).toBe("#00ff00");
    expect(oklchToHex("oklch(0.452 0.31313 264.052)")).toBe("#0000ff");
  });

  it("accepts oklch lightness as a percentage", () => {
    expect(oklchToHex("oklch(62.796% 0.25768 29.234)")).toBe(
      oklchToHex("oklch(0.62796 0.25768 29.234)"),
    );
  });

  it("clamps out-of-gamut oklch instead of emitting garbage", () => {
    const hex = oklchToHex("oklch(0.9 0.4 150)");
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("converts oklab", () => {
    expect(oklabToHexValue("oklab(0.62796 0.22486 0.12585)")).toBe("#ff0000");
  });

  it("returns null for malformed input", () => {
    expect(hslToHex("hsl(nope)")).toBeNull();
    expect(oklchToHex("oklch()")).toBeNull();
    expect(rgbToHex("rgb(1,2)")).toBeNull();
  });
});

describe("collectHexes", () => {
  it("gathers distinct colors and ignores non-color values", () => {
    const found = collectHexes(["#FFF", "#0f62fe", "16px", 42, "border 1px solid #0F62FE"]);
    expect([...found].sort()).toEqual(["#0f62fe", "#ffffff"]);
  });
});

describe("nearestColor", () => {
  it("finds the closest candidate", () => {
    const match = nearestColor("#f1f1ef", ["#ffffff", "#f6f5f4", "#dfdcd9"]);
    expect(match?.hex).toBe("#f6f5f4");
  });

  it("returns null for an empty candidate set", () => {
    expect(nearestColor("#ffffff", [])).toBeNull();
  });
});
