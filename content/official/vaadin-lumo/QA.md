# QA — vaadin-lumo

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the package source at the pinned version (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, `license` field in package.json and LICENSE in the package and repo); `restricted: false`
- [x] Fonts: Lumo uses a system font stack (no bundled fonts) — Inter stands in for text, JetBrains Mono for code; the real stack is named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Token spot-check (≥10)

> **Grounding: package source CSS at the pinned version, partially auto-extracted.**
> `pipeline extract` captured only `src/props/style.css` (9 tokens: border
> radii, shadows, cursor — see `tokens.raw.json`) because the extractor's CSS
> filename heuristics skip Lumo's `color.css`, `typography.css`, `spacing.css`,
> and `sizing.css` props files. Every other value below was verified manually
> against those files in `@vaadin/vaadin-lumo-styles@25.2.5` via jsDelivr
> (`https://cdn.jsdelivr.net/npm/@vaadin/vaadin-lumo-styles@25.2.5/src/props/`).
> Values are the light theme (first argument of `light-dark()`); alpha-based
> contrast tints are composited over the white base color (#FFFFFF). Lumo's
> `--lumo-contrast-Npct` roles resolve to `--lumo-shade-Npct` in light mode.
> `spacing.xxs` (2px) and `spacing.2xl` (64px) are catalog extensions for
> composition, not Lumo tokens; `rounded.sm` and `rounded.md` are both 4px
> because `--lumo-border-radius-m` defaults to the same 0.25em as the s step.
> A human reviewer must cross-check against the package source before
> `status: published`.

| Token (file)                | Value in file | Value in source                                                         | OK  |
| --------------------------- | ------------- | ----------------------------------------------------------------------- | --- |
| colors.primary              | #006AF5       | --lumo-primary-color hsl(214, 100%, 48%) (src/props/color.css)          | ✓   |
| colors.primary-text         | #005FDB       | --lumo-primary-text-color hsl(214, 100%, 43%)                           | ✓   |
| colors.primary-tint         | #E4F0FF       | --lumo-primary-color-10pct hsla(214, 100%, 60%, 0.13) over #FFF         | ✓   |
| colors.surface              | #FFFFFF       | --lumo-base-color #fff                                                  | ✓   |
| colors.contrast-5           | #F3F5F7       | --lumo-shade-5pct hsla(214, 61%, 25%, 0.05) over #FFF                   | ✓   |
| colors.contrast-10          | #E8EBEF       | --lumo-shade-10pct hsla(214, 57%, 24%, 0.1) over #FFF                   | ✓   |
| colors.on-surface           | #263445       | --lumo-shade-90pct hsla(214, 40%, 16%, 0.94) over #FFF (body text)      | ✓   |
| colors.on-surface-variant   | #616D7C       | --lumo-shade-70pct hsla(214, 42%, 18%, 0.69) over #FFF (secondary)      | ✓   |
| colors.border               | #C4CAD3       | --lumo-shade-30pct hsla(214, 50%, 22%, 0.26) over #FFF                  | ✓   |
| colors.success              | #0A7637       | --lumo-success-text-color hsl(145, 85%, 25%)                            | ✓   |
| colors.error                | #CA150C       | --lumo-error-text-color hsl(3, 89%, 42%)                                | ✓   |
| colors.warning              | #FFCC00       | --lumo-warning-color hsl(48, 100%, 50%)                                 | ✓   |
| rounded.md                  | 4px           | --lumo-border-radius-m 0.25em (tokens.raw.json; 4px at 16px root)       | ✓   |
| rounded.lg                  | 8px           | --lumo-border-radius-l 0.5em (tokens.raw.json)                          | ✓   |
| spacing.md                  | 16px          | --lumo-space-m 1rem (src/props/spacing.css)                             | ✓   |
| spacing.xl                  | 40px          | --lumo-space-xl 2.5rem                                                  | ✓   |
| typography.display.fontSize | 2.5rem        | --lumo-font-size-xxxl 2.5rem; h1 weight 600 (src/global/typography.css) | ✓   |
| typography.body.lineHeight  | 1.625         | --lumo-line-height-m 1.625 (src/props/typography.css)                   | ✓   |
| typography.label.fontWeight | 500           | field label font-weight 500 (src/mixins/field-label.css)                | ✓   |

## Contrast

No lint contrast warnings. All component text/background pairings were computed
at or above WCAG AA 4.5:1, including the two tightest: on-primary on primary
(4.79:1) and primary-text on primary-tint (4.97:1).

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
  Cross-check the manually verified color/typography/spacing values against the
  package source at the pinned version (see grounding note above).
- Reviewer:
- Date:
