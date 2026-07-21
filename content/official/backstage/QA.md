# QA — backstage

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the package's own dist files (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, `license` field of `@backstage/theme@0.7.3` package.json + repo LICENSE); `restricted: false`
- [x] Fonts: Backstage bundles no fonts (system stack: Helvetica Neue, Helvetica, Roboto, Arial); open Inter / JetBrains Mono used as stand-ins in tokens, originals named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** `pipeline extract` found 0 tokens
> (`tokens.raw.json` shows `tokenCount: 0`) because `@backstage/theme` ships its
> palette as compiled TypeScript objects, not static token files. Values below
> were transcribed manually from the package's own dist sources at
> `@backstage/theme@0.7.3` via jsDelivr (`dist/base/palettes.esm.js`,
> `dist/base/createBaseThemeOptions.esm.js`, `dist/v5/defaultComponentThemes.esm.js`,
> `dist/base/pageTheme.esm.js`). A human reviewer must cross-check against those
> files and https://backstage.io/docs/getting-started/app-custom-theme/ before
> `status: published`.

| Token (file)                   | Value in file  | Value in source (dist path)                                                                   | OK  |
| ------------------------------ | -------------- | --------------------------------------------------------------------------------------------- | --- |
| colors.primary                 | #1F5493        | palettes.light.primary.main #1F5493 (base/palettes)                                           | ✓   |
| colors.surface                 | #F8F8F8        | palettes.light.background.default #F8F8F8 (base/palettes)                                     | ✓   |
| colors.paper                   | #FFFFFF        | palettes.light.background.paper #FFFFFF (base/palettes)                                       | ✓   |
| colors.on-surface              | #000000        | palettes.light.textContrast #000000 (base/palettes)                                           | ✓   |
| colors.text-subtle             | #6E6E6E        | palettes.light.textSubtle #6E6E6E (base/palettes)                                             | ✓   |
| colors.border                  | #E6E6E6        | palettes.light.border #E6E6E6 (base/palettes)                                                 | ✓   |
| colors.link                    | #0A6EBE        | palettes.light.link #0A6EBE (base/palettes)                                                   | ✓   |
| colors.header                  | #171717        | palettes.light.navigation.background #171717; also colorVariants.darkGrey[0] (base/pageTheme) | ✓   |
| colors.nav-muted               | #B5B5B5        | palettes.light.navigation.color #b5b5b5 (base/palettes)                                       | ✓   |
| colors.success                 | #1DB954        | palettes.light.status.ok #1DB954 (base/palettes)                                              | ✓   |
| colors.warning                 | #FF9800        | palettes.light.status.warning #FF9800 (base/palettes)                                         | ✓   |
| colors.error                   | #E22134        | palettes.light.status.error #E22134 (base/palettes)                                           | ✓   |
| typography.display.fontSize    | 3.375rem       | defaultTypography.h1 fontSize 54 at htmlFontSize 16 (base/createBaseThemeOptions)             | ✓   |
| typography.body-sm             | 0.875rem, 1.43 | MuiCssBaseline body fontSize 0.875rem, lineHeight 1.43 (v5/defaultComponentThemes)            | ✓   |
| typography.label.letterSpacing | 0.07em         | MuiTab letterSpacing 0.07em, fontWeight 500 (v5/defaultComponentThemes)                       | ✓   |
| rounded.sm                     | 4px            | Material UI default shape.borderRadius (not overridden by the theme)                          | ✓   |

Notes for the reviewer:

- Heading line heights, body (1rem) size, button/field paddings, and the
  spacing scale are Material UI defaults that `@backstage/theme` builds on and
  does not override — canonical, not Backstage-specific definitions.
- `rounded.md` (8px) matches the scrollbar-thumb radius override; `rounded.lg`
  and `rounded.full` are the conventional pill values for MUI chips/badges, not
  explicit theme constants.
- Page headers upstream are gradients from `colorVariants` pairs (e.g. darkGrey
  #171717 → #383838) with white text and an SVG wave; the flat `colors.header`
  token anchors them at the darkGrey/navigation value.
- Contrast: all component textColor/backgroundColor pairs pass WCAG AA
  (lowest: banner-error, #FFFFFF on #E22134, 4.67:1). `status.ok` green fails
  AA as text on white, so it is exposed only as a fill (`status-dot-ok`),
  matching how Backstage renders entity status.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`
  until then). Cross-check palette values against the dist files cited above
  (values are canonical from package sources, not auto-extracted).
- Reviewer:
- Date:
