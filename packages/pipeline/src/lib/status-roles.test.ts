import { describe, expect, it } from "vitest";
import {
  addColorTokens,
  documentStatusTokens,
  missingRoles,
  pickStatusColor,
} from "./status-roles";

describe("missingRoles", () => {
  it("accepts any recognised alias for a role", () => {
    expect(missingRoles(["primary", "positive", "danger"])).toEqual(["warning"]);
  });

  it("reports all three when none are declared", () => {
    expect(missingRoles(["primary", "surface"])).toEqual(["success", "warning", "error"]);
  });
});

describe("pickStatusColor", () => {
  // Notion's real palette, which the catalog entry never carried over.
  const notion = ["#1aae39", "#14832b", "#ffb110", "#e89d01", "#f64932", "#e32d14", "#0075de"];

  it("picks a green for success that clears AA on white", () => {
    expect(pickStatusColor("success", notion, "#ffffff")).toBe("#14832b");
  });

  it("picks a red for error", () => {
    expect(pickStatusColor("error", notion, "#ffffff")).toBe("#e32d14");
  });

  it("rejects a hue that cannot clear AA on the surface", () => {
    // #ffb110 is 1.8:1 on white — a fill color, not a text color.
    expect(pickStatusColor("warning", ["#ffb110"], "#ffffff")).toBeNull();
  });

  it("finds a warning that does clear AA", () => {
    expect(pickStatusColor("warning", ["#ffb110", "#8a5a00"], "#ffffff")).toBe("#8a5a00");
  });

  it("returns null when the palette has no such hue", () => {
    expect(pickStatusColor("success", ["#000000", "#ffffff", "#0075de"], "#ffffff")).toBeNull();
  });

  it("works against a dark surface", () => {
    expect(pickStatusColor("success", ["#1aae39", "#14832b"], "#000000")).toBe("#1aae39");
  });
});

describe("addColorTokens", () => {
  const md = [
    "---",
    "colors:",
    '  primary: "#0075DE"',
    '  surface: "#FFFFFF"',
    "rounded:",
    "  sm: 4px",
    "---",
    "",
  ].join("\n");

  it("appends tokens at the end of the colors block", () => {
    const out = addColorTokens(md, { success: "#14832b" });
    expect(out).toContain('  surface: "#FFFFFF"\n  success: "#14832B"\nrounded:');
  });

  it("matches the unquoted style when the file uses it", () => {
    const plain = ["---", "colors:", "  primary: #0075DE", "rounded:", "---"].join("\n");
    expect(addColorTokens(plain, { error: "#e32d14" })).toContain("  error: #E32D14");
  });

  it("is a no-op with nothing to add", () => {
    expect(addColorTokens(md, {})).toBe(md);
  });
});

describe("documentStatusTokens", () => {
  it("adds a prose bullet that references the tokens by name", () => {
    const md = "intro\n\n## Colors\n\n- **primary** — the blue.\n\n## Typography\n\nbody\n";
    const out = documentStatusTokens(md, { success: "#14832b" }, "#ffffff");
    expect(out).toContain("`{colors.success}` (#14832B)");
    expect(out).toContain("on `{colors.surface}`");
    expect(out).toContain("is the observed status hue");
    expect(out.indexOf("status colors")).toBeLessThan(out.indexOf("## Typography"));
  });

  it("uses plural grammar for multiple roles", () => {
    const md = "intro\n\n## Colors\n\n- **primary** — the blue.\n\n## Typography\n\nbody\n";
    const out = documentStatusTokens(md, { success: "#14832b", error: "#e32d14" }, "#ffffff");
    expect(out).toContain("are the observed status hues");
  });

  it("leaves the document alone when nothing was added", () => {
    const md = "## Colors\n\n- **primary**\n";
    expect(documentStatusTokens(md, {}, "#ffffff")).toBe(md);
  });
});
