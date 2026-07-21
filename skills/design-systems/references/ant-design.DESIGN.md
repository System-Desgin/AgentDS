---
version: alpha
name: Ant Design
description: Ant Group's enterprise UI system — a vivid brand blue, crisp neutrals, and dense data-rich layouts.
colors:
  primary: "#1677FF"
  on-primary: "#FFFFFF"
  primary-hover: "#4096FF"
  link: "#1677FF"
  surface: "#FFFFFF"
  on-surface: "#1F1F1F"
  on-surface-variant: "#595959"
  surface-variant: "#F5F5F5"
  fill: "#F0F0F0"
  border: "#D9D9D9"
  success: "#52C41A"
  warning: "#FAAD14"
  error: "#FF4D4F"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.375rem
    fontWeight: 600
    lineHeight: 1.23
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.35
  title:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.57
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 2px
  md: 6px
  lg: 8px
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
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  layout:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.md}"
  tag:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 0px 8px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 5px 12px
  link:
    textColor: "{colors.link}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Ant Design is Ant Group's enterprise UI system for data-heavy web applications.
Its character is crisp and efficient: a vivid brand blue (`{colors.primary}`) on
clean neutral grays, moderate 6px rounding, and a dense 14px-based type scale
tuned for tables, forms, and admin consoles.

Reach for Ant Design for back-office tools, CRUD-heavy dashboards, and
enterprise apps that need a large, consistent component vocabulary.

## Colors

- **primary (`#1677FF`) / on-primary (`#FFFFFF`)** — the vivid brand blue for
  primary actions and selection; **primary-hover (`#4096FF`)** for hover.
- **link (`#1677FF`)** — inline links.
- **surface (`#FFFFFF`) / surface-variant (`#F5F5F5`)** — content background and
  the page/layout backdrop; **fill (`#F0F0F0`)** for tags and quiet fills.
- **on-surface (`#1F1F1F`) / on-surface-variant (`#595959`)** — primary and
  secondary text.
- **border (`#D9D9D9`)** — the default control and divider line.
- **success (`#52C41A`) / warning (`#FAAD14`) / error (`#FF4D4F`)** — status
  colours; success/warning read best as fills with dark text, error as a fill.

Note: Ant's palette is intentionally vivid — some brand/status pairings sit near
the WCAG AA threshold; pair them with dark text (or use icons/large text) as here.

## Typography

Ant Design uses the OS system font stack (no brand font); this file uses the open
**Inter** as a neutral stand-in, with **JetBrains Mono** for code. The scale is
dense: body sits at `{typography.body}` (0.875rem / 14px).

- **display / heading / title** — Inter Semibold for the title hierarchy.
- **body-lg / body** — Inter Regular for reading and dense UI text.
- **label** — Inter Medium for field labels and captions.
- **code** — `{typography.code}` for identifiers and snippets.

## Spacing & Layout

Spacing follows a 8px rhythm with a 4px nudge: `{spacing.xxs}` (4px) through
`{spacing.md}` (16px) to `{spacing.2xl}` (48px). Use `{spacing.xs}`–`{spacing.sm}`
for control padding and table rows, `{spacing.lg}`–`{spacing.xl}` for section
structure. Rounding is moderate — `{rounded.md}` (6px) for most controls.

## Components

- **button-primary** — `{colors.primary}` with `{colors.on-primary}`, `{rounded.md}`
  corners; hover shifts to `{colors.primary-hover}`.
- **button-default** — `{colors.surface}` with a `{colors.border}` outline and
  `{colors.on-surface}` label.
- **card / layout** — `{colors.surface}` cards on a `{colors.surface-variant}`
  page.
- **tag** — `{colors.fill}` chip with `{colors.on-surface}` text.
- **input** — `{colors.surface}` field, `{colors.border}` outline, `{rounded.md}`
  corners; focus uses a `{colors.primary}` ring.
- **link** — `{colors.link}` text.
- **caption** — `{colors.on-surface-variant}` secondary text.
- **divider** — a 1px `{colors.border}` hairline.
- **badge-success / badge-warning / badge-error** — status pills in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`.

## Motion

Ant motion is brisk and functional: ~100–300ms with ease on hover, focus, and
expand/collapse. Honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interaction; **don't** use it as a large
  decorative fill.
- **Do** pair vivid status colours with dark text or icons; **don't** set them as
  small text on white below AA.
- **Do** keep layouts dense on the 8px grid; **don't** invent off-grid spacing.
- **Do** use `{colors.fill}` for quiet tags and `{colors.border}` hairlines;
  **don't** stack heavy shadows.
- **Do** keep body copy at `{typography.body}` for density; **don't** enlarge it
  arbitrarily.
- **Do** render code in `{typography.code}`; **don't** mix families within a run.

## Agent Prompt Guide

When generating UI in the Ant Design style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Validate contrast: Ant's palette is vivid, so pair `{colors.success}`,
   `{colors.warning}`, and `{colors.error}` with dark text or icons.
3. Default composition: `{colors.surface-variant}` page → `{colors.surface}`
   cards and tables → one `button-primary` per view.
4. Keep density high on the 8px spacing grid with `{rounded.md}` corners.
5. Use an open sans-serif (Ant ships no brand font) and never proprietary font
   binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
