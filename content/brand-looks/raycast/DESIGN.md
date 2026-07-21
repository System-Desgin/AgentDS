---
version: alpha
name: Raycast
description: Observed dark launcher look of raycast.com — deep charcoal surfaces, a red-coral accent, sunset-gradient brand moments, kbd chips, and compact Inter type.
colors:
  primary: "#FF6363"
  on-primary: "#0A0A0A"
  surface: "#0A0A0A"
  on-surface: "#FFFFFF"
  surface-variant: "#161618"
  on-surface-variant: "#A6A6AD"
  border-subtle: "#242428"
  border-strong: "#3A3A40"
  brand-orange: "#FF9F45"
  brand-pink: "#F06BB5"
  success: "#4FC183"
  warning: "#FFC531"
  error: "#F14C4C"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 700
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
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
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
    lineHeight: 1.35
    letterSpacing: 0.01em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 12px
  lg: 20px
  full: 9999px
spacing:
  xxs: 2px
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
    padding: 10px 16px
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 16px
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
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  kbd:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
    typography: "{typography.code}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-brand:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  hero-gradient-start:
    backgroundColor: "{colors.brand-orange}"
    rounded: "{rounded.lg}"
  hero-gradient-end:
    backgroundColor: "{colors.brand-pink}"
    rounded: "{rounded.lg}"
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Raycast Technologies Inc. All trademarks
> belong to their owners. Use as inspiration for an original system.

## Overview

This Brand Look describes the visual language observable on raycast.com and its
extension store. The site presents dark-first: a deep charcoal field
(`{colors.surface}`), panels one step lighter (`{colors.surface-variant}`) with
subtle translucency and blur cues, white primary text (`{colors.on-surface}`),
and the signature red-coral accent (`{colors.primary}`) carrying the brand.
Warm sunset gradients (`{colors.brand-orange}` through `{colors.brand-pink}`)
appear as decorative hero moments. The chrome is compact and keyboard-centric:
big rounded panels shaped like the launcher window, small precise labels, kbd
shortcut chips, and restrained glows instead of hard drop shadows.

Tokens here model the dark presentation, matching the site's default. The
translucent, blurred panel effects are flattened to solid hex equivalents so
the set stays verifiable and WCAG-AA consistent.

## Colors

- **surface (`#0A0A0A`) / surface-variant (`#161618`)** — the deep charcoal
  page field and the lifted panel tone used for cards, inputs, and the
  launcher-style chrome; on the site these panels often carry translucency and
  background blur, flattened here to solid values.
- **on-surface (`#FFFFFF`) / on-surface-variant (`#A6A6AD`)** — white primary
  text and the muted gray secondary text; both pass WCAG AA on either surface.
- **primary (`#FF6363`)** — the red-coral accent seen on calls to action,
  links, and brand moments. It passes AA as text on `{colors.surface}`
  (6.8:1); as a fill it takes dark `{colors.on-primary}` text, because white
  on coral fails AA.
- **brand-orange (`#FF9F45`) / brand-pink (`#F06BB5`)** — solid endpoints of
  the sunset-gradient moments observed in hero art and store imagery;
  decorative fills only, never text colours.
- **border-subtle (`#242428`) / border-strong (`#3A3A40`)** — solid
  equivalents of the site's low-alpha hairlines; subtle for structure, strong
  for interactive outlines.
- **success (`#4FC183`) / warning (`#FFC531`) / error (`#F14C4C`)** — a status
  family consistent with the dark UI; all read as text on `{colors.surface}`
  at AA or better. Error stays a harder red so it never blurs into the coral
  brand accent.

## Typography

The site sets marketing and UI copy in **Inter**; Inter is on Google Fonts
under the SIL OFL, so the tokens use it directly with no substitution.
Monospaced type appears in keyboard hints, commands, and code snippets;
**JetBrains Mono** (OFL) is the open family used here.

- **display (`{typography.display}`)** — bold, tightly tracked (-0.02em)
  headline type with a 1.1 line height; hero statements read confident and
  compact.
- **heading-lg / heading** — semibold section and card titles stepping down to
  `{typography.heading}`.
- **body (`{typography.body}`)** — 16px-equivalent reading text with a relaxed
  1.6 line height.
- **body-sm (`{typography.body-sm}`)** — 14px-equivalent for dense supporting
  copy and store metadata.
- **label (`{typography.label}`)** — the small precise labels the chrome
  relies on: 12px, medium weight, slightly positive tracking.
- **code (`{typography.code}`)** — monospace for shortcuts, commands, and
  snippets, including the kbd chips.

