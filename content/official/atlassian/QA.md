# QA — atlassian

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0, `design-system/tokens/LICENSE` at the pinned commit); `restricted: false`
- [x] Fonts: proprietary Atlassian Sans / Atlassian Mono substituted (→ Inter / JetBrains Mono); originals named in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `atlassian/atlassian-frontend-mirror` (Bitbucket) at commit
`3cdf019baa859e25cfd38137480a548d04a4fe41`, `design-system/tokens/figma/`
Figma-sync JSON (light theme), via `pipeline extract` → `tokens.raw.json`
(2535 raw tokens from 4 files).

| Token (file)               | Value in file | Value in source                                 | OK  |
| -------------------------- | ------------- | ----------------------------------------------- | --- |
| colors.primary             | #1868DB       | Light/color.background.brand.bold #1868DB       | ✓   |
| colors.on-primary          | #FFFFFF       | Light/color.text.inverse #FFFFFF                | ✓   |
| colors.surface             | #FFFFFF       | Light/elevation.surface #FFFFFF                 | ✓   |
| colors.surface-sunken      | #F8F8F8       | Light/elevation.surface.sunken #F8F8F8          | ✓   |
| colors.surface-selected    | #E9F2FE       | Light/color.background.selected #E9F2FE         | ✓   |
| colors.on-surface          | #292A2E       | Light/color.text #292A2E                        | ✓   |
| colors.on-surface-subtle   | #505258       | Light/color.text.subtle #505258                 | ✓   |
| colors.on-surface-subtlest | #6B6E76       | Light/color.text.subtlest #6B6E76               | ✓   |
| colors.border              | #8C8F97       | Light/color.border.input #8C8F97                | ✓   |
| colors.success             | #4C6B1F       | Light/color.text.success #4C6B1F                | ✓   |
| colors.success-subtle      | #EFFFD6       | Light/color.background.success #EFFFD6          | ✓   |
| colors.warning             | #9E4C00       | Light/color.text.warning #9E4C00                | ✓   |
| colors.danger              | #AE2E24       | Light/color.text.danger #AE2E24                 | ✓   |
| rounded.md                 | 6px           | Shape/radius.medium 6 (buttons, inputs)         | ✓   |
| rounded.lg                 | 8px           | Shape/radius.large 8 (cards, containers)        | ✓   |
| spacing.sm                 | 8px           | Spacing/space.100 8                             | ✓   |
| spacing.md                 | 16px          | Spacing/space.200 16                            | ✓   |
| typography.body.fontSize   | 0.875rem      | font.body 400 14px/20px (tokens-raw typography) | ✓   |

## Grounding notes (documented mappings, not invented values)

- **Type scale sizes** come from the same repo and commit but a file the
  extractor does not fetch (it is TSX, not JSON):
  `design-system/tokens/src/artifacts/tokens-raw/atlassian-typography.tsx`.
  Composite styles there: `font.heading.xxlarge` 32px/36px, `font.heading.large`
  24px/28px, `font.heading.medium` 20px/24px, `font.body` 14px/20px,
  `font.body.small` 12px/16px, `font.code` 0.875em. Cross-check that file (or
  atlassian.design/foundations/typography) before publish.
- **Heading weight**: ADS composite heading tokens ship weight `653`
  (Atlassian Sans variable). Tokens here use `600`, matching the system's own
  `font.weight.semibold` token, as the closest standard weight for the Inter
  substitute.
- **label**: ADS has no standalone label style; `typography.label` composes
  `font.body.small` (12px/16px) with `font.weight.semibold` (600).
- **colors.border / divider**: ADS's hairline divider token `color.border` is
  translucent (`#0B120E24`); the solid `color.border.input` (#8C8F97) is used
  instead so the palette stays plain 6-digit hex. Documented here, not a
  source value.
- **button-secondary background**: ADS's neutral button background
  `color.background.neutral` is translucent (`#0515240F`); the solid
  `elevation.surface.sunken` (#F8F8F8) stands in for it.
- **Motion**: the motion Figma-sync file at the pinned commit contains no
  active tokens; the Motion section states only documented ADS motion
  principles (brief, functional, ease-out entrances / ease-in exits) with no
  numeric claims.

## Contrast

No lint warnings. All component text/background pairs checked at AA or better:
on-primary/primary 5.20:1, success lozenge 5.81:1, warning lozenge 5.54:1,
danger lozenge 5.74:1, selected text on selected fill 4.60:1, subtlest text on
sunken surface 4.80:1.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
