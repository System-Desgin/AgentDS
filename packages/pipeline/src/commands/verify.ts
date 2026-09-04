import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import {
  extractDesignFrontMatter,
  parseMetaYaml,
  type DesignTokens,
  type Provenance,
} from "@agentds/shared";
import { findEntryDir } from "../lib/paths";
import { collectHexes, deltaE, nearestColor, normalizeHex } from "../lib/color";
import { captureSiteCss } from "../extract/site-css";
import { extractNpmTokens, MIN_PALETTE_COLORS } from "../extract/npm-tokens";
import {
  applyColorTokenChanges,
  applySubstitution,
  contrastPairs,
  groundColors,
  substitutionMap,
  type ColorChange,
} from "../lib/ground-colors";
import { extractRepoJson } from "../extract/repo-json";
import { recomputeContrastClaims } from "../lib/contrast-claims";
import {
  addColorTokens,
  documentStatusTokens,
  missingRoles,
  pickStatusColor,
} from "../lib/status-roles";
import { buildVerificationSection, upsertVerificationSection } from "../templates/qa-verification";

/**
 * Verify a published entry's DESIGN.md against its own cited source.
 *
 * Both catalog paths ship provenance, but nothing ever checked that the tokens
 * in a file actually occur in that source — QA sign-off was a hand-written
 * table. This command re-derives the source token layer and reports, per
 * token, whether the published value is really there. It is the gate that lets
 * `status: published` mean something.
 *
 * Verdicts (CIEDE2000 against the nearest source color):
 *   exact     identical hex
 *   close     ΔE ≤ 2   — same color, rounding-level difference
 *   drift     ΔE ≤ 5   — right family, wrong step in the ramp
 *   unmatched ΔE > 5   — not a color the source uses
 */

const CLOSE = 2;
const DRIFT = 5;

export type Verdict = "exact" | "close" | "drift" | "unmatched";

export interface ColorFinding {
  token: string;
  value: string;
  nearest: string | null;
  deltaE: number | null;
  verdict: Verdict;
}

export interface VerifyReport {
  slug: string;
  path: string;
  status: string;
  sourceType: string;
  verifiedAt: string;
  sources: string[];
  sourceColorCount: number;
  /**
   * True when the recovered source palette is too thin to judge against. The
   * failure is ours (the adapter missed the token files), so findings are
   * reported as unproven rather than as content defects.
   */
  inconclusive: boolean;
  colors: ColorFinding[];
  missingRoles: string[];
  score: { exact: number; close: number; drift: number; unmatched: number; total: number };
}

interface GroundTruth {
  colors: Set<string>;
  sources: string[];
}

/** Every hex appearing anywhere in a flattened raw-token map. */
function colorsFromRawTokens(tokens: Record<string, unknown>): Set<string> {
  return collectHexes(Object.values(tokens));
}

/**
 * Re-derive the source token layer. Prefers a live fetch so the check is real;
 * falls back to a committed `tokens.raw.json` when the network path is not
 * applicable.
 */
async function groundTruthFor(dir: string, provenance: Provenance): Promise<GroundTruth | null> {
  const today = new Date().toISOString().slice(0, 10);

  if (provenance.source_type === "css-analysis") {
    if (!provenance.urls?.length) return null;
    const capture = await captureSiteCss(provenance.urls, today);
    if (!capture.files.length) return null;
    return { colors: new Set(capture.colors), sources: capture.files };
  }

  if (provenance.source_type === "npm" && provenance.package && provenance.version) {
    const result = await extractNpmTokens(provenance.package, provenance.version, today);
    if (Object.keys(result.rawTokens).length) {
      return { colors: colorsFromRawTokens(result.rawTokens), sources: result.files };
    }
  }

  if (provenance.source_type === "repo" && provenance.urls?.length) {
    const result = await extractRepoJson(provenance.urls, today);
    if (Object.keys(result.rawTokens).length) {
      return { colors: colorsFromRawTokens(result.rawTokens), sources: result.files };
    }
  }

  const rawPath = join(dir, "tokens.raw.json");
  if (existsSync(rawPath)) {
    const raw: unknown = JSON.parse(await readFile(rawPath, "utf8"));
    const tokens = (raw as { tokens?: Record<string, unknown> }).tokens ?? {};
    return { colors: colorsFromRawTokens(tokens), sources: ["tokens.raw.json (committed)"] };
  }

  return null;
}

