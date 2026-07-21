---
version: alpha
name: Atlassian Design System
description: Atlassian's design system — a confident brand blue on calm neutral surfaces, dense but friendly, built for work management at scale.
colors:
  primary: "#1868DB"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-sunken: "#F8F8F8"
  surface-selected: "#E9F2FE"
  on-surface: "#292A2E"
  on-surface-subtle: "#505258"
  on-surface-subtlest: "#6B6E76"
  border: "#8C8F97"
  success: "#4C6B1F"
  success-subtle: "#EFFFD6"
  warning: "#9E4C00"
  warning-subtle: "#FFF5DB"
  danger: "#AE2E24"
  danger-subtle: "#FFECEB"
typography:
  display:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.125
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.17
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.33
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.33
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
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
    rounded: "{rounded.md}"
    padding: 6px 12px
  button-secondary:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-subtlest}"
    typography: "{typography.body-sm}"
  caption:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  nav-item-selected:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  lozenge-success:
    backgroundColor: "{colors.success-subtle}"
    textColor: "{colors.success}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
  lozenge-warning:
    backgroundColor: "{colors.warning-subtle}"
    textColor: "{colors.warning}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
  lozenge-danger:
    backgroundColor: "{colors.danger-subtle}"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
---

## Overview

The Atlassian Design System is the visual language of Jira, Confluence, and
Trello: productivity software that stays calm under heavy information load. A
single confident blue (`{colors.primary}`) carries every interactive moment on
a white or faintly sunken neutral field, text runs small (14px body) so lists
and boards stay dense, and a compact radius scale — 6px on controls, 8px on
cards — keeps the density feeling friendly rather than severe.

Reach for this system when building B2B and work-management products: boards,
backlogs, issue views, admin screens, and anything with long lists that people
scan all day.

## Colors

- **primary (`#1868DB`)** — the Atlassian brand blue for primary buttons,
  links, selected states, and focus; pair with `{colors.on-primary}` text.
- **surface (`#FFFFFF`) / surface-sunken (`#F8F8F8`)** — cards and content sit
  on white; boards and page backgrounds drop to the sunken neutral so raised
  content reads without shadows.
- **surface-selected (`#E9F2FE`)** — the pale blue fill behind selected rows
  and navigation items, with `{colors.primary}` text.
- **on-surface (`#292A2E`) / on-surface-subtle (`#505258`) /
  on-surface-subtlest (`#6B6E76`)** — a calm three-step neutral text ramp:
  primary text, secondary text, then helper and placeholder text.
- **border (`#8C8F97`)** — the input outline; the same gray works for 1px
  dividers between dense rows.
- **success (`#4C6B1F`) on success-subtle (`#EFFFD6`)**, **warning (`#9E4C00`)
  on warning-subtle (`#FFF5DB`)**, **danger (`#AE2E24`) on danger-subtle
  (`#FFECEB`)** — status text always sits on its own subtle tint, the lozenge
  pattern Jira uses for issue states.

Every text/background pairing above meets WCAG AA at 4.5:1 or better,
including `{colors.on-primary}` on `{colors.primary}` and each status lozenge.

## Typography

Atlassian's products set UI text in **Atlassian Sans** with **Atlassian Mono**
for code — both proprietary, so tokens substitute **Inter** and **JetBrains
Mono**. Name the originals in prose only; never ship their binaries.

- **display / heading-lg / heading** — semibold titles from
  `{typography.display}` (32px) through `{typography.heading}` (20px), with
  tight line heights that keep headers compact above dense content.
- **body (`{typography.body}`)** — 14px at 1.43 line height, the default for
  almost everything; this small body size is the core of the system's density.
- **body-sm (`{typography.body-sm}`)** — 12px for timestamps, metadata, and
  table captions.
- **label (`{typography.label}`)** — 12px semibold for form labels and column
  headers.
- **code (`{typography.code}`)** — monospace for keys, snippets, and issue IDs.

## Spacing & Layout

Spacing is an 8px-based scale with fine steps for dense UI: `{spacing.xxs}`
(2px) and `{spacing.xs}` (4px) inside controls and lozenges, `{spacing.sm}`
(8px) between related items, `{spacing.md}` (16px) for card padding and form
gaps, and `{spacing.lg}` (24px) through `{spacing.3xl}` (64px) for page
structure. Compose screens as white cards on a `{colors.surface-sunken}`
field, separated by spacing and 1px `{colors.border}` hairlines rather than
heavy shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and `{rounded.md}` corners; one per view.
- **button-secondary** — a quiet neutral fill (`{colors.surface-sunken}`) with
  `{colors.on-surface}` text for everything that is not the main action.
- **card** — `{colors.surface}` on the sunken field, `{rounded.lg}` corners,
  `{spacing.md}` padding.
- **field** — white input with a `{colors.border}` outline and `{rounded.md}`
  corners; labels use `{typography.label}`.
- **link** — `{colors.primary}` text, underline on hover.
- **helper-text / caption** — `{colors.on-surface-subtlest}` and
  `{colors.on-surface-subtle}` secondary text at `{typography.body-sm}`.
- **divider** — a 1px `{colors.border}` hairline between rows and sections.
- **nav-item-selected** — `{colors.surface-selected}` fill with
  `{colors.primary}` text, the selected-state pattern for sidebars and tabs.
- **lozenge-success / lozenge-warning / lozenge-danger** — small
  `{rounded.sm}` status chips: tinted fill, matching dark status text, set in
  `{typography.label}`.

## Motion

Motion is functional and brief: quick transitions for small state changes,
slightly longer for large surfaces like modals, with entrances easing out and
exits easing in. Nothing decorative or looping; always respect
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for actions, links, and selection;
  **don't** use it as a decorative or heading color.
- **Do** keep body text at `{typography.body}` (14px) so lists stay dense;
  **don't** inflate UI text to 16px except in long-form content.
- **Do** place cards on `{colors.surface-sunken}` and separate rows with
  `{colors.border}` hairlines; **don't** stack drop shadows to create depth.
- **Do** use the radius scale by element size — `{rounded.sm}` lozenges,
  `{rounded.md}` controls, `{rounded.lg}` cards; **don't** give everything the
  same corner or exceed `{rounded.xl}` on containers.
- **Do** communicate status with lozenges (tinted fill plus dark status text);
  **don't** set status colors as text on plain white or use bold fills for
  routine states.
- **Do** mark selection with `{colors.surface-selected}` and
  `{colors.primary}` text; **don't** invent new highlight colors.
- **Do** keep spacing on the scale, favoring `{spacing.xs}`–`{spacing.md}` in
  components; **don't** use off-scale gaps.
- **Do** substitute Inter and JetBrains Mono for Atlassian Sans and Atlassian
  Mono; **don't** embed proprietary font binaries.

## Agent Prompt Guide

When generating UI in the Atlassian style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.sm}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA (4.5:1); the shipped
   palette pairings all pass — do not create new combinations without
   checking.
3. Default composition: `{colors.surface-sunken}` page, `{colors.surface}`
   cards at `{rounded.lg}`, one `button-primary` per view, `{colors.primary}`
   for links and selection.
4. Keep text small and calm: `{typography.body}` for UI copy,
   `{typography.label}` for form labels, status only via the lozenge
   components.
5. Use Inter and JetBrains Mono in tokens; mention Atlassian Sans and
   Atlassian Mono only in prose, and never ship proprietary fonts.
6. If a needed token is missing, propose it — do not invent values.
