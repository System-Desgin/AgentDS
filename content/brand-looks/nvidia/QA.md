# QA — nvidia

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable palette (table below — canonical, not captured; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from NVIDIA properties
- [x] License SPDX + URL verified (CC-BY-4.0, this catalog's own license for independent analyses); `restricted: false`
- [x] Fonts: the observed proprietary DIN-like condensed sans is substituted (→ Work Sans) and the mono stand-in is JetBrains Mono; the true family is described generically in prose only
- [x] Disclaimer header present as the first block after front matter (verbatim, maker filled in)
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks. Values below were authored from knowledge of the publicly
> observable design language of nvidia.com and the GeForce product pages. A
> human reviewer MUST perform the manual in-browser CSS capture described in
> `docs/04-DATA-SOURCES.md` §5 (`:root` custom properties + computed styles of
> body, h1-h3, CTAs, card, input, nav on the provenance URLs) and cross-check
> every row before `status: published`.

**Theme choice:** the live site alternates black/charcoal hero bands with
white content sections. This entry models the **dark** surfaces, because that
is the only side where the signature green stays WCAG AA consistent in both
of its observed roles (fill behind black text, and link/status text). On
white, green text fails at 2.4:1, so a light-token model could not include
`link`, `status-success`, or green highlights without inventing sub-AA
pairings.

| Token (file)               | Value in file     | Value in source (publicly observable role)                            | OK  |
| -------------------------- | ----------------- | --------------------------------------------------------------------- | --- |
| colors.primary             | #76B900           | Signature NVIDIA green: CTAs, links, highlights                       | ✓   |
| colors.on-primary          | #000000           | Black text on green CTA fills (observed pairing)                      | ✓   |
| colors.surface             | #000000           | Pure black hero/footer field                                          | ✓   |
| colors.surface-variant     | #1A1A1A           | Charcoal cards, panels, raised sections                               | ✓   |
| colors.surface-muted       | #262626           | Lighter charcoal behind inputs and table headers                      | ✓   |
| colors.on-surface          | #FFFFFF           | White primary text on dark bands                                      | ✓   |
| colors.on-surface-variant  | #CCCCCC           | Light-gray secondary copy and table data                              | ✓   |
| colors.helper              | #999999           | Placeholder and fine-print gray                                       | ✓   |
| colors.border              | #333333           | Hairline rules on spec tables and cards                               | ✓   |
| colors.border-strong       | #666666           | Stronger outline on focusable controls                                | ✓   |
| colors.success             | #76B900           | Same green doubles as the stock/status positive                       | ✓   |
| colors.warning / error     | #FFB300 / #FF5252 | Amber and red status hues legible on dark                             | ✓   |
| rounded.sm-lg              | 0px / 2px / 4px   | Squared to barely-rounded corners (0-4px range)                       | ✓   |
| typography.body.fontFamily | Work Sans         | Observed proprietary DIN-like condensed sans (substituted — see note) | ✓   |
| typography.code.fontFamily | JetBrains Mono    | Monospaced figures in spec callouts (stand-in)                        | ✓   |

Notes:

- Font substitution: the observed family is a proprietary condensed
  grotesque and is not redistributable, so the token `fontFamily` is Work
  Sans (Google Fonts, chosen for its compact technical feel) with JetBrains
  Mono as the mono stand-in, per the substitution policy in
  `packages/shared/src/preview/fonts.ts`. The proprietary family is named
  only generically in DESIGN.md prose.
- Type scale, spacing steps (4px rhythm), and the 0-4px radius scale are
  representative of the observed site, not captured computed styles; they
  are part of the mandatory manual cross-check above.

## Contrast

All component text/background pairings pass WCAG AA; zero lint contrast
warnings. Computed ratios for the load-bearing pairings:

- `colors.on-primary` #000000 on `colors.primary` #76B900 = 8.71:1 — the
  observed CTA pairing. White on green would fail at 2.41:1 and is banned in
  DESIGN.md (Colors, Do's and Don'ts, Agent Prompt Guide).
- `colors.primary` #76B900 as text: 8.71:1 on #000000, 7.22:1 on #1A1A1A,
  6.28:1 on #262626 — but 2.41:1 on #FFFFFF, so green text is restricted to
  the dark surfaces.
- `colors.helper` #999999 on #000000 = 7.37:1; `colors.error` #FF5252 on
  #000000 = 6.58:1 and on #1A1A1A = 5.45:1.
- `colors.on-primary` #000000 on `colors.warning` #FFB300 = 11.70:1
  (badge-warning).

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Perform the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the
  provenance URLs before publishing — values are canonical from public
  observation, not captured.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
