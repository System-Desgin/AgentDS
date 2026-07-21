---
version: alpha
name: Arco Design
description: ByteDance's enterprise design system — vivid arcoblue on cool gray neutrals, dense 14px type, and tight 2px corners built for admin platforms.
colors:
  primary: "#165DFF"
  on-primary: "#FFFFFF"
  primary-active: "#0E42D2"
  surface: "#FFFFFF"
  on-surface: "#1D2129"
  on-surface-variant: "#4E5969"
  helper: "#86909C"
  surface-variant: "#F2F3F5"
  border: "#E5E6EB"
  success: "#00B42A"
  warning: "#FF7D00"
  warning-surface: "#FFF7E8"
  error: "#F53F3F"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.23
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.33
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5715
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5715
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.5715
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5715
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 0 15px
    height: 32px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 0 15px
    height: 32px
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    padding: 0 15px
    height: 32px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 4px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  tag:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 0 8px
    height: 24px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  alert-warning:
    backgroundColor: "{colors.warning-surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 15px
---

## Overview

Arco Design is ByteDance's design system for enterprise products — the more
admin-platform-oriented sibling of Semi Design. Its character is tight and
geometric: a white field over cool gray neutrals, near-square `{rounded.sm}`
corners, a dense 14px base type size, and vivid arcoblue (`{colors.primary}`)
as the one interactive voice. Controls sit on quiet gray fills instead of
outlined boxes, so busy consoles read as flat, ordered planes.

Reach for Arco when building back-office tools, admin platforms, and
data-heavy dashboards that should feel compact, cool-toned, and efficient.

## Colors

- **primary (`#165DFF`)** — arcoblue for primary buttons, links, focus, and
  selection; pair with `{colors.on-primary}`. Pressed states step down to
  `{colors.primary-active}`.
- **surface (`#FFFFFF`)** — the base page and card field;
  **surface-variant (`#F2F3F5`)** is the cool gray fill behind inputs, tags,
  and secondary buttons.
- **on-surface (`#1D2129`) / on-surface-variant (`#4E5969`)** — primary and
  secondary text from the neutral gray ramp; **helper (`#86909C`)** for
  placeholder and tertiary text.
- **border (`#E5E6EB`)** — the hairline for dividers and card outlines.
- **success (`#00B42A`) / warning (`#FF7D00`) / error (`#F53F3F`)** — the
  green, orange, and red status hues; **warning-surface (`#FFF7E8`)** is the
  pale orange alert fill behind `{colors.on-surface}` text.

Component text pairings above meet WCAG AA. The status hues are used as icon
and label accents or as pale `-surface` fills — not as fills under white text.

## Typography

Arco ships no proprietary typeface: its default stack leads with **Inter** and
falls back to system fonts (PingFang SC, Microsoft YaHei), so the tokens use
Inter directly. Code samples use the generic monospace stack; **JetBrains
Mono** stands in here as the open equivalent.

- **display / heading-lg / heading** — medium-weight (500) titles from
  `{typography.display}` (36px) through `{typography.heading}` (20px), with
  tight leading at the top of the scale.
- **body (`{typography.body}`)** — the 14px workhorse with Arco's 1.5715 line
  height; nearly every control label and cell renders at this size.
- **body-sm / label** — 12px for dense metadata; `{typography.label}` adds
  weight 500 for tags and emphasized labels.
- **code (`{typography.code}`)** — monospace at body size for identifiers.

## Spacing & Layout

Arco sits on a 4px grid tuned for density: `{spacing.xxs}` (4px) and
`{spacing.xs}` (8px) inside controls, `{spacing.sm}` (12px) and `{spacing.md}`
(16px) for input and card padding, `{spacing.lg}`-`{spacing.3xl}` for section
rhythm. Default controls are 32px tall. Structure dense screens with
`{colors.border}` hairlines and gray fills, not shadows; reserve elevation for
popups.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, 32px tall, `{rounded.sm}` corners; pressing shifts the fill to
  **button-primary-active** (`{colors.primary-active}`).
- **button-secondary** — quiet `{colors.surface-variant}` fill with
  `{colors.on-surface-variant}` text.
- **card** — `{colors.surface}` with a 1px `{colors.border}` outline and
  `{spacing.md}` body padding.
- **field** — Arco's signature input: `{colors.surface-variant}` fill,
  borderless until focus, `{colors.on-surface}` text.
- **link** — `{colors.primary}` text with a light tint behind it on hover.
- **helper-text** — 12px secondary text in `{colors.helper}`.
- **divider** — 1px `{colors.border}` hairline.
- **tag** — 24px tall `{colors.surface-variant}` chip with weight-500 12px text.
- **status-success / status-warning / status-error** — status text and dots in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`;
  **alert-warning** — a `{colors.warning-surface}` banner with
  `{colors.on-surface}` text.

## Motion

Arco motion is fast and functional: control transitions run at 100ms on a
linear-like curve, and card shadows ease in over 200ms. Nothing decorative;
honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for actions, links, and focus; **don't**
  spread the 12-hue palette across UI chrome — extra hues are for data and tags.
- **Do** use gray fills (`{colors.surface-variant}`) for inputs and secondary
  buttons; **don't** draw heavy outlines around every control.
- **Do** keep corners at `{rounded.sm}`-`{rounded.md}`; **don't** use pill
  shapes outside avatars and circular buttons.
- **Do** set UI text at the 14px `{typography.body}` base; **don't** inflate
  dense tables and forms to 16px.
- **Do** hold the 4px grid and 32px control height; **don't** invent off-grid
  padding.
- **Do** use pale status surfaces like `{colors.warning-surface}` with dark
  text; **don't** put white text on `{colors.warning}` or `{colors.success}`.
- **Do** separate regions with `{colors.border}` hairlines; **don't** stack
  drop shadows on the base plane.

## Agent Prompt Guide

When generating UI in the Arco Design style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; keep status hues as text
   accents or pale fills, never as fills under white text.
3. Default composition: white `{colors.surface}` field, gray
   `{colors.surface-variant}` inputs and chips, one `button-primary` per view,
   `{colors.primary}` for links and focus.
4. Keep corners `{rounded.sm}`, controls 32px tall, and spacing on the 4px grid.
5. Use Inter (Arco's own first-choice family) and JetBrains Mono for code —
   never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
