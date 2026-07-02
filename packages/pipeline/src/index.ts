/** Programmatic entry points for the AgentDS content pipeline. */
export { runNew } from "./commands/new";
export { buildMetaTemplate } from "./templates/meta-template";
export { buildQaTemplate } from "./templates/qa-template";
export { contentDirFor, findRepoRoot, CONTENT_DIRNAME } from "./lib/paths";
