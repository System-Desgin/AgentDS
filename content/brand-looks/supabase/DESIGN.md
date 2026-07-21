---
version: alpha
name: Supabase
description: Observed dark-first look of supabase.com — near-black surfaces, one signature green accent with dark text on fills, hairline borders, code-forward type.
colors:
  primary: "#3ECF8E"
  on-primary: "#0F0F0F"
  surface: "#121212"
  surface-deep: "#0F0F0F"
  surface-variant: "#1C1C1C"
  on-surface: "#FAFAFA"
  on-surface-variant: "#898989"
  border-subtle: "#2E2E2E"
  border-strong: "#3E3E3E"
  success: "#3ECF8E"
  warning: "#F5A623"
  error: "#F87171"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.33
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 64px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  code-block:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    typography: "{typography.code}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Supabase, Inc. All trademarks belong to
> their owners. Use as inspiration for an original system.

## Overview

This Brand Look describes the visual language observable on supabase.com and
its public docs. The site presents dark-first: a deep near-black, faintly
green-tinted field (`{colors.surface}`), soft off-white text
(`{colors.on-surface}`), and one signature green (`{colors.primary}`) doing all
the brand work on CTAs, logos, and highlights. The look is terse and
tool-like: muted gray secondary text, hairline borders at very low contrast,
radii held to a tight 6-8px band, and code blocks treated as first-class
content rather than an afterthought.

Tokens here model the dark presentation, matching the site's default. The
marketing hero surfaces sit a step deeper (`{colors.surface-deep}`) than the
docs field, and the set is kept WCAG-AA consistent end to end.

## Colors

- **surface (`#121212`) / surface-deep (`#0F0F0F`)** — the near-black page
  field used across docs and product surfaces, and the slightly deeper tone
  observed behind marketing heroes and code panels.
- **surface-variant (`#1C1C1C`)** — the one-step lifted tone for cards,
  inputs, and secondary buttons.
- **on-surface (`#FAFAFA`) / on-surface-variant (`#898989`)** — soft white
  primary text and the muted gray secondary text the site leans on heavily;
  both pass WCAG AA on every surface token.
- **primary (`#3ECF8E`)** — the signature green seen on primary CTAs, the
  logo mark, and inline highlights. It is bright enough to read as text on
  the dark field (9.39:1 on `{colors.surface}`), and as a fill it takes dark
  `{colors.on-primary}` text — the pairing observed on the site's buttons.
- **border-subtle (`#2E2E2E`) / border-strong (`#3E3E3E`)** — solid
  equivalents of the low-alpha hairlines that outline cards, tables, and
  inputs; subtle for structure, strong for interactive outlines.
- **success (`#3ECF8E`) / warning (`#F5A623`) / error (`#F87171`)** — the
  status family; the brand green doubles as the positive voice, with amber
  and soft red observed in docs callouts and product imagery. All read as
  text on `{colors.surface}` at AA or better.

## Typography

The site sets UI and marketing copy in a custom rounded sans of the Circular
family; per the substitution map the tokens use **Inter** (OFL, Google Fonts)
as the open stand-in. Monospaced type is everywhere — inline keys, terminal
snippets, full code panels — and **JetBrains Mono** (OFL) stands in for the
observed monospace.

- **display (`{typography.display}`)** — large, semibold, tightly tracked
  (-0.02em) hero headlines; the voice is confident but not heavy.
- **heading-lg / heading** — the same semibold voice stepping down through
  `{typography.heading-lg}` to `{typography.heading}` for section and card
  titles.
- **body (`{typography.body}`)** — 16px-equivalent reading text with a relaxed
  1.6 line height, used for docs prose and marketing copy alike.
- **body-sm / label** — 14px and 12px sizes for dense UI copy, captions, and
  table text; label carries a medium weight instead of extra size.
- **code (`{typography.code}`)** — monospace for identifiers, keys, commands,
  and the code panels that anchor most pages.

Weights stay in a narrow 400-600 band; hierarchy comes from size and colour,
not from heavy type.

## Spacing & Layout

Spacing follows a 4/8 rhythm: `{spacing.xxs}` and `{spacing.xs}` for badge and
icon insets, `{spacing.sm}` through `{spacing.md}` for control and cell
padding, `{spacing.lg}` for card interiors, and `{spacing.xl}` through
`{spacing.3xl}` for the wide section gaps on marketing pages. Docs run a
classic three-column layout (nav, prose, on-page outline) with hairline
separation; marketing content sits in a centered column on the deep field.
Panels separate from the page with `{colors.border-subtle}` hairlines and the
one-step lift to `{colors.surface-variant}` — not with drop shadows.

## Components

- **button-primary** — the signature CTA: solid `{colors.primary}` fill with
  dark `{colors.on-primary}` text and `{rounded.md}` corners; this
  dark-on-green pairing is the observed brand moment.
- **button-secondary** — `{colors.surface-variant}` fill, `{colors.on-surface}`
  text, and a `{colors.border-strong}` hairline edge.
- **card** — `{colors.surface-variant}` panel with `{rounded.lg}` corners,
  `{spacing.lg}` interior, and a `{colors.border-subtle}` outline.
- **field** — `{colors.surface-variant}` input with a `{colors.border-strong}`
  outline that shifts toward the green accent on focus.
- **link** — `{colors.primary}` text; the green is strong enough on dark to
  serve as a link colour at AA and beyond.
- **helper-text** — `{colors.on-surface-variant}` secondary text at
  `{typography.label}` for hints, captions, and table metadata.
- **code-block** — the signature component: a `{colors.surface-deep}` panel,
  `{colors.on-surface}` monospace text, `{rounded.md}` corners, and a
  `{colors.border-subtle}` outline.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}` and
  `{colors.border-strong}`.
- **badge-primary** — a pill (`{rounded.full}`) in `{colors.primary}` with
  `{colors.on-primary}` text, used for small brand and status chips.
- **status-success / status-warning / status-error** — status text in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}` at
  `{typography.label}`.

## Motion

Motion on the site is restrained and functional: short opacity and colour
transitions on hover, occasional slow ambient glows behind hero art, and no
looping animation in functional UI. Keep transitions under roughly 200ms,
prefer fades over movement, and honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the single brand colour for CTAs, links,
  and highlights; **don't** spread the green across headings, fills, and
  decoration.
- **Do** pair green fills with dark `{colors.on-primary}` text — the observed
  CTA pairing at roughly 9.6:1; **don't** put white text on the green, which
  lands far below AA.
- **Do** build structure with `{colors.border-subtle}` hairlines and the
  one-step lift to `{colors.surface-variant}`; **don't** stack drop shadows or
  bright panels on the dark field.
- **Do** treat code as first-class content in `code-block` panels on
  `{colors.surface-deep}`; **don't** bury snippets in prose or style them as
  plain text.
- **Do** hold radii to the `{rounded.md}`-`{rounded.lg}` band (6-8px);
  **don't** use sharp square corners or heavily rounded panels.
- **Do** lean on `{colors.on-surface-variant}` for secondary text so pages
  stay quiet; **don't** set long body copy in muted gray below AA sizes.
- **Do** keep weights in the 400-600 band with tight display tracking;
  **don't** use heavy weights or decorative faces.
- **Do** reserve `{colors.warning}` and `{colors.error}` for status;
  **don't** use them decoratively.

## Agent Prompt Guide

When generating UI in this Supabase-inspired look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; green fills always
   take `{colors.on-primary}` dark text, never white, and green text sits only
   on the dark surface tokens.
3. Default composition: `{colors.surface}` field, `{colors.surface-variant}`
   cards and inputs edged with `{colors.border-subtle}`, one green
   `button-primary` per view, code in `code-block` panels.
4. Keep type terse and tool-like: Inter for UI (the site's custom sans stays
   prose-only), JetBrains Mono confined to `{typography.code}`, weights
   400-600.
5. Keep motion under 200ms, fade-first, and honour `prefers-reduced-motion`.
6. This is an independent Brand Look for inspiration — do not present output
   as Supabase's official design system, and propose missing tokens in a PR
   rather than inventing values.
