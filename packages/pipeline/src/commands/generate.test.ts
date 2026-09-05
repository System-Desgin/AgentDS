import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseMetaYaml } from "@agentds/shared";
import type { NormalizedTokens } from "../model/tokens";
import {
  assertNoAnthropicApiKey,
  normalizedTokensFromExtractPayload,
  renderGenerationPrompt,
} from "./generate";

const normalizedTokens: NormalizedTokens = {
  colors: { primary: "#0f62fe" },
  typography: { body: { fontFamily: "IBM Plex Sans", fontSize: "1rem" } },
  rounded: { control: "0px" },
  spacing: { layout: "1rem" },
  components: {},
};

const meta = parseMetaYaml(`
slug: carbon
name: Carbon
path: official
maker: IBM
summary: Precise, functional, and built for enterprise products.
description: Source-verified design guidance generated from Carbon's published tokens.
categories: [enterprise-dashboard]
tags: [ibm, carbon]
best_for: [Data-dense products]
license:
  spdx: Apache-2.0
  url: https://www.apache.org/licenses/LICENSE-2.0
provenance:
  source_type: npm
  package: "@carbon/styles"
  version: 1.110.0
  extracted_at: "2026-09-05"
spec_version: alpha
`);

describe("assertNoAnthropicApiKey", () => {
  it.each(["sk-ant-xxxx", "", "   "])(
    "throws when ANTHROPIC_API_KEY is present as %j (billing guardrail)",
    (value) => {
      expect(() => assertNoAnthropicApiKey({ ANTHROPIC_API_KEY: value })).toThrow(
        /ANTHROPIC_API_KEY/,
      );
    },
  );

  it("passes only when ANTHROPIC_API_KEY is absent", () => {
    expect(() => assertNoAnthropicApiKey({})).not.toThrow();
  });
});

describe("normalizedTokensFromExtractPayload", () => {
  it("prefers candidates persisted by extract", () => {
    expect(
      normalizedTokensFromExtractPayload({ normalizedTokens, tokens: { ignored: "#ffffff" } }),
    ).toEqual({ tokens: normalizedTokens, usedLegacyFallback: false });
  });

  it("normalizes legacy raw-token payloads", () => {
    const result = normalizedTokensFromExtractPayload({
      tokens: { "theme.--primary": "#0f62fe", "theme.spacing.md": "1rem" },
    });

    expect(result.usedLegacyFallback).toBe(true);
    expect(result.tokens.colors.primary).toBe("#0f62fe");
    expect(result.tokens.spacing["spacing-md"]).toBe("1rem");
  });

  it("rejects payloads without usable tokens", () => {
    expect(() => normalizedTokensFromExtractPayload({ tokens: { nested: {} } })).toThrow(
      /no normalizedTokens or valid raw tokens map/,
    );
  });
});

describe("renderGenerationPrompt", () => {
  it("fills every versioned template placeholder with validated inputs", () => {
    const template = [
      "System: {{name}} by {{maker}}",
      "TOKENS\n{{normalized_tokens}}",
      "PROVENANCE\n{{provenance}}",
      "GUIDANCE\n{{paraphrased_guidance}}",
    ].join("\n\n");

    const prompt = renderGenerationPrompt(template, meta, normalizedTokens);

    expect(prompt).toContain("System: Carbon by IBM");
    expect(prompt).toContain('primary: "#0f62fe"');
    expect(prompt).toContain('package: "@carbon/styles"');
    expect(prompt).toContain("best_for:");
    expect(prompt).toContain("- Data-dense products");
    expect(prompt).not.toMatch(/\{\{[a-z_]+\}\}/i);
  });

  it("rejects unknown placeholders instead of sending a broken prompt", () => {
    expect(() => renderGenerationPrompt("{{unknown_input}}", meta, normalizedTokens)).toThrow(
      /unresolved placeholder/,
    );
  });

  it.each(["official.md", "brand-look.md"])(
    "fully renders the versioned %s template",
    (templateName) => {
      const template = readFileSync(join(__dirname, "../../prompts", templateName), "utf8");

      const prompt = renderGenerationPrompt(template, meta, normalizedTokens);

      expect(prompt).not.toMatch(/\{\{[a-z_]+\}\}/i);
      expect(prompt).toContain('primary: "#0f62fe"');
      expect(prompt).toContain('```yaml\ncolors:\n  primary: "#0f62fe"');
      expect(prompt).toContain("source_type: npm");
    },
  );
});
