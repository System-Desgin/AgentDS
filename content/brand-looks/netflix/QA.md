# QA — netflix

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable site (table below; canonical grounding, see note)
- [x] Prose is written fresh — observed-language only, no copied text from Netflix properties
- [x] License SPDX + URL verified (CC-BY-4.0, catalog content license); `restricted: false`
- [x] Fonts: the observed proprietary brand sans is substituted with Inter in tokens (per `packages/shared` policy); the original family is named generically in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check
- [x] Disclaimer header present, verbatim, first thing after front matter (never removed)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** This Brand Look was authored from
> knowledge of Netflix's publicly observable design language on
> www.netflix.com and about.netflix.com (provenance URLs, 2026-07-21) — there
> is no automated CSS extraction for brand looks. A human reviewer MUST
> perform the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5)
> against the live pages before `status: published`.

| Token (file)                  | Value in file | Value in source (observed on public pages)                                         | OK  |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------- | --- |
| colors.background             | #000000       | Marketing heroes, sign-in page, and player sit on pure black                       | ✓   |
| colors.surface                | #141414       | Browse UI base background near-black #141414                                       | ✓   |
| colors.surface-variant        | #181818       | Expanded title/detail panel background in the #181818 family                       | ✓   |
| colors.surface-raised         | #333333       | Form inputs, secondary-button gray, and loading placeholders in the #333333 family | ✓   |
| colors.on-surface             | #FFFFFF       | Titles and primary copy render white                                               | ✓   |
| colors.on-surface-variant     | #B3B3B3       | Secondary/metadata text and footer links in the #B3B3B3 family                     | ✓   |
| colors.primary                | #E50914       | Signature brand red used for the primary CTA                                       | ✓   |
| colors.primary-dim            | #C11119       | CTA hover darkens into the #C11119 family                                          | ✓   |
| colors.on-primary             | #FFFFFF       | Red fills carry white labels (observed CTA pairing)                                | ✓   |
| colors.success                | #46D369       | Match-percentage green text on browse surfaces                                     | ✓   |
| colors.warning                | #E87C03       | Alert orange on account/sign-in notices                                            | ✓   |
| rounded.sm                    | 4px           | Buttons, inputs, and poster tiles use small 4px-family radii                       | ✓   |
| rounded.md                    | 8px           | Detail panels/modals use 8px-family radii                                          | ✓   |
| typography.display.fontWeight | 900           | Landing-page hero headlines are very heavy and tightly set                         | ✓   |
| typography.body.fontFamily    | Inter         | Observed proprietary brand grotesque sans → Inter (substitution policy)            | ✓   |

The status set is deliberately sparse: Netflix's public pages expose very few
status colors. `success` (#46D369) and `warning` (#E87C03) are observed
families; `error` (#F16A5E) is a modeled soft red chosen to hold AA on the
dark field because the brand red fails as text there (see contrast section).
Cross-check these three first during the manual capture.

## Contrast (computed, WCAG relative luminance — zero linter warnings)

White-on-red math, verified honestly:

- **#FFFFFF on primary #E50914 = 4.79:1** — passes AA 4.5:1 for normal text,
  but only just. The DESIGN.md therefore tells agents to keep CTA labels
  short and bold, and the darker observed hover `primary-dim` #C11119 is the
  more comfortable anchor at **6.25:1**.
- **primary #E50914 as text on surface #141414 = 3.84:1** — fails AA for
  normal text (passes only the 3:1 large-text threshold). The file makes red
  fills-only and forbids red-as-text on dark surfaces; no component pairs
  red text with a dark background.

Other pairings:

- #FFFFFF on #000000 = 21.0:1; on #141414 = 18.4:1; on #181818 = 17.8:1; on #333333 = 12.6:1
- #B3B3B3 on #141414 = 8.79:1; on #181818 = 8.47:1; on #333333 = 6.03:1
- #808080 (muted) on #141414 = 4.66:1 — tight pass; the file restricts it to caption-length fine print
- Status text on #141414: #46D369 = 9.46:1; #E87C03 = 6.42:1; #F16A5E = 6.11:1

## Modeling decisions

- **Two-level dark field.** Netflix's public pages are dark-only, so the
  tokens model the dark theme directly: pure black `background` #000000 for
  heroes/marketing/player and near-black `surface` #141414 for the browse UI.
  All prose contrast claims are against these dark fields.
- **White-on-red CTA.** The observed pairing on red fills is white text; it
  is AA-defensible (4.79:1 on #E50914, 6.25:1 on the #C11119 hover) and both
  anchors are kept in the file, with the tight pass documented above.
- **No code face observed.** `typography.code` (JetBrains Mono) is a neutral
  provision, flagged as such in prose.
- **Proprietary font.** The observed brand sans is proprietary; tokens carry
  Inter and the prose names the family only generically. No font binaries
  are referenced or shipped.

## Sign-off

- Automated checks (schema, lint, contrast computation, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Perform the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5)
  against www.netflix.com and about.netflix.com — values are canonical from
  knowledge of the public site, not captured.
- Reviewer:
- Date:
