---
version: alpha
name: Moon
description: Yolo Group's Tailwind-native design system — a piccolo purple lead over calm neutral surfaces, playfully named and built for tempo.
colors:
  primary: "#5C33CF"
  on-primary: "#FFFFFF"
  accent: "#1BD29A"
  surface: "#FFFFFF"
  surface-variant: "#F6F7F9"
  on-surface: "#000000"
  on-surface-variant: "#687083"
  border: "#DCDEE3"
  info: "#3448F0"
  success: "#49B356"
  warning: "#FFB319"
  error: "#FF4E64"
  error-strong: "#D33030"
typography:
  display:
    fontFamily: DM Sans
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.016em
  heading-lg:
    fontFamily: DM Sans
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.33
  heading:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: DM Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.71
  label:
    fontFamily: DM Sans
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.33
  caption:
    fontFamily: DM Sans
    fontSize: 0.625rem
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0.05em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.caption}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error-strong}"
    typography: "{typography.label}"
  status-info:
    textColor: "{colors.info}"
    typography: "{typography.label}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  loader:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    height: 32px
---

## Overview

Moon is Yolo Group's design system for high-tempo fintech and entertainment
products. It is Tailwind-native: every theme is a set of CSS custom properties
consumed by a shared Tailwind preset, and each role carries a light and a dark
value, so dark mode is first-class. Its personality is playful naming over a
disciplined base — semantic roles carry
character names (piccolo, goku, bulma) while the surfaces themselves stay calm,
neutral, and dense-content friendly, with `{colors.primary}` as the single
loud voice.

Reach for Moon when building product UIs that must feel quick and lively —
wallets, sportsbooks, trading views, dashboards — without giving up a strict
semantic token model.

## Colors

Role names below map to Moon's own creative vocabulary:

- **primary (`#5C33CF`)** — piccolo, the purple-blue action colour for primary
  buttons, links, focus rings, and selection; pair with `{colors.on-primary}`
  (goten, white). Contrast on white is 7.4:1.
- **accent (`#1BD29A`)** — hit, the bright secondary accent in the default
  Moon theme, used for hover states and the loader spinner; never set it as
  text on light surfaces.
- **surface (`#FFFFFF`) / surface-variant (`#F6F7F9`)** — goku, the main app
  background, and gohan, the secondary background for cards, panels, and
  inputs. In the dark theme the same roles resolve to `#0B0B0B` and `#1F1F1F`.
- **on-surface (`#000000`) / on-surface-variant (`#687083`)** — bulma, the main
  text colour, and trunks, the supporting text colour for helper copy, labels,
  and metadata.
- **border (`#DCDEE3`)** — beerus, the only border colour; hairlines, input
  strokes, and dividers all use it.
- **info (`#3448F0`) / success (`#49B356`) / warning (`#FFB319`) / error
  (`#FF4E64`)** — the supportive colours whis, roshi, krillin, and chichi.
  Moon ships each with 56% and 8% alpha steps for tinted fills; keep the full
  values for icons, fills, and strokes.
- **error-strong (`#D33030`)** — dodoria, the deeper negative; use it instead
  of `{colors.error}` when the error must read as text on a light surface.

Text pairings used by the components in this file meet WCAG AA. Note that
`{colors.success}` and `{colors.error}` do not reach AA as text on
`{colors.surface}` — use them as fills and icons with dark text, or switch to
`{colors.error-strong}` for error text.

## Typography

Moon's product typeface is **Averta Std**, a proprietary geometric sans. It is
substituted here with **DM Sans** — which Moon itself registers as its second
font token — so every level stays loadable from Google Fonts. The scale mirrors
Moon's text-moon sizes: each size is tied to a fixed line height on a 4px
rhythm, and large sizes pull letter spacing slightly negative.

- **display (`{typography.display}`)** — 2rem at 1.25 line height with -0.016em
  tracking, for page titles and big numerals.
- **heading-lg / heading** — 1.5rem and 1.25rem medium-weight headings for
  section and card titles.
