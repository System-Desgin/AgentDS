/** Programmatic entry points for the AgentDS content pipeline. */
export { runNew } from "./commands/new";
export { runExtract } from "./commands/extract";
export { runGenerate, assertNoAnthropicApiKey } from "./commands/generate";
export { runValidate } from "./commands/validate";
export { runExport } from "./commands/export";

export { buildMetaTemplate } from "./templates/meta-template";
export { buildQaTemplate } from "./templates/qa-template";
export { buildFrontMatter, assembleDesignMd } from "./templates/design-md";
export { buildLicenseNotice } from "./templates/license-notice";

export { flattenTokens } from "./extract/parse-dtcg";
export { parseCssVars } from "./extract/parse-css";
export { isTokenFile, isCssTokenFile, extractNpmTokens } from "./extract/npm-tokens";
export { extractRepoJson } from "./extract/repo-json";

export { lintDesignMd, exportDesignMd, findDesignMdBin } from "./lib/design-md";
export { contentDirFor, findRepoRoot, findEntryDir, CONTENT_DIRNAME } from "./lib/paths";

export type { NormalizedTokens, RawTokenMap, TypographyScale, ExtractResult } from "./model/tokens";
export type { LintResult, LintSummary, LintFinding, ExportFormat } from "./lib/design-md";
