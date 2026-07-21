# QA — vitamin

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the package source at the pinned version (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, from the package.json `license` field and the LICENSE file shipped in `@vtmn/css-design-tokens@1.1.3` and in Decathlon/vitamin-web); `restricted: false`
- [x] Fonts: Roboto and Roboto Condensed are free Google Fonts — no substitution needed. Tokens carry Roboto only (Roboto Condensed is not on the preview loader allow-list); the condensed display face is named in prose. Roboto Mono is used for `code` as the open companion — Vitamin defines no monospace face (noted in prose).
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: package-source verified by hand, auto-extract output unusable.**
> `pipeline extract` ran against `@vtmn/css-design-tokens@1.1.3` and wrote
> `tokens.raw.json`, but the extractor's CSS-variable regex does not match
> Vitamin's underscored names (`--vtmn-radius_100` style), so the captured
> names are mangled and only 23 stray fragments were kept. Every value below
> was instead read directly from the package's source CSS at the pinned
> version via jsDelivr (`src/themes/default.css`, `src/base-colors.css`,
> `src/radius.css`, `src/spacings.css`, `src/typography.css`), with HSL
> triplets converted to hex. A human reviewer should re-run the conversion or
> cross-check against decathlon.design before `status: published`.
>
> Reviewer heads-up: decathlon.design's 2024+ brand refresh shows a newer
> indigo (#3643BA); this token package (latest published, 1.1.3) still defines
> the blue400 family below. The entry follows the package.

| Token (file)                | Value in file | Value in source (`@vtmn/css-design-tokens@1.1.3`)                          | OK  |
| --------------------------- | ------------- | -------------------------------------------------------------------------- | --- |
| colors.primary              | #007DBC       | background-brand-primary → base-color_blue400 hsl(200,100%,36.9%)          | ✓   |
| colors.action               | #00699D       | content-action → base-color_blue500 hsl(200,100%,30.8%)                    | ✓   |
| colors.accent               | #FFE928       | background-accent → base-color_yellow400 hsl(54,100%,57.8%)                | ✓   |
| colors.on-surface           | #001018       | content-primary → base-color_black hsl(200,100%,4.7%)                      | ✓   |
| colors.on-surface-secondary | #4E5D6B       | content-secondary → base-color_grey600 hsl(209,15.7%,36.3%)                | ✓   |
| colors.on-surface-tertiary  | #687787       | content-tertiary → base-color_grey500 hsl(211,13%,46.9%)                   | ✓   |
| colors.surface-secondary    | #F7F8F9       | background-secondary → base-color_grey50 hsl(210,14.3%,97.3%)              | ✓   |
| colors.border               | #D9DDE1       | border-primary → base-color_grey200 hsl(210,11.8%,86.7%)                   | ✓   |
| colors.positive             | #23A942       | content-positive → base-color_conifer400 hsl(134,65.7%,40%)                | ✓   |
| colors.warning              | #FF600A       | content-warning → base-color_orange400 hsl(21,100%,52%)                    | ✓   |
| colors.negative             | #E32630       | content-negative → base-color_red400 hsl(357,77.1%,52%)                    | ✓   |
| rounded.sm                  | 4px           | --vtmn-radius_100: 4px                                                     | ✓   |
| rounded.pill                | 32px          | --vtmn-radius_700: 32px (used by `@vtmn/css-chip` border-radius)           | ✓   |
| spacing.md                  | 16px          | --vtmn-spacing_4: rem(16px)                                                | ✓   |
| typography.display.fontSize | 3.75rem       | --vtmn-typo_display-1-font-size: rem(60px) (mobile base)                   | ✓   |
| typography.body.lineHeight  | 1.5           | --vtmn-typo_text-2-line-height: 1.5                                        | ✓   |
| button-primary padding      | 14px 24px     | `@vtmn/css-button@1.1.4` medium: padding-block rem(14px), inline rem(24px) | ✓   |

## Contrast note (0 linter warnings — one caveat documented)

- White on `primary` #007DBC is 4.51:1 — passes AA for normal text, with
  little margin.
- `status-positive` #23A942 and `status-warning` #FF600A are declared as
  text-only components (no background), matching Vitamin's real
  content-positive / content-warning usage. On white they measure 3.06:1 and
  3.03:1 — above the 3:1 large-text/UI threshold, below 4.5:1. The file
  restricts them to icons and large or bold labels (Colors, Do's and Don'ts,
  Agent Prompt Guide); a human reviewer should confirm this is acceptable.
- All other declared text/background pairs measure 4.51:1 or better.

## Sign-off

- Automated checks (schema, lint, spot-check, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
  Cross-check the hand-converted HSL→hex values and the two 3:1-only status colours.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
