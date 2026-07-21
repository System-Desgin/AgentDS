# QA — vercel

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable palette (table below — canonical, not captured; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from Vercel properties
- [x] License SPDX + URL verified (CC-BY-4.0, this catalog's own license for independent analyses); `restricted: false`
- [x] Fonts: observed Geist Sans / Geist Mono are open (SIL OFL) but not on the preview loader allow-list — tokens substitute Inter / JetBrains Mono; true families named in prose only (same pattern as forma-36)
- [x] Disclaimer header present as the first block after front matter (verbatim, maker filled in)
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks. Values below were authored from knowledge of the publicly
> observable design language of vercel.com, vercel.com/design, and nextjs.org
> (the public Geist palette and the classic Vercel accents ramp). A human
> reviewer MUST perform the manual in-browser CSS capture described in
> `docs/04-DATA-SOURCES.md` §5 (`:root` custom properties + computed styles of
> body, h1-h3, CTAs, card, input, nav on the provenance URLs) and cross-check
> every row before `status: published`.

| Token (file)               | Value in file  | Value in source (publicly observable role)           | OK  |
| -------------------------- | -------------- | ---------------------------------------------------- | --- |
| colors.primary             | #000000        | Pure black: primary CTAs, footer, inverse sections   | ✓   |
| colors.on-primary          | #FFFFFF        | Pure white text on black fills                       | ✓   |
| colors.surface             | #FFFFFF        | White page background                                | ✓   |
| colors.surface-variant     | #FAFAFA        | Subtle secondary background (classic accents-1)      | ✓   |
| colors.surface-muted       | #F2F2F2        | Code/hover fill (public Geist gray-100)              | ✓   |
| colors.on-surface          | #171717        | Near-black text (dark end of public Geist gray ramp) | ✓   |
| colors.on-surface-variant  | #666666        | Secondary text gray (classic accents-5)              | ✓   |
| colors.border              | #EAEAEA        | Signature 1px hairline border (classic accents-2)    | ✓   |
| colors.border-strong       | #999999        | Hover/emphasis border gray (classic accents-3)       | ✓   |
| colors.accent              | #0070F3        | Vercel blue: links and info accents                  | ✓   |
| colors.error               | #EE0000        | Form validation / error red (classic error family)   | ✓   |
| colors.warning             | #F5A623        | Warning amber, used as fill with dark text           | ✓   |
| rounded.sm / rounded.md    | 6px / 8px      | Observed control and card radii (6-8px range)        | ✓   |
| typography.body.fontFamily | Inter          | Observed Geist Sans (OFL, substituted — see note)    | ✓   |
| typography.code.fontFamily | JetBrains Mono | Observed Geist Mono (OFL, substituted — see note)    | ✓   |

Notes:

- Font substitution: Geist Sans / Geist Mono are Vercel's own open-source
  families (SIL OFL) but are not on the preview loader allow-list in
  `packages/shared/src/preview/fonts.ts`, so the token `fontFamily` values are
  Inter / JetBrains Mono and the observed families are named in DESIGN.md
  prose only. If Geist is later added to the allow-list, tokens can switch to
  the real families.
- Type scale, spacing steps (4px rhythm), and letterSpacing values are
  representative of the observed site, not captured computed styles; they are
  part of the mandatory manual cross-check above.

## Contrast

All component text/background pairings pass WCAG AA; zero lint contrast
warnings. Two pairings sit close to the threshold and are intentionally
restricted to pure white backgrounds, with matching guidance in DESIGN.md
(Colors, Do's and Don'ts, Agent Prompt Guide):

- `colors.accent` #0070F3 on #FFFFFF = 4.55:1 (would fail on #FAFAFA at 4.36:1)
- `colors.error` #EE0000 on #FFFFFF = 4.53:1 (would fail on #FAFAFA at 4.34:1)
- `colors.warning` #F5A623 is a fill only (8.85:1 under #171717 text), never
  text on white.

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Perform the manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the
  provenance URLs before publishing — values are canonical from public
  observation, not captured.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
