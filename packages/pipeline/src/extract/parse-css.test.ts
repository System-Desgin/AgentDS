import { describe, expect, it } from "vitest";
import { parseCssVars } from "./parse-css";

describe("parseCssVars", () => {
  it("parses custom properties from a :root block", () => {
    const css =
      ":root{--cds-background:#ffffff;--cds-background-brand:#0f62fe;--cds-text-primary:#161616;}";
    expect(parseCssVars(css)).toEqual({
      "--cds-background": "#ffffff",
      "--cds-background-brand": "#0f62fe",
      "--cds-text-primary": "#161616",
    });
  });

  it("keeps the first occurrence (default theme wins over later overrides)", () => {
    const css = ":root{--c:#ffffff;} .g90{--c:#262626;}";
    expect(parseCssVars(css)["--c"]).toBe("#ffffff");
  });

  it("applies a namespace prefix and does not cross rule boundaries", () => {
    const css = ".a{--x:1rem} .b{--y:2rem}";
    expect(parseCssVars(css, "file")).toEqual({ "file.--x": "1rem", "file.--y": "2rem" });
  });
});
