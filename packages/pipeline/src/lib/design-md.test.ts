import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findRepoRoot } from "./paths";
import { exportDesignMd, lintDesignMd } from "./design-md";

// Integration tests exercising the official @google/design.md CLI against the
// project's own (hand-authored, spec-valid) DESIGN.md.
const DESIGN_MD = join(findRepoRoot(), "DESIGN.md");

describe("lintDesignMd", () => {
  it("reports zero errors for the project DESIGN.md", () => {
    const result = lintDesignMd(DESIGN_MD);
    expect(result.summary.errors).toBe(0);
    expect(Array.isArray(result.findings)).toBe(true);
  });
});

describe("exportDesignMd", () => {
  it("emits parseable DTCG tokens.json", () => {
    const dtcg = exportDesignMd(DESIGN_MD, "dtcg");
    const parsed = JSON.parse(dtcg) as Record<string, unknown>;
    expect(typeof parsed).toBe("object");
    expect(dtcg).toContain("$value");
  });

  it("emits a Tailwind v4 @theme block", () => {
    const css = exportDesignMd(DESIGN_MD, "css-tailwind");
    expect(css).toContain("@theme");
    expect(css).toContain("--color-");
  });
});
