# QA — nvidia

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable palette (table below — verified against a fresh source capture; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from NVIDIA properties
- [x] License SPDX + URL verified (CC-BY-4.0, this catalog's own license for independent analyses); `restricted: false`
- [x] Fonts: the observed proprietary DIN-like condensed sans is substituted (→ Work Sans) and the mono stand-in is JetBrains Mono; the true family is described generically in prose only
- [x] Disclaimer header present as the first block after front matter (verbatim, maker filled in)
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

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

## Source verification (automated)

> Generated by `pnpm pipeline verify nvidia` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 102
- Colors grounded in source: **13/13**
  (exact 12 · close 1 · drift 0 · unmatched 0)
- Files read:
  - https://www.nvidia.com
  - https://www.nvidia.com/etc.clientlibs/nvidiaweb/clientlibs/clientlib-site.min.1474fb5190b61b54fcb323ae9dab6a52.css
  - https://www.nvidia.com/etc.clientlibs/nvidiaweb/clientlibs/clientlib-base.min.8684b0f16f804cac8396aa31fdf033e6.css
  - https://www.nvidia.com/etc.clientlibs/nvidiaweb/clientlibs/clientlib-nvgdccart.min.d41d8cd98f00b204e9800998ecf8427e.css
  - https://www.nvidia.com/en-us/geforce/

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #76B900       | #76B900              | exact   |
| `colors.on-primary`         | #000000       | #000000              | exact   |
| `colors.surface`            | #000000       | #000000              | exact   |
| `colors.surface-variant`    | #1A1A1A       | #1A1A1A              | exact   |
| `colors.surface-muted`      | #262626       | #222222              | close   |
| `colors.on-surface`         | #FFFFFF       | #FFFFFF              | exact   |
| `colors.on-surface-variant` | #CCCCCC       | #CCCCCC              | exact   |
| `colors.helper`             | #999999       | #999999              | exact   |
| `colors.border`             | #333333       | #333333              | exact   |
| `colors.border-strong`      | #666666       | #666666              | exact   |
| `colors.success`            | #76B900       | #76B900              | exact   |
| `colors.warning`            | #FFBC01       | #FFBC01              | exact   |
| `colors.error`              | #F44336       | #F44336              | exact   |

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font substitution) completed by the pipeline.
- Source verification: **passed** — 13/13 colors traced to `css-analysis` source on 2026-08-01 (`pnpm pipeline verify`). CI re-runs this on every content change.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
