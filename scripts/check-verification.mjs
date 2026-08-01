#!/usr/bin/env node
/**
 * Publish gate: a `status: published` entry must carry a passing, current
 * source-verification report.
 *
 * The catalog previously shipped 42 published entries whose QA tables asserted
 * agreement with a source nothing had ever compared against. This check is the
 * offline half of the fix — it runs with no network, so it can gate every PR:
 * it confirms a report exists, that it passed, and that the colors it certifies
 * are still the colors in DESIGN.md. Drift against the live upstream is caught
 * separately by the scheduled `verify-sources` workflow, which does hit the
 * network.
 *
 * Run locally: pnpm check:verification
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const contentDir = join(repoRoot, "content");

/** Colors declared in a DESIGN.md's YAML front matter, lowercased. */
function frontMatterColors(markdown) {
  const end = markdown.indexOf("\n---", 3);
  if (!markdown.startsWith("---") || end === -1) return null;
  const frontMatter = markdown.slice(3, end);
  const block = /\ncolors:\n((?: {2}\S.*\n)+)/.exec(frontMatter);
  if (!block) return {};
  const colors = {};
  for (const line of block[1].split("\n")) {
    const m = /^ {2}([\w-]+):\s*"?(#[0-9a-fA-F]{3,8})"?/.exec(line);
    if (m) colors[m[1]] = m[2].toLowerCase();
  }
  return colors;
}

async function main() {
  if (!existsSync(contentDir)) {
    console.log("No content/ directory — nothing to check.");
    return;
  }

  const problems = [];
  let checked = 0;

  for (const group of await readdir(contentDir, { withFileTypes: true })) {
    if (!group.isDirectory()) continue;
    const groupDir = join(contentDir, group.name);
    for (const entry of await readdir(groupDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = join(groupDir, entry.name);
      const metaPath = join(dir, "meta.yaml");
      if (!existsSync(metaPath)) continue;

      const meta = await readFile(metaPath, "utf8");
      const published = /^status:\s*published\s*$/m.test(meta);
      if (!published) continue;
      checked += 1;

      const rel = `content/${group.name}/${entry.name}`;
      const reportPath = join(dir, "verify-report.json");
      if (!existsSync(reportPath)) {
        problems.push(
          `${rel}: published with no verify-report.json — run \`pnpm pipeline verify ${entry.name}\``,
        );
        continue;
      }

      let report;
      try {
        report = JSON.parse(await readFile(reportPath, "utf8"));
      } catch (error) {
        problems.push(`${rel}: verify-report.json is not valid JSON (${error.message})`);
        continue;
      }

      if (report.inconclusive) {
        problems.push(
          `${rel}: published but verification was inconclusive (only ${report.sourceColorCount} source colors recovered)`,
        );
        continue;
      }
      if (report.score?.unmatched > 0) {
        problems.push(
          `${rel}: ${report.score.unmatched} color(s) do not occur in the cited source`,
        );
      }

      // The report certifies specific values; if DESIGN.md has moved on, the
      // certification no longer applies to what would actually ship.
      const design = await readFile(join(dir, "DESIGN.md"), "utf8");
      const current = frontMatterColors(design);
      if (current === null) {
        problems.push(`${rel}: DESIGN.md has no parseable front matter`);
        continue;
      }
      const certified = new Map((report.colors ?? []).map((c) => [c.token, c.value.toLowerCase()]));
      for (const [token, value] of Object.entries(current)) {
        const seen = certified.get(token);
        if (seen === undefined) {
          problems.push(`${rel}: colors.${token} was added after the last verification`);
        } else if (seen !== value) {
          problems.push(`${rel}: colors.${token} is ${value} but was verified as ${seen}`);
        }
      }
    }
  }

  if (problems.length > 0) {
    console.error(`\n${problems.length} verification problem(s):`);
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error("\nRe-run `pnpm pipeline verify <slug> --fix`, or set the entry to draft.");
    process.exit(1);
  }
  console.log(`Verification gate passed: ${checked} published entr${checked === 1 ? "y" : "ies"}.`);
}

await main();
