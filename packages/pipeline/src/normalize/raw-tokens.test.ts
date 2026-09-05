import { describe, expect, it } from "vitest";
import { normalizeRawTokens } from "./raw-tokens";

describe("normalizeRawTokens", () => {
  it("categorizes source literals into a DESIGN.md-shaped candidate model", () => {
    const result = normalizeRawTokens({
      "theme.--ds-text-primary": "#161616",
      "theme.--ds-background": "var(--white, #ffffff)",
      "theme.--ds-space-md": "1rem",
      "theme.--ds-radius-sm": "4px",
      "theme.type.body.font-family": "Inter, sans-serif",
      "theme.type.body.font-size": "1rem",
      "theme.type.body.font-weight": "400",
      "theme.type.body.line-height": "1.5",
      "theme.type.body.letter-spacing": "0.01em",
      "theme.duration.fast": "120ms",
    });

    expect(result.tokens).toEqual({
      colors: {
        "ds-background": "#ffffff",
        "ds-text-primary": "#161616",
      },
      typography: {
        "type-body": {
          fontFamily: "Inter, sans-serif",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "0.01em",
        },
      },
      rounded: { "ds-radius-sm": "4px" },
      spacing: { "ds-space-md": "1rem" },
      components: {},
    });
    expect(result.stats).toMatchObject({
      strategy: "design-md-candidates-v1",
      inputTokenCount: 10,
      selectedSourceCount: 9,
      ignoredSourceCount: 1,
      output: { colors: 2, typography: 1, rounded: 1, spacing: 1, components: 0 },
    });
  });

  it("reads structured DTCG color, dimension, and typography values", () => {
    const result = normalizeRawTokens({
      "tokens.brand": JSON.stringify({ colorSpace: "srgb", components: [0.25, 0.5, 1] }),
      "tokens.spacing.small": JSON.stringify({ value: 8, unit: "px" }),
      "tokens.radius.control": JSON.stringify({ value: 0.5, unit: "rem" }),
      "tokens.body": JSON.stringify({
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0px",
      }),
    });

    expect(result.tokens.colors.brand).toBe("#4080ff");
    expect(result.tokens.spacing["spacing-small"]).toBe("8px");
    expect(result.tokens.rounded["radius-control"]).toBe("0.5rem");
    expect(result.tokens.typography.body).toEqual({
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0px",
    });
  });

  it("does not invent units or select ambiguous multi-color values", () => {
    const result = normalizeRawTokens({
      "tokens.spacing.unitless": 8,
      "tokens.gradient": "linear-gradient(#000000, #ffffff)",
      "tokens.alias": "var(--unresolved)",
    });

    expect(result.tokens).toEqual({
      colors: {},
      typography: {},
      rounded: {},
      spacing: {},
      components: {},
    });
    expect(result.stats.selectedSourceCount).toBe(0);
  });

  it("bounds the candidate set before it reaches the generation prompt", () => {
    const raw = Object.fromEntries(
      Array.from({ length: 110 }, (_, index) => [
        `theme.color-${index}`,
        `#${index.toString(16).padStart(6, "0")}`,
      ]),
    );

    const result = normalizeRawTokens(raw);

    expect(result.stats.output.colors).toBe(96);
    expect(result.stats.selectedSourceCount).toBe(96);
    expect(result.stats.ignoredSourceCount).toBe(14);
  });
});
