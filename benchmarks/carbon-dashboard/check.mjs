#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { evaluate } from "./evaluate.mjs";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const paths = {
  prompt: new URL("./prompt.txt", import.meta.url),
  design: new URL("../../content/official/carbon/DESIGN.md", import.meta.url),
  baseline: new URL("./outputs/baseline.html", import.meta.url),
  carbon: new URL("./outputs/carbon.html", import.meta.url),
  results: new URL("./outputs/results.json", import.meta.url),
  run: new URL("./outputs/run.json", import.meta.url),
};

const [prompt, design, baseline, carbon, recordedResults, runRecord] = await Promise.all([
  readFile(paths.prompt, "utf8"),
  readFile(paths.design, "utf8"),
  readFile(paths.baseline, "utf8"),
  readFile(paths.carbon, "utf8"),
  readFile(paths.results, "utf8").then(JSON.parse),
  readFile(paths.run, "utf8").then(JSON.parse),
]);

assert.equal(
  runRecord.inputs.promptSha256,
  sha256(prompt),
  "prompt.txt no longer matches the recorded run",
);
assert.equal(
  runRecord.inputs.treatmentDesignSha256,
  sha256(design),
  "Carbon DESIGN.md no longer matches the recorded run",
);
assert.equal(
  runRecord.outputs.baselineSha256,
  sha256(baseline),
  "baseline.html no longer matches the recorded run",
);
assert.equal(
  runRecord.outputs.carbonSha256,
  sha256(carbon),
  "carbon.html no longer matches the recorded run",
);

const currentResults = await evaluate();
assert.deepEqual(recordedResults, currentResults, "results.json is stale or was edited by hand");

for (const [name, html] of Object.entries({ baseline, carbon })) {
  assert.match(html, /<!doctype html>/i, `${name} output must be an HTML document`);
  assert.match(html, /<main\b/i, `${name} output must contain a main landmark`);
  assert.match(html, /<nav\b/i, `${name} output must contain a nav landmark`);
  assert.match(html, /<table\b/i, `${name} output must contain the requested table`);
  assert.match(html, /@media\s*\(/i, `${name} output must contain responsive CSS`);
  assert.doesNotMatch(html, /<script\b/i, `${name} output must not contain scripts`);
  assert.doesNotMatch(
    html,
    /(?:https?:)?\/\//i,
    `${name} output must not contain network requests`,
  );
}

process.stdout.write(
  "Benchmark evidence verified at benchmarks/carbon-dashboard/\n" +
    `baseline ${currentResults.outputs.baseline.score.passed}/${currentResults.outputs.baseline.score.total}; ` +
    `Carbon ${currentResults.outputs.carbon.score.passed}/${currentResults.outputs.carbon.score.total}\n`,
);
