---
version: alpha
name: Gestalt
description: Pinterest's design system — friendly and image-first, with Pinterest red actions, pill buttons, and quiet neutrals on an airy white field.
colors:
  primary: "#E60023"
  primary-strong: "#B60000"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#E9E9E9"
  on-surface: "#111111"
  on-surface-variant: "#767676"
  border: "#CDCDCD"
  border-strong: "#767676"
  info: "#0074E8"
  success: "#008753"
  warning: "#BD5B00"
  error: "#CC0000"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.3
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  link:
    textColor: "{colors.on-surface}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
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
---

## Overview

Gestalt is Pinterest's design system for its consumer product. Its character is
friendly and image-first: an airy white field, generous rounding that peaks in
full pill buttons, a 4px spacing grid centered on 16px, and Pinterest red
(`{colors.primary}`) reserved for the primary action. Neutrals stay quiet so
photographic content — pins, boards, product shots — carries the screen.

Reach for Gestalt when building consumer experiences that should feel warm and
approachable: media-heavy feeds, mobile-first shopping and discovery, and
marketing surfaces built around imagery.

## Colors

- **primary (`#E60023`) / primary-strong (`#B60000`)** — Pinterest red for the
  primary button and brand moments, darkening to primary-strong on hover; pair
  with `{colors.on-primary}`.
- **surface (`#FFFFFF`) / surface-variant (`#E9E9E9`)** — the white field and
  the gray fill behind secondary buttons and tags.
- **on-surface (`#111111`) / on-surface-variant (`#767676`)** — near-black
  primary text and gray secondary text.
- **border (`#CDCDCD`) / border-strong (`#767676`)** — container hairlines and
  the stronger outline on form fields and switches.
- **info (`#0074E8`) / success (`#008753`) / warning (`#BD5B00`) / error
  (`#CC0000`)** — status fills that carry white text in badges; warning and
  error double as Gestalt's warning and error text colors.

Text pairings above meet WCAG AA: white on `{colors.primary}` measures 4.78:1
and white on `{colors.info}` 4.5:1 — both are Gestalt's real button and badge
pairings, so treat them as the floor and never lighten either fill.

## Typography

Gestalt ships no brand typeface: text renders in the platform system stack
(San Francisco, Segoe UI, Roboto, and their fallbacks), with an SF Mono stack
for code. Tokens here carry open **Inter** and **JetBrains Mono** as stand-ins;
never ship proprietary font binaries.

- **display / heading-lg / heading** — the bold-to-semibold title hierarchy
  from `{typography.display}` (36px) through `{typography.heading}` (20px).
- **body / body-sm** — regular text at `{typography.body}` (16px, 1.5 line
  height) and `{typography.body-sm}` (14px) for dense or secondary copy.
- **label** — `{typography.label}` (12px) for form labels, badges, and helper
  text.
- **code** — `{typography.code}` for identifiers and snippets.

## Spacing & Layout

The space scale is a strict 4px grid: `{spacing.xxs}` (4px) and `{spacing.xs}`
(8px) for tight insets, `{spacing.sm}` (12px) and the workhorse `{spacing.md}`
(16px) for control and card padding, and `{spacing.lg}` through `{spacing.3xl}`
for section structure. Layout is card-first: `{colors.surface}` cards with
`{rounded.md}` corners, separated by whitespace rather than heavy borders.
When a hairline is unavoidable, use `{colors.border}`.

## Components

- **button-primary** — a solid `{colors.primary}` pill (`{rounded.full}`) with
  `{colors.on-primary}` text; hover darkens to `{colors.primary-strong}`.
- **button-secondary** — a `{colors.surface-variant}` pill with
  `{colors.on-surface}` text; no outline, the fill is the affordance.
- **card** — `{colors.surface}` with `{rounded.md}` corners; imagery runs
  edge-to-edge and text sits below it.
- **field** — `{colors.surface}` input with a 1px `{colors.border-strong}`
  outline and `{rounded.md}` corners; errors switch the outline to
  `{colors.error}`.
- **link** — keeps the surrounding text color (`{colors.on-surface}`) and
  relies on underline and weight, not blue.
- **helper-text** — `{colors.on-surface-variant}` secondary text at
  `{typography.label}`.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and
  `{colors.border-strong}`.
- **status-error** — `{colors.error}` status text at `{typography.label}`.
- **badge-info / badge-success / badge-warning** — `{colors.info}`,
  `{colors.success}`, and `{colors.warning}` pills with `{colors.on-primary}`
  text.

## Motion

Gestalt defines motion tokens from 50ms to 900ms with named easing curves
(enter, exit, lateral, and a playful bounce); most UI transitions sit in the
200-400ms band. Motion is functional feedback, never ambient decoration, and
`prefers-reduced-motion` must be respected.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for the one primary action per view;
  **don't** use the red as decoration, headings, or body text.
- **Do** keep buttons, badges, and tags fully rounded (`{rounded.full}`);
  **don't** square them off — the pill is Gestalt's signature shape.
- **Do** let imagery carry the screen on plain `{colors.surface}`; **don't**
  stack tinted panels or gradients behind media.
- **Do** stay on the 4px grid with `{spacing.md}` as the default gap;
  **don't** invent off-grid spacing.
- **Do** give secondary actions the `{colors.surface-variant}` fill;
  **don't** add outlines or borders to buttons.
- **Do** keep status colors semantic — `{colors.error}` for error text and
  field outlines, badges for everything else; **don't** repurpose them for
  emphasis.
- **Do** set long copy at `{typography.body}` with its 1.5 line height;
  **don't** push paragraphs below `{typography.body-sm}`.

## Agent Prompt Guide

When generating UI in the Gestalt style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the
   palette and never lighten the `{colors.primary}` or `{colors.info}` fills.
3. Default composition: `{colors.surface}` field, edge-to-edge imagery inside
   `{rounded.md}` cards, one `{colors.primary}` pill button per view.
4. Keep every interactive element fully rounded (`{rounded.full}`) and all
   spacing on the 4px grid.
5. Use Inter / JetBrains Mono as open stand-ins for the system and mono
   stacks — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
