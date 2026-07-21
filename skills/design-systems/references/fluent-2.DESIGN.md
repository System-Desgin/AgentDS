---
version: alpha
name: Fluent 2
description: Microsoft's design system — calm neutrals, subtle rounding, and a confident brand blue.
colors:
  primary: "#0F6CBD"
  on-primary: "#FFFFFF"
  primary-strong: "#115EA3"
  link: "#0F6CBD"
  surface: "#FFFFFF"
  on-surface: "#242424"
  on-surface-variant: "#616161"
  surface-variant: "#F5F5F5"
  border: "#D1D1D1"
  border-weak: "#E0E0E0"
  success: "#107C10"
  warning: "#BC4B09"
  error: "#C50F1F"
typography:
  display:
    fontFamily: Open Sans
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: Open Sans
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.28
  title:
    fontFamily: Open Sans
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Open Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Open Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Open Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.33
  code:
    fontFamily: Cascadia Code
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  2xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  surface-subtle:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  link:
    textColor: "{colors.link}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-weak:
    backgroundColor: "{colors.border-weak}"
    height: 1px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Fluent 2 is Microsoft's design system for coherent experiences across web,
Windows, and Microsoft 365. Its temperament is calm and professional: soft
neutral surfaces, subtle rounding, and a confident brand blue (`{colors.primary}`)
for interaction. Colour is restrained so productivity surfaces — mail, docs,
settings, dashboards — stay quiet and legible.

Reach for Fluent 2 for productivity and enterprise apps that should feel native
to the Microsoft ecosystem.

## Colors

- **primary (`#0F6CBD`) / on-primary (`#FFFFFF`)** — brand blue for primary
  actions, selection, and focus; **primary-strong (`#115EA3`)** for hover/pressed.
- **link (`#0F6CBD`)** — inline text links.
- **surface (`#FFFFFF`) / surface-variant (`#F5F5F5`)** — the base and a soft
  neutral layer for cards, wells, and secondary panels.
- **on-surface (`#242424`) / on-surface-variant (`#616161`)** — primary and
  secondary text.
- **border (`#D1D1D1`) / border-weak (`#E0E0E0`)** — control outlines and quiet
  dividers.
- **success (`#107C10`) / warning (`#BC4B09`) / error (`#C50F1F`)** — status
  colours; success/warning as text, error as text or a fill with light text.

All text pairings above meet WCAG AA against their stated backgrounds.

## Typography

Fluent's UI face is Segoe UI Variable (proprietary); this file substitutes the
open **Open Sans** for UI text and **Cascadia Code** (Microsoft's open monospace,
SIL OFL) for code. The scale is dense and legible — body sits at `{typography.body}`
(0.875rem).

- **display / headline / title** — Open Sans Semibold for the title hierarchy.
- **body-lg / body** — Open Sans Regular for reading and dense UI text.
- **label** — Open Sans Semibold for field labels and status text.
- **code** — `{typography.code}` for identifiers and snippets.

## Spacing & Layout

Spacing follows a 4px base: `{spacing.xxs}` (4px) through `{spacing.md}` (16px)
to `{spacing.2xl}` (32px). Use `{spacing.xs}`–`{spacing.sm}` for control padding,
`{spacing.lg}`–`{spacing.xl}` for section rhythm. Rounding is subtle — `{rounded.md}`
(4px) for most controls, `{rounded.lg}`–`{rounded.xl}` for cards and surfaces.

## Components

- **button-primary** — `{colors.primary}` with `{colors.on-primary}`, `{rounded.md}`
  corners; hover shifts to `{colors.primary-strong}`.
- **button-secondary** — `{colors.surface}` with a `{colors.border}` outline and
  `{colors.on-surface}` label.
- **card / surface-subtle** — `{colors.surface}` and `{colors.surface-variant}`
  panels padded `{spacing.md}`.
- **input** — `{colors.surface}` field, `{colors.border}` outline, `{rounded.md}`
  corners; focus uses a `{colors.primary}` underline/ring.
- **link** — `{colors.link}` text.
- **caption** — `{colors.on-surface-variant}` secondary text.
- **divider / divider-weak** — 1px hairlines in `{colors.border}` and
  `{colors.border-weak}`.
- **status-success / status-warning** — status text; **badge-error** — an
  `{colors.error}` fill with light text.

## Motion

Fluent motion is quick and subtle: 100–200ms with gentle easing on hover, focus,
and reveal. No ambient animation; honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interaction; **don't** use it as a
  decorative fill.
- **Do** keep rounding subtle (`{rounded.md}`); **don't** over-round controls.
- **Do** layer neutrals (`{colors.surface}` → `{colors.surface-variant}`) for
  hierarchy; **don't** rely on heavy shadows.
- **Do** keep status colours semantic; **don't** use them as brand accents.
- **Do** keep body copy at `{typography.body}` for density; **don't** drop text
  below AA contrast.
- **Do** set UI copy in the sans face and code in `{typography.code}`; **don't**
  mix families within a run.

## Agent Prompt Guide

When generating UI in the Fluent 2 style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` base → `{colors.surface-variant}`
   panels → one `button-primary` per view, `{colors.primary}` for links/selection.
4. Keep rounding subtle and spacing on the 4px grid.
5. Substitute proprietary fonts (Segoe UI Variable → open sans; code → Cascadia
   Code); never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
