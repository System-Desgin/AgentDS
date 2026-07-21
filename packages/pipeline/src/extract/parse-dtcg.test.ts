import { describe, expect, it } from "vitest";
import { flattenTokens } from "./parse-dtcg";

describe("flattenTokens", () => {
  it("flattens W3C DTCG tokens ($value leaves)", () => {
    const tree = {
      color: {
        $type: "color",
        primary: { $value: "#17150f", $type: "color" },
        surface: { $value: "#faf7f2" },
      },
      spacing: { md: { $value: "16px" } },
    };
    expect(flattenTokens(tree)).toEqual({
      "color.primary": "#17150f",
      "color.surface": "#faf7f2",
      "spacing.md": "16px",
    });
  });

  it("flattens plain nested maps (string/number leaves)", () => {
    const tree = { colors: { brand: { 500: "#bc4a26" } }, radius: { md: 10 } };
    expect(flattenTokens(tree)).toEqual({
      "colors.brand.500": "#bc4a26",
      "radius.md": 10,
    });
  });

  it("ignores $-prefixed metadata and applies a prefix", () => {
    const out = flattenTokens({ $description: "x", a: { $value: "1" } }, "pkg");
    expect(out).toEqual({ "pkg.a": "1" });
  });

  it("returns empty for non-objects", () => {
    expect(flattenTokens(null)).toEqual({});
    expect(flattenTokens("nope")).toEqual({});
  });
});
