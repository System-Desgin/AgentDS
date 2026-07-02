---
version: alpha
name: Cloudscape
description: Amazon's cloud-console design system — dense, content-first, and led by AWS blue.
colors:
  primary: "#006CE0"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#0F141A"
  on-surface-variant: "#424650"
  surface-selected: "#F0FBFF"
  border: "#C6C6CD"
  border-strong: "#8C8C94"
  success: "#00802F"
  warning: "#855900"
  error: "#DB0000"
typography:
  display:
    fontFamily: Open Sans
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: Open Sans
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.25
  heading:
    fontFamily: Open Sans
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Open Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Open Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: Open Sans
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.01em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  2xl: 32px
  3xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 20px
  button-normal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 8px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  nav-item-selected:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
---

## Overview

Cloudscape is the open-source design system behind the AWS Management Console.
It is built for density and long task flows: a white, content-first surface
(`{colors.surface}`), compact spacing, and a confident AWS blue
(`{colors.primary}`) for primary actions, links, and selection. Colour stays
functional so tables, forms, wizards, and resource lists remain scannable.

Reach for Cloudscape when building console-style products — infrastructure
dashboards, admin tools, and configuration-heavy web apps.

## Colors

- **primary (`#006CE0`)** — AWS blue for primary buttons, links, focus, and
  selection; pair with `{colors.on-primary}`.
- **surface (`#FFFFFF`)** — the content canvas for layouts, containers, and
  cards.
- **on-surface (`#0F141A`) / on-surface-variant (`#424650`)** — primary and
  secondary text.
- **surface-selected (`#F0FBFF`)** — a soft blue tint for selected rows and
  active navigation, carrying `{colors.primary}` text.
- **border (`#C6C6CD`) / border-strong (`#8C8C94`)** — divider hairlines and the
  stronger outline used for inputs and controls.
- **success (`#00802F`) / warning (`#855900`) / error (`#DB0000`)** — status
  text colours for flashbars, validation, and inline status.

All text pairings above meet WCAG AA against their stated backgrounds.

## Typography

Cloudscape's UI face is Amazon Ember (proprietary); this file substitutes the
open **Open Sans** for UI text and **JetBrains Mono** for code. The scale is
tuned for density — body sits at `{typography.body}` (0.875rem) with generous
line height for scannable tables and forms.

- **display / heading-lg / heading** — Open Sans Bold for page and section
  titles.
- **body-lg / body** — Open Sans Regular for reading and dense UI text.
- **label** — Open Sans Bold, slightly tracked, for form labels, column headers,
  and status text.
- **code** — `{typography.code}` for identifiers, ARNs, and snippets.

## Spacing & Layout

Spacing follows a 4px base: `{spacing.xxs}` (4px) through `{spacing.md}` (16px)
to `{spacing.3xl}` (40px). Dense layouts rely on `{spacing.xs}`–`{spacing.sm}`
for control padding and table rows; `{spacing.lg}`–`{spacing.xl}` separate
containers. Use `{colors.border}` hairlines to divide dense content rather than
heavy shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}` text
  and `{rounded.md}` corners.
- **button-normal** — `{colors.surface}` with a `{colors.primary}` label for
  secondary actions.
- **card** — `{colors.surface}` container, `{rounded.lg}` corners, `{spacing.lg}`
  padding.
- **input** — `{colors.surface}` field, `{colors.border-strong}` outline,
  `{rounded.sm}` corners; focus uses a `{colors.primary}` ring.
- **nav-item-selected** — `{colors.surface-selected}` with `{colors.primary}`
  text for the active navigation item.
- **caption** — `{colors.on-surface-variant}` secondary text in
  `{typography.body}`.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and
  `{colors.border-strong}`.
- **status-success / status-warning / status-error** — status text in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`.

## Motion

Motion is quick and functional: 90–180ms transitions on hover, focus, expand,
and flash notifications. Avoid ambient animation and honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for actions, links, and selection; **don't**
  use it as a decorative fill.
- **Do** use `{colors.surface-selected}` to mark active rows and nav; **don't**
  invent new selection colours.
- **Do** keep status colours (`{colors.success}`, `{colors.warning}`,
  `{colors.error}`) semantic; **don't** use them as brand accents.
- **Do** divide dense content with `{colors.border}` hairlines; **don't** stack
  heavy shadows.
- **Do** keep body copy at `{typography.body}` for density; **don't** drop text
  below AA contrast.
- **Do** render identifiers and code in `{typography.code}`; **don't** mix
  families within a run.

## Agent Prompt Guide

When generating UI in the Cloudscape style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` canvas → bordered containers and
   tables → one `button-primary` per view, `{colors.primary}` for links/selection.
4. Keep density high but aligned to the 4px spacing scale.
5. Substitute proprietary fonts (Amazon Ember → Open Sans); never ship
   proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
