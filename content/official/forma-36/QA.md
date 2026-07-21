# QA — forma-36

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, `package.json` of `@contentful/f36-tokens@6.2.1` + repo `LICENSE.md`); `restricted: false`
- [x] Fonts: token stack leads with Geist Sans / Geist Mono (open, SIL OFL, not on the preview loader allow-list) — substituted with Inter / JetBrains Mono in tokens; true stack named in prose
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `@contentful/f36-tokens@6.2.1` via extraction (`tokens.raw.json`, 315
color tokens). The extractor keeps color values only; typography, spacing,
radius, and motion values below were read directly from the same package's
`dist/json/*.json` files (font-size, line-height, font-weight, font-stack,
spacing, border-radius, transition-durations) at the pinned version.

| Token (file)                | Value in file | Value in source                              | OK  |
| --------------------------- | ------------- | -------------------------------------------- | --- |
| colors.primary              | #0059C8       | color-primary / color-blue-base #0059C8      | ✓   |
| colors.primary-strong       | #0041AB       | blue-700 / color-blue-dark #0041AB           | ✓   |
| colors.primary-tint         | #E8F5FF       | blue-100 / color-blue-lightest #E8F5FF       | ✓   |
| colors.surface              | #FFFFFF       | color-white #ffffff                          | ✓   |
| colors.surface-variant      | #F7F9FA       | gray-100 / color-element-lightest #F7F9FA    | ✓   |
| colors.on-surface           | #1B273A       | color-text-base / gray-800 #1B273A           | ✓   |
| colors.on-surface-variant   | #414D63       | color-text-mid / gray-700 #414D63            | ✓   |
| colors.subdued              | #67728A       | color-text-lightest / gray-500 #67728A       | ✓   |
| colors.border               | #CFD9E0       | gray-300 / color-element-mid #CFD9E0         | ✓   |
| colors.border-subtle        | #E7EBEE       | gray-200 / color-element-light #E7EBEE       | ✓   |
| colors.positive             | #006D23       | color-positive / green-600 #006D23           | ✓   |
| colors.warning              | #CC4500       | color-warning / orange-500 #CC4500           | ✓   |
| colors.negative             | #BD002A       | color-negative / red-600 #BD002A             | ✓   |
| rounded.sm                  | 4px           | border-radius-small 4px                      | ✓   |
| rounded.md                  | 6px           | border-radius-medium 6px                     | ✓   |
| spacing.md                  | 1rem          | spacing-m 1rem                               | ✓   |
| spacing.3xl                 | 4rem          | spacing-3xl 4rem                             | ✓   |
| typography.body.fontSize    | 0.875rem      | font-size-m 0.875rem (line-height-m 1.25rem) | ✓   |
| typography.display.fontSize | 2.25rem       | font-size-3xl 2.25rem (line-height-3xl 3rem) | ✓   |
| typography.label.fontWeight | 500           | font-weight-medium 500                       | ✓   |

Notes:

- `rounded.full` (9999px) is not a shipped token — Forma 36 defines only
  `border-radius-small` (4px) and `border-radius-medium` (6px). It is the
  standard circle radius for avatars/pills and is flagged here for the
  reviewer.
- `typography.*.fontFamily` is Inter / JetBrains Mono by substitution; the
  shipped `font-stack-primary` leads with Geist Sans and `font-stack-monospace`
  with Geist Mono (both open, SIL OFL). Substitution applied because Geist is
  not on the preview loader allow-list; the true stack is named in DESIGN.md
  prose.
- All component text/background pairings were checked at or above WCAG AA
  4.5:1 (lowest: `colors.warning` #CC4500 on white at 4.75:1; `colors.subdued`
  #67728A on white at 4.83:1). Zero lint contrast warnings.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
