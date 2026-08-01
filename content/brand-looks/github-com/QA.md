# QA — github-com

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Positioning note

This Brand Look covers GitHub's **marketing site** (github.com/home and the
features pages) only. The catalog already carries **Primer**, GitHub's product
design system, as an official entry (`content/official/primer/`). The two are
deliberately distinct: Primer is the calm product UI language; this entry is
the theatrical marketing voice (near-black glow heroes, huge display type,
green sign-up CTA). Reviewers should confirm the entry never presents itself
as Primer or as an official GitHub system.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the publicly observable palette (table below — verified against a fresh source capture; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from GitHub properties
- [x] License SPDX + URL verified (CC-BY-4.0, this catalog's own license for independent analyses); `restricted: false`
- [x] Fonts: observed Mona Sans is open (SIL OFL) but not on the preview loader allow-list — tokens substitute Inter; observed monospace stack substituted with JetBrains Mono; true families named in prose only (same pattern as vercel/Geist)
- [x] Disclaimer header present as the first block after front matter (verbatim, maker "GitHub, Inc.")
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

| Token (file)                  | Value in file  | Value in source (publicly observable role)            | OK  |
| ----------------------------- | -------------- | ----------------------------------------------------- | --- |
| colors.hero                   | #0D1117        | Near-black hero/dark-section canvas                   | ✓   |
| colors.on-hero                | #FFFFFF        | White headline text on dark heroes                    | ✓   |
| colors.on-hero-muted          | #9198A1        | Muted gray supporting copy on dark sections           | ✓   |
| colors.hero-border            | #30363D        | Hairline borders on dark sections                     | ✓   |
| colors.primary                | #238636        | Green sign-up CTA fill (dark-palette green family)    | ✓   |
| colors.surface                | #FFFFFF        | White feature-section background                      | ✓   |
| colors.on-surface             | #1F2328        | Near-black body text on white sections                | ✓   |
| colors.on-surface-variant     | #59636E        | Secondary text gray on white                          | ✓   |
| colors.surface-variant        | #F6F8FA        | Faint gray band/panel background                      | ✓   |
| colors.border                 | #D1D9E0        | 1px hairline on white sections                        | ✓   |
| colors.accent                 | #0969DA        | Link blue on light surfaces                           | ✓   |
| colors.glow-purple            | #A371F7        | Purple glow-gradient / eyebrow hue on dark            | ✓   |
| colors.glow-blue              | #79C0FF        | Blue glow / code-art hue on dark                      | ✓   |
| colors.glow-green             | #3FB950        | Green glow / highlight hue on dark                    | ✓   |
| typography.display            | 4rem / 800     | Huge heavy tight-tracked headlines and stats numerals | ✓   |
| typography.display.fontFamily | Inter          | Observed Mona Sans (OFL, substituted — see note)      | ✓   |
| typography.code.fontFamily    | JetBrains Mono | Observed monospace stack (substituted — see note)     | ✓   |

Notes:

- Font substitution: Mona Sans is GitHub's own open-source family (SIL OFL)
  but is not on the preview loader allow-list in
  `packages/shared/src/preview/fonts.ts` (`GOOGLE_FAMILIES`), so the token
  `fontFamily` values are Inter / JetBrains Mono and the observed families are
  named in DESIGN.md prose only. If Mona Sans is added to the allow-list, the
  tokens can switch to the real family (the official `primer` entry already
  names Mona Sans directly).
- Type scale, tracking, spacing steps (4px rhythm, 96px section padding), and
  radii are representative of the observed site, not captured computed styles;
  they are part of the mandatory manual cross-check above.

## Contrast

All component text/background pairings pass WCAG AA; zero lint contrast
warnings. Verified pairings (WCAG relative-luminance math):

- `colors.on-primary` #FFFFFF on `colors.primary` #238636 = 4.63:1 — passes
  AA for normal text with little margin; DESIGN.md instructs never to lighten
  the green (Colors, Agent Prompt Guide).
- `colors.on-hero` #FFFFFF on `colors.hero` #0D1117 = 18.9:1.
- `colors.on-hero-muted` #9198A1 on `colors.hero` = 6.50:1.
- Glow hues on `colors.hero`: `glow-purple` #A371F7 = 5.64:1, `glow-blue`
  #79C0FF = 9.73:1, `glow-green` #3FB950 = 7.45:1 — all pass on dark. All
  three FAIL on white (3.35:1 / 1.94:1 / 2.54:1), so DESIGN.md restricts them
  to dark sections (Colors, Do's and Don'ts, Agent Prompt Guide).
- `colors.accent` #0969DA on #FFFFFF = 5.19:1; `colors.on-surface` #1F2328 on
  #FFFFFF = 15.8:1; `colors.on-surface-variant` #59636E on #FFFFFF = 6.11:1.

## Source verification (automated)

> Generated by `pnpm pipeline verify github-com` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 1048
- Colors grounded in source: **18/18**
  (exact 18 · close 0 · drift 0 · unmatched 0)
- Files read:
  - https://github.com/home
  - https://github.githubassets.com/assets/light-e2591d2392bd4749.css
  - https://github.githubassets.com/assets/light_high_contrast-8868d78e42bfa938.css
  - https://github.githubassets.com/assets/dark-af3e8f6e07ad6ccb.css
  - https://github.githubassets.com/assets/dark_high_contrast-da3f7378682e25f2.css
  - https://github.githubassets.com/assets/light_colorblind-08450e2a88296329.css
  - https://github.githubassets.com/assets/light_colorblind_high_contrast-052e466d4b0f43ea.css
  - https://github.githubassets.com/assets/light_tritanopia-b7c2d5dbeadcb97c.css
  - …and 25 more

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #238636       | #238636              | exact   |
| `colors.on-primary`         | #FFFFFF       | #FFFFFF              | exact   |
| `colors.surface`            | #FFFFFF       | #FFFFFF              | exact   |
| `colors.on-surface`         | #1F2328       | #1F2328              | exact   |
| `colors.on-surface-variant` | #59636E       | #59636E              | exact   |
| `colors.surface-variant`    | #F6F8FA       | #F6F8FA              | exact   |
| `colors.border`             | #D1D9E0       | #D1D9E0              | exact   |
| `colors.hero`               | #0D1117       | #0D1117              | exact   |
| `colors.on-hero`            | #FFFFFF       | #FFFFFF              | exact   |
| `colors.on-hero-muted`      | #9198A1       | #9198A1              | exact   |
| `colors.hero-border`        | #30363D       | #30363D              | exact   |
| `colors.accent`             | #0969DA       | #0969DA              | exact   |
| `colors.glow-purple`        | #A371F7       | #A371F7              | exact   |
| `colors.glow-blue`          | #79C0FF       | #79C0FF              | exact   |
| `colors.glow-green`         | #3FB950       | #3FB950              | exact   |
| `colors.success`            | #006222       | #006222              | exact   |
| `colors.warning`            | #523F00       | #523F00              | exact   |
| `colors.error`              | #730019       | #730019              | exact   |

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font substitution) completed by the pipeline.
- Source verification: **passed** — 18/18 colors traced to `css-analysis` source on 2026-08-01 (`pnpm pipeline verify`). CI re-runs this on every content change.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
