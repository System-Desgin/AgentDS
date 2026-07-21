---
version: alpha
name: Base Web
description: Uber's design system — a stark black-and-white base with an electric blue accent, built for scale.
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  accent: "#276EF1"
  on-accent: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#000000"
  on-surface-variant: "#545454"
  surface-variant: "#F6F6F6"
  fill: "#EEEEEE"
  border: "#CBCBCB"
  positive: "#048848"
  warning: "#FFC043"
  negative: "#E11900"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
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
  sm: 4px
  md: 8px
  lg: 12px
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
    rounded: "{rounded.sm}"
    padding: 12px 20px
  button-secondary:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 20px
  nav-item-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  well:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  link:
    textColor: "{colors.accent}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-positive:
    backgroundColor: "{colors.positive}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  badge-negative:
    backgroundColor: "{colors.negative}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

## Overview

Base Web is Uber's React design system, built for operational products at scale.
Its language is stark and functional: a black primary (`{colors.primary}`) on a
neutral mono ramp, an electric blue accent (`{colors.accent}`) for links and
selection, restrained rounding, and dense, legible type. It suits high-density,
utilitarian tools where clarity beats decoration.

Reach for Base Web for internal tools, logistics and operations dashboards, and
data-heavy interfaces.

## Colors

- **primary (`#000000`) / on-primary (`#FFFFFF`)** — black for primary actions
  and high-emphasis surfaces.
- **accent (`#276EF1`) / on-accent (`#FFFFFF`)** — electric blue for links,
  focus, and selection.
- **surface (`#FFFFFF`) / surface-variant (`#F6F6F6`)** — content and a light
  neutral layer; **fill (`#EEEEEE`)** for secondary buttons and quiet fills.
- **on-surface (`#000000`) / on-surface-variant (`#545454`)** — primary and
  secondary text.
- **border (`#CBCBCB`)** — control and divider lines.
- **positive (`#048848`) / warning (`#FFC043`) / negative (`#E11900`)** — status
  colours; positive/negative as fills with light text, warning as a fill with
  dark text.

All text pairings above meet WCAG AA against their stated backgrounds.

## Typography

Base Web uses Uber Move (proprietary); this file substitutes the open **Inter**
for UI text and **JetBrains Mono** for code. The scale is dense — body sits at
`{typography.body}` (0.875rem).

- **display / heading / title** — Inter Bold/Semibold for the title hierarchy.
- **body-lg / body** — Inter Regular for reading and dense UI text.
- **label** — Inter Medium for labels and captions.
- **code** — `{typography.code}` for identifiers and snippets.

## Spacing & Layout

Spacing follows a 4px base: `{spacing.xxs}` (4px) through `{spacing.md}` (16px)
to `{spacing.2xl}` (48px). Use `{spacing.xs}`–`{spacing.sm}` for control padding
and dense rows, `{spacing.lg}`–`{spacing.xl}` for section rhythm. Rounding is
restrained — `{rounded.sm}` (4px) for most controls.

## Components

- **button-primary** — black `{colors.primary}` with `{colors.on-primary}`,
  `{rounded.sm}` corners.
- **button-secondary** — `{colors.fill}` with `{colors.on-surface}` text.
- **nav-item-selected** — `{colors.accent}` with `{colors.on-accent}` for the
  active item.
- **card / well** — `{colors.surface}` and `{colors.surface-variant}` panels
  padded `{spacing.md}`.
- **input** — `{colors.surface}` field, `{colors.border}` outline, `{rounded.sm}`
  corners; focus uses a `{colors.accent}` ring.
- **link** — `{colors.accent}` text.
- **caption** — `{colors.on-surface-variant}` secondary text.
- **divider** — a 1px `{colors.border}` hairline.
- **badge-positive / badge-warning / badge-negative** — status in
  `{colors.positive}`, `{colors.warning}`, and `{colors.negative}`.

## Motion

Base Web motion is quick and restrained: ~120–240ms with ease on hover, focus,
and reveal. No ambient animation; honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` black for high-emphasis actions and
  `{colors.accent}` for links/selection; **don't** blur their roles.
- **Do** keep rounding restrained (`{rounded.sm}`); **don't** over-round in a
  utilitarian UI.
- **Do** layer `{colors.surface}` on `{colors.surface-variant}` for hierarchy;
  **don't** rely on heavy shadows.
- **Do** keep status colours semantic (light text on positive/negative, dark on
  warning); **don't** set them below AA.
- **Do** keep body copy at `{typography.body}` for density; **don't** enlarge it
  arbitrarily.
- **Do** render code in `{typography.code}`; **don't** mix families within a run.

## Agent Prompt Guide

When generating UI in the Base Web style:

1. Reference tokens by name (`{colors.primary}`, `{colors.accent}`,
   `{spacing.md}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` base → `{colors.surface-variant}`
   wells → black `button-primary`, `{colors.accent}` for links and selection.
4. Keep density high, rounding restrained, spacing on the 4px scale.
5. Substitute proprietary fonts (Uber Move → open sans); never ship proprietary
   font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
