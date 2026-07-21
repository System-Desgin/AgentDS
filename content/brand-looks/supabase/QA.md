# QA — supabase

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public-site language (table below — canonical, not captured)
- [x] Prose is written fresh — observed-language only, no copied text from supabase.com
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: custom Circular-family sans observed — mapped to Inter via the substitution map in `packages/shared/src/preview/fonts.ts` (`circular` → Inter); JetBrains Mono (OFL) is an open stand-in for the observed monospace, original family not verified
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check
- [x] Disclaimer header present as the first content after front matter (authored verbatim per `packages/pipeline/prompts/brand-look.md`; never remove)

## Modeling choice (dark tokens)

Tokens model the **dark presentation** (`surface #121212`, `on-surface
#FAFAFA`), which is Supabase's default and signature look across marketing and
docs. `surface-deep #0F0F0F` captures the deeper tone observed behind
marketing heroes and code panels. The dark set was chosen because it can be
kept WCAG-AA consistent end to end (see contrast note below); the catalog
preview renders these dark-surface tokens as authored.

## Provenance note (dashboard URL)

`https://supabase.com/dashboard` is listed in provenance per the task brief,
but it sits behind authentication; the observable basis for this analysis is
the public marketing surface (supabase.com) and the public docs
(supabase.com/docs). The reviewer's capture cross-check should run against
those two public URLs; treat the dashboard as out of scope unless the
reviewer chooses to capture it from a signed-in session.

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks (`css-analysis`). Values below were authored from knowledge of
> the publicly observable design language of supabase.com and
> supabase.com/docs (dark presentation). A human reviewer MUST perform the
> manual CSS capture procedure in `docs/04-DATA-SOURCES.md` §5 against those
> pages and cross-check every row before `status: published`.

| Token (file)               | Value in file  | Value in source (observed basis, dark presentation)               | OK  |
| -------------------------- | -------------- | ----------------------------------------------------------------- | --- |
| colors.surface             | #121212        | Near-black, faintly green-tinted page background family           | ✓   |
| colors.surface-deep        | #0F0F0F        | Deeper near-black behind marketing heroes and code panels         | ✓   |
| colors.surface-variant     | #1C1C1C        | One-step lifted card/input/secondary-button tone                  | ✓   |
| colors.on-surface          | #FAFAFA        | Soft off-white heading/body text                                  | ✓   |
| colors.on-surface-variant  | #898989        | Muted gray secondary text used heavily sitewide                   | ✓   |
| colors.primary             | #3ECF8E        | Signature Supabase green (CTAs, logo mark, highlights)            | ✓   |
| colors.on-primary          | #0F0F0F        | Dark text observed on green CTA fills                             | ✓   |
| colors.border-subtle       | #2E2E2E        | Solid stand-in for hairlines observed as low-alpha white          | ~   |
| colors.border-strong       | #3E3E3E        | Solid stand-in for stronger interactive outlines                  | ~   |
| colors.warning             | #F5A623        | Amber of the callout/status family in docs and product imagery    | ~   |
| colors.error               | #F87171        | Soft red of the callout/status family in docs and product imagery | ~   |
| typography.body.fontFamily | Inter          | Custom Circular-family sans observed; `circular` → Inter per map  | ~   |
| typography.code.fontFamily | JetBrains Mono | Open stand-in; site monospace family not verified                 | ~   |
| rounded.md                 | 6px            | Button/input corner radius in the observed 6-8px band             | ✓   |
| rounded.lg                 | 8px            | Card/panel corner radius in the observed 6-8px band               | ✓   |
| spacing.md                 | 16px           | 4/8-based control and content padding rhythm                      | ✓   |

Rows marked `~` are honest approximations (alpha-composited hairlines
flattened to solid hex; status family from callouts and imagery; font
stand-ins) — verify these first during capture.

## Contrast note (0 lint warnings — facts worth knowing)

- `colors.primary` #3ECF8E measures 9.39:1 on `colors.surface` #121212 and
  8.54:1 on `colors.surface-variant` #1C1C1C — unlike many dark accents, the
  Supabase green passes AA as text, so `link` uses it directly.
- `button-primary` / `badge-primary` (#0F0F0F on #3ECF8E) measure 9.60:1 —
  this dark-text-on-green pairing is the real observed CTA treatment; white
  text on the green would land near 2:1 and must never be introduced.
- `colors.on-surface-variant` #898989 measures 5.36:1 on `colors.surface` and
  4.87:1 on `colors.surface-variant` — passes AA on both, but the
  surface-variant margin is slim; reviewer: confirm the captured muted gray is
  not darker than #898989.
- `colors.success` duplicates `colors.primary` (#3ECF8E) intentionally: the
  brand green doubles as the positive/status voice on the observed surfaces.

## Sign-off

- Automated checks (schema, lint zero errors) completed via
  `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the public
  provenance URLs and re-verify the contrast facts above.
- Reviewer:
- Date:
