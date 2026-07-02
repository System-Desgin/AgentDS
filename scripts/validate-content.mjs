#!/usr/bin/env node
// Validate every catalog entry's meta.yaml against the shared schema, and lint
// each DESIGN.md with the official linter. Used by CI (content workflow) and
// runnable locally via `pnpm validate:content` (requires @agentds/shared built).
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const contentDir = join(repoRoot, "content");

const sharedDist = join(repoRoot, "packages/shared/dist/index.js");
if (!existsSync(sharedDist)) {
  console.error("Build @agentds/shared first: pnpm --filter @agentds/shared build");
  process.exit(1);
}
const { parseMetaYaml } = await import(sharedDist);

/** Recursively collect file paths named `target` under `dir`. */
async function findFiles(dir, target, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await findFiles(full, target, acc);
    } else if (entry.name === target) {
      acc.push(full);
    }
  }
  return acc;
}

async function main() {
  if (!existsSync(contentDir)) {
    console.log("No content/ directory — nothing to validate.");
    return;
  }

  const metaFiles = await findFiles(contentDir, "meta.yaml");
  const designFiles = await findFiles(contentDir, "DESIGN.md");
  const errors = [];

  for (const file of metaFiles) {
    try {
      parseMetaYaml(await readFile(file, "utf8"));
      console.log(`ok   meta.yaml  ${file.replace(repoRoot + "/", "")}`);
    } catch (error) {
      errors.push(`meta.yaml invalid: ${file}\n${error?.message ?? error}`);
    }
  }

  for (const file of designFiles) {
    const result = spawnSync("npx", ["--yes", "@google/design.md", "lint", file], {
      stdio: "inherit",
    });
    if (result.status !== 0) {
      errors.push(`DESIGN.md lint failed: ${file}`);
    }
  }

  if (metaFiles.length === 0 && designFiles.length === 0) {
    console.log("No catalog entries yet — content validation passed vacuously.");
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} content error(s):\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
  console.log(
    `\nValidated ${metaFiles.length} meta.yaml and ${designFiles.length} DESIGN.md file(s).`,
  );
}

await main();
