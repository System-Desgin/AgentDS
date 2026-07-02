import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import { assembleDesignMd, buildFrontMatter } from "./design-md";
import type { NormalizedTokens } from "../model/tokens";

const tokens: NormalizedTokens = {
  colors: { primary: "#17150f", surface: "#faf7f2" },
  typography: { "body-md": { fontFamily: "Inter", fontSize: "1rem" } },
  rounded: { md: "10px" },
  spacing: { md: "16px" },
  components: { "button-primary": { backgroundColor: "{colors.primary}" } },
};

describe("buildFrontMatter", () => {
  it("emits a fenced YAML front-matter block mirroring the tokens", () => {
    const fm = buildFrontMatter({ version: "alpha", name: "Test", description: "desc" }, tokens);
    expect(fm.startsWith("---\n")).toBe(true);
    expect(fm.trimEnd().endsWith("---")).toBe(true);

    const yaml = fm.replace(/^---\n/, "").replace(/---\n?$/, "");
    const parsed = parseYaml(yaml) as Record<string, unknown>;
    expect(parsed.name).toBe("Test");
    expect(parsed.version).toBe("alpha");
    expect((parsed.colors as Record<string, string>).primary).toBe("#17150f");
  });
});

describe("assembleDesignMd", () => {
  it("joins front matter and prose with a blank line", () => {
    const doc = assembleDesignMd("---\nname: X\n---\n", "## Overview\n\nHello.");
    expect(doc).toContain("---\nname: X\n---\n");
    expect(doc).toContain("## Overview");
  });
});
