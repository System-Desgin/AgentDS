import { stringify as toYaml } from "yaml";
import type { NormalizedTokens } from "../model/tokens";

export interface FrontMatterHeader {
  version: string;
  name: string;
  description: string;
}

/**
 * Build DESIGN.md YAML front matter (the token block) from a normalized token
 * model. Deterministic — the front matter mirrors the tokens exactly, so it can
 * be asserted/regenerated independently of the generated prose.
 */
export function buildFrontMatter(header: FrontMatterHeader, tokens: NormalizedTokens): string {
  const doc = {
    version: header.version,
    name: header.name,
    description: header.description,
    colors: tokens.colors,
    typography: tokens.typography,
    rounded: tokens.rounded,
    spacing: tokens.spacing,
    components: tokens.components,
  };
  return `---\n${toYaml(doc)}---\n`;
}

/** Assemble a full DESIGN.md from front matter and generated prose sections. */
export function assembleDesignMd(frontMatter: string, prose: string): string {
  const fm = frontMatter.endsWith("\n") ? frontMatter : `${frontMatter}\n`;
  return `${fm}\n${prose.trimStart()}`;
}
