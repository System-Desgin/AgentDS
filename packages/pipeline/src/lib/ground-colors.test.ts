import { describe, expect, it } from "vitest";
import { applySubstitution, contrastPairs, groundColors, substitutionMap } from "./ground-colors";

describe("contrastPairs", () => {
  it("picks out components that put text on a background", () => {
    const components = {
      "button-primary": {
        backgroundColor: "{colors.primary}",
        textColor: "{colors.on-primary}",
        rounded: "{rounded.md}",
      },
      divider: { backgroundColor: "{colors.border-subtle}", height: "1px" },
      link: { textColor: "{colors.primary}" },
    };
    expect(contrastPairs(components)).toEqual([
      { component: "button-primary", textToken: "on-primary", backgroundToken: "primary" },
    ]);
  });
});

describe("groundColors", () => {
  const source = ["#0075de", "#191918", "#78736f", "#f6f5f4", "#ffffff", "#005bab"];

  it("leaves values that already match the source", () => {
    const { colors, changes } = groundColors({ surface: "#ffffff" }, source);
    expect(colors["surface"]).toBe("#ffffff");
    expect(changes).toEqual([]);
  });

  it("snaps a drifted value onto the real source color", () => {
    const { colors, changes } = groundColors({ "border-strong": "#cfcdc9" }, source);
    expect(colors["border-strong"]).toBe("#f6f5f4");
    expect(changes[0]).toMatchObject({ token: "border-strong", from: "#cfcdc9", to: "#f6f5f4" });
  });

  it("tolerates a rounding-level difference rather than churning it", () => {
    // ΔE 0.67 from #f6f5f4 — inside the grounded band, so left alone.
    const { changes } = groundColors({ panel: "#f7f7f5" }, source);
    expect(changes).toEqual([]);
  });

  it("corrects a near-miss that sits outside the grounded band", () => {
    // ΔE 2.24 from the real gray-500: close enough to look right, still not a
    // color the source uses.
    const { colors } = groundColors({ muted: "#767572" }, source);
    expect(colors["muted"]).toBe("#78736f");
  });

  it("keeps a component pair at AA when the source color would fail", () => {
    // #2383e2 is genuinely in Notion's CSS but measures 3.92:1 on white, so
    // link text has to fall back to a darker source color.
    const { colors, changes } = groundColors(
      { surface: "#ffffff", link: "#2383e2" },
      [...source, "#2383e2"],
      [{ component: "link-on-surface", textToken: "link", backgroundToken: "surface" }],
    );
    expect(colors["link"]).not.toBe("#2383e2");
    expect(["#005bab", "#191918", "#0075de"]).toContain(colors["link"]);
    expect(changes.find((c) => c.token === "link")?.contrastRepair).toBeDefined();
  });

  it("reports a pair it cannot repair instead of shipping it", () => {
    const { unresolved } = groundColors(
      { bg: "#ffffff", fg: "#fefefe" },
      ["#ffffff", "#fefefe"],
      [{ component: "impossible", textToken: "fg", backgroundToken: "bg" }],
    );
    expect(unresolved).toEqual([{ component: "impossible", ratio: 1.01 }]);
  });
});

describe("substitutionMap", () => {
  it("maps each old value to its replacement", () => {
    const { map, ambiguous } = substitutionMap([
      { token: "a", from: "#CFCDC9", to: "#dfdcd9", deltaE: 3.7 },
    ]);
    expect(map.get("#cfcdc9")).toBe("#dfdcd9");
    expect(ambiguous).toEqual([]);
  });

  it("refuses a value that two tokens want to send to different colors", () => {
    const { map, ambiguous } = substitutionMap([
      { token: "a", from: "#000000", to: "#111111", deltaE: 3 },
      { token: "b", from: "#000000", to: "#222222", deltaE: 3 },
    ]);
    expect(map.size).toBe(0);
    expect(ambiguous).toEqual(["#000000"]);
  });
});

describe("applySubstitution", () => {
  const map = new Map([
    ["#cfcdc9", "#dfdcd9"],
    ["#dfdcd9", "#a39e98"],
  ]);

  it("rewrites in a single pass so replacements never chain", () => {
    // Naive sequential replaces would turn the first value into #a39e98.
    expect(applySubstitution("#CFCDC9 and #DFDCD9", map)).toBe("#DFDCD9 and #A39E98");
  });

  it("preserves the letter case used in the file", () => {
    expect(applySubstitution("#cfcdc9", map)).toBe("#dfdcd9");
    expect(applySubstitution("#CFCDC9", map)).toBe("#DFDCD9");
  });

  it("leaves unrelated colors and text alone", () => {
    expect(applySubstitution("#123456 stays", map)).toBe("#123456 stays");
  });
});
