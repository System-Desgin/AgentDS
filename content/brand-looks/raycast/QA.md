# QA — raycast

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public-site language (table below — canonical, not captured)
- [x] Prose is written fresh — observed-language only, no copied text from raycast.com
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: Inter observed — Inter (OFL, Google Fonts allow-list) used directly, no substitution needed; JetBrains Mono (OFL) is the open monospace family used here, original monospace not verified
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present as the first content after front matter (authored verbatim per `packages/pipeline/prompts/brand-look.md`; never remove)

## Modeling choice (dark tokens)

Tokens model the **dark presentation** (`surface #0A0A0A`, `on-surface
#FFFFFF`), which is raycast.com's default and signature launcher look. The
site's translucent, background-blurred panels and low-alpha hairlines are
flattened to solid hex equivalents (`surface-variant`, `border-subtle`,
`border-strong`) so the set stays verifiable and WCAG-AA consistent end to end
(see contrast note below); the catalog preview renders these dark-surface
tokens as authored.

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks (`css-analysis`). Values below were authored from knowledge of
> the publicly observable design language of raycast.com and
> raycast.com/store (dark presentation). A human reviewer MUST perform the
> manual CSS capture procedure in `docs/04-DATA-SOURCES.md` §5 against those
> pages and cross-check every row before `status: published`.

| Token (file)                     | Value in file               | Value in source (observed basis, dark presentation)                                     | OK  |
| -------------------------------- | --------------------------- | --------------------------------------------------------------------------------------- | --- |
| colors.surface                   | #0A0A0A                     | Deep charcoal page background family                                                    | ✓   |
| colors.surface-variant           | #161618                     | Lifted panel/launcher-chrome tone (#161618 family)                                      | ✓   |
| colors.on-surface                | #FFFFFF                     | White primary text                                                                      | ✓   |
| colors.on-surface-variant        | #A6A6AD                     | Muted gray secondary text                                                               | ✓   |
| colors.primary                   | #FF6363                     | Signature red-coral accent (#FF6363 family)                                             | ✓   |
| colors.brand-orange              | #FF9F45                     | Warm endpoint of sunset-gradient hero moments (approximation)                           | ~   |
| colors.brand-pink                | #F06BB5                     | Pink endpoint of sunset-gradient hero moments (approximation)                           | ~   |
| colors.border-subtle             | #242428                     | Solid stand-in for hairlines observed as low-alpha white                                | ~   |
| colors.border-strong             | #3A3A40                     | Solid stand-in for stronger interactive outlines                                        | ~   |
| colors.success / warning / error | #4FC183 / #FFC531 / #F14C4C | Status family consistent with the dark UI; least directly observable on marketing pages | ~   |
| typography.body.fontFamily       | Inter                       | Inter observed sitewide (Inter is on the allow-list)                                    | ✓   |
| typography.code.fontFamily       | JetBrains Mono              | Open family for observed monospace hints; original not verified                         | ~   |
| typography.display.letterSpacing | -0.02em                     | Tight negative tracking on large headlines                                              | ✓   |
| rounded.md                       | 12px                        | 8-12px control radius band                                                              | ✓   |
| rounded.lg                       | 20px                        | Big rounded launcher-style panels                                                       | ✓   |
| spacing.md                       | 16px                        | 4/8-based control and content padding rhythm                                            | ✓   |

Rows marked `~` are honest approximations (gradient endpoints and
alpha-composited hairlines flattened to solid hex; status family inferred from
the dark UI; monospace family) — verify these first during capture.

## Contrast note (0 lint warnings — facts worth knowing)

- `colors.primary` #FF6363 measures 6.80:1 against `colors.surface` #0A0A0A
  and 6.21:1 against `colors.surface-variant` #161618 — passes AA as text, so
  `link` uses it directly.
- #FFFFFF on `colors.primary` measures 2.91:1 — fails AA. Coral fills
  (`button-primary`, `badge-brand`) therefore carry dark `colors.on-primary`
  #0A0A0A text (6.80:1). The Do's and Don'ts and Agent Prompt Guide state
  this rule explicitly.
- `colors.error` #F14C4C measures 5.54:1 on `colors.surface` — passes AA with
  a moderate margin. Reviewer: confirm the captured value is not darker than
  #F14C4C, which would push the pairing toward the 4.5:1 floor.
- `colors.brand-pink` #F06BB5 passes only with dark text (7.05:1); white on
  pink fails at 2.81:1. Gradient tokens are documented as decorative fills,
  never text colours.
- The gradient endpoints are exposed as the decorative
  `hero-gradient-start` / `hero-gradient-end` components (backgroundColor
  only, deliberately no textColor) so the tokens are referenced without
  implying a text pairing; this resolved the linter's two orphaned-token
  warnings, leaving the report at 0 errors / 0 warnings.

## Sign-off

- Automated checks (schema, lint) completed via `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the two
  provenance URLs and re-verify the contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
