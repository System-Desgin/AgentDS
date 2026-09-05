#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { evaluate } from "../benchmarks/carbon-dashboard/evaluate.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const benchmarkDirectory = join(repositoryRoot, "benchmarks", "carbon-dashboard");
const promptPath = join(benchmarkDirectory, "prompt.txt");
const designPath = join(repositoryRoot, "content", "official", "carbon", "DESIGN.md");
const agentArgument = process.argv.find((argument) => argument.startsWith("--agent="));
const agent = agentArgument?.slice("--agent=".length) || "codex";
const shouldRecord = process.argv.includes("--record");

const generators = {
  codex: {
    command: "codex",
    model: "gpt-5.6-sol",
    reasoningEffort: "medium",
    versionArguments: ["--version"],
  },
  "claude-code": {
    command: "claude",
    model: "sonnet",
    reasoningEffort: "medium",
    versionArguments: ["--version"],
  },
};

const generator = generators[agent];
if (!generator) {
  throw new Error(`Unsupported benchmark agent: ${agent}. Use codex or claude-code.`);
}

const outputDirectory =
  agent === "codex"
    ? join(benchmarkDirectory, "outputs")
    : join(benchmarkDirectory, "outputs", agent);

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? repositoryRoot,
      env: options.env ?? process.env,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${command} exited with ${code}\n${stderr}`));
    });
    child.stdin.end(options.input);
  });
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function cleanEnvironment() {
  const environment = { ...process.env };
  delete environment.ANTHROPIC_API_KEY;
  delete environment.OPENAI_API_KEY;
  delete environment.CODEX_API_KEY;
  delete environment.CURSOR_API_KEY;
  return environment;
}

async function claudeAuthRecord() {
  if (Object.hasOwn(process.env, "ANTHROPIC_API_KEY")) {
    throw new Error(
      "ANTHROPIC_API_KEY must be absent: its presence can reroute Claude Code billing.",
    );
  }

  const result = await run("claude", ["auth", "status", "--json"]);
  const status = JSON.parse(result.stdout);
  if (!status.loggedIn || status.authMethod !== "claude.ai") {
    throw new Error("Claude Code must be signed in through claude.ai for this benchmark.");
  }

  return {
    authMethod: status.authMethod,
    apiProvider: status.apiProvider,
    subscriptionType: status.subscriptionType,
    anthropicApiKeyPresent: false,
  };
}

async function generate({ name, prompt, temporaryRoot, withDesign }) {
  const workingDirectory = join(temporaryRoot, name);
  await mkdir(workingDirectory, { recursive: true });
  await run("git", ["init", "--quiet"], { cwd: workingDirectory });
  if (withDesign) await copyFile(designPath, join(workingDirectory, "DESIGN.md"));

  process.stderr.write(`\n[benchmark] generating ${name} with ${agent}\n`);
  const args =
    agent === "codex"
      ? [
          "exec",
          "--ephemeral",
          "--ignore-user-config",
          "--ignore-rules",
          "--sandbox",
          "workspace-write",
          "--model",
          generator.model,
          "--config",
          `model_reasoning_effort=\"${generator.reasoningEffort}\"`,
          "--cd",
          workingDirectory,
          "-",
        ]
      : [
          "-p",
          "--safe-mode",
          "--no-session-persistence",
          "--no-chrome",
          "--strict-mcp-config",
          "--allowedTools",
          "Read,Write",
          "--permission-mode",
          "acceptEdits",
          "--permission-prompts",
          "none",
          "--model",
          generator.model,
          "--effort",
          generator.reasoningEffort,
          "--output-format",
          "json",
        ];
  const result = await run(generator.command, args, {
    cwd: workingDirectory,
    env: cleanEnvironment(),
    input: prompt,
  });
  const html = await readFile(join(workingDirectory, "index.html"), "utf8");
  const report = agent === "claude-code" ? JSON.parse(result.stdout) : undefined;

  return {
    html,
    finalMessage: report?.result ?? result.stdout.trim(),
    resolvedModels: report ? Object.keys(report.modelUsage ?? {}).sort() : [],
    serviceTier: report?.usage?.service_tier,
    turns: report?.num_turns,
  };
}

