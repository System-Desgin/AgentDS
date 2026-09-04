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
const outputDirectory = join(benchmarkDirectory, "outputs");
const promptPath = join(benchmarkDirectory, "prompt.txt");
const designPath = join(repositoryRoot, "content", "official", "carbon", "DESIGN.md");
const model = "gpt-5.6-sol";
const reasoningEffort = "medium";
const shouldRecord = process.argv.includes("--record");

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

async function generate({ name, prompt, temporaryRoot, withDesign }) {
  const workingDirectory = join(temporaryRoot, name);
  await mkdir(workingDirectory, { recursive: true });
  await run("git", ["init", "--quiet"], { cwd: workingDirectory });
  if (withDesign) await copyFile(designPath, join(workingDirectory, "DESIGN.md"));

  process.stderr.write(`\n[benchmark] generating ${name}\n`);
  const args = [
    "exec",
    "--ephemeral",
    "--ignore-user-config",
    "--ignore-rules",
    "--sandbox",
    "workspace-write",
    "--model",
    model,
    "--config",
    `model_reasoning_effort=\"${reasoningEffort}\"`,
    "--cd",
    workingDirectory,
    "-",
  ];
  const environment = { ...process.env };
  delete environment.ANTHROPIC_API_KEY;
  delete environment.OPENAI_API_KEY;
  delete environment.CODEX_API_KEY;
  const result = await run("codex", args, {
    cwd: workingDirectory,
    env: environment,
    input: prompt,
  });
  const html = await readFile(join(workingDirectory, "index.html"), "utf8");

  return {
    html,
    finalMessage: result.stdout.trim(),
  };
}

async function main() {
  const [prompt, design, versionResult] = await Promise.all([
    readFile(promptPath, "utf8"),
    readFile(designPath, "utf8"),
    run("codex", ["--version"]),
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
        cli: versionResult.stdout.trim(),
        model,
        reasoningEffort,
        sandbox: "workspace-write",
        ephemeral: true,
        ignoredUserConfig: true,
        ignoredExecPolicyRules: true,
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
      process.stdout.write(`Recorded benchmark outputs in ${outputDirectory}\n`);
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