- **body (`{typography.body}`)** — 1rem at 1.5 for reading and default UI text;
  **body-sm (`{typography.body-sm}`)** at 0.875rem is the control and table
  default.
- **label (`{typography.label}`)** — 0.75rem medium for form labels, tags, and
  buttons' smallest size.
- **caption (`{typography.caption}`)** — 0.625rem, tracked +0.05em, for
  overlines and tiny metadata.

## Spacing & Layout

Moon spaces everything on a 4px base grid: `{spacing.xxs}` and `{spacing.xs}`
for icon gaps and tight insets, `{spacing.sm}` for control padding,
`{spacing.md}` for card padding, and `{spacing.lg}` through `{spacing.3xl}`
for section rhythm. Corner radii are generous and tiered by element size:
`{rounded.sm}` for tags and tiny controls, `{rounded.md}` for buttons and
inputs, `{rounded.lg}` for cards and menus, `{rounded.xl}` for large surfaces,
and `{rounded.full}` for pills and avatars. Structure comes from
`{colors.border}` hairlines (1px, stepping to 2px on interaction) plus a soft
five-step shadow scale — never heavy outlines.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, `{rounded.md}` corners, and a 40px default height.
- **button-secondary** — `{colors.surface}` with a `{colors.primary}` label and
  a `{colors.border}` stroke for secondary actions.
- **card** — gohan `{colors.surface-variant}` panels with `{rounded.lg}`
  corners and `{spacing.md}` padding.
- **field** — inputs share the card surface with `{rounded.md}` corners; the
  resting 1px `{colors.border}` stroke thickens to 2px `{colors.primary}` on
  focus and 2px `{colors.error}` on invalid.
- **link** — `{colors.primary}` text.
- **helper-text / caption** — trunks `{colors.on-surface-variant}` supporting
  text under fields and next to values.
- **divider** — a 1px `{colors.border}` hairline.
- **status-success / status-error / status-info** — `{colors.success}`,
  `{colors.error-strong}`, and `{colors.info}` label text for inline state.
- **badge-warning** — a `{colors.warning}` fill with `{colors.on-surface}` text
  in `{rounded.sm}` corners for counts and alerts.
- **loader** — Moon's circular spinner defaults to hit `{colors.accent}`, drawn
  as a `{rounded.full}` ring.

## Motion

Moon motion is quick and physical: interactive controls transition in 200ms,
pressed buttons scale down to 90%, toasts slide in over 300ms on a sharp
ease-out curve, the loader spins on a 1.2s eased loop, and invalid fields
shake briefly. Keep animation on interaction feedback only and honour
prefers-reduced-motion.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the single interactive voice; **don't**
  spread purple across decorative fills or headings.
- **Do** build screens as goku field with gohan panels (`{colors.surface}` →
  `{colors.surface-variant}`); **don't** stack panels more than one level deep.
- **Do** use `{colors.error-strong}` for error text on light surfaces;
  **don't** set `{colors.error}` or `{colors.success}` as small text on white.
- **Do** use supportive colours as tinted fills with dark text (Moon ships 8%
  alpha steps for this); **don't** invent new status hues.
- **Do** tier radii by element size — `{rounded.sm}` tags, `{rounded.md}`
  buttons, `{rounded.lg}` cards; **don't** mix radii within one control.
- **Do** stay on the 4px spacing grid from `{spacing.xxs}` up; **don't** use
  off-grid one-off values.
- **Do** design light and dark together — every role has both values;
  **don't** hardcode a hex where a role exists.

## Agent Prompt Guide

When generating UI in the Moon style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; use
   `{colors.error-strong}` for error text and keep `{colors.success}`,
   `{colors.error}`, and `{colors.accent}` out of small text on light
   surfaces.
3. Default composition: `{colors.surface}` background → gohan
   `{colors.surface-variant}` cards and fields → one `button-primary` per
   view, `{colors.primary}` for links and focus.
4. Round by element size (`{rounded.md}` controls, `{rounded.lg}` cards) and
   keep spacing on the 4px grid.
5. Set all text in DM Sans (the open substitute for Moon's proprietary Averta
   Std) — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
