#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { evaluate } from "./evaluate.mjs";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const promptPath = new URL("./prompt.txt", import.meta.url);
const designPath = new URL("../../content/official/carbon/DESIGN.md", import.meta.url);
const evidenceSets = [
  { label: "Codex", directory: new URL("./outputs/", import.meta.url) },
  { label: "Claude Code", directory: new URL("./outputs/claude-code/", import.meta.url) },
];

const [prompt, design] = await Promise.all([
  readFile(promptPath, "utf8"),
  readFile(designPath, "utf8"),
]);
const summaries = [];

for (const evidence of evidenceSets) {
  const paths = {
    baseline: new URL("baseline.html", evidence.directory),
    carbon: new URL("carbon.html", evidence.directory),
    results: new URL("results.json", evidence.directory),
    run: new URL("run.json", evidence.directory),
  };
  const [baseline, carbon, recordedResults, runRecord] = await Promise.all([
    readFile(paths.baseline, "utf8"),
    readFile(paths.carbon, "utf8"),
    readFile(paths.results, "utf8").then(JSON.parse),
    readFile(paths.run, "utf8").then(JSON.parse),
  ]);

  assert.equal(
    runRecord.inputs.promptSha256,
    sha256(prompt),
    `${evidence.label}: prompt.txt no longer matches the recorded run`,
  );
  assert.equal(
    runRecord.inputs.treatmentDesignSha256,
    sha256(design),
    `${evidence.label}: Carbon DESIGN.md no longer matches the recorded run`,
  );
  assert.equal(
    runRecord.inputs.onlyTreatmentInputDifference,
    "DESIGN.md",
    `${evidence.label}: treatment difference is not controlled`,
  );
  if (evidence.label === "Claude Code") {
    assert.equal(
      runRecord.generator.auth.authMethod,
      "claude.ai",
      "Claude Code: run was not authenticated through claude.ai",
    );
    assert.equal(
      runRecord.generator.auth.anthropicApiKeyPresent,
      false,
      "Claude Code: ANTHROPIC_API_KEY must be absent",
    );
    assert.equal(runRecord.generator.safeMode, true, "Claude Code: safe mode must be recorded");
    assert.deepEqual(
      runRecord.generator.allowedTools,
      ["Read", "Write"],
      "Claude Code: only Read and Write tools may be enabled",
    );
  }
  assert.equal(
    runRecord.outputs.baselineSha256,
    sha256(baseline),
    `${evidence.label}: baseline.html no longer matches the recorded run`,
  );
  assert.equal(
    runRecord.outputs.carbonSha256,
    sha256(carbon),
    `${evidence.label}: carbon.html no longer matches the recorded run`,
  );

  const currentResults = await evaluate({
    baselineUrl: paths.baseline,
    carbonUrl: paths.carbon,
  });
  assert.deepEqual(
    recordedResults,
    currentResults,
    `${evidence.label}: results.json is stale or was edited by hand`,
  );

  for (const [name, html] of Object.entries({ baseline, carbon })) {
    const prefix = `${evidence.label} ${name}`;
    assert.match(html, /<!doctype html>/i, `${prefix} output must be an HTML document`);
    assert.match(html, /<main\b/i, `${prefix} output must contain a main landmark`);
    assert.match(html, /<nav\b/i, `${prefix} output must contain a nav landmark`);
    assert.match(html, /<table\b/i, `${prefix} output must contain the requested table`);
    assert.match(html, /@media\s*\(/i, `${prefix} output must contain responsive CSS`);
    assert.doesNotMatch(html, /<script\b/i, `${prefix} output must not contain scripts`);
    assert.doesNotMatch(
      html,
      /(?:https?:)?\/\//i,
      `${prefix} output must not contain network requests`,
    );
  }

  summaries.push(
    `${evidence.label}: baseline ${currentResults.outputs.baseline.score.passed}/${currentResults.outputs.baseline.score.total}; ` +
      `Carbon ${currentResults.outputs.carbon.score.passed}/${currentResults.outputs.carbon.score.total}`,
  );
}

process.stdout.write(
  `Benchmark evidence verified at benchmarks/carbon-dashboard/\n${summaries.join("\n")}\n`,
);