async function main() {
  const [prompt, design, versionResult, auth] = await Promise.all([
    readFile(promptPath, "utf8"),
    readFile(designPath, "utf8"),
    run(generator.command, generator.versionArguments),
    agent === "claude-code" ? claudeAuthRecord() : undefined,
  ]);
  const temporaryRoot = await mkdtemp(join(tmpdir(), "agentds-carbon-benchmark-"));

  try {
    const baseline = await generate({ name: "baseline", prompt, temporaryRoot, withDesign: false });
    const carbon = await generate({ name: "carbon", prompt, temporaryRoot, withDesign: true });

    const temporaryOutput = join(temporaryRoot, "recorded-outputs");
    await mkdir(temporaryOutput, { recursive: true });
    const baselinePath = join(temporaryOutput, "baseline.html");
    const carbonPath = join(temporaryOutput, "carbon.html");
    await Promise.all([writeFile(baselinePath, baseline.html), writeFile(carbonPath, carbon.html)]);
    const results = await evaluate({
      baselineUrl: new URL(`file://${baselinePath}`),
      carbonUrl: new URL(`file://${carbonPath}`),
    });
    const runRecord = {
      generatedAt: new Date().toISOString(),
      generator: {
        agent,
        cli: versionResult.stdout.trim(),
        model: generator.model,
        reasoningEffort: generator.reasoningEffort,
        ...(agent === "codex"
          ? {
              sandbox: "workspace-write",
              ephemeral: true,
              ignoredUserConfig: true,
              ignoredExecPolicyRules: true,
            }
          : {
              resolvedModels: [...new Set([...baseline.resolvedModels, ...carbon.resolvedModels])],
              safeMode: true,
              sessionPersistence: false,
              allowedTools: ["Read", "Write"],
              serviceTiers: [
                ...new Set([baseline.serviceTier, carbon.serviceTier].filter(Boolean)),
              ],
              turns: { baseline: baseline.turns, carbon: carbon.turns },
              auth,
            }),
      },
      inputs: {
        prompt: "benchmarks/carbon-dashboard/prompt.txt",
        promptSha256: sha256(prompt),
        treatmentDesign: "content/official/carbon/DESIGN.md",
        treatmentDesignSha256: sha256(design),
        onlyTreatmentInputDifference: "DESIGN.md",
      },
      outputs: {
        baselineSha256: sha256(baseline.html),
        carbonSha256: sha256(carbon.html),
      },
      agentFinalMessages: {
        baseline: baseline.finalMessage,
        carbon: carbon.finalMessage,
      },
    };
    await Promise.all([
      writeFile(join(temporaryOutput, "results.json"), `${JSON.stringify(results, null, 2)}\n`),
      writeFile(join(temporaryOutput, "run.json"), `${JSON.stringify(runRecord, null, 2)}\n`),
    ]);

    if (shouldRecord) {
      await mkdir(outputDirectory, { recursive: true });
      for (const file of ["baseline.html", "carbon.html", "results.json", "run.json"]) {
        const destination = join(outputDirectory, file);
        const stagedDestination = `${destination}.new`;
        await copyFile(join(temporaryOutput, file), stagedDestination);
        await rename(stagedDestination, destination);
      }
      process.stdout.write(`Recorded ${agent} benchmark outputs in ${outputDirectory}\n`);
    } else {
      process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
      process.stdout.write(`Generated outputs remain in ${temporaryOutput}\n`);
      process.stdout.write("Run with --record to replace the committed evidence.\n");
    }
  } finally {
    if (shouldRecord) await rm(temporaryRoot, { recursive: true, force: true });
  }
}

await main();