Weight spans 400 to 700, with bold reserved for display headlines; hierarchy
below that comes from size and colour, not heavier weights.

## Spacing & Layout

Spacing follows a 4/8 rhythm: `{spacing.xxs}` and `{spacing.xs}` for chip and
icon insets, `{spacing.sm}` through `{spacing.md}` for control padding,
`{spacing.lg}` for card interiors, and `{spacing.xl}` through `{spacing.3xl}`
for the generous section gaps of the marketing pages. Content sits in a
centered column with wide dark margins. Panels are large and rounded
(`{rounded.lg}`), separated from the field by `{colors.border-subtle}`
hairlines and the one-step lift to `{colors.surface-variant}`; elevation reads
as a faint glow, not a hard shadow.

## Components

- **button-primary** — solid `{colors.primary}` fill with dark
  `{colors.on-primary}` text and `{rounded.md}` corners; the coral is bright
  enough that dark text is the accessible pairing.
- **button-secondary** — `{colors.surface-variant}` fill with
  `{colors.on-surface}` text and a `{colors.border-subtle}` hairline edge.
- **card** — `{colors.surface-variant}` panel, big `{rounded.lg}` corners,
  `{spacing.lg}` interior; on the site these panels often blur what is behind
  them and glow faintly at the edges.
- **field** — `{colors.surface-variant}` input with `{colors.border-strong}`
  outline on focus, styled after the launcher's command input.
- **link** — `{colors.primary}` text; coral passes AA as text on the charcoal
  surfaces.
- **helper-text** — `{colors.on-surface-variant}` at `{typography.label}` for
  hints, captions, and store metadata.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}` and
  `{colors.border-strong}`.
- **kbd** — the signature shortcut chip: `{colors.surface-variant}` fill,
  `{colors.on-surface-variant}` monospace glyph, tight `{rounded.sm}` corners,
  2px 6px padding.
- **status-success / status-warning / status-error** — status text in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}` at
  `{typography.label}`.
- **badge-brand** — a pill (`{rounded.full}`) in `{colors.primary}` with
  `{colors.on-primary}` text for counts and highlights.
- **hero-gradient-start / hero-gradient-end** — decorative `{rounded.lg}`
  panels holding the solid endpoints of the sunset gradient,
  `{colors.brand-orange}` and `{colors.brand-pink}`; fills only, they never
  carry text.

## Motion

Motion on the site is restrained and product-led: quick fades and small
translates on hover and scroll reveal, with slow ambient gradient glows behind
hero panels. Functional UI never bounces or loops. Keep transitions under
roughly 200ms, prefer opacity over movement, and honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for actions, links, and brand moments;
  **don't** spread coral across headings and body copy.
- **Do** give coral fills dark `{colors.on-primary}` text; **don't** set white
  text on `{colors.primary}` — it fails WCAG AA at 2.9:1.
- **Do** use `{colors.brand-orange}` and `{colors.brand-pink}` as decorative
  gradient endpoints in hero art; **don't** run text over gradient midtones or
  put gradients on functional controls.
- **Do** build structure with the one-step lift to `{colors.surface-variant}`
  and `{colors.border-subtle}` hairlines; **don't** stack hard drop shadows —
  elevation is a faint glow.
- **Do** keep panels big and rounded (`{rounded.lg}`) with controls at
  `{rounded.md}`; **don't** square corners off — the launcher silhouette is
  part of the look.
- **Do** show keyboard shortcuts as kbd chips in `{typography.code}`;
  **don't** write shortcuts inline as plain prose.
- **Do** keep labels small and precise (`{typography.label}`); **don't** push
  hierarchy with heavy weights — bold belongs to `{typography.display}` only.
- **Do** reserve `{colors.success}` / `{colors.warning}` / `{colors.error}`
  for status; **don't** use `{colors.error}` as a second brand red — that is
  `{colors.primary}`'s job.

## Agent Prompt Guide

When generating UI in this Raycast-inspired look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1: coral reads as text
   on the charcoal surfaces (6.8:1), but coral fills always pair with dark
   `{colors.on-primary}` text, never white.
3. Default composition: `{colors.surface}` field, large `{rounded.lg}`
   `{colors.surface-variant}` panels edged with `{colors.border-subtle}`, one
   `button-primary` per view, kbd chips for every shortcut.
4. Keep type in Inter with tight-tracked headings and small
   `{typography.label}` chrome; confine monospace to `{typography.code}`.
5. Keep motion under 200ms, fade-first, and honour `prefers-reduced-motion`.
6. This is an independent Brand Look for inspiration — do not present output
   as Raycast's official design system, and propose missing tokens in a PR
   rather than inventing values.
