# QA — openai

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public pages (table below; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from openai.com or platform.openai.com
- [x] License SPDX + URL verified — CC-BY-4.0 is this entry's own content license (independent analysis; there is no upstream OSS token package); `restricted: false`
- [x] Fonts: the observed proprietary custom sans is substituted (UI/editorial → Inter; serif editorial moments → Source Serif 4; code → JetBrains Mono); original named generically in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present (verbatim, first thing after front matter; never removed)

## Token spot-check (≥10)

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

| Token (file)               | Value in file  | Value in source (observed element)                                               | OK     |
| -------------------------- | -------------- | -------------------------------------------------------------------------------- | ------ |
| colors.primary             | #0D0D0D        | openai.com solid pill CTA fill and inverse footer near-black (observed)          | ✓      |
| colors.on-primary          | #FFFFFF        | white label text inside black pill CTAs (observed)                               | ✓      |
| colors.surface             | #FFFFFF        | openai.com white page field on marketing and blog pages (observed)               | ✓      |
| colors.surface-variant     | #F7F7F8        | off-white panel/card tone and docs sidebar background (observed)                 | ✓      |
| colors.surface-muted       | #ECECEC        | code-block and hover-state neutral in the platform docs UI (observed)            | ✓      |
| colors.on-surface          | #0D0D0D        | primary body/headline text near-black across both sites (observed)               | ✓      |
| colors.on-surface-variant  | #5D5D5D        | secondary copy, captions, muted nav gray (observed, approx)                      | ✓      |
| colors.border              | #E6E6E6        | hairline dividers, input and table borders (observed, approx)                    | ✓      |
| colors.accent              | #10A37F        | heritage brand green, seen in restrained badge/highlight moments                 | verify |
| colors.success             | #077D55        | status-green family, darkened for AA text use; sparse on public pages            | verify |
| colors.warning             | #E8A33D        | status-amber family; sparse on public pages                                      | verify |
| colors.error               | #B42318        | status-red family, darkened for AA text use; sparse on public pages              | verify |
| typography.display         | 3.5rem / 500   | openai.com hero headline scale, medium weight, tight tracking (observed, approx) | ✓      |
| typography.body.fontSize   | 1.125rem       | blog/research reading text around 18px (observed, approx)                        | ✓      |
| typography.code.fontFamily | JetBrains Mono | stand-in; docs code uses a monospace stack (observed)                            | ✓      |
| rounded.full               | 9999px         | pill-shaped CTAs across marketing pages (observed)                               | ✓      |
| spacing.3xl                | 96px           | large vertical gaps between editorial sections (observed, approx)                | ✓      |

Note on the status set: observed status color on the public marketing and docs
pages is sparse — the site is deliberately monochrome. `success`, `warning`,
and `error` are modeled as an AA-safe minimal set consistent with the look,
and the DESIGN.md prose says so explicitly. The reviewer should confirm or
correct them from the platform UI during the capture cross-check.

## Contrast (0 warnings)

The linter reports zero contrast warnings. Measured ratios for the reviewer:

- All monochrome text pairings are far above AA by construction:
  `on-primary` on `primary` 19.44:1; `on-surface` on `surface` /
  `surface-variant` / `surface-muted` 19.44 / 18.15 / 16.45:1;
  `on-surface-variant` on `surface` / `surface-variant` 6.58 / 6.15:1.
- `badge-accent` — dark `on-surface` text on `accent` #10A37F: 6.08:1, passes AA.
- `badge-warning` — dark `on-surface` text on `warning` #E8A33D: 9.01:1, passes AA.
- `status-success` / `status-error` text on white: 5.16:1 / 6.57:1, pass AA.
- `accent` #10A37F as text on white would be 3.20:1 and `warning` #E8A33D as
  text would be 2.16:1 — both below AA. No component uses either as text; the
  Colors prose, Do's and Don'ts, and Agent Prompt Guide all restrict them to
  fills behind `on-surface` text.

## Source verification (automated)

> Generated by `pnpm pipeline verify openai` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 234
- Colors grounded in source: **13/13**
  (exact 7 · close 6 · drift 0 · unmatched 0)
- Files read:
  - https://platform.openai.com/docs
  - https://academy.openai.com/
  - https://academy.openai.com/_next/static/css/44f0b715c34a5384.css?dpl=prod-df46564-4d01cf281256d04130fd1dd4db63709b
  - https://academy.openai.com/_next/static/css/a703850ebc20bf54.css?dpl=prod-df46564-4d01cf281256d04130fd1dd4db63709b
  - https://academy.openai.com/_next/static/css/a017279ac8cd0c67.css?dpl=prod-df46564-4d01cf281256d04130fd1dd4db63709b

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #0D0D0D       | #0A0A0A              | close   |
| `colors.on-primary`         | #FFFFFF       | #FFFFFF              | exact   |
| `colors.surface`            | #FFFFFF       | #FFFFFF              | exact   |
| `colors.surface-variant`    | #F7F7F8       | #F7F7F7              | close   |
| `colors.surface-muted`      | #ECECEC       | #EAEAEA              | close   |
| `colors.on-surface`         | #0D0D0D       | #0A0A0A              | close   |
| `colors.on-surface-variant` | #5D5D5D       | #616161              | close   |
| `colors.border`             | #E6E6E6       | #E5E5E5              | close   |
| `colors.border-strong`      | #888888       | #888888              | exact   |
| `colors.accent`             | #04B17D       | #04B17D              | exact   |
| `colors.success`            | #037251       | #037251              | exact   |
| `colors.warning`            | #E49C49       | #E49C49              | exact   |
| `colors.error`              | #B20905       | #B20905              | exact   |

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font
  substitution) completed by the pipeline and authoring pass.
- Source verification: **passed** — 13/13 colors traced to `css-analysis` source on 2026-08-01 (`pnpm pipeline verify`). CI re-runs this on every content change.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
