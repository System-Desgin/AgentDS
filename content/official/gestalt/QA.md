# QA — gestalt

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, `gestalt-design-tokens@177.0.12` package.json + repo LICENSE); `restricted: false`
- [x] Fonts: Gestalt uses the platform system stack (no brand font); open Inter used as the stand-in, JetBrains Mono for the SF Mono code stack; the true stacks are named in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `gestalt-design-tokens@177.0.12`, classic theme (light), via extraction
(`tokens.raw.json`, namespace `dist_json_classic_variables_light`). Line heights
come from the package's base line-height scale
(`dist_json_vr_theme_variables_font_lineheight_default.base-font-lineheight-*`).

| Token (file)                  | Value in file | Value in source                         | OK  |
| ----------------------------- | ------------- | --------------------------------------- | --- |
| colors.primary                | #E60023       | color-background-primary-base #e60023   | ✓   |
| colors.primary-strong         | #B60000       | color-background-primary-strong #b60000 | ✓   |
| colors.on-primary             | #FFFFFF       | color-text-inverse #ffffff              | ✓   |
| colors.surface                | #FFFFFF       | color-background-default #ffffff        | ✓   |
| colors.surface-variant        | #E9E9E9       | color-background-secondary-base #e9e9e9 | ✓   |
| colors.on-surface             | #111111       | color-text-default #111111              | ✓   |
| colors.on-surface-variant     | #767676       | color-text-subtle #767676               | ✓   |
| colors.border                 | #CDCDCD       | color-border-container #cdcdcd          | ✓   |
| colors.border-strong          | #767676       | color-border-default #767676            | ✓   |
| colors.info                   | #0074E8       | color-background-info-base #0074e8      | ✓   |
| colors.success                | #008753       | color-background-success-base #008753   | ✓   |
| colors.warning                | #BD5B00       | color-background-warning-base #bd5b00   | ✓   |
| colors.error                  | #CC0000       | color-text-error #cc0000                | ✓   |
| rounded.md                    | 8px           | rounding-200 8px                        | ✓   |
| rounded.full                  | 999px         | rounding-pill 999px                     | ✓   |
| spacing.md                    | 16px          | space-400 16px                          | ✓   |
| typography.body.fontSize      | 1rem          | font-size-300 16px                      | ✓   |
| typography.display.fontSize   | 2.25rem       | font-size-600 36px                      | ✓   |
| typography.display.fontWeight | 700           | font-weight-bold 700                    | ✓   |

Notes:

- Font sizes map 1:1 to the classic scale: font-size-100 12px (label),
  font-size-200 14px (body-sm, code), font-size-300 16px (body), font-size-400
  20px (heading), font-size-500 28px (heading-lg), font-size-600 36px (display).
- `fontFamily` values are open stand-ins by design: the extracted
  `font-family-default-latin` is the platform system stack (starts
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, …`) and
  `font-family-code` is an SF Mono stack; tokens carry Inter / JetBrains Mono
  and the prose names the true stacks (docs/04-DATA-SOURCES.md §5).
- Button/badge paddings and the pill silhouette are authored from Gestalt's
  documented component shapes, not token values (the package tokenizes colors,
  type, rounding, spacing, opacity, elevation, and motion — not paddings).

## Contrast check (0 warnings)

All component text/background pairings pass WCAG AA 4.5:1. Two are close to
the line and worth knowing about — both are Gestalt's real pairings, kept
exactly as shipped:

- white on `primary` #E60023 — 4.78:1 (Pinterest's actual primary button)
- white on `info` #0074E8 — 4.50:1 (info/shopping badge fill; borderline, do
  not lighten this blue)

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
