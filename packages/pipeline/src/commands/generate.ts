import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import { stringify as toYaml } from "yaml";
import { parseMetaYaml, type Meta } from "@agentds/shared";
import { findEntryDir, findRepoRoot } from "../lib/paths";
import type { NormalizedTokens, RawTokenMap } from "../model/tokens";
import { normalizeRawTokens } from "../normalize/raw-tokens";

/**
 * Billing guardrail (CLAUDE.md): generation runs on the owner's Claude Max plan.
 * A set ANTHROPIC_API_KEY silently reroutes `claude -p` to a pay-per-token API
 * account, so refuse to run if it is present.
 */
export function assertNoAnthropicApiKey(env: NodeJS.ProcessEnv = process.env): void {
  if (Object.hasOwn(env, "ANTHROPIC_API_KEY")) {
    throw new Error(
      "ANTHROPIC_API_KEY is present — refusing to generate. It reroutes `claude -p` billing " +
        "off the plan's Agent SDK credit. Unset it and retry (see CLAUDE.md).",
    );
  }
}

function claudeAvailable(): boolean {
  const res = spawnSync("claude", ["--version"], { encoding: "utf8" });
  return !res.error && res.status === 0;
}

// Read-only tool allowlist for the generation agent (never writes/executes).
const ALLOWED_TOOLS = "Read Grep Glob";
const MAX_TURNS = "24";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every((item) => typeof item === "string");
}

function isNestedTokenRecord(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (item) =>
        isRecord(item) &&
        Object.values(item).every(
          (nestedValue) => typeof nestedValue === "string" || typeof nestedValue === "number",
        ),
    )
  );
}

function isNormalizedTokens(value: unknown): value is NormalizedTokens {
  if (!isRecord(value)) return false;
  return (
    isStringRecord(value.colors) &&
    isNestedTokenRecord(value.typography) &&
    isStringRecord(value.rounded) &&
    isStringRecord(value.spacing) &&
    isNestedTokenRecord(value.components)
  );
}

function rawTokensFrom(value: unknown): RawTokenMap | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (entries.some(([, token]) => typeof token !== "string" && typeof token !== "number")) {
    return null;
  }
  return Object.fromEntries(entries) as RawTokenMap;
}

export function normalizedTokensFromExtractPayload(payload: unknown): {
  tokens: NormalizedTokens;
  usedLegacyFallback: boolean;
} {
  if (!isRecord(payload)) throw new Error("tokens.raw.json must contain a JSON object.");
  if (isNormalizedTokens(payload.normalizedTokens)) {
    return { tokens: payload.normalizedTokens, usedLegacyFallback: false };
  }

  const rawTokens = rawTokensFrom(payload.tokens);
  if (!rawTokens) {
    throw new Error("tokens.raw.json has no normalizedTokens or valid raw tokens map.");
  }
  return { tokens: normalizeRawTokens(rawTokens).tokens, usedLegacyFallback: true };
}

export function renderGenerationPrompt(
  template: string,
  meta: Meta,
  tokens: NormalizedTokens,
): string {
  const guidance = {
    summary: meta.summary,
    description: meta.description,
    categories: meta.categories,
    tags: meta.tags,
    best_for: meta.best_for,
  };
  const replacements: Record<string, string> = {
    "{{name}}": meta.name,
    "{{maker}}": meta.maker,
    "{{normalized_tokens}}": toYaml(tokens).trim(),
    "{{provenance}}": toYaml(meta.provenance).trim(),
    "{{paraphrased_guidance}}": toYaml(guidance).trim(),
  };
  let prompt = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    prompt = prompt.replaceAll(placeholder, value);
  }
  const unresolved = prompt.match(/\{\{[a-z_]+\}\}/i)?.[0];
  if (unresolved) throw new Error(`Generation prompt has an unresolved placeholder: ${unresolved}`);
  return prompt;
}

/**
 * Generate an entry's DESIGN.md prose via headless Claude Code (`claude -p`)
 * using the versioned prompt template + extracted tokens (F-6). Guardrails:
 * ANTHROPIC_API_KEY must be unset, a --max-turns cap, and a read-only tool
 * allowlist. Never copies source text verbatim. Interactive alternative:
 * the `/generate-system` command.
 */
export async function runGenerate(slug: string): Promise<void> {
  const entry = findEntryDir(slug);
  if (!entry) {
    console.error(pc.red(`No entry found for slug "${slug}" under content/.`));
    process.exitCode = 1;
    return;
  }

  const meta = parseMetaYaml(await readFile(join(entry.dir, "meta.yaml"), "utf8"));

  try {
    assertNoAnthropicApiKey();
  } catch (error) {
    console.error(pc.red((error as Error).message));
    process.exitCode = 1;
    return;
  }

  const promptName = meta.path === "brand-look" ? "brand-look.md" : "official.md";
  const promptPath = join(findRepoRoot(), "packages/pipeline/prompts", promptName);
  const tokensPath = join(entry.dir, "tokens.raw.json");
  if (!existsSync(tokensPath)) {
    console.error(pc.red(`tokens.raw.json missing for "${slug}" — run extract first.`));
    process.exitCode = 1;
    return;
  }

  if (!claudeAvailable()) {
    console.error(pc.yellow("The `claude` CLI is not available in this environment."));
    console.log(
      pc.dim(
        `Generate interactively instead: run \`/generate-system ${slug}\` inside Claude Code,\n` +
          "or run this command where the Claude Code CLI is installed (Max plan; no API key).",
      ),
    );
    process.exitCode = 1;
    return;
  }

  const template = await readFile(promptPath, "utf8");
  const payload: unknown = JSON.parse(await readFile(tokensPath, "utf8"));
  const normalized = normalizedTokensFromExtractPayload(payload);
  if (normalized.usedLegacyFallback) {
    console.warn(
      pc.yellow("tokens.raw.json predates normalization — run extract again to refresh it."),
    );
  }
  const prompt = renderGenerationPrompt(template, meta, normalized.tokens);

  console.log(pc.dim(`Generating DESIGN.md for ${slug} via claude -p (read-only, no API key)…`));
  const res = spawnSync(
    "claude",
    ["-p", prompt, "--max-turns", MAX_TURNS, "--allowedTools", ALLOWED_TOOLS],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024, env: { ...process.env } },
  );
  if (res.status !== 0 || !res.stdout?.trim()) {
    console.error(pc.red(`generate failed: ${res.stderr || "no output"}`));
    process.exitCode = 1;
    return;
  }

  await writeFile(join(entry.dir, "DESIGN.md"), `${res.stdout.trim()}\n`, "utf8");
  console.log(pc.green(`${slug}: wrote DESIGN.md`), pc.dim("(validate + QA before publish)"));
}
