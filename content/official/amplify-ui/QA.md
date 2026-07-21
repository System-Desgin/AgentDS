# QA — amplify-ui

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, `license` field of `@aws-amplify/ui@6.15.4` package.json and LICENSE in the repo); `restricted: false`
- [x] Fonts: no proprietary binaries — Amplify's default stack leads with Inter (open) before system fonts (`--amplify-fonts-default-static`); the default theme has no mono token, so JetBrains Mono is the open stand-in (named as such in prose)
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Extraction note

**Grounding: extracted, with manual file selection.** `pipeline extract` auto-picked
`dist/styles/AIConversation*.css` (10 internal component vars — unusable), because the
file heuristic hits `dist/styles/*` before `dist/theme.css`. The fix: the pipeline's own
CSS parser (`packages/pipeline/src/extract/parse-css.ts`) was re-run against
`/dist/theme.css` of the same `@aws-amplify/ui@6.15.4` (via jsDelivr), yielding the
1587 resolved `--amplify-*` custom properties of the default theme in `tokens.raw.json`
(same payload shape). Source values are HSL; hex values in DESIGN.md are exact
conversions (rounded to the nearest 8-bit channel).

## Token spot-check (≥10)

Source: `@aws-amplify/ui@6.15.4`, `/dist/theme.css` (default theme), token names as in `tokens.raw.json`.

| Token (file)               | Value in file | Value in source                                                                             | OK  |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------- | --- |
| colors.primary             | #047D95       | --amplify-colors-primary-80 → teal-80 hsl(190, 95%, 30%)                                    | ✓   |
| colors.primary-hover       | #005566       | --amplify-components-button-primary-hover-background-color → primary-90 hsl(190, 100%, 20%) | ✓   |
| colors.on-primary          | #FFFFFF       | --amplify-colors-font-inverse → white hsl(0, 0%, 100%)                                      | ✓   |
| colors.surface             | #FFFFFF       | --amplify-colors-background-primary → white                                                 | ✓   |
| colors.surface-variant     | #FAFAFA       | --amplify-colors-background-secondary → neutral-10 hsl(210, 5%, 98%)                        | ✓   |
| colors.surface-tertiary    | #EFF0F0       | --amplify-colors-background-tertiary → neutral-20 hsl(210, 5%, 94%)                         | ✓   |
| colors.on-surface          | #0D1926       | --amplify-colors-font-primary → neutral-100 hsl(210, 50%, 10%)                              | ✓   |
| colors.on-surface-variant  | #304050       | --amplify-colors-font-secondary → neutral-90 hsl(210, 25%, 25%)                             | ✓   |
| colors.border              | #89949F       | --amplify-colors-border-primary → neutral-60 hsl(210, 10%, 58%)                             | ✓   |
| colors.focus               | #00404C       | --amplify-colors-border-focus → primary-100 hsl(190, 100%, 15%)                             | ✓   |
| colors.success             | #365E3D       | --amplify-colors-font-success → green-90 hsl(130, 27%, 29%)                                 | ✓   |
| colors.warning             | #663300       | --amplify-colors-font-warning → orange-90 hsl(30, 100%, 20%)                                | ✓   |
| colors.error               | #660000       | --amplify-colors-font-error → red-90 hsl(0, 100%, 20%)                                      | ✓   |
| rounded.sm                 | 0.25rem       | --amplify-radii-small 0.25rem (fieldcontrol + button border-radius)                         | ✓   |
| rounded.xl                 | 2rem          | --amplify-radii-xl 2rem (badge border-radius)                                               | ✓   |
| spacing.md                 | 1rem          | --amplify-space-medium 1rem                                                                 | ✓   |
| spacing.3xl                | 4.5rem        | --amplify-space-xxxl 4.5rem                                                                 | ✓   |
| typography.display         | 3rem / 300    | --amplify-components-heading-1-font-size → font-sizes-xxxxl 3rem; font-weights-light 300    | ✓   |
| typography.body            | 1rem / 1.5    | --amplify-font-sizes-medium 1rem; --amplify-line-heights-medium 1.5                         | ✓   |
| typography.body.fontFamily | Inter         | --amplify-fonts-default-static leads with 'Inter' before the system stack                   | ✓   |

Curation notes (not 1:1 source tokens):

- `spacing` renames Amplify's scale to the house ladder: xxs=space-xxxs (0.25rem),
  xs=space-xs (0.5rem), sm=space-small (0.75rem), md=space-medium, lg=space-large,
  xl=space-xl, 2xl=space-xxl, 3xl=space-xxxl. `space-xxs` (0.375rem) is omitted.
- `typography.label` is composed (font-sizes-xs 0.75rem + font-weights-semibold 600 +
  line-heights-small 1.25); Amplify defines no single "label" type token.
- `typography.code` uses JetBrains Mono as an open stand-in; the default theme defines
  no mono family.
- `components.focus-ring` stylizes `--amplify-components-fieldcontrol-focus-box-shadow`
  (0px 0px 0px 2px border-focus) as a 2px bar of `{colors.focus}`.
- `components.divider` uses the solid `--amplify-components-divider-border-color`
  (border-primary) at `--amplify-border-widths-medium` (2px); the live theme applies
  60% opacity, which the component format cannot express (noted in prose).

## Contrast

All component textColor/backgroundColor pairs pass WCAG AA; the tightest is
`{colors.on-primary}` on `{colors.primary}` at 4.80:1 (the real Amplify
button-primary pairing: font-inverse on primary-80).

## Sign-off

- Automated checks (schema, lint, spot-check, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
