# QA — notion

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public-site roles (table below; canonical grounding — capture cross-check still required, see note)
- [x] Prose is written fresh — no copied text from notion.com or any design-md collection
- [x] License SPDX + URL verified (CC-BY-4.0 catalog content, per-entry independent analysis); `restricted: false`
- [x] Fonts: observed system-style sans stack substituted with Inter (OFL, Google Fonts); observed SF Mono/Consolas-class code stack substituted with JetBrains Mono (OFL); originals named in prose only, no proprietary binaries
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present — verbatim, maker "Notion Labs, Inc.", first block after front matter

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** These values were authored from
> knowledge of Notion's publicly observable design language on the provenance
> URLs (notion.com, /product, /help) — the css-analysis path has no automated
> extract, so no capture file exists. A human reviewer MUST run the manual CSS
> capture procedure (docs/04-DATA-SOURCES.md §5: `:root` custom properties plus
> computed styles of body, h1-h3, CTAs, cards, inputs, nav on the listed pages)
> and confirm this table against the capture before `status: published`.

| Token (file)               | Value in file | Value in source (observed role on notion.com)                       | OK  |
| -------------------------- | ------------- | ------------------------------------------------------------------- | --- |
| colors.surface             | #FFFFFF       | Page background across marketing, product, and help pages           | ✓   |
| colors.on-surface          | #191918       | Warm near-black body/heading text family                            | ✓   |
| colors.on-surface-variant  | #767572       | Warm secondary gray for captions/placeholders (AA-passing member)   | ✓   |
| colors.surface-variant     | #F1F1EF       | Pale warm fill on hover rows and default callout blocks             | ✓   |
| colors.surface-panel       | #F7F7F5       | Off-white of marketing cards and the app sidebar                    | ✓   |
| colors.primary             | #1D72C9       | Deepened member of the observed blue family (used for text/fills)   | ✓   |
| colors.primary-bright      | #2383E2       | Brighter observed blue (focus rings, selection tints)               | ✓   |
| colors.border-subtle       | #E9E9E7       | Warm hairline dividers                                              | ✓   |
| colors.tint-yellow         | #FBF3DB       | Muted yellow callout/tag block tint                                 | ✓   |
| rounded.md                 | 6px           | Soft corner radius on buttons, inputs, callouts                     | ✓   |
| spacing.md                 | 16px          | Base 4/8-rhythm step for control padding and block gaps             | ✓   |
| typography.body.fontSize   | 1rem          | 16px-equivalent document body text                                  | ✓   |
| typography.body.fontFamily | Inter         | Open substitute for the observed system-sans stack (named in prose) | ✓   |

## Contrast (0 warnings)

Lint reports zero contrast warnings; every component textColor/backgroundColor
pair meets WCAG AA 4.5:1 (button-primary white on #1D72C9 = 4.88:1; #191918 on
white/panels/tints = 15.3:1 to 17.6:1; helper text #767572 on white = 4.61:1).

One deliberate modeling choice to review: the site's brighter observed blue
(#2383E2) measures 3.88:1 on white — below AA for normal text — so the tokens
keep it as `primary-bright` for focus/selection only and use the deepened
family member #1D72C9 (`primary`, 4.88:1) for link text and button fills.
DESIGN.md documents this split in the Colors prose, Do's and Don'ts, and the
Agent Prompt Guide.

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Run the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the
  provenance URLs and confirm the spot-check table before publish.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
