---
version: "alpha"
name: AgentDS
description: Catalog of agent-ready design systems. Warm editorial surface, engineering-grade precision, the markdown file as the visual motif.
colors:
  primary: "#17150F"
  on-primary: "#FAF7F2"
  accent: "#BC4A26"
  on-accent: "#FDF6F0"
  surface: "#FAF7F2"
  on-surface: "#17150F"
  surface-variant: "#F1EBDF"
  on-surface-variant: "#57503F"
  border: "#E3DBC9"
  code-bg: "#201D14"
  code-fg: "#F1EADA"
  code-accent: "#D9A054"
  success: "#3F6B42"
  warning: "#82590C"
  error: "#8C2F23"
typography:
  display:
    fontFamily: Source Serif 4
    fontSize: 3.25rem
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.15
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.04em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface-variant}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-fg}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  token-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    padding: 4px 10px
  badge-lint-pass:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  command-line:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-accent}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  badge-restricted:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.surface}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px 16px
---

## Overview

AgentDS reads like a well-set technical book that happens to contain live engineering artifacts. Warm paper surfaces and a serif editorial voice carry the browsing experience; a dark, precise code register carries the files themselves. Calm, literate, exact — never "AI-glossy," never dashboard-cold.

**Signature: the file is the interface.** Because the product ships markdown files, the UI quotes markdown as its decorative language: section eyebrows are set as literal `## headings` in mono, metadata renders as `key: value` token chips, and color swatches are labeled with their real hex and role — the page itself looks like a beautifully rendered DESIGN.md. This is the one bold move; everything around it stays quiet.

## Colors

A two-register palette: warm paper for reading, warm charcoal for code.

- **primary (#17150F):** warm near-black ink. All reading text, primary buttons, icons.
- **accent (#BC4A26):** kiln clay. The single interactive voice — links, hover states, active filters, focus rings. Never used decoratively or as large fills.
- **surface (#FAF7F2) / surface-variant (#F1EBDF):** paper page and card cream. Cards sit on the page with `border`, not shadows.
- **code-bg (#201D14) / code-fg (#F1EADA) / code-accent (#D9A054):** the code register. File viewers, terminal commands, and API snippets always live on code-bg; amber highlights YAML keys and commands.
- **success (#3F6B42):** reserved exclusively for the lint-pass badge and positive validation states — it must keep meaning.
- **warning / error:** license-restricted notices and failed states only.
- Contrast: all text pairs meet WCAG AA; primary-on-surface is 15:1+, on-accent verified against accent.

## Typography

Three voices, strictly cast:

- **Source Serif 4 (display, headline-lg/md):** editorial voice for page titles, system names, and section openers. Semibold only; never used below 1.5rem.
- **Inter (body-lg/md):** all reading and UI text. Regular weight; medium (500) only for emphasis and nav.
- **JetBrains Mono (label-mono, code):** the engineering voice — eyebrows, token chips, hex values, commands, file contents, badges. Uppercase + 0.04em tracking for labels; normal case for code.

Rhythm: display for one hero statement per page; headline-lg for page sections; body copy measures 60–72ch.

## Spacing & Layout

- Base-8 scale (`xs`–`3xl`). Section padding: `2xl` desktop / `xl` mobile. Card internals: `lg`. Chip/inline gaps: `sm`.
- Max content width 1200px; reading columns 720px. Catalog grid: 3 columns desktop, 2 tablet, 1 mobile, `lg` gutters.
- Generous whitespace over dividers; when a rule is needed, use a 1px `border` hairline.

## Components

- **button-primary:** ink fill, paper text; hover swaps to accent clay. One per view section.
- **button-secondary:** hairline outline, transparent; for downloads, copy, and secondary paths.
- **card:** cream fill + hairline border + `rounded.lg`; hover lifts border color toward accent — no drop shadows.
- **code-block:** always dark register, `code` typography, copy button top-right in `label-mono`.
- **token-chip:** mono `key: value` pill for metadata (license, category, provenance); the workhorse of the signature style.
- **badge-lint-pass:** success pill, mono, appears once per detail page near the title.
- **command-line:** install/API commands (`npx skills add …`) — dark register with amber `code-accent` text and a copy affordance.
- **badge-restricted:** warning pill for license-restricted entries; mono, appears in place of download actions.
- **divider:** 1px hairline in `border` — the only separator allowed.
- **input:** paper field, hairline border; focus = 2px accent ring, no glow.
- **Borders (prose rule, applies to button-secondary, card, token-chip, input):** always 1px solid `border` (#E3DBC9) — the alpha spec has no borderColor sub-token, so this rule is normative here.

## Motion

Restraint. 150–200ms ease-out on hover/focus color and border transitions; a single 250ms fade-up on detail-page preview cards at load. No parallax, no scroll-jacking, no ambient animation. `prefers-reduced-motion` disables the entrance fade.

## Do's and Don'ts

- **Do** keep accent clay for interaction only; **don't** use it for headings, large panels, or gradients.
- **Do** render every code, command, hex value, and file in JetBrains Mono on the dark register; **don't** show code inline on paper surfaces.
- **Do** use hairline borders for separation; **don't** add drop shadows or glassmorphism.
- **Do** set serif only at headline sizes; **don't** use serif for body or UI copy.
- **Do** keep success green exclusive to lint/validation; **don't** repurpose it for generic positives.
- **Do** let real token data (swatches, hex, scales) be the ornamentation; **don't** add decorative illustrations or stock gradients.

## Agent Prompt Guide

When generating UI for this project:

1. Read this file first and reference tokens by name (`{colors.accent}`, `{spacing.lg}`) — never invent values.
2. Any new color/text pairing must pass WCAG AA; validate against the palette above.
3. Default composition: paper surface → hairline-bordered cards → one mono chip row → one primary action.
4. All code/file/command UI goes on `code-bg` with `code` typography and a copy affordance.
5. If a needed token doesn't exist, propose it in a PR to this file — do not hardcode.
6. After editing this file, run `npx @google/design.md lint DESIGN.md` and resolve all errors before committing.
