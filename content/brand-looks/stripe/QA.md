# QA — stripe

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the observed public pages (table below; see grounding note)
- [x] Prose is written fresh — observed-language only, no copied text from stripe.com or docs.stripe.com
- [x] License SPDX + URL verified — CC-BY-4.0 is this entry's own content license (independent analysis; there is no upstream OSS token package); `restricted: false`
- [x] Fonts: the observed proprietary grotesk is substituted (headings/UI → Inter; docs monospace → Source Code Pro); originals named generically in prose only
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output
- [x] Disclaimer header present (verbatim, first thing after front matter; never removed)

## Token spot-check (≥10)

> **Grounding: canonical, not captured.** This is a Brand Look authored from
> knowledge of Stripe's publicly observable design language on the provenance
> pages (stripe.com, stripe.com/payments, docs.stripe.com). No automated
> extraction exists for css-analysis entries, and no manual capture has been
> performed yet. A human reviewer **must** run the manual CSS capture
> procedure (docs/04-DATA-SOURCES.md §5: `:root` custom properties + computed
> styles of canonical elements) and cross-check every row below before
> `status: published`.

| Token (file)               | Value in file   | Value in source (observed element)                                | OK     |
| -------------------------- | --------------- | ----------------------------------------------------------------- | ------ |
| colors.accent              | #635BFF         | stripe.com primary CTA fill / link blurple (observed)             | ✓      |
| colors.primary             | #0A2540         | stripe.com footer and dark feature-section navy (observed)        | ✓      |
| colors.surface-tint        | #F6F9FC         | stripe.com light section background, faint blue cast (observed)   | ✓      |
| colors.on-surface-variant  | #425466         | stripe.com marketing body-copy slate (observed)                   | ✓      |
| colors.helper              | #596171         | docs.stripe.com secondary/metadata text gray (observed)           | ✓      |
| colors.border              | #E3E8EE         | hairline dividers and card edges on light sections (observed)     | ✓      |
| colors.success             | #0E6245         | docs UI status-green family, darkened for AA text use             | verify |
| colors.warning             | #983705         | docs UI status-amber family, darkened for AA text use             | verify |
| colors.error               | #A41C4E         | docs UI status-red family, darkened for AA text use               | verify |
| typography.display         | 3.5rem / 700    | stripe.com hero headline scale and weight (observed, approx)      | ✓      |
| typography.body.fontSize   | 1.125rem        | marketing body copy around 18px (observed, approx)                | ✓      |
| typography.code.fontFamily | Source Code Pro | stand-in; docs code rail uses a monospace stack (observed)        | ✓      |
| rounded.full               | 9999px          | pill-shaped CTA buttons across marketing pages (observed)         | ✓      |
| spacing.3xl                | 96px            | large vertical gaps between marketing sections (observed, approx) | ✓      |

## Contrast note (0 warnings — two pairings flagged for the reviewer)

The linter reports zero contrast warnings, but two measured ratios deserve
reviewer attention:

- `on-accent` white on `accent` #635BFF — 4.70:1 by the WCAG formula. This is
  the real observed pairing (blurple pill, white label) and it passes AA for
  normal text, but only narrowly; the file's prose tells agents to keep
  accent fills to short bold labels.
- `accent` #635BFF text on `surface-tint` #F6F9FC — 4.44:1, below AA. No
  component uses this pairing; the Do's and Don'ts and Agent Prompt Guide
  explicitly restrict accent text to white `surface`.

All component textColor/backgroundColor pairs in the file pass WCAG AA 4.5:1
(status text colors were deliberately taken from the darker end of the
observed families: 7.4:1, 7.3:1, 7.4:1 on white).

## Sign-off

- Automated checks (schema, lint, spot-check table, license, font
  substitution) completed by the pipeline and authoring pass.
- **Human reviewer sign-off required before `status: published`** (kept
  `draft`). Reviewer must perform the manual CSS capture cross-check
  (docs/04-DATA-SOURCES.md §5) against the three provenance URLs, confirm the
  three status-color rows marked "verify", and confirm the narrow 4.70:1
  button-primary pairing is acceptable.
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
