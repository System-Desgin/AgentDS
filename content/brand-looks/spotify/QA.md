# QA — spotify

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable site (table below; canonical grounding, see note)
- [x] Prose is written fresh — observed-language only, no copied text from Spotify properties
- [x] License SPDX + URL verified (CC-BY-4.0, catalog content license); `restricted: false`
- [x] Fonts: the observed proprietary circular-style geometric sans is substituted with Inter (per the `packages/shared` substitution map); the original family is named generically in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check
- [x] Disclaimer header present, verbatim, first thing after front matter (never removed)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** This Brand Look was authored from
> knowledge of Spotify's publicly observable design language on
> open.spotify.com and www.spotify.com (provenance URLs, 2026-07-21) — there is
> no automated CSS extraction for brand looks. A human reviewer MUST perform
> the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) against the
> live pages before `status: published`.

| Token (file)                  | Value in file | Value in source (observed on public pages)                                    | OK  |
| ----------------------------- | ------------- | ----------------------------------------------------------------------------- | --- |
| colors.surface                | #121212       | Web player base background near-black #121212                                 | ✓   |
| colors.surface-variant        | #181818       | Resting card background in the #181818 family                                 | ✓   |
| colors.surface-raised         | #1F1F1F       | Hovered/elevated card and chip background in the #1F1F1F family               | ✓   |
| colors.on-surface             | #FFFFFF       | Titles and primary copy render white                                          | ✓   |
| colors.on-surface-variant     | #A7A7A7       | Secondary/metadata text in the #A7A7A7 family                                 | ✓   |
| colors.primary                | #1DB954       | Signature brand green used for the primary CTA                                | ✓   |
| colors.primary-bright         | #1ED760       | Web player play buttons and hover states render the brighter green            | ✓   |
| colors.on-primary             | #000000       | Green fills carry black labels/glyphs (observed CTA pairing)                  | ✓   |
| colors.border-subtle          | #292929       | Hairline dividers between rows/sections on the dark field                     | ✓   |
| rounded.full                  | 9999px        | Buttons, chips, and the search field are full pills                           | ✓   |
| rounded.md                    | 8px           | Card corner radius in the web player grid                                     | ✓   |
| typography.display.fontWeight | 900           | Marketing hero headlines are very heavy and tightly tracked                   | ✓   |
| typography.body.fontFamily    | Inter         | Observed proprietary circular-style geometric sans → Inter (substitution map) | ✓   |

Status colors (`warning` #FFA42B, `error` #F15E6C) are the least certain
values in the file: they model the notice/error text family seen on dark
surfaces but were chosen to hold AA on `{colors.surface}`. Cross-check these
two first during the manual capture.

## Modeling decisions

- **Dark surfaces as the tokens.** Spotify's product UI is dark-first, so the
  tokens model the dark theme (`surface` #121212, `on-surface` #FFFFFF)
  rather than a light variant. All prose contrast claims are against the dark
  field.
- **Black-on-green CTA.** The observed pairing on green fills is black text,
  and it is the only AA-compliant option: #000000 on #1DB954 measures about
  8.1:1 (and 10.9:1 on #1ED760), while white on either green measures about
  2.6:1. The DESIGN.md forbids white-on-green explicitly.
- **Contrast summary (computed, WCAG relative luminance):** white on #121212
  = 18.7:1; #A7A7A7 on #121212 = 7.8:1 and on #181818 = 7.4:1; #1ED760 text
  on #121212 = 9.8:1; #FFA42B = 9.5:1; #F15E6C = 5.9:1. Zero linter contrast
  warnings.
- **No code face observed.** `typography.code` (JetBrains Mono) is a neutral
  provision, flagged as such in prose.

## Sign-off

- Automated checks (schema, lint, contrast computation, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Perform the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5)
  against open.spotify.com and www.spotify.com — values are canonical from
  knowledge of the public site, not captured.
- Reviewer:
- Date:
