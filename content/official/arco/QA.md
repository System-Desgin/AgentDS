# QA — arco

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the shipped CSS custom properties (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, `package.json` of `@arco-design/web-react@2.66.16` and repo LICENSE); `restricted: false`
- [x] Fonts: Arco ships no brand font — its own default stack leads with open Inter (then system CJK fallbacks); JetBrains Mono stands in for the generic monospace stack, noted in prose
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** `pipeline extract` found 0
> tokens: the only file defining Arco's custom properties is
> `dist/css/arco.css`, whose filename does not match the extractor's CSS
> heuristics (the first matching files are per-component stylesheets that only
> reference vars). Values below were instead **read manually from
> `dist/css/arco.css` of `@arco-design/web-react@2.66.16`** (jsDelivr) on
> 2026-07-21; palette steps are defined there as RGB triplets. A human
> reviewer must cross-check against arco.design before `status: published`.

| Token (file)              | Value in file    | Value in source (dist/css/arco.css)                               | OK  |
| ------------------------- | ---------------- | ----------------------------------------------------------------- | --- |
| colors.primary            | #165DFF          | --arcoblue-6: 22,93,255 (--primary-6 alias)                       | ✓   |
| colors.primary-active     | #0E42D2          | --arcoblue-7: 14,66,210                                           | ✓   |
| colors.on-surface         | #1D2129          | --color-text-1 → --gray-10: 29,33,41                              | ✓   |
| colors.on-surface-variant | #4E5969          | --color-text-2 → --gray-8: 78,89,105                              | ✓   |
| colors.helper             | #86909C          | --color-text-3 → --gray-6: 134,144,156                            | ✓   |
| colors.surface-variant    | #F2F3F5          | --color-fill-2 → --gray-2: 242,243,245                            | ✓   |
| colors.border             | #E5E6EB          | --color-border → --gray-3: 229,230,235                            | ✓   |
| colors.success            | #00B42A          | --green-6: 0,180,42 (--success-6 alias)                           | ✓   |
| colors.warning            | #FF7D00          | --orange-6: 255,125,0 (--warning-6 alias)                         | ✓   |
| colors.warning-surface    | #FFF7E8          | --orange-1: 255,247,232                                           | ✓   |
| colors.error              | #F53F3F          | --red-6: 245,63,63 (--danger-6 alias)                             | ✓   |
| rounded.sm / md / lg      | 2px/4px/8px      | --border-radius-small/-medium/-large                              | ✓   |
| typography.body           | 0.875rem/1.5715  | base font-size 14px, line-height 1.5715                           | ✓   |
| typography.display        | 2.25rem/500/1.23 | .arco-typography-h1: 36px, 500, 1.23                              | ✓   |
| components.field          | fill + 4px 12px  | .arco-input: var(--color-fill-2), padding 4px 12px, radius small  | ✓   |
| components.button-primary | 32px, 0 15px     | .arco-btn-size-default: height 32px, padding 0 15px, radius small | ✓   |

Component grounding notes: secondary button uses Arco's `--color-secondary`
(rgba gray over white, approximated here by the solid `--color-fill-2` token);
tag matches `.arco-tag` (height 24px, padding 0 8px, 12px weight 500, fill-2
when checked); alert-warning matches `.arco-alert-warning`
(`--color-warning-light-1` = orange-1 fill, `--color-text-1` content, padding
8px 15px). All component text/background pairs pass WCAG AA (white on
#165DFF = 5.19:1); no contrast warnings.

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Cross-check the palette, radius, and type values against arco.design and the
  shipped `dist/css/arco.css` (values were read manually, not auto-extracted).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
