import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import { parse as parseYaml } from "yaml";
import { validateMeta } from "@agentds/shared";
import { findEntryDir } from "../lib/paths";
import { lintDesignMd, type LintResult } from "../lib/design-md";

/**
 * Validate an entry: meta.yaml against the shared schema, and DESIGN.md via the
 * official linter. Persists `lint-report.json` next to the entry and exits
 * non-zero on any schema error or linter error (F-6/F-8 publish gate).
 */
export async function runValidate(slug: string): Promise<void> {
  const entry = findEntryDir(slug);
  if (!entry) {
    console.error(pc.red(`No entry found for slug "${slug}" under content/.`));
    process.exitCode = 1;
    return;
  }

  const problems: string[] = [];

  // 1. meta.yaml schema.
  const metaPath = join(entry.dir, "meta.yaml");
  if (!existsSync(metaPath)) {
    problems.push("meta.yaml is missing");
  } else {
    const meta: unknown = parseYaml(await readFile(metaPath, "utf8"));
    const result = validateMeta(meta);
    if (!result.success) {
      for (const issue of result.error.issues) {
        problems.push(`meta.yaml ${issue.path.join(".") || "(root)"}: ${issue.message}`);
      }
    } else {
      console.log(pc.green("ok"), "meta.yaml schema");
    }
  }

  // 2. DESIGN.md linter (only if the file exists — it is created by `generate`).
  const designPath = join(entry.dir, "DESIGN.md");
  let lint: LintResult | null = null;
  if (!existsSync(designPath)) {
    console.log(pc.yellow("skip"), "DESIGN.md not generated yet");
  } else {
    lint = lintDesignMd(designPath);
    await writeFile(join(entry.dir, "lint-report.json"), JSON.stringify(lint, null, 2), "utf8");
    const { errors, warnings, infos } = lint.summary;
    const label = `${errors} error(s), ${warnings} warning(s), ${infos} info(s)`;
    if (errors > 0) {
      problems.push(`DESIGN.md lint: ${label}`);
      for (const f of lint.findings.filter((x) => x.severity === "error")) {
        problems.push(`  - ${f.message}`);
      }
    } else {
      console.log(pc.green("ok"), `DESIGN.md lint (${label})`);
    }
  }

  if (problems.length > 0) {
    console.error(pc.red(`\nValidation failed for "${slug}":`));
    for (const p of problems) console.error(pc.red(`  ${p}`));
    process.exitCode = 1;
    return;
  }
  console.log(pc.green(`\n${slug}: validation passed.`));
}
