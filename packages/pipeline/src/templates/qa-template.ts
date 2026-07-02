import type { SystemPath } from "@agentds/shared";

/** The human QA checklist (F-8) written into a new entry's QA.md. */
export function buildQaTemplate(slug: string, path: SystemPath): string {
  const brandLookNote =
    path === "brand-look"
      ? "\n- [ ] Disclaimer header present (pipeline-injected; never removed)\n"
      : "";

  return `# QA — ${slug}

> Sign this off before setting \`status: published\`. CI blocks unsigned entries.

## Checklist

- [ ] \`meta.yaml\` passes the shared schema (\`@agentds/shared\`)
- [ ] \`npx @google/design.md lint\` passes with zero errors (report attached)
- [ ] 10+ token values spot-checked against the official source (list below)
- [ ] Prose is written fresh — no copied text from upstream docs
- [ ] License SPDX + URL verified; \`restricted\` set correctly
- [ ] Fonts: proprietary families substituted; original named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius)${brandLookNote}
## Token spot-check (≥10)

| Token | Value in file | Value in source | OK |
| --- | --- | --- | --- |
|  |  |  |  |

## Sign-off

- Reviewer:
- Date:
`;
}
