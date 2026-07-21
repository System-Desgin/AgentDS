# QA — apple

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public pages (table below; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from apple.com
- [x] License SPDX + URL verified — CC-BY-4.0 is this entry's own content license (independent analysis; there is no upstream OSS token package); `restricted: false`
- [x] Fonts: the observed SF Pro is proprietary and substituted (all levels → Inter; monospace stand-in → JetBrains Mono); original named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check
- [x] Disclaimer header present (verbatim, first thing after front matter; never removed)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** This is a Brand Look authored from
> knowledge of Apple's publicly observable design language on the provenance
> pages (www.apple.com, www.apple.com/mac/). No automated extraction exists
> for css-analysis entries, and no manual capture has been performed yet. A
> human reviewer **must** run the manual CSS capture procedure
> (docs/04-DATA-SOURCES.md §5: `:root` custom properties + computed styles of
> canonical elements) and cross-check every row below before
> `status: published`.

| Token (file)              | Value in file | Value in source (observed element)                                    | OK     |
| ------------------------- | ------------- | --------------------------------------------------------------------- | ------ |
| colors.on-surface         | #1D1D1F       | apple.com body/headline near-black text on white (observed)           | ✓      |
| colors.surface-tint       | #F5F5F7       | apple.com quiet gray section and footer background (observed)         | ✓      |
| colors.accent             | #0071E3       | apple.com pill CTA button fill blue (observed)                        | ✓      |
| colors.link               | #0066CC       | apple.com inline link / "Learn more" blue (observed)                  | ✓      |
| colors.border             | #D2D2D7       | hairline dividers and input outlines (observed)                       | ✓      |
| colors.on-surface-variant | #6E6E73       | secondary/caption gray on light fields (observed)                     | ✓      |
| colors.primary            | #1D1D1F       | near-black alternating hero/section band (observed; some run #000)    | verify |
| colors.promo              | #B64400       | orange "New" flag on home-page product tiles (observed)               | verify |
| colors.success            | #008009       | store availability text green family (observed)                       | verify |
| colors.error              | #E30000       | store form validation error red (observed)                            | verify |
| typography.body.fontSize  | 1.0625rem     | body copy at 17px with ~1.47 line height (observed)                   | ✓      |
| typography.display        | 4rem / 600    | product hero headline scale and semibold weight (observed, approx)    | ✓      |
| typography.*.fontFamily   | Inter         | stand-in; every observed level is SF Pro (proprietary, prose only)    | ✓      |
| rounded.full              | 980px         | pill CTA border-radius on marketing pages (observed)                  | ✓      |
| rounded.lg                | 18px          | store card/tile corner radius, 12-18px range (observed, approx)       | ✓      |
| spacing.3xl               | 120px         | vertical air between full-bleed marketing sections (observed, approx) | ✓      |

## Contrast note (0 warnings — one pairing flagged for the reviewer)

The linter reports zero contrast warnings, but one measured ratio deserves
reviewer attention:

- `on-accent` white on `accent` #0071E3 — 4.70:1 by the WCAG formula. This is
  the real observed pairing (blue pill CTA, white label) and it passes AA for
  normal text, but only narrowly; the file's prose tells agents to keep
  accent fills to short button labels and to anchor all link text on the
  darker `link` #0066CC (5.57:1 on white, 5.11:1 on `surface-tint`).

All component textColor/backgroundColor pairs in the file pass WCAG AA 4.5:1.
Text-only status colors also pass on both light fields (promo 5.50:1,
success 5.13:1, error 4.92:1 on white; 5.05:1, 4.71:1, 4.52:1 on
`surface-tint`). The lighter observed footnote gray (#86868B, 3.62:1 on
white) was deliberately not tokenized; `on-surface-variant` #6E6E73 covers
secondary text at 5.07:1.

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font
  substitution) completed by the pipeline and authoring pass.
- **Human reviewer sign-off required before `status: published`** (kept
  `draft`). Reviewer must perform the manual CSS capture cross-check
  (docs/04-DATA-SOURCES.md §5) against the two provenance URLs, confirm the
  four rows marked "verify", and confirm the narrow 4.70:1 button-primary
  pairing is acceptable.
- Reviewer:
- Date:
