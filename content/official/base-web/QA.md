# QA — base-web

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against Base's documented LightTheme (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: proprietary Uber Move substituted (→ Inter); code uses JetBrains Mono; original named in prose
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** Base ships themes as JS objects
> (baseui/themes), not a static value file. Values are the documented Base
> LightTheme; cross-check against baseweb.design before publish.

| Token (file)               | Value in file | Source (Base LightTheme)      | OK  |
| -------------------------- | ------------- | ----------------------------- | --- |
| colors.primary             | #000000       | buttonPrimaryFill / primaryA  | ✓   |
| colors.accent              | #276EF1       | accent                        | ✓   |
| colors.on-surface          | #000000       | contentPrimary                | ✓   |
| colors.on-surface-variant  | #545454       | contentSecondary (mono600)    | ✓   |
| colors.surface-variant     | #F6F6F6       | backgroundSecondary (mono200) | ✓   |
| colors.fill                | #EEEEEE       | mono300 (secondary fill)      | ✓   |
| colors.border              | #CBCBCB       | borderOpaque (mono400)        | ✓   |
| colors.positive            | #048848       | positive                      | ✓   |
| colors.warning             | #FFC043       | warning                       | ✓   |
| colors.negative            | #E11900       | negative                      | ✓   |
| typography.body.fontFamily | Inter         | substitutes Uber Move         | ✓   |

## Sign-off

- Automated checks (schema, lint, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`);
  cross-check the mono ramp + accent/status values against baseweb.design.
- Reviewer: Oday Bakkour (publish directed by owner, Claude Code session)
- Date: 2026-07-21
