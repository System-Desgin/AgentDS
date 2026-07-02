---
version: alpha
name: Orbit
description: Kiwi.com's travel design system — a friendly green-teal brand, calm neutrals, and booking-ready flows.
colors:
  primary: "#008F7B"
  on-primary: "#FFFFFF"
  primary-strong: "#007061"
  link: "#0070C8"
  surface: "#FFFFFF"
  on-surface: "#252A31"
  on-surface-variant: "#4F5E71"
  surface-variant: "#F5F7F9"
  border: "#E8EDF1"
  border-strong: "#BAC7D5"
  success: "#048724"
  warning: "#B36200"
  error: "#D21C1C"
typography:
  display:
    fontFamily: Roboto
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: Roboto
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: Roboto
    fontSize: 1.375rem
    fontWeight: 500
    lineHeight: 1.3
  body-lg:
    fontFamily: Roboto
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Roboto
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 6px
  lg: 12px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  well:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  link:
    textColor: "{colors.link}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Orbit is Kiwi.com's design system for travel and booking products. Its character
is friendly and legible: a signature green-teal product colour (`{colors.primary}`),
calm cloud neutrals, a clear blue for links (`{colors.link}`), generous rounding,
and Roboto typography. It's tuned for consumer flows — search, results, and
checkout — on both mobile and desktop.

Reach for Orbit for travel, booking, and consumer products that should feel
approachable and trustworthy.

## Colors

- **primary (`#008F7B`) / on-primary (`#FFFFFF`)** — the green-teal product
  colour for primary actions; **primary-strong (`#007061`)** for hover/pressed.
- **link (`#0070C8`)** — the blue used for inline links and informational
  emphasis.
- **surface (`#FFFFFF`) / surface-variant (`#F5F7F9`)** — content background and
  a calm cloud tint for wells and secondary panels.
- **on-surface (`#252A31`) / on-surface-variant (`#4F5E71`)** — primary and
  secondary ink.
- **border (`#E8EDF1`) / border-strong (`#BAC7D5`)** — quiet dividers and the
  stronger outline for inputs.
- **success (`#048724`) / warning (`#B36200`) / error (`#D21C1C`)** — status
  colours for booking states and validation.

All text pairings above meet WCAG AA against their stated backgrounds (the
green-teal primary meets the large-text threshold for button labels).

## Typography

Orbit uses **Roboto** (open, Apache-2.0, on Google Fonts — no substitution),
with **JetBrains Mono** for code. Body sits at `{typography.body}` (0.875rem)
with comfortable line height for scannable results and forms.

- **display / heading / title** — Roboto Bold/Medium for the title hierarchy.
- **body-lg / body** — Roboto Regular for reading and dense UI text.
- **label** — Roboto Medium for labels, tags, and captions.
- **code** — `{typography.code}` for references and snippets.

## Spacing & Layout

Spacing follows a 4px base: `{spacing.xxs}` (4px) through `{spacing.md}` (16px)
to `{spacing.2xl}` (40px). Use `{spacing.xs}`–`{spacing.sm}` for control padding,
`{spacing.lg}`–`{spacing.xl}` for section rhythm. Rounding is friendly —
`{rounded.md}` (6px) for controls, `{rounded.lg}` for cards, `{rounded.full}` for
pills and tags.

## Components

- **button-primary** — `{colors.primary}` with `{colors.on-primary}`, `{rounded.md}`
  corners; hover shifts to `{colors.primary-strong}`.
- **button-secondary** — `{colors.surface}` with a `{colors.border-strong}`
  outline and `{colors.on-surface}` label.
- **card / well** — `{colors.surface}` cards and `{colors.surface-variant}` wells.
- **input** — `{colors.surface}` field, `{colors.border-strong}` outline,
  `{rounded.md}` corners; focus uses a `{colors.primary}` ring.
- **link** — `{colors.link}` text.
- **caption** — `{colors.on-surface-variant}` secondary text.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and
  `{colors.border-strong}`.
- **badge-success / badge-warning / badge-error** — status pills in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`.

## Motion

Orbit motion is friendly but quick: ~150–300ms with ease on hover, focus, and
disclosure. Honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for the main action and `{colors.link}` blue for
  links; **don't** blur their roles.
- **Do** use generous rounding (`{rounded.md}`–`{rounded.lg}`); **don't** square
  everything off — Orbit reads as friendly.
- **Do** layer `{colors.surface}` on `{colors.surface-variant}` wells; **don't**
  rely on heavy shadows.
- **Do** keep status colours semantic; **don't** use them as brand accents.
- **Do** keep body copy at `{typography.body}` for scannable flows; **don't**
  drop text below AA contrast.
- **Do** set copy in Roboto and code in `{typography.code}`; **don't** mix
  families within a run.

## Agent Prompt Guide

When generating UI in the Orbit style:

1. Reference tokens by name (`{colors.primary}`, `{colors.link}`, `{spacing.md}`)
   — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` page → `{colors.surface-variant}`
   wells and cards → one `button-primary` per view, `{colors.link}` for links.
4. Use friendly rounding and the 4px spacing scale.
5. Roboto is open — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
