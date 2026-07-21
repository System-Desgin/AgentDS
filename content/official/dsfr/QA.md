# QA — dsfr

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with **zero errors** (1 deliberate warning — see note; `lint-report.json` attached)
- [x] 10+ token values spot-checked against the package's dist CSS (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (**etalab-2.0**, not MIT — see license note); `restricted: true` set with reason
- [x] Fonts: Marianne (state-reserved, non-redistributable) substituted with open Public Sans in tokens; Marianne named in prose only; JetBrains Mono (open) for the code level
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Restricted handling (reference-only entry)

This entry is **intentionally reference-only** (PRD §12 restricted-entry
handling). The DSFR visual identity is legally reserved for French state
services, so `restricted: true` is set in `meta.yaml` and, once published, the
API must serve **451** (with the JSON reason) for this entry's files;
downloads and raw-file access stay disabled in the web UI. Publishing this
entry must not enable its download/copy paths.

## License note (differs from the task brief)

The task brief expected MIT for the code. Verified in
`@gouvfr/dsfr@1.15.1/package.json`: `"license": "etalab-2.0"` (Licence
Ouverte / Open License 2.0 — a permissive attribution license,
CC-BY-compatible). The package's LICENSE.md additionally states the code's
use is framed by terms of use: the DSFR must not be used by entities outside
the French administration and its replicability is limited outside `.gouv.fr`
domains. `meta.yaml` records `spdx: etalab-2.0` and phrases the identity
restriction plainly ("use of the visual identity is reserved for French
government services") without inventing a legal citation.

## Lint warning (1 — deliberate, not a defect to hide)

- `colors.red-marianne` (#E1000F) is defined but referenced by no component.
  This is intentional: in the dist CSS, red-marianne main (#E1000F) is used
  for the Marianne emblem artwork (`--artwork-minor-red-marianne`) and a
  border decision (`--border-default-red-marianne`), not for any
  text/background component pairing. It is kept in the palette because it is
  the second national identity colour; wiring it to a UI component would
  invent a usage DSFR does not have. Status/error red in components is
  `colors.error` (#CE0500), matching DSFR's functional palette.

## Token spot-check (16)

> **Grounding: canonical values, manually verified against the extracted
> package (not auto-extracted).** `pipeline extract` pulled
> `/.config/colors.json` from `@gouvfr/dsfr@1.15.1` (1661 entries in
> `tokens.raw.json`), but that file is a class taxonomy (names/usages) with no
> hex values, so it cannot ground the palette by itself. Every value below was
> instead manually verified against `dist/dsfr.css` of the **same package
> version** (light theme `:root` block; dark theme starts at
> `[data-fr-theme=dark]`). A human reviewer should re-check a sample against
> systeme-de-design.gouv.fr before `status: published`.

| Token (file)                | Value in file  | Value in source (dist/dsfr.css @1.15.1, light)       | OK  |
| --------------------------- | -------------- | ---------------------------------------------------- | --- |
| colors.primary              | #000091        | --blue-france-sun-113-625: #000091                   | ✓   |
| colors.primary-soft         | #E3E3FD        | --blue-france-925-125: #e3e3fd (action-low)          | ✓   |
| colors.red-marianne         | #E1000F        | --red-marianne-main-472: #e1000f                     | ✓   |
| colors.surface              | #FFFFFF        | --grey-1000-50: #fff (background-default-grey)       | ✓   |
| colors.surface-alt          | #F6F6F6        | --grey-975-75: #f6f6f6 (background-alt-grey)         | ✓   |
| colors.surface-contrast     | #EEEEEE        | --grey-950-100: #eee (background-contrast-grey)      | ✓   |
| colors.on-surface           | #3A3A3A        | --grey-200-850: #3a3a3a (text-default-grey)          | ✓   |
| colors.on-surface-title     | #161616        | --grey-50-1000: #161616 (text-title-grey)            | ✓   |
| colors.on-surface-mention   | #666666        | --grey-425-625: #666 (text-mention-grey)             | ✓   |
| colors.border               | #DDDDDD        | --grey-900-175: #ddd (border-default-grey)           | ✓   |
| colors.info                 | #0063CB        | --info-425-625: #0063cb                              | ✓   |
| colors.success              | #18753C        | --success-425-625: #18753c                           | ✓   |
| colors.warning              | #B34000        | --warning-425-625: #b34000                           | ✓   |
| colors.error                | #CE0500        | --error-425-625: #ce0500                             | ✓   |
| typography.display.fontSize | 2.5rem         | .fr-h1 (desktop): font-size 2.5rem, line-height 3rem | ✓   |
| typography.body-sm          | 0.875rem, 1.71 | .fr-text--sm: 0.875rem / 1.5rem                      | ✓   |

Component grounding: `.fr-btn` padding 0.5rem 1rem, font 1rem/500;
`.fr-badge` border-radius 0.25rem; `.fr-tag` padding 0.25rem 0.75rem, pill
radius; `.fr-input` background `--background-contrast-grey`; `.fr-card`
white with `--border-default-grey` hairline; `.fr-message--warning` text in
`--text-default-warning`. Typeface: Marianne is proprietary/state-reserved —
token value is the open Public Sans substitute; Marianne appears in prose only.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Confirm the reference-only/451 behaviour is wired for this slug, the
  etalab-2.0 license reading, and the red-marianne lint warning; cross-check a
  sample of values against systeme-de-design.gouv.fr.
- Reviewer:
- Date:
