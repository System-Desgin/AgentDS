# QA — moon

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the published source files (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, `package.json` of @heathmont/moon-themes-tw@10.22.2 and the moon-light repo LICENSE); `restricted: false`
- [x] Fonts: proprietary Averta Std substituted (→ DM Sans, itself a Moon font token `--dm-sans`); original named in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** `pipeline extract` found 0 tokens
> for this package — its file heuristics do not match the theme stylesheets
> (`lib/moon.css` etc.) that @heathmont/moon-themes-tw ships. Values below were
> manually transcribed on 2026-07-21 from the published package files fetched via
> jsDelivr: `lib/moon.css` (theme `theme-moon-light`) in
> @heathmont/moon-themes-tw@10.22.2, plus `lib/private/presets/ds-moon-preset.js`
> and `lib/moon-base.css`-adjacent dimension tokens in
> @heathmont/moon-base-tw@10.22.2. A human reviewer must cross-check against
> those files (or moon.io) before `status: published`.
>
> Notes for the reviewer:
>
> - `--krillin` carries a stale inline comment (`#ff9800`); the actual channel
>   value is `255 179 25` = `#FFB319`, which is what this file uses.
> - Moon's `text-moon-*` size tokens define size, line height, and letter
>   spacing but no weights. Weights here (500 for display/headings/label, 400
>   for body) follow the `font-medium` usage in Moon component styles
>   (e.g. `getButtonCommonStyles`).

| Token (file)              | Value in file           | Value in source                                        | OK  |
| ------------------------- | ----------------------- | ------------------------------------------------------ | --- |
| colors.primary            | #5C33CF                 | --piccolo: 92 51 207 (lib/moon.css, light)             | ✓   |
| colors.on-primary         | #FFFFFF                 | --goten: 255 255 255                                   | ✓   |
| colors.accent             | #1BD29A                 | --hit: 27 210 154                                      | ✓   |
| colors.surface            | #FFFFFF                 | --goku: 255 255 255                                    | ✓   |
| colors.surface-variant    | #F6F7F9                 | --gohan: 246 247 249                                   | ✓   |
| colors.on-surface         | #000000                 | --bulma: 0 0 0                                         | ✓   |
| colors.on-surface-variant | #687083                 | --trunks: 104 112 131                                  | ✓   |
| colors.border             | #DCDEE3                 | --beerus: 220 222 227                                  | ✓   |
| colors.info               | #3448F0                 | --whis: 52 72 240                                      | ✓   |
| colors.success            | #49B356                 | --roshi: 73 179 86                                     | ✓   |
| colors.warning            | #FFB319                 | --krillin: 255 179 25 (stale comment says #ff9800)     | ✓   |
| colors.error              | #FF4E64                 | --chichi: 255 78 100                                   | ✓   |
| colors.error-strong       | #D33030                 | --dodoria: 211 48 48                                   | ✓   |
| rounded.sm                | 4px                     | --radius-i-xs / --radius-s-xs: 0.25rem                 | ✓   |
| rounded.md                | 8px                     | --radius-i-sm / --radius-s-sm: 0.5rem                  | ✓   |
| rounded.lg                | 12px                    | --radius-i-md / --radius-s-md: 0.75rem                 | ✓   |
| rounded.xl                | 16px                    | --radius-s-lg: 1rem                                    | ✓   |
| spacing.md                | 16px                    | --dimension-space-16: 16px (moon-base tokens)          | ✓   |
| typography.body           | 1rem / 1.5              | text-moon-16: 1rem, lineHeight 1.5rem (ds-moon-preset) | ✓   |
| typography.display        | 2rem / 1.25 / -0.016em  | text-moon-32: 2rem, lh 2.5rem, ls -0.03125rem          | ✓   |
| typography.caption        | 0.625rem / 1.6 / 0.05em | text-moon-10-caption: 0.625rem, lh 1rem, ls 0.0313rem  | ✓   |
| typography.*.fontFamily   | DM Sans                 | --dm-sans: "DM Sans" (Averta Std substituted)          | ✓   |

## Contrast notes

`lint-report.json` shows zero contrast warnings. Deliberate choices behind that:

- `status-error` uses dodoria `{colors.error-strong}` (4.96:1 on white) instead
  of chichi `{colors.error}` (3.22:1), matching Moon's own strong-negative role.
- roshi `{colors.success}` (2.67:1) and hit `{colors.accent}` (1.96:1) are never
  paired as text on light surfaces in components; prose directs agents to tinted
  fills or icons for them, mirroring Moon's 8% alpha support-color steps.
- `badge-warning` sets `{colors.on-surface}` (black) on krillin (11.7:1); white
  on krillin would fail AA.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
  Cross-check the colour roles against `lib/moon.css` (theme-moon-light) and the
  type scale against `ds-moon-preset.js` — values are manually transcribed from
  the published package, not auto-extracted.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
