---
version: alpha
name: Vibe
description: monday.com's design system — friendly, bold color chips on calm gray surfaces, with rounded controls and a status palette that does the talking.
colors:
  primary: "#0073EA"
  primary-variant: "#0060B9"
  primary-selected: "#CCE5FF"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#F6F7FB"
  on-surface: "#323338"
  on-surface-variant: "#676879"
  border: "#C3C6D4"
  border-subtle: "#D0D4E4"
  link: "#1F76C2"
  positive: "#00854D"
  done: "#00C875"
  negative: "#D83A52"
  warning: "#FFCB00"
typography:
  display:
    fontFamily: Poppins
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.016em
  heading-lg:
    fontFamily: Poppins
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
  heading:
    fontFamily: Poppins
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: Roboto
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.375
  body-sm:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Roboto
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.33
  code:
    fontFamily: Roboto Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
rounded:
  sm: 4px
  md: 8px
  lg: 16px
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
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  selected-item:
    backgroundColor: "{colors.primary-selected}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  status-positive:
    textColor: "{colors.positive}"
    typography: "{typography.label}"
  status-negative:
    textColor: "{colors.negative}"
    typography: "{typography.label}"
  badge-done:
    backgroundColor: "{colors.done}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Vibe is monday.com's design system, built for a work OS where color carries
meaning. The field is calm: white and pale-gray surfaces, soft 4px and 8px
corners, quiet hairline borders. On top of it sit bold, friendly chips of
color — working blue (`{colors.primary}`), done green (`{colors.done}`),
warning yellow (`{colors.warning}`) — so a board full of statuses reads at a
glance. The result is playful but businesslike.

Reach for Vibe when building collaboration and work-management UIs: boards,
timelines, and dashboards where status color is the main signal and the chrome
around it should stay out of the way.

## Colors

- **primary (`#0073EA`)** — the working blue for primary buttons, focus, and
  selection; pair with `{colors.on-primary}`. Hover and pressed states darken
  to `{colors.primary-variant}`; selected rows and cells sit on
  `{colors.primary-selected}`.
- **surface (`#FFFFFF`) / surface-variant (`#F6F7FB`)** — the white canvas and
  the all-gray application background behind boards and side panels.
- **on-surface (`#323338`) / on-surface-variant (`#676879`)** — near-black
  primary text and the gray for secondary text, placeholders, and icons.
- **border (`#C3C6D4`) / border-subtle (`#D0D4E4`)** — control outlines and the
  quieter layout hairlines between panes.
- **link (`#1F76C2`)** — inline links, distinct from button blue.
- **positive (`#00854D`) / negative (`#D83A52`) / warning (`#FFCB00`)** — the
  semantic status trio; **done (`#00C875`)** is the celebratory board green for
  finished work.

Text pairings above meet WCAG AA on their stated backgrounds. The bright fills
(`{colors.done}`, `{colors.warning}`, `{colors.primary-selected}`) always carry
dark `{colors.on-surface}` text; `{colors.negative}` is used as text on
`{colors.surface}` only, not on gray.

## Typography

Vibe pairs two open Google Fonts families: **Figtree** for UI text and
**Poppins** for titles. Figtree is not yet in this catalog's preview loader, so
tokens carry **Roboto** — Vibe's own declared fallback — for body styles; use
Figtree where you can load it. Poppins loads directly.

- **display / heading-lg / heading** — Poppins Semibold from
  `{typography.display}` (2rem, tight tracking) down to `{typography.heading}`;
  titles are geometric and slightly rounded, matching the button shapes.
- **body / body-sm** — `{typography.body}` at 1rem for reading text and
  `{typography.body-sm}` at 0.875rem for dense board rows.
- **label** — `{typography.label}` for field labels, column headers, and badge
  text.
- **code** — Vibe ships no mono face; `{typography.code}` uses Roboto Mono as
  the open companion for identifiers and snippets.

## Spacing & Layout

Spacing runs a 4/8px rhythm with an extra 2px step: `{spacing.xxs}` and
`{spacing.xs}` for chip and badge insets, `{spacing.sm}` and `{spacing.md}` for
control padding and gaps between cards, `{spacing.lg}` through `{spacing.3xl}`
for panel and section structure. Panes are separated by
`{colors.border-subtle}` hairlines on the `{colors.surface-variant}` field;
elevation is rare and shallow. Controls are roomy — buttons and fields sit at
40px height with `{spacing.sm}` vertical padding.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and `{rounded.sm}` corners; one per view.
- **button-secondary** — `{colors.surface}` with `{colors.on-surface}` text
  and a `{colors.border}` outline.
- **card** — `{colors.surface}` on the gray field, `{rounded.md}` corners,
  `{spacing.md}` padding.
- **field** — `{colors.surface}` input with a `{colors.border}` outline that
  turns `{colors.primary}` on focus.
- **link** — `{colors.link}` text, no underline until hover.
- **helper-text** — `{colors.on-surface-variant}` captions under fields.
- **selected-item** — `{colors.primary-selected}` fill with dark text for
  chosen rows, dates, and menu items.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  for layout seams and `{colors.border}` where a pane needs a firmer edge.
- **status-positive / status-negative** — status text in `{colors.positive}`
  and `{colors.negative}`.
- **badge-done / badge-warning** — pill-shaped `{rounded.full}` chips filled
  with `{colors.done}` and `{colors.warning}`, always with dark
  `{colors.on-surface}` text.

## Motion

Vibe's motion tokens split into productive (70ms, 100ms, 150ms) for hover,
focus, and small state changes, and expressive (250ms, 400ms) for entrances
and celebratory moments. Enter eases out, exit eases in, and one emphasize
curve adds a slight overshoot for playful feedback. Honor
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** let status chips carry the color; **don't** tint panels, headers, or
  chrome with palette colors.
- **Do** keep `{colors.primary}` for actions, focus, and selection; **don't**
  use it for decorative fills or headings.
- **Do** put dark `{colors.on-surface}` text on `{colors.done}`,
  `{colors.warning}`, and `{colors.primary-selected}` fills; **don't** set
  white text on the bright chips.
- **Do** use `{colors.negative}` as text on `{colors.surface}`; **don't**
  place it on `{colors.surface-variant}` — the pairing drops below AA.
- **Do** round controls with `{rounded.sm}` and `{rounded.md}` and reserve
  `{rounded.full}` for chips and avatars; **don't** mix square corners in.
- **Do** set titles in Poppins and UI text in Figtree (Roboto fallback);
  **don't** ship display type below 600 weight.
- **Do** keep the field calm with `{colors.surface-variant}` and hairlines;
  **don't** stack shadows to separate panes.

## Agent Prompt Guide

When generating UI in the Vibe style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; bright fills
   (`{colors.done}`, `{colors.warning}`, `{colors.primary-selected}`) take
   `{colors.on-surface}` text, and `{colors.negative}` reads as text only on
   `{colors.surface}`.
3. Default composition: `{colors.surface-variant}` application field, white
   `card` panes, one `button-primary`, status expressed as pill chips.
4. Keep corners at `{rounded.sm}`/`{rounded.md}`, pills at `{rounded.full}`,
   and spacing on the 4/8px grid.
5. Use Poppins for titles and Figtree (or its Roboto fallback) for UI text —
   both open, on Google Fonts; never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
