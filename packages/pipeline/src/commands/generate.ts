import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import { parseMetaYaml } from "@agentds/shared";
import { findEntryDir, findRepoRoot } from "../lib/paths";

/**
 * Billing guardrail (CLAUDE.md): generation runs on the owner's Claude Max plan.
 * A set ANTHROPIC_API_KEY silently reroutes `claude -p` to a pay-per-token API
 * account, so refuse to run if it is present.
 */
export function assertNoAnthropicApiKey(env: NodeJS.ProcessEnv = process.env): void {
  if (env.ANTHROPIC_API_KEY && env.ANTHROPIC_API_KEY.trim() !== "") {
    throw new Error(
      "ANTHROPIC_API_KEY is set — refusing to generate. It reroutes `claude -p` billing " +
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
  const tokens = await readFile(tokensPath, "utf8");
  const prompt = `${template}\n\n## Normalized tokens\n\n\`\`\`json\n${tokens}\n\`\`\`\n`;

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
