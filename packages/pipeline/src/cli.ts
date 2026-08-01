#!/usr/bin/env node
import { Command } from "commander";
import { runNew } from "./commands/new";
import { runExtract } from "./commands/extract";
import { runGenerate } from "./commands/generate";
import { runValidate } from "./commands/validate";
import { runExport } from "./commands/export";
import { runVerify } from "./commands/verify";

const program = new Command();

program
  .name("agentds-pipeline")
  .description("AgentDS content pipeline: extract | generate | validate | verify | export | new")
  .version("0.0.0");

program
  .command("new")
  .argument("<slug>", "kebab-case slug for the entry")
  .option("--path <path>", "catalog path: official | brand-look", "official")
  .description("Scaffold a new catalog entry (folder + meta.yaml + QA.md)")
  .action((slug: string, options: { path: string }) => runNew(slug, options.path));

program
  .command("extract")
  .argument("<slug>", "entry slug")
  .description("Extract + normalize tokens with provenance (Phase 1)")
  .action((slug: string) => runExtract(slug));

program
  .command("generate")
  .argument("<slug>", "entry slug")
  .description("Generate DESIGN.md prose via headless Claude Code (Phase 1)")
  .action((slug: string) => runGenerate(slug));

program
  .command("validate")
  .argument("<slug>", "entry slug")
  .description("Validate meta.yaml + run the official DESIGN.md linter (Phase 1)")
  .action((slug: string) => runValidate(slug));

program
  .command("verify")
  .argument("[slug]", "entry slug (omit with --all)")
  .option("--all", "verify every catalog entry")
  .option("--fix", "rewrite drifted values to the source value, preserving WCAG AA")
  .description("Check a published DESIGN.md's tokens against its cited source")
  .action((slug: string | undefined, options: { all?: boolean; fix?: boolean }) =>
    runVerify(slug, options),
  );

program
  .command("export")
  .argument("<slug>", "entry slug")
  .description("Export tokens.json, tailwind.css, bundle.zip (Phase 1)")
  .action((slug: string) => runExport(slug));

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
