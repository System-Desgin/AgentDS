---
version: alpha
name: Carbon
description: IBM's design system — precise, functional, and enterprise-scale, led by IBM Blue on a neutral field.
colors:
  primary: "#0F62FE"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#161616"
  on-surface-variant: "#525252"
  surface-variant: "#F4F4F4"
  helper: "#6F6F6F"
  border-subtle: "#E0E0E0"
  border-strong: "#8D8D8D"
  success: "#24A148"
  warning: "#F1C21B"
  error: "#DA1E28"
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  heading-lg:
    fontFamily: IBM Plex Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  heading:
    fontFamily: IBM Plex Sans
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: IBM Plex Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.34
    letterSpacing: 0.02em
  code:
    fontFamily: IBM Plex Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
rounded:
  sm: 2px
  md: 4px
  lg: 8px
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
    padding: 12px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  tile:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 11px 16px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

## Overview

Carbon is IBM's design system for enterprise products. Its character is precise
and functional: a white or light-gray field, near-square corners, a strict 8px
spacing rhythm, and IBM Blue (`{colors.primary}`) as the single interactive
voice. Colour is spare and semantic so dense screens — data tables, forms,
dashboards, and consoles — stay calm and legible.

Reach for Carbon when building enterprise software that should feel engineered:
structured, information-dense, and consistent at scale.

## Colors

- **primary (`#0F62FE`)** — IBM Blue for primary buttons, links, focus, and
  selection; pair with `{colors.on-primary}`.
- **surface (`#FFFFFF`) / surface-variant (`#F4F4F4`)** — the base field and the
  light-gray layer used for tiles, fields, and secondary panels.
- **on-surface (`#161616`) / on-surface-variant (`#525252`)** — primary and
  secondary text; **helper (`#6F6F6F`)** for helper and placeholder text.
- **border-subtle (`#E0E0E0`) / border-strong (`#8D8D8D`)** — quiet dividers and
  the stronger control outline for fields and inputs.
- **success (`#24A148`) / warning (`#F1C21B`) / error (`#DA1E28`)** — status
  colours; success and error read as text, warning as a fill with dark text.

Text pairings above meet WCAG AA against their stated backgrounds; the warning
yellow is used only as a fill behind `{colors.on-surface}` text.

## Typography

Carbon's typeface is **IBM Plex Sans** (open-source, SIL OFL, on Google Fonts —
no substitution needed), with **IBM Plex Mono** for code.

- **display / heading-lg / heading** — IBM Plex Sans Semibold for the title
  hierarchy from `{typography.display}` down to `{typography.heading}`.
- **body / body-sm** — IBM Plex Sans Regular for reading and dense UI text; body
  sits at `{typography.body}` with a 1.5 line height.
- **label** — IBM Plex Sans, tracked, for form labels and captions.
- **code** — `{typography.code}` for identifiers, commands, and snippets.

## Spacing & Layout

Spacing is a strict 2/8 rhythm: `{spacing.xxs}` (2px) and `{spacing.xs}` (4px)
for tight insets, `{spacing.sm}` (8px) through `{spacing.md}` (16px) for control
and content padding, and `{spacing.lg}`–`{spacing.3xl}` for section structure.
Align everything to the grid; separate dense content with `{colors.border-subtle}`
hairlines rather than shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}` text
  and near-square `{rounded.sm}` corners.
- **button-secondary** — `{colors.surface}` with a `{colors.primary}` label for
  secondary actions.
- **tile / field** — `{colors.surface-variant}` surfaces for cards and inputs,
  with `{colors.border-strong}` outlines on focusable fields.
- **link** — `{colors.primary}` text.
- **helper-text / caption** — `{colors.helper}` and `{colors.on-surface-variant}`
  secondary text.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}` and
  `{colors.border-strong}`.
- **status-success / status-error** — status text; **badge-warning** — a
  `{colors.warning}` fill with `{colors.on-surface}` text.

## Motion

Carbon motion is quick and productive: 70–240ms with its standard easing on
hover, focus, and expansion. No ambient or decorative animation; honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interaction; **don't** use it as a
  decorative fill or heading colour.
- **Do** favour near-square `{rounded.sm}` corners; **don't** round components
  heavily — Carbon reads as engineered, not soft.
- **Do** align to the 8px spacing grid; **don't** invent off-grid spacing.
- **Do** keep status colours semantic and use warning only as a fill with dark
  text; **don't** set warning yellow as text on white.
- **Do** use `{colors.border-subtle}` hairlines for structure; **don't** stack
  drop shadows.
- **Do** set UI copy in IBM Plex Sans and code in `{typography.code}`; **don't**
  mix families within a run.

## Agent Prompt Guide

When generating UI in the Carbon style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` field → `{colors.surface-variant}`
   tiles and fields → one `button-primary` per view, `{colors.primary}` for links
   and focus.
4. Keep corners near-square (`{rounded.sm}`) and spacing on the 8px grid.
5. Use IBM Plex Sans / IBM Plex Mono (both open) — never ship proprietary font
   binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
