# QA — supabase

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public-site language (verified automatically against a fresh source capture; see Source verification)
- [x] Prose is written fresh — observed-language only, no copied text from supabase.com
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: custom Circular-family sans observed — mapped to Inter via the substitution map in `packages/shared/src/preview/fonts.ts` (`circular` → Inter); JetBrains Mono (OFL) is an open stand-in for the observed monospace, original family not verified
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
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

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

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

## Source verification (automated)

> Generated by `pnpm pipeline verify supabase` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 633
- Colors grounded in source: **12/12**
  (exact 7 · close 5 · drift 0 · unmatched 0)
- Files read:
  - https://supabase.com
  - https://frontend-assets.supabase.com/www/3a3661019f4f/_next/static/css/440c143c26a742d1.css?dpl=dpl_FVDZ92SY9w2ctDyzNJ7a5is7tbFg
  - https://frontend-assets.supabase.com/www/3a3661019f4f/_next/static/css/aa91926bde5f8fff.css?dpl=dpl_FVDZ92SY9w2ctDyzNJ7a5is7tbFg
  - https://frontend-assets.supabase.com/www/3a3661019f4f/_next/static/css/e6a8352b8d255f66.css?dpl=dpl_FVDZ92SY9w2ctDyzNJ7a5is7tbFg
  - https://frontend-assets.supabase.com/www/3a3661019f4f/_next/static/css/556a706f3f4c02c8.css?dpl=dpl_FVDZ92SY9w2ctDyzNJ7a5is7tbFg
  - https://supabase.com/dashboard
  - https://frontend-assets.supabase.com/studio/3a3661019f4f/_next/static/chunks/21fwcopk7nhcs.css?dpl=dpl_7AYSS38tV5uPzFkpPJC6KqGbPEYF
  - https://frontend-assets.supabase.com/studio/3a3661019f4f/_next/static/chunks/0p3bjrlvz_oxo.css?dpl=dpl_7AYSS38tV5uPzFkpPJC6KqGbPEYF
  - …and 8 more

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #3ECF8E       | #3ECF8E              | exact   |
| `colors.on-primary`         | #0F0F0F       | #060809              | close   |
| `colors.surface`            | #121212       | #161616              | close   |
| `colors.surface-deep`       | #0F0F0F       | #060809              | close   |
| `colors.surface-variant`    | #1C1C1C       | #1C1C1C              | exact   |
| `colors.on-surface`         | #FAFAFA       | #FAFAFA              | exact   |
| `colors.on-surface-variant` | #898989       | #888888              | close   |
| `colors.border-subtle`      | #2E2E2E       | #2E2E2E              | exact   |
| `colors.border-strong`      | #3E3E3E       | #3E3E3E              | exact   |
| `colors.success`            | #3ECF8E       | #3ECF8E              | exact   |
| `colors.warning`            | #F5A623       | #F1A10D              | close   |
| `colors.error`              | #FF6369       | #FF6369              | exact   |

## Sign-off

- Automated checks (schema, lint zero errors) completed via
  `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the public
  provenance URLs and re-verify the contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
