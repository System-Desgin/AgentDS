import { describe, expect, it } from "vitest";
import { recomputeContrastClaims } from "./contrast-claims";

const colors = {
  surface: "#FFFFFF",
  "on-surface": "#191918",
  "on-primary": "#FFFFFF",
  primary: "#0075DE",
  "primary-bright": "#2383E2",
};

describe("recomputeContrastClaims", () => {
  it("corrects a ratio that a re-grounded color invalidated", () => {
    // #1D72C9 measured 4.9:1; the real source blue #0075DE measures 4.6:1.
    const md =
      "- **primary (`#0075DE`)** — used for link text and button fills,\n" +
      "  holding 4.9:1 with `{colors.on-primary}`.";
    const { text, updated } = recomputeContrastClaims(md, colors);
    expect(text).toContain("holding 4.6:1 with");
    expect(updated).toEqual([
      { from: "4.9:1", to: "4.6:1", foreground: "#0075de", background: "#ffffff" },
    ]);
  });

  it("leaves a correct ratio untouched", () => {
    const md =
      "- **on-surface (`#191918`)** — body copy; it measures about 17.6:1 on `{colors.surface}`.";
    const { text, updated } = recomputeContrastClaims(md, colors);
    expect(text).toBe(md);
    expect(updated).toEqual([]);
  });

  it("resolves an implicit white ground", () => {
    const md =
      "- **primary-bright (`#2383E2`)** — `{colors.primary-bright}` is the brighter blue,\n" +
      "  but it measures about 3.9:1 on white.";
    const { text, stale } = recomputeContrastClaims(md, colors);
    expect(text).toContain("3.9:1 on white");
    expect(stale).toEqual([]);
  });

  it("never rewrites the WCAG threshold itself", () => {
    const md = "2. Every text/background pairing must pass WCAG AA 4.5:1: use tokens.";
    expect(recomputeContrastClaims(md, colors).text).toBe(md);
  });

  it("reports a range rather than guessing which pair it describes", () => {
    const md = "- **glow (`#0075DE`)** — the three hues sit at 5.6:1 to 9.7:1 on dark.";
    const { text, stale, updated } = recomputeContrastClaims(md, colors);
    expect(text).toBe(md);
    expect(updated).toEqual([]);
    expect(stale).toEqual(["5.6:1", "9.7:1"]);
  });

  it("reports a claim whose ground cannot be determined", () => {
    const md = "- **primary (`#0075DE`)** — comfortably clears 7.2:1 in most placements.";
    const { text, stale } = recomputeContrastClaims(md, colors);
    expect(text).toBe(md);
    expect(stale).toEqual(["7.2:1"]);
  });
});
