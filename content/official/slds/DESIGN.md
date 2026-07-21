---
version: alpha
name: Lightning Design System
description: Salesforce's enterprise CRM system — Lightning blue on cloud-gray neutrals, tuned for dense record pages.
colors:
  primary: "#0176D3"
  on-primary: "#FFFFFF"
  primary-hover: "#014486"
  surface: "#FFFFFF"
  surface-variant: "#F3F3F3"
  on-surface: "#181818"
  on-surface-variant: "#444444"
  link: "#0B5CAB"
  border: "#C9C9C9"
  border-strong: "#747474"
  success: "#2E844A"
  warning: "#A96404"
  error: "#BA0517"
typography:
  display:
    fontFamily: Inter
    fontSize: 1.802rem
    fontWeight: 300
    lineHeight: 1.25
  heading-lg:
    fontFamily: Inter
    fontSize: 1.424rem
    fontWeight: 700
    lineHeight: 1.25
  heading:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.375
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  xl: 16px
  full: 9999px
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  3xl: 4rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 0 16px
    height: 32px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 0 16px
    height: 32px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  page-header:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 0 12px
    height: 32px
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
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

The Lightning Design System (SLDS) is Salesforce's design language for its CRM
products: record pages, list views, consoles, and setup screens. Its character
is compact and businesslike — white cards on a cloud-gray canvas, small 13px
body text, quiet 4px corners, and Lightning blue (`{colors.primary}`, the
color SLDS calls brand) reserved for actions and selection. Density is the
point: an SLDS screen carries many fields, tables, and related lists at once
and stays legible.

Reach for SLDS when building CRM-style software: record detail pages, pipeline
dashboards, and admin consoles where information per screen matters.

## Colors

- **primary (`#0176D3`)** — Lightning blue for primary buttons and selected
  controls; pair with `{colors.on-primary}` and darken to
  `{colors.primary-hover}` on hover and active.
- **surface (`#FFFFFF`) / surface-variant (`#F3F3F3`)** — white cards and
  inputs over the cloud-gray canvas used for page headers, table stripes, and
  hover rows.
- **on-surface (`#181818`) / on-surface-variant (`#444444`)** — primary text
  and the softer gray for table headers, helper text, and metadata.
- **link (`#0B5CAB`)** — a darker blue than `{colors.primary}` so text links
  hold contrast on white.
- **border (`#C9C9C9`) / border-strong (`#747474`)** — quiet card and row
  hairlines versus the stronger outline on inputs and focusable controls.
- **success (`#2E844A`) / warning (`#A96404`) / error (`#BA0517`)** — status
  text drawn from the mid ramps so each passes WCAG AA on white.

All text pairings above meet WCAG AA against their stated backgrounds; the
lighter warning and error ramp steps exist upstream but are fills, not text.

## Typography

Salesforce brands its products with **Salesforce Sans**, a proprietary family
that is never committed or served here; tokens substitute **Inter** (open, on
Google Fonts). The published npm package itself declares a system-ui fallback
stack, so Inter matches the system's neutral, workmanlike voice. Code uses
**JetBrains Mono** in place of the shipped Consolas/Menlo system stack.

- **display (`{typography.display}`)** — light-weight page and object titles;
  SLDS keeps large text thin rather than heavy.
- **heading-lg / heading** — bold section and card titles at
  `{typography.heading-lg}` and `{typography.heading}`.
- **body (`{typography.body}`)** — the 0.8125rem (13px) workhorse for field
  values, tables, and forms; body-sm steps down to `{typography.body-sm}`.
- **label (`{typography.label}`)** — 0.75rem form labels and column headers.
- **code (`{typography.code}`)** — formulas, API names, and identifiers.

## Spacing & Layout

SLDS runs a compact 4/8px rhythm: `{spacing.xxs}` (4px) and `{spacing.xs}`
(8px) for cell padding and icon gaps, `{spacing.sm}` (12px) and `{spacing.md}`
(16px) for card and form padding, and `{spacing.lg}` through `{spacing.3xl}`
for page structure. Compose record pages as white cards on the
`{colors.surface-variant}` canvas, separated by `{colors.border}` hairlines
rather than shadows. Tables stay tight: `{spacing.xs}` cell spacing, striped
rows in `{colors.surface-variant}`, and 32px control heights throughout.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, `{rounded.md}` corners, 32px tall; **button-primary-hover** darkens
  the fill to `{colors.primary-hover}`.
- **button-secondary** — the neutral button: `{colors.surface}` fill,
  `{colors.primary}` label, `{colors.border}` outline.
- **card / page-header** — `{colors.surface}` cards for record content and a
  `{colors.surface-variant}` header band for titles and actions.
- **field** — white input, `{colors.border-strong}` outline, 32px tall, with
  `{typography.label}` labels above.
- **link** — `{colors.link}` text, darkening on hover.
- **helper-text** — `{colors.on-surface-variant}` secondary text in
  `{typography.label}`, also the treatment for table column headers.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and
  `{colors.border-strong}` between rows and sections.
- **status-success / status-warning / status-error** — status text in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`.

## Motion

SLDS motion is utilitarian: brief fades and expansions on popovers, panels,
and dropdowns, in the tenths-of-a-second range. Nothing ambient or decorative;
honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for actions and selection; **don't** flood
  headers or backgrounds with Lightning blue.
- **Do** use `{colors.link}` for text links; **don't** set `{colors.primary}`
  paragraphs of text — the darker link blue exists for prose contrast.
- **Do** build record pages as `{colors.surface}` cards on the
  `{colors.surface-variant}` canvas; **don't** stack drop shadows for depth.
- **Do** keep body text at `{typography.body}` (13px) and controls 32px tall;
  **don't** inflate type and spacing — SLDS is deliberately dense.
- **Do** stay on the 4/8px rhythm from `{spacing.xxs}` up; **don't** invent
  off-scale gaps.
- **Do** keep corners at `{rounded.md}` (4px) for buttons, cards, and inputs;
  **don't** round containers past `{rounded.lg}` except pills and avatars.
- **Do** use `{colors.warning}` and `{colors.error}` as text on white;
  **don't** substitute the lighter orange and red fill steps for text.
- **Do** substitute Inter for Salesforce Sans; **don't** ship Salesforce Sans
  binaries or Salesforce logos and trademarks.

## Agent Prompt Guide

When generating UI in the SLDS style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; use `{colors.link}` (not
   `{colors.primary}`) for links on white, and status colors only as listed.
3. Default composition: `{colors.surface-variant}` canvas → `{colors.surface}`
   cards → one `button-primary` per view, neutral buttons elsewhere.
4. Keep density: 13px `{typography.body}`, 32px controls, `{rounded.md}`
   corners, spacing on the 4/8px grid.
5. Use Inter (Salesforce Sans is proprietary — name it in prose only, never
   serve it) and JetBrains Mono for code.
6. If a needed token is missing, propose it in a PR — do not invent values.
