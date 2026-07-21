# QA — paste

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: proprietary TwilioSans substituted (→ Inter / JetBrains Mono); originals named in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `@twilio-paste/design-tokens@10.15.0`, default (Twilio) theme, via extraction.

| Token (file)              | Value in file | Value in source                               | OK  |
| ------------------------- | ------------- | --------------------------------------------- | --- |
| colors.primary            | #006DFA       | color-background-primary rgb(0,109,250)       | ✓   |
| colors.primary-strong     | #001489       | color-background-primary-strong rgb(0,20,137) | ✓   |
| colors.link               | #0263E0       | color-text-link rgb(2,99,224)                 | ✓   |
| colors.on-surface         | #121C2D       | color-text rgb(18,28,45)                      | ✓   |
| colors.on-surface-variant | #606B85       | color-text-weak rgb(96,107,133)               | ✓   |
| colors.surface-variant    | #F4F4F6       | color-background rgb(244,244,246)             | ✓   |
| colors.border             | #8B93AA       | color-border rgb(139,147,170)                 | ✓   |
| colors.success            | #14B053       | color-background-success rgb(20,176,83)       | ✓   |
| colors.warning            | #F47C22       | color-background-warning rgb(244,124,34)      | ✓   |
| colors.error              | #C72323       | color-text-error rgb(199,35,35)               | ✓   |
| rounded.lg                | 8px           | border-radius-30 8px                          | ✓   |
| spacing.md                | 1rem          | space-50 1rem                                 | ✓   |
| typography.body.fontSize  | 1rem          | font-size-40 1rem                             | ✓   |

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (publish directed by owner, Claude Code session)
- Date: 2026-07-21
