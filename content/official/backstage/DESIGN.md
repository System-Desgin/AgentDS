---
version: alpha
name: Backstage
description: Spotify's open-source developer-portal platform — utilitarian navy-blue interaction, dark header bands, and dense engineering tables on a light field.
colors:
  primary: "#1F5493"
  on-primary: "#FFFFFF"
  surface: "#F8F8F8"
  paper: "#FFFFFF"
  on-surface: "#000000"
  text-subtle: "#6E6E6E"
  border: "#E6E6E6"
  link: "#0A6EBE"
  header: "#171717"
  on-header: "#FFFFFF"
  nav-muted: "#B5B5B5"
  success: "#1DB954"
  warning: "#FF9800"
  error: "#E22134"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.375rem
    fontWeight: 700
    lineHeight: 1.15
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.25
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.33
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0.07em
  code:
    fontFamily: JetBrains Mono
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
    padding: 6px 16px
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 6px 16px
  page-header:
    backgroundColor: "{colors.header}"
    textColor: "{colors.on-header}"
    padding: "{spacing.lg}"
  sidebar:
    backgroundColor: "{colors.header}"
    textColor: "{colors.nav-muted}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 14px
  link:
    textColor: "{colors.link}"
  table-header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-subtle}"
    typography: "{typography.body-sm}"
    padding: 12px 16px
  caption:
    textColor: "{colors.text-subtle}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  status-dot-ok:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.full}"
    height: 10px
  banner-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    padding: 8px 16px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 2px 8px
---

## Overview

Backstage is the open-source developer-portal platform created at Spotify and
now hosted by the CNCF. Its light theme is engineering-tool utilitarian: a soft
gray field (`{colors.surface}`) carrying white cards, a deep navy
`{colors.primary}` for actions, and near-black `{colors.header}` bands for the
sidebar and page headers. Everything is tuned for density — service catalogs,
plugin cards, and tables that hold hundreds of rows without shouting.

Reach for Backstage when building internal tools that should feel like a
well-run engineering org: dark chrome around calm, data-heavy content.

## Colors

- **primary (`#1F5493`)** — the navy-blue interactive voice for buttons,
  switches, and selection; pair with `{colors.on-primary}`.
- **surface (`#F8F8F8`) / paper (`#FFFFFF`)** — the page field and the white
  card layer; tables alternate row fills between `{colors.paper}` and
  `{colors.surface}` for scanability.
- **on-surface (`#000000`) / text-subtle (`#6E6E6E`)** — contrast text and the
  muted gray used for table headers, captions, and secondary copy.
- **link (`#0A6EBE`)** — links and tab labels; a brighter blue than
  `{colors.primary}` so navigation reads apart from actions.
- **header (`#171717`) / on-header (`#FFFFFF`) / nav-muted (`#B5B5B5`)** — the
  dark chrome: sidebar and page-header bands with white active text and muted
  gray idle items.
- **border (`#E6E6E6`)** — hairline dividers and card outlines.
- **success (`#1DB954`) / warning (`#FF9800`) / error (`#E22134`)** — entity
  and build status; success renders as dots and icons, warning as a fill with
  dark text, error as a filled banner with white text.

All component text pairings above meet WCAG AA. `{colors.success}` is never
used as text on light surfaces — it appears only as a dot, icon, or chart fill.

## Typography

Backstage ships no fonts: its stack is the platform default (Helvetica Neue,
Helvetica, Roboto, Arial in the upstream theme). Tokens use open **Inter** as
the stand-in, with **JetBrains Mono** standing in for the generic monospace
used in code and log views.

- **display / heading-lg / heading** — bold (700) headings; `{typography.display}`
  tops page headers, `{typography.heading-lg}` and `{typography.heading}` title
  sections and cards.
- **body (`{typography.body}`)** — 1rem reading text for docs and long prose.
- **body-sm (`{typography.body-sm}`)** — the default UI size; Backstage sets
  the whole app body at 0.875rem for density.
- **label (`{typography.label}`)** — medium-weight, tracked (0.07em) text for
  tabs and emphasized labels.
- **code (`{typography.code}`)** — identifiers, YAML, and log output.

## Spacing & Layout

Spacing follows an 8px unit: `{spacing.sm}` (8px) inside controls,
`{spacing.md}` (16px) for card padding and grid gutters, `{spacing.lg}` (24px)
and up for page structure. Tight insets use `{spacing.xxs}` and `{spacing.xs}`.
Layouts are a fixed dark sidebar plus a scrolling content column; content sits
on `{colors.surface}` in white `{colors.paper}` cards separated by
`{colors.border}` hairlines, not shadows. Tables run denser than typical
Material defaults — keep rows short and let alternating fills do the work.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and modest `{rounded.sm}` corners.
- **button-secondary** — `{colors.paper}` background with a `{colors.primary}`
  label for outlined or secondary actions.
- **page-header** — a `{colors.header}` band with `{colors.on-header}` display
  text; upstream themes render it as a dark gradient with a subtle wave motif,
  anchored by `{colors.header}`.
- **sidebar** — `{colors.header}` chrome with `{colors.nav-muted}` idle items
  that brighten to `{colors.on-header}` when active.
- **card** — the plugin/info card: `{colors.paper}` on the gray field, padded
  `{spacing.md}`, cornered `{rounded.sm}`.
- **field** — white inputs with `{colors.on-surface}` text and quiet
  `{colors.border}` outlines.
- **link / table-header / caption** — `{colors.link}` navigation text and
  `{colors.text-subtle}` supporting text at `{typography.body-sm}`.
- **divider** — 1px `{colors.border}` hairline.
- **status-dot-ok / banner-error / badge-warning** — a `{colors.success}` dot
  for healthy entities, a filled `{colors.error}` banner with white text, and a
  `{colors.warning}` pill with `{colors.on-surface}` text.

## Motion

Backstage defines no motion language of its own; it inherits Material UI's
short functional transitions (roughly 150-375ms, standard easing) for hover,
tabs, and expansion. Keep animation incidental and honor
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep the chrome dark and the content light: `{colors.header}` bands
  around `{colors.surface}` content; **don't** put dark fills inside the
  content area.
- **Do** reserve `{colors.primary}` for actions and `{colors.link}` for
  navigation; **don't** swap them or use either as decoration.
- **Do** set dense UI text at `{typography.body-sm}`; **don't** inflate table
  and card text to `{typography.body}` — density is the point.
- **Do** show entity health as `{colors.success}` dots and icons; **don't**
  set success green as text on `{colors.paper}` — it fails contrast.
- **Do** use warning as a fill under `{colors.on-surface}` text; **don't**
  write `{colors.warning}` orange text on white.
- **Do** alternate table rows between `{colors.paper}` and `{colors.surface}`;
  **don't** add zebra borders on top of the alternating fill.
- **Do** keep corners at `{rounded.sm}` with pills only for chips and badges;
  **don't** round cards heavily — this is a tool, not a marketing site.
- **Do** separate content with `{colors.border}` hairlines; **don't** stack
  drop shadows on the card grid.

## Agent Prompt Guide

When generating UI in the Backstage style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body-sm}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; status colors are
   fills and dots, with text in `{colors.on-surface}` or `{colors.on-primary}`
   as specified by the component.
3. Default composition: dark `sidebar` and `page-header` in `{colors.header}`,
   content on `{colors.surface}` as `{colors.paper}` cards and dense tables.
4. Set UI text at `{typography.body-sm}`, headings bold, tabs and labels in
   tracked `{typography.label}`.
5. Use Inter and JetBrains Mono as the open stand-ins for the system stack —
   never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
