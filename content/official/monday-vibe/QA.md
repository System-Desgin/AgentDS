# QA — monday-vibe

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT — `monday-ui-style@0.26.2` package.json and `packages/style/LICENSE` in mondaycom/vibe); `restricted: false`
- [x] Fonts: Figtree (Vibe's first-choice family) is open but not on the preview allow-list, so body tokens carry Roboto — Vibe's own declared fallback in `--font-family`; Poppins (title family) is open and used directly; Roboto Mono chosen for code (Vibe defines no mono face); originals named in prose
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `monday-ui-style@0.26.2` via extraction (`tokens.raw.json`); color tokens
from `dist/files/tokens.json` (light-app-theme), type/radius/spacing from the
package's `src/typography.scss`, `src/border-radius.scss`, `src/spacing.scss`.

| Token (file)              | Value in file     | Value in source                              | OK  |
| ------------------------- | ----------------- | -------------------------------------------- | --- |
| colors.primary            | #0073EA           | primary-color #0073ea                        | ✓   |
| colors.primary-variant    | #0060B9           | primary-hover-color #0060b9                  | ✓   |
| colors.primary-selected   | #CCE5FF           | primary-selected-color #cce5ff               | ✓   |
| colors.on-surface         | #323338           | primary-text-color #323338                   | ✓   |
| colors.on-surface-variant | #676879           | secondary-text-color #676879                 | ✓   |
| colors.surface-variant    | #F6F7FB           | allgrey-background-color #f6f7fb             | ✓   |
| colors.border             | #C3C6D4           | ui-border-color #c3c6d4                      | ✓   |
| colors.border-subtle      | #D0D4E4           | layout-border-color #d0d4e4                  | ✓   |
| colors.link               | #1F76C2           | link-color #1f76c2                           | ✓   |
| colors.positive           | #00854D           | positive-color #00854d                       | ✓   |
| colors.done               | #00C875           | color-done-green #00c875                     | ✓   |
| colors.negative           | #D83A52           | negative-color #d83a52                       | ✓   |
| colors.warning            | #FFCB00           | warning-color #ffcb00                        | ✓   |
| rounded.sm / md / lg      | 4px / 8px / 16px  | --border-radius-small/medium/big             | ✓   |
| spacing.md / lg           | 16px / 24px       | --spacing-medium 16px / --spacing-large 24px | ✓   |
| typography.display        | 2rem 600 lh 1.25  | --font-h1-medium 600 32px/40px (Poppins)     | ✓   |
| typography.body           | 1rem 400 lh 1.375 | --font-text1-normal 400 16px/22px            | ✓   |

Naming note: the source token `primary-hover-color` is published here as
`colors.primary-variant` (the darker interactive shade, hover/pressed);
the hover role is stated in prose. Display letterSpacing -0.016em derives from
`--letter-spacing-h1-normal` (-0.5px at 32px).

## Contrast notes

Lint reports zero contrast warnings. Two real-system pairings sit just above
the AA threshold and were verified numerically: `on-primary` on `primary`
(4.53:1) and `negative` text on `surface` (4.52:1). `negative` on
`surface-variant` fails AA (4.22:1), so the file's prose and Agent Prompt Guide
explicitly restrict negative text to `surface`.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
