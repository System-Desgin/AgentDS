# QA — fluent-2

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the documented Fluent 2 web light theme (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: proprietary Segoe UI Variable substituted (→ Open Sans); code uses Cascadia Code (OFL); originals named in prose
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** `@fluentui/tokens` ships CSS-var
> names (JS), not a resolved static value file. Values below are the **documented
> Fluent 2 web light theme** roles. A human reviewer must cross-check against
> fluent2.microsoft.design before `status: published`.

| Token (file)              | Value in file | Source (Fluent 2 light role)  | OK  |
| ------------------------- | ------------- | ----------------------------- | --- |
| colors.primary            | #0F6CBD       | colorBrandBackground          | ✓   |
| colors.primary-strong     | #115EA3       | colorBrandBackgroundHover     | ✓   |
| colors.link               | #0F6CBD       | colorBrandForegroundLink      | ✓   |
| colors.on-surface         | #242424       | colorNeutralForeground1       | ✓   |
| colors.on-surface-variant | #616161       | colorNeutralForeground3       | ✓   |
| colors.surface            | #FFFFFF       | colorNeutralBackground1       | ✓   |
| colors.surface-variant    | #F5F5F5       | colorNeutralBackground3       | ✓   |
| colors.border             | #D1D1D1       | colorNeutralStroke1           | ✓   |
| colors.border-weak        | #E0E0E0       | colorNeutralStroke2           | ✓   |
| colors.success            | #107C10       | colorStatusSuccessForeground1 | ✓   |
| colors.error              | #C50F1F       | colorStatusDangerBackground3  | ✓   |

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Cross-check the neutral/brand ramp + type/radius scale against fluent2.microsoft.design
  (values are canonical light-theme roles, not extracted from a static token file).
- Reviewer: Oday Bakkour (publish directed by owner, Claude Code session)
- Date: 2026-07-21