function classify(distance: number): Verdict {
  if (distance === 0) return "exact";
  if (distance <= CLOSE) return "close";
  if (distance <= DRIFT) return "drift";
  return "unmatched";
}

const VERDICT_COLOR: Record<Verdict, (s: string) => string> = {
  exact: pc.green,
  close: pc.green,
  drift: pc.yellow,
  unmatched: pc.red,
};

/**
 * Rewrite an entry so every color traces to its source, then regenerate the
 * derived artifacts. Front-matter values are rewritten by token name; prose
 * and QA hexes are substituted only when the old value maps unambiguously to
 * one new value. Ambiguous prose is reported for human review instead of
 * risking an unrelated token with the same hex.
 */
async function applyFix(
  dir: string,
  design: DesignTokens,
  sourceColors: Set<string>,
): Promise<ColorChange[]> {
  const publishedColors = (design.colors ?? {}) as Record<string, string>;
  const result = groundColors(
    publishedColors,
    sourceColors,
    contrastPairs((design.components ?? {}) as Record<string, Record<string, string | number>>),
  );
  if (result.changes.length === 0) return [];

  const { map, ambiguous } = substitutionMap(result.changes, publishedColors);
  if (ambiguous.length) {
    console.log(
      pc.yellow(
        `    skipped ${ambiguous.length} value(s) shared by tokens with different targets: ${ambiguous.join(", ")}`,
      ),
    );
  }

  const designPath = join(dir, "DESIGN.md");
  const original = await readFile(designPath, "utf8");
  const globallySubstituted = applySubstitution(original, map);
  const substituted = applyColorTokenChanges(globallySubstituted, result.changes);

  // Ratios quoted in the prose were measured against the old values, so they
  // have to be recomputed or the file ships wrong accessibility numbers.
  const claims = recomputeContrastClaims(substituted, result.colors);
  if (substituted !== original || claims.text !== substituted) {
    await writeFile(designPath, claims.text, "utf8");
  }
  for (const update of claims.updated) {
    console.log(pc.dim(`    contrast claim ${update.from} → ${update.to}`));
  }
  if (claims.stale.length) {
    console.log(
      pc.yellow(
        `    ${claims.stale.length} contrast claim(s) need a human check (no resolvable pair): ${claims.stale.join(", ")}`,
      ),
    );
  }

  for (const item of result.unresolved) {
    console.log(
      pc.red(
        `    ${item.component}: no source color clears AA on its background (best ${item.ratio}:1)`,
      ),
    );
  }
  return result.changes;
}

/**
 * Add the status roles an entry never declared, taking the values from its own
 * source. Without them the sample screens substitute another system's palette.
 */
async function addMissingStatusRoles(
  dir: string,
  design: DesignTokens,
  sourceColors: Set<string>,
): Promise<Record<string, string>> {
  const declared = Object.keys(design.colors ?? {});
  const absent = missingRoles(declared);
  if (absent.length === 0) return {};

  const surface =
    (design.colors as Record<string, string> | undefined)?.["surface"] ??
    (design.colors as Record<string, string> | undefined)?.["background"] ??
    "#FFFFFF";

  const additions: Record<string, string> = {};
  for (const role of absent) {
    const hex = pickStatusColor(role as "success" | "warning" | "error", sourceColors, surface);
    if (hex) additions[role] = hex;
  }
  if (Object.keys(additions).length === 0) return {};

  const designPath = join(dir, "DESIGN.md");
  const current = await readFile(designPath, "utf8");
  const withTokens = addColorTokens(current, additions);
  await writeFile(designPath, documentStatusTokens(withTokens, additions, surface), "utf8");
  return additions;
}

