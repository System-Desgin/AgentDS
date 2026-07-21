# QA — carbon

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0); `restricted: false`
- [x] Fonts: IBM Plex Sans / IBM Plex Mono are open (SIL OFL, Google Fonts) — no substitution needed
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Colours grounded in the extraction of `@carbon/styles@1.110.0` (`css/styles.css`,
default white theme `--cds-*` custom properties). Radius / spacing / type scale use
canonical Carbon values (2/8px grid, Type set) — cross-check against carbondesignsystem.com.

| Token (file)              | Value in file | Value in source (white theme)                  | OK  |
| ------------------------- | ------------- | ---------------------------------------------- | --- |
| colors.primary            | #0F62FE       | --cds-background-brand #0f62fe                 | ✓   |
| colors.on-surface         | #161616       | --cds-text-primary #161616                     | ✓   |
| colors.on-surface-variant | #525252       | --cds-text-secondary #525252                   | ✓   |
| colors.helper             | #6F6F6F       | --cds-text-helper #6f6f6f                      | ✓   |
| colors.surface            | #FFFFFF       | --cds-background #ffffff                       | ✓   |
| colors.surface-variant    | #F4F4F4       | --cds-layer-01 / --cds-field-01 #f4f4f4        | ✓   |
| colors.border-subtle      | #E0E0E0       | --cds-border-subtle-00 #e0e0e0                 | ✓   |
| colors.border-strong      | #8D8D8D       | --cds-border-strong-01 #8d8d8d                 | ✓   |
| colors.success            | #24A148       | --cds-support-success #24a148                  | ✓   |
| colors.warning            | #F1C21B       | --cds-support-warning #f1c21b                  | ✓   |
| colors.error              | #DA1E28       | --cds-support-error #da1e28                    | ✓   |
| (link / interactive)      | #0F62FE       | --cds-link-primary / --cds-interactive #0f62fe | ✓   |

## Sign-off

- Automated checks (schema, lint, colour spot-check, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then); confirm radius/spacing/type-scale against carbondesignsystem.com.
- Reviewer: Oday Bakkour (publish directed by owner, Claude Code session)
- Date: 2026-07-21
