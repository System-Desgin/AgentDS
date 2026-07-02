import { notImplemented } from "./not-implemented";

/**
 * Generate prose sections via headless Claude Code (`claude -p`) using the
 * versioned prompt templates (Phase 1, F-6). Guardrails: ANTHROPIC_API_KEY must
 * be unset, `--max-turns` cap, read-only tool allowlist. Never copies source
 * text verbatim. Interactive alternative: the `/generate-system` command.
 */
export function runGenerate(_slug: string): void {
  notImplemented("generate");
}