/** Verify one entry; returns the report, or null when it could not be checked. */
export async function verifyEntry(slug: string, fix = false): Promise<VerifyReport | null> {
  const entry = findEntryDir(slug);
  if (!entry) return null;

  const meta = parseMetaYaml(await readFile(join(entry.dir, "meta.yaml"), "utf8"));
  let design = extractDesignFrontMatter(await readFile(join(entry.dir, "DESIGN.md"), "utf8"));
  if (!design) return null;

  const truth = await groundTruthFor(entry.dir, meta.provenance);
  if (!truth || truth.colors.size === 0) return null;

  const inconclusive =
    truth.colors.size < Math.max(MIN_PALETTE_COLORS, Object.keys(design.colors ?? {}).length);

  // Never rewrite content against a palette we failed to recover — that would
  // snap good values onto whatever few colors happened to come back.
  if (fix && !inconclusive) {
    const changes = await applyFix(entry.dir, design, truth.colors);
    if (changes.length) {
      console.log(`\n${pc.bold(slug)} ${pc.dim("— grounded")} ${changes.length} color(s):`);
      for (const change of changes) {
        const note = change.contrastRepair
          ? pc.dim(
              ` (kept AA on ${change.contrastRepair.component}: ${change.contrastRepair.ratio}:1)`,
            )
          : "";
        console.log(
          `    ${change.token.padEnd(22)} ${change.from} → ${pc.green(change.to)}${note}`,
        );
      }
      design =
        extractDesignFrontMatter(await readFile(join(entry.dir, "DESIGN.md"), "utf8")) ?? design;
    }

    const added = await addMissingStatusRoles(entry.dir, design, truth.colors);
    if (Object.keys(added).length) {
      const list = Object.entries(added)
        .map(([role, hex]) => `${role} ${pc.green(hex)}`)
        .join(", ");
      console.log(`    added status role(s) from source: ${list}`);
      design =
        extractDesignFrontMatter(await readFile(join(entry.dir, "DESIGN.md"), "utf8")) ?? design;
    }
  }

  const colors: ColorFinding[] = [];
  for (const [token, rawValue] of Object.entries(design.colors ?? {})) {
    const value = normalizeHex(rawValue);
    if (!value) continue;
    const match = nearestColor(value, truth.colors);
    const distance = match ? Number(deltaE(value, match.hex).toFixed(2)) : null;
    colors.push({
      token,
      value,
      nearest: match?.hex ?? null,
      deltaE: distance,
      verdict: distance === null ? "unmatched" : classify(distance),
    });
  }

  const absentRoles = missingRoles(Object.keys(design.colors ?? {}));

  const score = {
    exact: colors.filter((c) => c.verdict === "exact").length,
    close: colors.filter((c) => c.verdict === "close").length,
    drift: colors.filter((c) => c.verdict === "drift").length,
    unmatched: colors.filter((c) => c.verdict === "unmatched").length,
    total: colors.length,
  };

  const report: VerifyReport = {
    slug,
    path: entry.path,
    status: meta.status,
    sourceType: meta.provenance.source_type,
    verifiedAt: new Date().toISOString().slice(0, 10),
    sources: truth.sources,
    sourceColorCount: truth.colors.size,
    inconclusive,
    colors,
    missingRoles: absentRoles,
    score,
  };

  // The hand-written QA table asserted source agreement that nothing had
  // checked. Replace it with a statement of what was actually verified.
  if (fix && !inconclusive) {
    const qaPath = join(entry.dir, "QA.md");
    if (existsSync(qaPath)) {
      const qa = await readFile(qaPath, "utf8");
      const next = upsertVerificationSection(qa, buildVerificationSection(report));
      if (next !== qa) await writeFile(qaPath, next, "utf8");
    }
  }

  return report;
}

