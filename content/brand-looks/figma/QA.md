# QA — figma

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public-site language (table below — canonical, not captured)
- [x] Prose is written fresh — observed-language only, no copied text from figma.com
- [x] License SPDX + URL verified (CC-BY-4.0 covers this independent analysis only); `restricted: false`
- [x] Fonts: the proprietary grotesk observed on figma.com is substituted with Inter (OFL, Google Fonts allow-list); JetBrains Mono (OFL) is an open stand-in for the monospace; originals named in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present as the first content after front matter (authored verbatim per `packages/pipeline/prompts/brand-look.md`, maker "Figma, Inc."; never remove)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** There is no automated extraction for
> Brand Looks (`css-analysis`). Values below were authored from knowledge of
> the publicly observable design language of https://www.figma.com (marketing)
> and https://www.figma.com/design/ (in-product surfaces). A human reviewer
> MUST perform the manual CSS capture procedure in `docs/04-DATA-SOURCES.md`
> §5 against those two pages and cross-check every row before
> `status: published`.

| Token (file)                  | Value in file  | Value in source (observed basis)                               | OK     |
| ----------------------------- | -------------- | -------------------------------------------------------------- | ------ |
| colors.primary                | #000000        | True-black marketing ink: headlines, body, solid CTA fills     | ✓      |
| colors.surface                | #FFFFFF        | White page and canvas field on both kinds of page              | ✓      |
| colors.surface-variant        | #F5F5F5        | Near-white gray of marketing tiles and secondary panels        | ✓      |
| colors.on-surface             | #1E1E1E        | Softer near-black text family inside the product UI            | ✓      |
| colors.on-surface-variant     | #666666        | Secondary/muted gray text on both kinds of page                | ✓      |
| colors.border                 | #E6E6E6        | Hairline dividers on panels, toolbars, property rows           | ✓      |
| colors.action                 | #0D99FF        | Bright in-product blue: primary buttons, selection, focus      | ✓      |
| colors.action-deep            | #0A6DBA        | Darker end of the product blue family (AA fill decision below) | verify |
| colors.brand-red              | #F24E1E        | Red-orange of the five-color logo mark                         | ✓      |
| colors.brand-orange           | #FF7262        | Orange of the five-color logo mark                             | ✓      |
| colors.brand-purple           | #A259FF        | Purple of the five-color logo mark                             | ✓      |
| colors.brand-blue             | #1ABCFE        | Light blue of the five-color logo mark                         | ✓      |
| colors.brand-green            | #0ACF83        | Green of the five-color logo mark                              | ✓      |
| typography.label.fontSize     | 0.6875rem      | The product's small 11px panel/toolbar UI text                 | ✓      |
| typography.body-sm.fontSize   | 0.8125rem      | Compact 13px size dense product surfaces gravitate to          | ✓      |
| typography.display.fontFamily | Inter          | Open substitute; site sets a proprietary grotesk (prose-only)  | ~      |
| typography.code.fontFamily    | JetBrains Mono | Open stand-in; site monospace family not verified              | ~      |
| rounded.sm / rounded.md       | 5px / 6px      | Compact 5-6px corners on controls, inputs, small buttons       | ✓      |
| spacing.md                    | 16px           | 4/8-based rhythm shared by panels and marketing blocks         | ✓      |

Rows marked `~` are font substitutions (open stand-ins per the pipeline map);
the row marked `verify` is a modeling decision, not a captured value — check
these first during capture.

## Contrast note (0 lint warnings — three decisions, documented)

- The observed in-product primary button pairs **white on flat `action`
  #0D99FF**, which measures **2.99:1** — below AA for normal text. Rather
  than publish a sub-AA pairing, `button-action` fills with `action-deep`
  #0A6DBA, where white measures **5.37:1** (passes AA). #0A6DBA models the
  darker hover/pressed end of the observed blue family; reviewer: record the
  real hover/pressed blues during capture and replace #0A6DBA if the captured
  family member differs. Plain #0D99FF remains in the file for selection,
  focus, and fills under dark text only.
- White fails AA on **all five brand hues** (2.05:1 on brand-green up to
  3.88:1 on brand-purple), so every badge carries `primary` #000000 text
  (5.41:1 to 10.27:1 — passes on all five). The Do's and Don'ts and Agent
  Prompt Guide state this rule explicitly.
- `on-surface` #1E1E1E misses AA on `brand-purple` #A259FF (**4.29:1**),
  which is why badges mandate `primary` black rather than the softer product
  ink.

## Sign-off

- Automated checks (schema, lint zero errors / zero warnings) completed via
  `pipeline validate`.
- **Human reviewer sign-off required before `status: published`.** Perform the
  manual CSS capture cross-check (docs/04-DATA-SOURCES.md §5) on the two
  provenance URLs and re-verify the three contrast facts above.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
