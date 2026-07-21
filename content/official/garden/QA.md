# QA — garden

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, from package.json and shipped LICENSE.md); `restricted: false`
- [x] Fonts: Garden ships no brand font — its native system stack and SFMono mono stack are substituted with open Inter / JetBrains Mono; originals named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Token spot-check (≥10)

Source: `@zendeskgarden/css-variables@7.0.0` (dist/index.json, 255 tokens), via
extraction (`tokens.raw.json`). Semantic role assignments (blue-700 as primary,
grey-900 as default text, grey-700 as subtle text, kale as the chrome hue, and
the 700-grade status hues) were cross-verified against the light-theme
`colors.variables` mapping in `@zendeskgarden/react-theming@9.15.6`
(dist/esm/elements/theme/index.js).

| Token (file)                | Value in file | Value in source                         | OK  |
| --------------------------- | ------------- | --------------------------------------- | --- |
| colors.primary              | #1F73B7       | zd-color-blue-700 #1f73b7               | ✓   |
| colors.on-surface           | #293239       | zd-color-grey-900 #293239               | ✓   |
| colors.on-surface-subtle    | #5C6970       | zd-color-grey-700 #5c6970               | ✓   |
| colors.surface-subtle       | #F8F9F9       | zd-color-grey-100 #f8f9f9               | ✓   |
| colors.border               | #D8DCDE       | zd-color-grey-300 #d8dcde               | ✓   |
| colors.border-subtle        | #E8EAEC       | zd-color-grey-200 #e8eaec               | ✓   |
| colors.chrome               | #16494F       | zd-color-kale-800 #16494f               | ✓   |
| colors.success              | #037F52       | zd-color-green-700 #037f52              | ✓   |
| colors.warning              | #AC5918       | zd-color-yellow-700 #ac5918             | ✓   |
| colors.danger               | #CD3642       | zd-color-red-700 #cd3642                | ✓   |
| spacing.md                  | 20px          | zd-spacing 20px                         | ✓   |
| spacing.2xl                 | 48px          | zd-spacing-xxl 48px                     | ✓   |
| typography.body.fontSize    | 0.875rem      | zd-font-size-md 14px                    | ✓   |
| typography.display.fontSize | 2.25rem       | zd-font-size-xxxl 36px                  | ✓   |
| typography.code.fontSize    | 0.8125rem     | zd-font-size-md-monospace 13px          | ✓   |
| rounded.md                  | 4px           | react-theming@9.15.6 borderRadii.md 4px | ✓   |

Notes:

- `rounded.sm/md/lg` (2/4/8px) come from `@zendeskgarden/react-theming@9.15.6`
  `borderRadii` (css-variables ships no radius tokens); `rounded.full` (9999px)
  is the usual pill convention, not a Garden token.
- Line heights were converted from Garden's px pairs to unitless (for example
  body 20px/14px = 1.43, display 44px/36px = 1.22).
- Garden's current packages renumber older shade names: #1F73B7 is blue-700 in
  css-variables@7.0.0 (it was blue-600 in the pre-v9 palette). File values
  follow the extracted current package.
- Contrast: all component text/background pairings computed at or above WCAG
  AA 4.5:1 (lowest: white on primary #1F73B7 at 5.01:1); linter reports zero
  warnings.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer:
- Date:
