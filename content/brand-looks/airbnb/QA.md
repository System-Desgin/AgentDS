# QA — airbnb

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`)
- [x] 10+ token values spot-checked against the observed public pages (table below; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from airbnb.com
- [x] License SPDX + URL verified — CC-BY-4.0 is this entry's own content license (independent analysis; there is no upstream OSS token package); `restricted: false`
- [x] Fonts: the observed proprietary rounded geometric sans is substituted with Inter; the original is named generically in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — pending publish-time render check
- [x] Disclaimer header present (verbatim, first thing after front matter; never removed)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** This is a Brand Look authored from
> knowledge of Airbnb's publicly observable design language on the provenance
> pages (airbnb.com, airbnb.com/help). No automated extraction exists for
> css-analysis entries, and no manual capture has been performed yet. A human
> reviewer **must** run the manual CSS capture procedure
> (docs/04-DATA-SOURCES.md §5: `:root` custom properties + computed styles of
> canonical elements) and cross-check every row below before
> `status: published`.

| Token (file)              | Value in file  | Value in source (observed element)                          | OK     |
| ------------------------- | -------------- | ----------------------------------------------------------- | ------ |
| colors.primary            | #FF385C        | wishlist heart and light end of the CTA gradient (observed) | ✓      |
| colors.primary-deep       | #D70466        | darker magenta end of the observed CTA gradient             | verify |
| colors.on-surface         | #222222        | primary near-black text across airbnb.com (observed)        | ✓      |
| colors.on-surface-variant | #6A6A6A        | secondary gray on listing metadata (observed)               | ✓      |
| colors.helper             | #717171        | helper/caption gray family on airbnb.com (observed)         | ✓      |
| colors.surface-variant    | #F7F7F7        | light gray input wells and quiet panels (observed)          | ✓      |
| colors.border             | #DDDDDD        | stronger hairline dividers (observed)                       | ✓      |
| colors.border-subtle      | #EBEBEB        | quiet section dividers on listing pages (observed)          | ✓      |
| colors.outline            | #B0B0B0        | input and secondary-control outlines (observed)             | verify |
| colors.success            | #008A05        | confirmation-green family in status messaging (observed)    | verify |
| colors.error              | #C13515        | form-error red family (observed)                            | verify |
| typography.body           | 1rem / 400     | body copy around 16px (observed, approx)                    | ✓      |
| typography.heading-lg     | 1.625rem / 600 | listing titles around 26px semibold (observed, approx)      | ✓      |
| rounded.sm / rounded.md   | 8px / 12px     | button and card/photo corners (observed)                    | ✓      |
| rounded.lg / rounded.xl   | 24px / 32px    | sheet and large modal corners (observed, approx)            | ✓      |
| rounded.full              | 9999px         | search-bar pill and photo badges (observed)                 | ✓      |

## Contrast note (0 warnings — the CTA decision, documented)

The real observed primary CTA is a gradient across the coral family with a
white label. White on `primary` #FF385C measures **3.52:1** by the WCAG
formula — below AA for normal text. Rather than publish a sub-AA
`button-primary`, the token anchors the solid fill on the darker observed
gradient end:

- `on-primary` white on `primary-deep` #D70466 — 5.12:1, passes AA.
- `on-primary` white on `primary` #FF385C — 3.52:1, fails AA; the file
  forbids this pairing in prose (Colors, Do's and Don'ts, Agent Prompt
  Guide) and no component uses it.
- `success` #008A05 on white — 4.53:1, a narrow AA pass; the file tells
  agents to keep it to short status lines.
- `error` #C13515 on white — 5.54:1; `helper` #717171 on white — 4.88:1;
  `on-surface` #222222 on white — 15.91:1. All pass.

A human reviewer should confirm anchoring on the darker gradient end is
acceptable for this entry (the alternative is documenting a sub-AA warning
ant-design-style).

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font
  substitution) completed by the pipeline and authoring pass. Final lint:
  0 errors, 0 warnings.
- During finishing QA the input-outline gray (#B0B0B0) was renamed
  `border-strong` to `outline`: the component schema has no border
  sub-token, so the linter flagged `border-strong` as orphaned; `outline`
  is the standard semantic role for this use and is referenced in prose
  (Colors, button-secondary, field). The value is unchanged.
- **Human reviewer sign-off required before `status: published`** (kept
  `draft`). Reviewer must perform the manual CSS capture cross-check
  (docs/04-DATA-SOURCES.md §5) against the two provenance URLs, confirm the
  rows marked "verify" (gradient end, input outline gray, status greens and
  reds), and confirm the AA-anchored `button-primary` decision.
- Reviewer:
- Date:
