import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import { parseMetaYaml } from "@agentds/shared";
import { findEntryDir } from "../lib/paths";
import { extractNpmTokens } from "../extract/npm-tokens";
import { extractRepoJson } from "../extract/repo-json";
import type { ExtractResult } from "../model/tokens";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Extract a system's source tokens into `tokens.raw.json` with provenance.
 * Adapter is chosen by `meta.provenance.source_type`:
 *   - npm  → fetch the package's token JSON via jsDelivr
 *   - repo → fetch raw token JSON URLs from `provenance.urls`
 *   - css-analysis (Brand Looks) → documented manual capture (not auto-fetched)
 * Curating these raw tokens into the compact DESIGN.md happens in generate + QA.
 */
export async function runExtract(slug: string): Promise<void> {
  const entry = findEntryDir(slug);
  if (!entry) {
    console.error(pc.red(`No entry found for slug "${slug}" under content/.`));
    process.exitCode = 1;
    return;
  }

  const meta = parseMetaYaml(await readFile(join(entry.dir, "meta.yaml"), "utf8"));
  const provenance = meta.provenance;
  const extractedAt = today();

  let result: ExtractResult;
  if (provenance.source_type === "npm") {
    if (!provenance.package || !provenance.version) {
      console.error(pc.red("npm provenance requires `package` and `version` in meta.yaml."));
      process.exitCode = 1;
      return;
    }
    console.log(pc.dim(`Fetching ${provenance.package}@${provenance.version} via jsDelivr…`));
    result = await extractNpmTokens(provenance.package, provenance.version, extractedAt);
  } else if (provenance.source_type === "repo") {
    if (!provenance.urls?.length) {
      console.error(pc.red("repo provenance requires `urls` (raw token JSON URLs) in meta.yaml."));
      process.exitCode = 1;
      return;
    }
    result = await extractRepoJson(provenance.urls, extractedAt);
  } else {
    console.log(pc.yellow("css-analysis extraction is a documented manual capture (Brand Looks)."));
    console.log(
      pc.dim(
        "Collect :root custom properties + computed styles of canonical elements per\n" +
          "docs/04-DATA-SOURCES.md §5, then hand-author tokens.raw.json.",
      ),
    );
    return;
  }

  const tokenCount = Object.keys(result.rawTokens).length;
  const payload = {
    slug,
    extractedAt,
    source: provenance,
    files: result.files,
    tokenCount,
    tokens: result.rawTokens,
  };
  await writeFile(join(entry.dir, "tokens.raw.json"), JSON.stringify(payload, null, 2), "utf8");

  if (tokenCount === 0) {
    console.error(
      pc.yellow(`Extracted 0 tokens for "${slug}" — verify the source paths in meta.yaml.`),
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    pc.green(`${slug}: extracted ${tokenCount} tokens`),
    pc.dim(`from ${result.files.length} file(s) → tokens.raw.json`),
  );
}
