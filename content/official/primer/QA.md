# QA — primer

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: Mona Sans is open (Google Fonts, no substitution); code monospace substituted (→ JetBrains Mono), original stack named in prose
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Token spot-check (≥10)

Colours grounded in the extraction of `@primer/primitives@11.9.0`, light functional theme
(`dist/docs/functional/themes/light`). Radius / spacing / type scale use canonical Primer
primitive values (stable, documented at primer.style) — cross-check before publish.

| Token (file)               | Value in file | Value in source                                  | OK  |
| -------------------------- | ------------- | ------------------------------------------------ | --- |
| colors.primary             | #1F883D       | bgColor-success-emphasis #1f883d                 | ✓   |
| colors.accent              | #0969DA       | bgColor-accent-emphasis / fgColor-accent #0969da | ✓   |
| colors.on-surface          | #1F2328       | fgColor-default #1f2328                          | ✓   |
| colors.on-surface-variant  | #59636E       | fgColor-muted #59636e                            | ✓   |
| colors.surface             | #FFFFFF       | bgColor-default #ffffff                          | ✓   |
| colors.surface-variant     | #F6F8FA       | bgColor-muted / bgColor-inset #f6f8fa            | ✓   |
| colors.border              | #D1D9E0       | borderColor-default #d1d9e0                      | ✓   |
| colors.emphasis            | #25292E       | bgColor-emphasis #25292e                         | ✓   |
| colors.danger              | #CF222E       | bgColor-danger-emphasis #cf222e                  | ✓   |
| colors.attention           | #9A6700       | bgColor-attention-emphasis #9a6700               | ✓   |
| colors.on-emphasis         | #FFFFFF       | fgColor-onEmphasis #ffffff                       | ✓   |
| typography.body.fontFamily | Mona Sans     | fontStack-sansSerif ('Mona Sans VF' …)           | ✓   |

## Sign-off

- Automated checks (schema, lint, colour spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then); confirm radius/spacing/type-scale values against primer.style.
- Reviewer:
- Date:
