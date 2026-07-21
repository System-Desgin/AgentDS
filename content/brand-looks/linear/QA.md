# QA — linear

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public-site language (table below — canonical, not captured)
- [x] Prose is written fresh — observed-language only, no copied text from linear.app
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: Inter Variable observed — Inter (OFL, Google Fonts allow-list) used directly, no substitution needed; JetBrains Mono (OFL) is an open stand-in for monospace, original family not verified
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present as the first content after front matter (authored verbatim per `packages/pipeline/prompts/brand-look.md`; never remove)

## Modeling choice (dark tokens)

Tokens model the **dark presentation** (`surface #08090A`, `on-surface
#F7F8F8`), which is linear.app's default and signature look. The light surfaces
that appear on parts of the site are mentioned in prose only. The dark set was
chosen because it can be kept WCAG-AA consistent end to end (see contrast note
below); the catalog preview renders these dark-surface tokens as authored.

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks (`css-analysis`). Values below were authored from knowledge of the
> publicly observable design language of linear.app, linear.app/features, and
> linear.app/method (dark presentation). A human reviewer MUST perform the
> manual CSS capture procedure in `docs/04-DATA-SOURCES.md` §5 against those
> pages and cross-check every row before `status: published`.

| Token (file)                     | Value in file  | Value in source (observed basis, dark presentation)           | OK  |
| -------------------------------- | -------------- | ------------------------------------------------------------- | --- |
| colors.surface                   | #08090A        | Near-black page background family                             | ✓   |
| colors.on-surface                | #F7F8F8        | Soft off-white heading/body text                              | ✓   |
| colors.surface-variant           | #141516        | One-step lifted panel/card/input tone                         | ✓   |
| colors.on-surface-variant        | #8A8F98        | Muted cool-gray secondary text                                | ✓   |
| colors.primary                   | #5E6AD2        | Muted indigo-violet accent (buttons, brand moments)           | ✓   |
| colors.primary-bright            | #828FFF        | Lighter indigo where the accent reads as text/links on dark   | ✓   |
| colors.border-subtle             | #23252A        | Solid stand-in for hairlines observed as low-alpha white      | ~   |
| colors.border-strong             | #34363C        | Solid stand-in for stronger interactive outlines              | ~   |
| colors.success                   | #4CB782        | Green of the status family in product imagery                 | ✓   |
| colors.warning                   | #F2C94C        | Amber of the status family in product imagery                 | ✓   |
| colors.error                     | #EB5757        | Red of the status family in product imagery                   | ✓   |
| typography.body.fontFamily       | Inter          | Inter Variable observed sitewide (Inter is on the allow-list) | ✓   |
| typography.code.fontFamily       | JetBrains Mono | Open stand-in; site monospace family not verified             | ~   |
| typography.display.letterSpacing | -0.02em        | Tight negative tracking on large headlines                    | ✓   |
| rounded.md                       | 8px            | Button/input corner radius scale                              | ✓   |
| spacing.md                       | 16px           | 4/8-based control and content padding rhythm                  | ✓   |

Rows marked `~` are honest approximations (alpha-composited hairlines flattened
to solid hex; monospace stand-in) — verify these first during capture.

## Contrast note (0 lint warnings — two facts worth knowing)

- `colors.primary` #5E6AD2 measures 4.24:1 against `colors.surface` #08090A —
  below AA for normal text. The tokens therefore treat primary as **fill-only**
  and route accent-coloured text through `colors.primary-bright` #828FFF
  (6.95:1 on surface). The Do's and Don'ts and Agent Prompt Guide state this
  rule explicitly.
- `button-primary` (#FFFFFF on #5E6AD2) measures 4.70:1 — passes AA with a slim
  margin. Reviewer: confirm the captured button fill is not lighter than
  #5E6AD2, which would drop the pairing below 4.5:1.

## Sign-off

- Automated checks (schema, lint zero errors / zero warnings) completed via
  `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the three
  provenance URLs and re-verify the two contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
