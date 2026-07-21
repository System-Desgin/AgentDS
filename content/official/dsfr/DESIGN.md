---
version: alpha
name: DSFR
description: The French state's design system — blue-france and red-marianne on white, square corners, and an accessibility mandate; reference-only outside French government services.
colors:
  primary: "#000091"
  on-primary: "#FFFFFF"
  primary-soft: "#E3E3FD"
  red-marianne: "#E1000F"
  surface: "#FFFFFF"
  surface-alt: "#F6F6F6"
  surface-contrast: "#EEEEEE"
  on-surface: "#3A3A3A"
  on-surface-title: "#161616"
  on-surface-mention: "#666666"
  border: "#DDDDDD"
  info: "#0063CB"
  success: "#18753C"
  warning: "#B34000"
  error: "#CE0500"
typography:
  display:
    fontFamily: Public Sans
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: Public Sans
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.25
  heading:
    fontFamily: Public Sans
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.29
  body:
    fontFamily: Public Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Public Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.71
  label:
    fontFamily: Public Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.67
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 4px
  full: 9999px
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
    rounded: "{rounded.none}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  panel-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface-contrast}"
    textColor: "{colors.on-surface-title}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-mention}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  tag:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-info:
    textColor: "{colors.info}"
    typography: "{typography.label}"
---

## Overview

DSFR is the Système de Design de l'État: the official design system of the
French government, maintained by DINUM and the SIG. Its character is
institutional and austere — blue-france (`{colors.primary}`) and red-marianne
(`{colors.red-marianne}`) from the national identity, near-black text on a
white field, square corners, a 4/8px grid, and typography built on the state's
Marianne face. Accessibility is not a preference here but a legal obligation
(RGAA), so every default pairing is tuned to pass contrast.

This entry is reference-only. The DSFR visual identity is legally reserved for
French state services; study it as a benchmark for government-grade clarity,
but do not apply the identity outside that context.

## Colors

- **primary (`#000091`)** — blue-france, the state's action colour for primary
  buttons, links, and focus; pair with `{colors.on-primary}`.
- **primary-soft (`#E3E3FD`)** — the light blue-france fill behind tags and
  low-emphasis actions, carrying `{colors.primary}` text.
- **red-marianne (`#E1000F`)** — the second national colour; an identity
  accent for the emblem and marque, never an interactive or status colour.
- **surface (`#FFFFFF`) / surface-alt (`#F6F6F6`) / surface-contrast
  (`#EEEEEE`)** — the default page field, alternate section background, and
  the contrast fill used by form inputs.
- **on-surface (`#3A3A3A`) / on-surface-title (`#161616`) /
  on-surface-mention (`#666666`)** — body text, titles and labels, and
  mention/helper text.
- **border (`#DDDDDD`)** — hairline card borders and dividers.
- **info (`#0063CB`) / success (`#18753C`) / warning (`#B34000`) / error
  (`#CE0500`)** — functional status colours, all tuned to read as text on
  white at AA or better.

Every text role above meets WCAG AA against its stated background; DSFR's
status palette is deliberately darkened so status text passes on
`{colors.surface}`.

## Typography

DSFR's typeface is **Marianne**, a state-commissioned face whose license is
reserved for French government use — it may not be redistributed, so these
tokens substitute the open **Public Sans** and name Marianne in prose only.
DSFR does not brand a monospace face; `{typography.code}` uses the open
JetBrains Mono for code specimens.

- **display / heading-lg / heading** — the bold title hierarchy
  (`{typography.display}` at 2.5rem down to `{typography.heading}` at
  1.75rem), always weight 700 with tight line heights.
- **body (`{typography.body}`)** — 1rem at 1.5 line height for running text.
- **body-sm (`{typography.body-sm}`)** — 0.875rem with a generous 1.71 line
  height for dense secondary text.
- **label (`{typography.label}`)** — 0.75rem for captions, hints, and
  metadata.
- Buttons set their labels at 1rem, weight 500.

## Spacing & Layout

DSFR spaces everything on a 4px base with an 8px working rhythm: `{spacing.xxs}`
(4px) and `{spacing.xs}` (8px) for tight insets, `{spacing.sm}` (12px) to
`{spacing.md}` (16px) for control padding, and `{spacing.lg}` (24px) through
`{spacing.3xl}` (64px) for cards and page sections. Layouts are calm and
columnar: white field, `{colors.surface-alt}` alternate bands, and 1px
`{colors.border}` hairlines instead of shadows. Corners are square by default
(`{rounded.none}`); only badges and input tops soften to `{rounded.sm}`, and
tags are full pills (`{rounded.full}`).

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, square corners, 8px 16px padding, label at 1rem weight 500.
- **button-secondary** — `{colors.surface}` with `{colors.primary}` text and a
  1px `{colors.primary}` outline.
- **card** — `{colors.surface}` with a 1px `{colors.border}` hairline frame
  and `{spacing.lg}` padding; **panel-alt** — an `{colors.surface-alt}` band
  for alternate page sections.
- **field** — `{colors.surface-contrast}` fill, `{colors.on-surface-title}`
  text, `{rounded.sm}` on the top corners only, with a strong bottom border.
- **link** — `{colors.primary}`, underlined by default.
- **helper-text** — `{colors.on-surface-mention}` secondary text at
  `{typography.label}`.
- **divider** — a 1px `{colors.border}` hairline.
- **tag** — a `{rounded.full}` pill: `{colors.primary-soft}` fill with
  `{colors.primary}` text.
- **status-success / status-error / status-warning / status-info** — status
  text in `{colors.success}`, `{colors.error}`, `{colors.warning}`, and
  `{colors.info}` at `{typography.label}`.

## Motion

Motion is sparse and functional: disclosure surfaces (accordions, side menus,
modals) transition transform and opacity over roughly 0.3s, and everything
else changes state instantly. There is no decorative animation, and the system
honours `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** treat this entry as a reference for government-grade UI; **don't**
  apply the DSFR identity outside French state services — it is legally
  reserved.
- **Do** keep corners square (`{rounded.none}`); **don't** round cards or
  buttons — softness reads as off-brand here.
- **Do** reserve `{colors.primary}` for actions, links, and focus; **don't**
  use it as a decorative background wash.
- **Do** keep `{colors.red-marianne}` as an identity accent; **don't** use it
  for errors, alerts, or buttons — `{colors.error}` exists for that.
- **Do** set status text in `{colors.info}`, `{colors.success}`,
  `{colors.warning}`, or `{colors.error}` on white; **don't** invent lighter
  tints that break AA contrast.
- **Do** stay on the 4/8px grid (`{spacing.xxs}` upward); **don't** introduce
  off-grid padding.
- **Do** substitute an open face such as Public Sans for Marianne; **don't**
  embed or redistribute the Marianne font files.
- **Do** separate sections with `{colors.surface-alt}` bands and
  `{colors.border}` hairlines; **don't** stack drop shadows.

## Agent Prompt Guide

When generating UI in the DSFR style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; DSFR is built to a legal
   accessibility standard (RGAA), so treat contrast failures as defects.
3. Default composition: `{colors.surface}` page, `{colors.surface-alt}`
   alternate bands, one `button-primary` per view, `{colors.primary}` links,
   square corners throughout.
4. Use Public Sans in tokens as the stand-in for Marianne; never ship the
   Marianne binaries, and keep `{colors.red-marianne}` out of interactive
   states.
5. Remember the scope: this file describes a legally protected state
   identity — use it for reference or for services entitled to it, not for
   general-purpose branding.
6. If a needed token is missing, propose it in a PR — do not invent values.
