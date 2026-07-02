import type { Meta } from "@agentds/shared";

/**
 * Build the LICENSE-NOTICE.txt included in every bundle.zip: AgentDS's CC BY 4.0
 * attribution plus the upstream source's own license/provenance, and the
 * independence disclaimer for Brand Looks.
 */
export function buildLicenseNotice(meta: Meta): string {
  const lines: string[] = [];
  lines.push(`AgentDS — LICENSE NOTICE for ${meta.name} (${meta.maker})`);
  lines.push("");
  lines.push("AgentDS catalog content is licensed under CC BY 4.0:");
  lines.push("  https://creativecommons.org/licenses/by/4.0/");
  lines.push("  Attribution: AgentDS (https://agent-ds.oday-bakkour.com)");
  lines.push("");
  lines.push("Upstream source:");
  lines.push(`  license: ${meta.license.spdx} — ${meta.license.url}`);
  if (meta.license.notes) lines.push(`  notes: ${meta.license.notes}`);

  const p = meta.provenance;
  const source =
    p.source_type === "npm"
      ? `npm ${p.package ?? "?"}@${p.version ?? "?"}`
      : p.source_type === "repo"
        ? `repo ${p.repo ?? "?"}@${p.commit ?? "?"}`
        : `css-analysis ${(p.urls ?? []).join(", ")}`;
  lines.push(`  provenance: ${source} (extracted ${p.extracted_at})`);
  lines.push("");
  lines.push("Trademarks and proprietary fonts belong to their owners and are not licensed");
  lines.push("here; proprietary fonts are substituted and the original family is named in");
  lines.push("prose only.");

  if (meta.path === "brand-look") {
    lines.push("");
    lines.push(`Independent analysis of publicly observable design patterns. Not affiliated`);
    lines.push(`with, endorsed by, or sponsored by ${meta.maker}. Use as inspiration for an`);
    lines.push("original system.");
  }

  lines.push("");
  return lines.join("\n");
}
