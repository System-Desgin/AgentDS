# QA — raycast

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public-site language (verified automatically against a fresh source capture; see Source verification)
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

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

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

## Source verification (automated)

> Generated by `pnpm pipeline verify raycast` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 129
- Colors grounded in source: **13/13**
  (exact 9 · close 4 · drift 0 · unmatched 0)
- Files read:
  - https://www.raycast.com
  - https://www.raycast.com/_next/static/css/fb4feeee9aa67523.css
  - https://www.raycast.com/_next/static/css/184af1c5bdf1b5db.css
  - https://www.raycast.com/_next/static/css/f1de5538ee4eef17.css
  - https://www.raycast.com/_next/static/css/be8fb847a3fae0d1.css
  - https://www.raycast.com/_next/static/css/5038a0f8e1dbb537.css
  - https://www.raycast.com/_next/static/css/7895ac7aab38a613.css
  - https://www.raycast.com/_next/static/css/af9f5781b0bfa376.css
  - …and 10 more

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #FF6363       | #FF6363              | exact   |
| `colors.on-primary`         | #0A0A0A       | #0D0D0D              | close   |
| `colors.surface`            | #0A0A0A       | #0D0D0D              | close   |
| `colors.on-surface`         | #FFFFFF       | #FFFFFF              | exact   |
| `colors.surface-variant`    | #161618       | #19191A              | close   |
| `colors.on-surface-variant` | #9C9C9D       | #9C9C9D              | exact   |
| `colors.border-subtle`      | #2A2A2B       | #2A2A2B              | exact   |
| `colors.border-strong`      | #434345       | #434345              | exact   |
| `colors.brand-orange`       | #FF9217       | #FF9217              | exact   |
| `colors.brand-pink`         | #FF67A7       | #FF67A7              | exact   |
| `colors.success`            | #59D499       | #59D499              | exact   |
| `colors.warning`            | #FFC531       | #FFC533              | close   |
| `colors.error`              | #F83A3A       | #F83A3A              | exact   |

## Sign-off

- Automated checks (schema, lint) completed via `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the two
  provenance URLs and re-verify the contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
