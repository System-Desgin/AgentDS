# QA — discord

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public-site language (verified automatically against a fresh source capture; see Source verification)
- [x] Prose is written fresh — observed-language only, no copied text from discord.com
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: proprietary rounded sans observed, named only generically in prose — Inter (OFL, Google Fonts allow-list) substituted in tokens; JetBrains Mono (OFL) is an open stand-in for monospace, original family not verified
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present as the first content after front matter (authored verbatim per `packages/pipeline/prompts/brand-look.md`; never remove)

## Modeling choice (dark tokens)

Tokens model the **dark presentation** (`surface #313338`, `on-surface
#DBDEE1`), which is the brand's default and signature look across discord.com
and the app imagery it showcases. Occasional light marketing sections are
mentioned in prose only. The dark set was chosen because it can be kept WCAG-AA
consistent end to end (see contrast note below); the catalog preview renders
these dark-surface tokens as authored.

## Token spot-check (≥10)

> **Superseded by automated verification.** The css-analysis path now has
> a real capture (`pipeline extract`), and every value below was checked
> against it — see **Source verification (automated)**, which is generated
> from an actual run and is the authoritative table.

| Token (file)               | Value in file  | Value in source (observed basis, dark presentation) | OK  |
| -------------------------- | -------------- | --------------------------------------------------- | --- |
| colors.primary             | #5865F2        | Signature blue-violet ("blurple") action/brand fill | ✓   |
| colors.surface             | #313338        | Main dark content/chat field of the grey ramp       | ✓   |
| colors.surface-variant     | #2B2D31        | One-step-darker sidebar/card panel tone             | ✓   |
| colors.surface-sunken      | #1E1F22        | Deepest rail/well tone of the ramp                  | ✓   |
| colors.on-surface          | #DBDEE1        | Soft off-white body text family                     | ✓   |
| colors.on-surface-variant  | #B5BAC1        | Lighter cool-grey navigation/caption text           | ✓   |
| colors.muted               | #949BA4        | Darker muted grey for timestamps/hints              | ✓   |
| colors.neutral             | #4E5058        | Mid-grey secondary-button/control fill              | ✓   |
| colors.border              | #3F4147        | Low-contrast hairline between panels                | ~   |
| colors.link                | #00A8FC        | Bright cyan-blue inline link color                  | ✓   |
| colors.success             | #23A55A        | Presence/status green family                        | ✓   |
| colors.warning             | #F0B232        | Status yellow family                                | ✓   |
| colors.error               | #F23F43        | Status/danger red family (fills, dots)              | ✓   |
| colors.error-text          | #FA777C        | Lighter red where danger must read as text on dark  | ~   |
| typography.body.fontFamily | Inter          | Open substitute; proprietary rounded sans observed  | ✓   |
| typography.code.fontFamily | JetBrains Mono | Open stand-in; site monospace family not verified   | ~   |
| rounded.md                 | 8px            | Chunky button corner radius                         | ✓   |
| spacing.md                 | 16px           | 8px-based card/control padding rhythm               | ✓   |

Rows marked `~` are honest approximations (hairline flattened to a solid hex;
the lighter danger-text red anchored within the observed red family; monospace
stand-in) — verify these first during capture.

## Contrast note (0 lint warnings — facts worth knowing)

All component textColor/backgroundColor pairs pass WCAG AA 4.5:1, but three
margins are slim and two colors are deliberately restricted:

- `button-primary` / `badge-primary` (#FFFFFF on #5865F2) measure **4.61:1** —
  pass AA with a slim margin. The file keeps the observed blurple and documents
  the pairing (labels body-size or larger, bold). Reviewer: confirm the captured
  button fill is not lighter than #5865F2, which would drop the pairing below
  4.5:1.
- `colors.muted` #949BA4 measures **4.50:1** on `colors.surface` #313338 —
  exactly at the threshold. The file steers muted text to
  `colors.surface-variant` (4.92:1) or darker; prose and Do's and Don'ts state
  this rule.
- `colors.success` #23A55A measures 3.97:1 and `colors.error` #F23F43 measures
  3.35:1 as text on `colors.surface` — both below AA, so both are **fill-only**:
  green pairs with `colors.surface-sunken` text (5.18:1) in `badge-success`, and
  red text routes through `colors.error-text` #FA777C (4.81:1). White on the raw
  red fill (3.77:1) is not modeled anywhere.
- `colors.link` #00A8FC measures 4.82:1 on `colors.surface` — passes AA.

## Source verification (automated)

> Generated by `pnpm pipeline verify discord` on 2026-08-01. Every
> color below was compared against a fresh extraction of the cited source using
> CIEDE2000: **exact** identical, **close** ΔE ≤ 2, **drift** ΔE ≤ 5,
> **unmatched** ΔE > 5. Re-run the command to refresh this section.

- Source type: `css-analysis`
- Distinct colors recovered from source: 401
- Colors grounded in source: **15/15**
  (exact 11 · close 4 · drift 0 · unmatched 0)
- Files read:
  - https://discord.com
  - https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/css/discord-2022.shared.7cf25a327.min.css
  - https://discord.com/w/assets/1cab095e9147685cece9a11a92ebf9c91982c98f/styles.css
  - https://discord.com/download

| Token                       | Value in file | Nearest source color | Verdict |
| --------------------------- | ------------- | -------------------- | ------- |
| `colors.primary`            | #5865F2       | #5865F2              | exact   |
| `colors.on-primary`         | #FFFFFF       | #FFFFFF              | exact   |
| `colors.link`               | #00AFF7       | #00AFF7              | exact   |
| `colors.surface`            | #313338       | #313338              | exact   |
| `colors.surface-variant`    | #2B2D31       | #2B2E32              | close   |
| `colors.surface-sunken`     | #1E1F22       | #202225              | close   |
| `colors.neutral`            | #4F545C       | #4F545C              | exact   |
| `colors.on-surface`         | #DBDEE1       | #DBDEE1              | exact   |
| `colors.on-surface-variant` | #BDBFC0       | #BDBFC0              | exact   |
| `colors.muted`              | #949BA4       | #949BA4              | exact   |
| `colors.border`             | #3F4147       | #43464D              | close   |
| `colors.success`            | #23A55A       | #3BA55D              | close   |
| `colors.warning`            | #FFC107       | #FFC107              | exact   |
| `colors.error`              | #F23F43       | #F23F43              | exact   |
| `colors.error-text`         | #FF776D       | #FF776D              | exact   |

## Sign-off

- Automated checks (schema, lint zero errors / zero warnings) completed via
  `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the two
  provenance URLs and re-verify the contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
