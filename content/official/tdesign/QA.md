# QA — tdesign

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with **zero errors** (1 contrast warning — see note; report in `lint-report.json`)
- [x] 10+ token values spot-checked against the shipped TDesign stylesheet (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, `tdesign-vue-next@1.20.3` package.json and repo LICENSE); `restricted: false`
- [x] Fonts: TDesign ships a system stack (PingFang SC, Microsoft YaHei, Arial — `--td-font-family`); open Inter stands in, JetBrains Mono for code; originals named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Contrast note (1 warning — accurate, not a defect to hide)

- white on `error` #D54941 (`badge-count`) — 4.32:1, below the AA 4.5:1 normal-text
  threshold but above the 3:1 large-text/UI threshold. This is TDesign's actual
  notification-badge pairing (white numerals on `--td-error-color`). Guidance in
  the file limits it to short numerals. A human reviewer should confirm this is
  acceptable before publish.

All other component pairings meet AA (button-primary 6.54:1, menu-item-active
5.93:1, helper-text 5.74:1, link 9.40:1).

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** `pipeline extract` on
> `tdesign-vue-next@1.20.3` selects 6 per-component stylesheets that only
> _reference_ theme variables; the actual `--td-*` definitions live in
> `es/style/index.css`, which the extractor's file heuristic does not reach (it
> returned 1 junk token, discarded). Values below were instead **read manually
> from the first `:root` block (light theme) of
> `tdesign-vue-next@1.20.3/es/style/index.css`** via jsDelivr, resolving
> `var()` chains to the brand/gray/status ramps. Alpha text colours are
> flattened over the white container. A human reviewer must cross-check against
> tdesign.tencent.com/design/color before `status: published`.

| Token (file)                | Value in file | Value in source (`--td-*`, resolved)               | OK  |
| --------------------------- | ------------- | -------------------------------------------------- | --- |
| colors.primary              | #0052D9       | brand-color → brand-color-7 #0052d9                | ✓   |
| colors.primary-light        | #F2F3FF       | brand-color-light → brand-color-1 #f2f3ff          | ✓   |
| colors.link                 | #003CAB       | text-color-link → brand-color-8 #003cab            | ✓   |
| colors.surface              | #FFFFFF       | bg-color-container #fff                            | ✓   |
| colors.surface-variant      | #F3F3F3       | bg-color-secondarycontainer → gray-color-1 #f3f3f3 | ✓   |
| colors.surface-page         | #EEEEEE       | bg-color-page → gray-color-2 #eee                  | ✓   |
| colors.on-surface           | #191919       | text-color-primary rgba(0,0,0,0.9) over #fff       | ✓   |
| colors.on-surface-variant   | #666666       | text-color-secondary rgba(0,0,0,0.6) over #fff     | ✓   |
| colors.placeholder          | #999999       | text-color-placeholder rgba(0,0,0,0.4) over #fff   | ✓   |
| colors.border               | #DDDDDD       | component-border → gray-color-4 #ddd               | ✓   |
| colors.border-subtle        | #E8E8E8       | border-level-1-color → gray-color-3 #e8e8e8        | ✓   |
| colors.success              | #2BA471       | success-color → success-color-5 #2ba471            | ✓   |
| colors.warning              | #E37318       | warning-color → warning-color-5 #e37318            | ✓   |
| colors.error                | #D54941       | error-color → error-color-6 #d54941                | ✓   |
| rounded.md                  | 3px           | radius-default 3px                                 | ✓   |
| rounded.lg                  | 6px           | radius-medium 6px                                  | ✓   |
| spacing.md                  | 12px          | comp-margin-m → size-5 12px                        | ✓   |
| typography.body.fontSize    | 0.875rem      | font-size-body-medium 14px                         | ✓   |
| typography.display.fontSize | 2.25rem       | font-size-headline-large 36px                      | ✓   |

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
  Confirm the badge-count contrast warning is acceptable and cross-check the
  token table against tdesign.tencent.com and `tdesign-common`.
- Reviewer:
- Date:
