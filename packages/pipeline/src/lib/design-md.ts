import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Locate the official `design.md` CLI binary (from the @google/design.md
 * dependency). pnpm installs it into the pipeline package's node_modules/.bin,
 * so walk up from this module until we find it; fall back to PATH.
 */
export function findDesignMdBin(): string {
  let dir = __dirname;
  for (let depth = 0; depth < 12; depth += 1) {
    const candidate = join(dir, "node_modules", ".bin", "design.md");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return "design.md";
}

export interface LintSummary {
  errors: number;
  warnings: number;
  infos: number;
}

export interface LintFinding {
  severity: string;
  message: string;
}

export interface LintResult {
  summary: LintSummary;
  findings: LintFinding[];
}

/**
 * Run the official linter on a DESIGN.md file and return its structured report.
 * The CLI prints JSON on both success and failure (exit code reflects errors),
 * so we parse stdout regardless of exit code.
 */
export function lintDesignMd(filePath: string): LintResult {
  const bin = findDesignMdBin();
  const res = spawnSync(bin, ["lint", filePath, "--format", "json"], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (res.error) {
    throw new Error(`Failed to run design.md lint: ${res.error.message}`);
  }
  const out = res.stdout?.trim();
  if (!out) {
    throw new Error(`design.md lint produced no output (stderr: ${res.stderr ?? ""})`);
  }
  return JSON.parse(out) as LintResult;
}

export type ExportFormat = "dtcg" | "css-tailwind" | "json-tailwind";

/** Run the official exporter and return the emitted file contents. */
export function exportDesignMd(filePath: string, format: ExportFormat): string {
  const bin = findDesignMdBin();
  const res = spawnSync(bin, ["export", filePath, "--format", format], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (res.error) {
    throw new Error(`Failed to run design.md export: ${res.error.message}`);
  }
  if (res.status !== 0) {
    throw new Error(`design.md export (${format}) failed: ${res.stderr || res.stdout}`);
  }
  return res.stdout ?? "";
}
