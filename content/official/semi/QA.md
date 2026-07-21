# QA — semi

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate` on 2026-07-21
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the published SCSS source (table below)
- [x] Prose is written fresh — no copied text from upstream docs (source files are SCSS variables with Chinese comments; no upstream prose was reused)
- [x] License SPDX + URL verified — `package.json` of `@douyinfe/semi-theme-default@2.101.1` says `MIT` and the package's bundled LICENSE is the MIT text (Copyright 2021 DouyinFE); `restricted: false`
- [x] Fonts: no proprietary family — `$font-family-regular` in the source leads with open Inter (Google Fonts) before system/CJK fallbacks, so the token value is the real first-choice family; JetBrains Mono is an open stand-in for code (Semi defines no mono token), named as such in prose
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Token spot-check (≥10)

> **Grounding: manually verified against the published source, not auto-extracted.**
> `pipeline extract` returns 0 tokens for this package — `@douyinfe/semi-theme-default`
> ships SCSS design variables (`scss/global.scss`, `scss/_palette.scss`,
> `scss/variables.scss`, `scss/_font.scss`, `scss/animation.scss`), not a JSON
> token file. Every value below was checked by hand against those files fetched
> from jsDelivr at the pinned version `2.101.1` on 2026-07-21. Roles the source
> defines as grey at fractional opacity (text-1/text-2, fill-0, border) are
> stored here as solid hex flattened over white, as noted in the file's prose.
> Cross-check against `semi.design/en-US/basic/tokens` before publish.

| Token (file)                | Value in file             | Value in source (@douyinfe/semi-theme-default@2.101.1)                         | OK  |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------ | --- |
| colors.primary              | #0064FA                   | --semi-color-primary → --semi-blue-5: 0,100,250                                | ✓   |
| colors.primary-tint         | #EAF5FF                   | --semi-color-primary-light-default → --semi-blue-0: 234,245,255                | ✓   |
| colors.on-surface           | #1C1F23                   | --semi-color-text-0 → --semi-grey-9: 28,31,35                                  | ✓   |
| colors.on-surface-variant   | #494C4F                   | --semi-color-text-1 = rgba(--semi-grey-9, .8), flattened over white            | ✓   |
| colors.helper               | #727477                   | --semi-color-text-2 = rgba(--semi-grey-9, .62), flattened over white           | ✓   |
| colors.fill                 | #F5F5F5                   | --semi-color-fill-0 = rgba(--semi-grey-8: 46,50,56, .05), flattened over white | ✓   |
| colors.border               | #EDEDED                   | --semi-color-border = rgba(--semi-grey-9, .08), flattened over white           | ✓   |
| colors.success / -tint      | #3BB346 / #ECF7EC         | --semi-green-5: 59,179,70 / --semi-green-0: 236,247,236                        | ✓   |
| colors.warning / -tint      | #FC8800 / #FFF8EA         | --semi-orange-5: 252,136,0 / --semi-orange-0: 255,248,234                      | ✓   |
| colors.danger / -tint       | #F93920 / #FEF2ED         | --semi-red-5: 249,57,32 / --semi-red-0: 254,242,237                            | ✓   |
| rounded.sm / md / lg / full | 3px / 6px / 12px / 9999px | --semi-border-radius-small/-medium/-large/-full: 3px / 6px / 12px / 9999px     | ✓   |
| spacing.md (ramp 2…40px)    | 16px                      | $spacing-base: 16px ($spacing-super-tight 2px … $spacing-super-loose 40px)     | ✓   |
| typography.body             | 0.875rem / lh 1.43        | $font-size-regular: 14px, line-height 20px (mixin font-size-regular)           | ✓   |
| typography.display          | 2rem / 600 / lh 1.375     | $font-size-header-1: 32px, line-height 44px, $font-weight-bold: 600            | ✓   |
| typography.*.fontFamily     | Inter                     | $font-family-regular: 'Inter', -apple-system, … 'PingFang SC', …               | ✓   |

## Contrast

No lint warnings — all component text/background pairings meet WCAG AA 4.5:1.
Tightest measured pairings (worth a human glance, all passing): primary
(#0064FA) on fill (#F5F5F5) in button-secondary at 4.58:1; helper (#727477) on
white at 4.69:1; white on primary (#0064FA) in button-primary at 5.0:1.

## Sign-off

- Automated checks (schema, lint, spot-check, license, fonts) completed by the pipeline and manual source verification.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer:
- Date:
