# QA — spectrum

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, from the package.json `license` field and the LICENSE file in adobe/spectrum-design-data); `restricted: false`
- [x] Fonts: proprietary Adobe Clean substituted (→ Source Sans 3, Adobe's open family); original named in prose only. Source Code Pro is the literal `code-font-family` token value — no substitution needed
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Token spot-check (≥10)

Source: `@adobe/spectrum-tokens@14.15.0` (Spectrum 2), light theme, via extraction
(`tokens.raw.json`, resolved `dist/json/variables.json`).

| Token (file)                    | Value in file   | Value in source                                       | OK  |
| ------------------------------- | --------------- | ----------------------------------------------------- | --- |
| colors.primary                  | #3B63FB         | accent-color-900 (light) rgb(59, 99, 251)             | ✓   |
| colors.background               | #FFFFFF         | background-base-color (light) rgb(255, 255, 255)      | ✓   |
| colors.layer-1                  | #F8F8F8         | background-layer-1-color (light) rgb(248, 248, 248)   | ✓   |
| colors.gray-100                 | #E9E9E9         | gray-100 (light) rgb(233, 233, 233)                   | ✓   |
| colors.neutral-content          | #292929         | neutral-content-color-default (light) rgb(41, 41, 41) | ✓   |
| colors.neutral-subdued          | #505050         | neutral-subdued-content-color-default rgb(80, 80, 80) | ✓   |
| colors.border                   | #DADADA         | gray-300 (light) rgb(218, 218, 218)                   | ✓   |
| colors.border-strong            | #8F8F8F         | gray-500 (light) rgb(143, 143, 143)                   | ✓   |
| colors.focus                    | #4B75FF         | focus-indicator-color (light) rgb(75, 117, 255)       | ✓   |
| colors.positive                 | #05834E         | positive-color-900 (light) rgb(5, 131, 78)            | ✓   |
| colors.notice                   | #C24E00         | notice-color-900 (light) rgb(194, 78, 0)              | ✓   |
| colors.negative                 | #D73220         | negative-color-900 (light) rgb(215, 50, 32)           | ✓   |
| rounded.md                      | 8px             | corner-radius-medium-default 8px                      | ✓   |
| spacing.sm                      | 8px             | spacing-100 8px                                       | ✓   |
| typography.body.fontSize        | 0.875rem        | font-size-100 (desktop) 14px                          | ✓   |
| typography.detail.letterSpacing | 0.06em          | detail-letter-spacing 0.06em                          | ✓   |
| typography.code.fontFamily      | Source Code Pro | code-font-family "Source Code Pro"                    | ✓   |

Notes:

- `rounded.full` is encoded as the 9999px pill convention; the source token
  `corner-radius-full` is 0.5 (a fraction of element height, same visual result).
- Heading `fontWeight: 800` maps `heading-sans-serif-font-weight` = extra-bold.
- `typography.*.fontFamily` = Source Sans 3 substitutes the proprietary
  `sans-serif-font-family` value "Adobe Clean Spectrum VF" (named in prose only).
- No contrast warnings: all component text/background pairs pass WCAG AA 4.5:1
  (tightest are white on primary #3B63FB at 4.81:1 and white on notice #C24E00
  at 4.79:1, both per the source ramp's 900-step design).

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer:
- Date:
