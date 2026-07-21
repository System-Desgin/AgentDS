---
version: alpha
name: Material 3
description: Google's Material Design 3 — expressive, tonal, and adaptive, built on a role-based colour model.
colors:
  primary: "#6750A4"
  on-primary: "#FFFFFF"
  primary-container: "#EADDFF"
  on-primary-container: "#21005D"
  secondary-container: "#E8DEF8"
  on-secondary-container: "#1D192B"
  surface: "#FEF7FF"
  on-surface: "#1D1B20"
  surface-container: "#F3EDF7"
  surface-variant: "#E7E0EC"
  on-surface-variant: "#49454F"
  outline: "#79747E"
  outline-variant: "#CAC4D0"
  error: "#B3261E"
  on-error: "#FFFFFF"
typography:
  display:
    fontFamily: Roboto
    fontSize: 3.5625rem
    fontWeight: 400
    lineHeight: 1.12
  headline:
    fontFamily: Roboto
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: Roboto
    fontSize: 1.375rem
    fontWeight: 500
    lineHeight: 1.27
  body:
    fontFamily: Roboto
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0.006em
  code:
    fontFamily: Roboto Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 28px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 10px 24px
  button-tonal:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.full}"
    padding: 10px 24px
  chip:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.outline-variant}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.outline}"
    height: 1px
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Material 3 (Material You) is Google's adaptive, expressive design system. Its
colour is role-based: a `{colors.primary}` role plus container and `on-` pairs,
layered over tonal `{colors.surface}` and `{colors.surface-container}` surfaces.
Shapes are rounded, motion is lively, and Roboto carries a clear type hierarchy.
Colours here are the documented M3 baseline scheme (generated from the default
seed); a real product typically derives its own scheme from a brand seed.

Reach for Material 3 for adaptive, cross-platform apps and expressive consumer
products — especially anything Android-adjacent.

## Colors

- **primary (`#6750A4`) / on-primary (`#FFFFFF`)** — the main action colour and
  its text; **primary-container (`#EADDFF`) / on-primary-container (`#21005D`)**
  for tonal, lower-emphasis actions.
- **secondary-container (`#E8DEF8`) / on-secondary-container (`#1D192B`)** —
  chips, filters, and secondary tonal surfaces.
- **surface (`#FEF7FF`) / surface-container (`#F3EDF7`)** — the base and raised
  tonal surfaces; **on-surface (`#1D1B20`)** for primary text.
- **surface-variant (`#E7E0EC`) / on-surface-variant (`#49454F`)** — filled
  fields and secondary text.
- **outline (`#79747E`) / outline-variant (`#CAC4D0`)** — control outlines and
  quiet dividers.
- **error (`#B3261E`) / on-error (`#FFFFFF`)** — error states.

All role pairs above meet WCAG AA (on-role text on its role/container).

## Typography

Material 3 uses **Roboto** (Apache-2.0, on Google Fonts — no substitution), with
**Roboto Mono** for code. The scale runs from `{typography.display}` and
`{typography.headline}` for expressive titles, through `{typography.title}`, down
to `{typography.body}` / `{typography.body-sm}` for content and
`{typography.label}` for buttons and chips.

## Spacing & Layout

Layout follows a 4dp grid: `{spacing.xxs}` (4px) and `{spacing.xs}` (8px) for
tight insets, `{spacing.md}` (16px) for component padding, and `{spacing.lg}`–
`{spacing.2xl}` for section rhythm. Rounded shapes are core: use `{rounded.sm}`–
`{rounded.lg}` for most surfaces and `{rounded.full}` for buttons and chips.

## Components

- **button-filled** — `{colors.primary}` with `{colors.on-primary}`, fully
  rounded (`{rounded.full}`).
- **button-tonal** — `{colors.primary-container}` with
  `{colors.on-primary-container}` for lower-emphasis actions.
- **chip** — `{colors.secondary-container}` with `{colors.on-secondary-container}`.
- **sheet / card** — `{colors.surface}` and `{colors.surface-container}` tonal
  surfaces with `{colors.on-surface}` text.
- **field** — `{colors.surface-variant}` filled input with `{colors.on-surface}`
  text; label/helper in `{colors.on-surface-variant}` (see **caption**).
- **divider / divider-strong** — 1px hairlines in `{colors.outline-variant}` and
  `{colors.outline}`.
- **badge-error** — `{colors.error}` with `{colors.on-error}`.

## Motion

Material motion is expressive but purposeful: emphasized easing, ~200–500ms for
container transforms, shorter for simple state changes. Honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** use role pairs correctly — `on-` colours only on their matching role or
  container; **don't** place `{colors.on-primary}` on `{colors.surface}`.
- **Do** derive a scheme from a brand seed for production; **don't** ship the
  baseline seed as a brand.
- **Do** embrace rounded shapes (`{rounded.sm}`–`{rounded.full}`); **don't**
  square everything off.
- **Do** keep `{colors.error}` for error states; **don't** use it as an accent.
- **Do** layer tonal surfaces (`{colors.surface}` → `{colors.surface-container}`)
  for hierarchy; **don't** rely on heavy shadows alone.
- **Do** set copy in Roboto and code in `{typography.code}`; **don't** mix
  families within a run.

## Agent Prompt Guide

When generating UI in the Material 3 style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Respect role pairs and WCAG AA: `on-` colours go only on their role/container.
3. Default composition: tonal `{colors.surface}` → `{colors.surface-container}`
   cards → `button-filled` for the main action, `button-tonal`/`chip` for the rest.
4. Use rounded shapes and the 4dp spacing grid.
5. Use Roboto / Roboto Mono (both open) — never ship proprietary font binaries.
6. If a needed token/role is missing, propose it in a PR — do not invent values.
