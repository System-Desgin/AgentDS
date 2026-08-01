import { describe, expect, it } from "vitest";
import { rankTokenFiles, scoreTokenFile, sweepColors } from "./source-sweep";

describe("sweepColors", () => {
  it("reads compiled ES-module token objects", () => {
    const js = "export const grey = {\n  '2': '#050505',\n  '4': '#0a0a0a',\n};";
    expect(sweepColors(js, "colors")).toEqual({
      "colors.2": "#050505",
      "colors.4": "#0a0a0a",
    });
  });

  it("reads exported color constants", () => {
    expect(sweepColors('export const brandBlue = "#0f6cbd";', "t")).toEqual({
      "t.brandBlue": "#0f6cbd",
    });
  });

  it("reads Sass and Less variable declarations", () => {
    const scss = "$blue-5: #3491FA;\n@red-6: #F53F3F;";
    expect(sweepColors(scss, "p")).toEqual({ "p.blue_5": "#3491fa", "p.red_6": "#f53f3f" });
  });

  it("reads a color nested inside a Sass map call", () => {
    // Material ships every token this way.
    const scss = "'error40': if($exclude-hardcoded-values, null, #b3261e),";
    expect(sweepColors(scss, "ref")).toEqual({ "ref.error40": "#b3261e" });
  });

  it("keeps every distinct value when leaf names repeat across families", () => {
    // Orbit nests `dark` under each family; first-wins dropped 78 of 95 colors.
    const js = `blue: { dark: "#005AA3", light: "#E8F4FD" }, green: { dark: "#2D7738", light: "#E7F3E8" }`;
    expect(sweepColors(js, "")).toEqual({
      dark: "#005aa3",
      light: "#e8f4fd",
      dark_2: "#2d7738",
      light_2: "#e7f3e8",
    });
  });

  it("collapses a repeated identical value rather than suffixing it", () => {
    expect(sweepColors('a: { x: "#ffffff" }, b: { x: "#ffffff" }', "")).toEqual({ x: "#ffffff" });
  });

  it("converts channel triplets used for rgb() composition", () => {
    expect(sweepColors("--red-6: 245,63,63;", "")).toEqual({ red_6: "#f53f3f" });
  });

  it("falls back to bare literals only when no named color is found", () => {
    const css = ".a{color:#123456}.b{color:#abcdef}";
    expect(sweepColors(css, "s")).toEqual({ "s.literal_0": "#123456", "s.literal_1": "#abcdef" });
  });

  it("ignores non-color values", () => {
    expect(sweepColors('{ spacing: "16px", z: 10 }', "x")).toEqual({});
  });
});

describe("scoreTokenFile", () => {
  it("ranks a real palette above a per-component stylesheet", () => {
    expect(scoreTokenFile("/dist/css/arco.css")).toBeGreaterThan(
      scoreTokenFile("/es/ColorPicker/style/index.css"),
    );
  });

  it("ranks a reference palette above a component token file", () => {
    expect(scoreTokenFile("/tokens/versions/v0_192/_md-ref-palette.scss")).toBeGreaterThan(
      scoreTokenFile("/tokens/versions/v0_192/_md-comp-date-picker-modal.scss"),
    );
  });

  it("demotes accessibility overrides, minified files, and test fixtures", () => {
    const base = scoreTokenFile("/lib/theme.css");
    expect(scoreTokenFile("/lib/internal/forced-colors-styles.css")).toBeLessThan(base);
    expect(scoreTokenFile("/lib/theme.min.css")).toBeLessThan(base);
    expect(scoreTokenFile("/tokens/lib.test.scss")).toBeLessThan(base);
  });
});

describe("rankTokenFiles", () => {
  it("breaks ties by size so a re-export stub loses to the real file", () => {
    const ranked = rankTokenFiles([
      { path: "/tokens/_md-ref-palette.scss", size: 300 },
      { path: "/tokens/versions/v0_192/_md-ref-palette.scss", size: 9000 },
    ]);
    expect(ranked[0]).toBe("/tokens/versions/v0_192/_md-ref-palette.scss");
  });

  it("accepts plain paths", () => {
    expect(rankTokenFiles(["/a/icon.css", "/a/palette.css"])[0]).toBe("/a/palette.css");
  });
});