function printReport(report: VerifyReport): void {
  const { score } = report;
  const grounded = score.exact + score.close;
  const pct = score.total ? Math.round((grounded / score.total) * 100) : 0;
  const headline = pct >= 90 ? pc.green : pct >= 60 ? pc.yellow : pc.red;

  console.log(
    `\n${pc.bold(report.slug)} ${pc.dim(`(${report.path}, ${report.sourceType}, status: ${report.status})`)}`,
  );
  console.log(
    pc.dim(
      `  source: ${report.sources.length} file(s), ${report.sourceColorCount} distinct colors`,
    ),
  );

  if (report.inconclusive) {
    console.log(
      pc.yellow(
        `  INCONCLUSIVE — recovered only ${report.sourceColorCount} source colors; ` +
          "the extractor did not find this system's palette.",
      ),
    );
    console.log(pc.dim("    Fix the source adapter before reading anything into these tokens."));
    return;
  }

  console.log(
    `  grounded ${headline(`${grounded}/${score.total} (${pct}%)`)} ` +
      pc.dim(
        `exact ${score.exact} · close ${score.close} · drift ${score.drift} · unmatched ${score.unmatched}`,
      ),
  );

  for (const finding of report.colors) {
    if (finding.verdict === "exact" || finding.verdict === "close") continue;
    const paint = VERDICT_COLOR[finding.verdict];
    const nearest = finding.nearest
      ? `nearest source ${finding.nearest} (ΔE ${finding.deltaE})`
      : "no comparable source color";
    console.log(
      `    ${paint(finding.verdict.padEnd(9))} ${finding.token.padEnd(22)} ${finding.value}  ${pc.dim(nearest)}`,
    );
  }

  if (report.missingRoles.length) {
    console.log(
      pc.yellow(`    missing   status roles: ${report.missingRoles.join(", ")}`) +
        pc.dim(" (source has no AA-passing color in that hue; previews stay neutral)"),
    );
  }
}

/**
 * Verify one slug, or every published entry with `--all`. Writes
 * `verify-report.json` next to each entry and exits non-zero when any entry
 * has unmatched colors, so CI can gate on it.
 */
export async function runVerify(
  slug: string | undefined,
  options: { all?: boolean; fix?: boolean },
): Promise<void> {
  const { readdir } = await import("node:fs/promises");
  const { findRepoRoot } = await import("../lib/paths");

  let slugs: string[];
  if (options.all) {
    const root = findRepoRoot();
    slugs = (
      await Promise.all(
        ["official", "brand-looks"].map(async (dir) =>
          (await readdir(join(root, "content", dir), { withFileTypes: true }))
            .filter((e) => e.isDirectory())
            .map((e) => e.name),
        ),
      )
    ).flat();
  } else if (slug) {
    slugs = [slug];
  } else {
    console.error(pc.red("Pass a slug or --all."));
    process.exitCode = 1;
    return;
  }

  const reports: VerifyReport[] = [];
  const skipped: string[] = [];

  for (const current of slugs) {
    const report = await verifyEntry(current, options.fix).catch(() => null);
    if (!report) {
      skipped.push(current);
      continue;
    }
    reports.push(report);
    printReport(report);
    const entry = findEntryDir(current);
    if (entry) {
      await writeFile(
        join(entry.dir, "verify-report.json"),
        `${JSON.stringify(report, null, 2)}\n`,
        "utf8",
      );
    }
  }

  const judged = reports.filter((r) => !r.inconclusive);
  const inconclusive = reports.filter((r) => r.inconclusive);

  if (reports.length > 1) {
    const totals = judged.reduce(
      (acc, r) => ({
        grounded: acc.grounded + r.score.exact + r.score.close,
        total: acc.total + r.score.total,
        failing: acc.failing + (r.score.unmatched > 0 ? 1 : 0),
      }),
      { grounded: 0, total: 0, failing: 0 },
    );
    console.log(
      `\n${pc.bold("Catalog total")}  ${totals.grounded}/${totals.total} colors grounded in source ` +
        `· ${totals.failing}/${judged.length} verified entries have unmatched colors`,
    );
    if (inconclusive.length) {
      console.log(
        pc.yellow(
          `  inconclusive (extractor found no palette): ${inconclusive.map((r) => r.slug).join(", ")}`,
        ),
      );
    }
  }
  if (skipped.length) {
    console.log(pc.dim(`\nnot verifiable (no reachable source): ${skipped.join(", ")}`));
  }

  if (judged.some((r) => r.score.unmatched > 0)) process.exitCode = 1;
}
