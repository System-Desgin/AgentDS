---
version: alpha
name: NVIDIA
description: The visual language observed on NVIDIA's public site — black and charcoal surfaces, one signature green, squared corners, and dense spec tables.
colors:
  primary: "#76B900"
  on-primary: "#000000"
  surface: "#000000"
  surface-variant: "#1A1A1A"
  surface-muted: "#262626"
  on-surface: "#FFFFFF"
  on-surface-variant: "#CCCCCC"
  helper: "#999999"
  border: "#333333"
  border-strong: "#666666"
  success: "#76B900"
  warning: "#FFB300"
  error: "#FF5252"
typography:
  display:
    fontFamily: Work Sans
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Work Sans
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: Work Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Work Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Work Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Work Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0.08em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 0px
  md: 2px
  lg: 4px
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
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  link:
    textColor: "{colors.primary}"
  nav-label:
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  spec-table-header:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by NVIDIA Corporation. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

The look observed across nvidia.com and its GeForce product pages is
technical power. Hero sections sit on pure black (`{colors.surface}`) and
charcoal (`{colors.surface-variant}`) with hardware photography lit against
dark gradients; the live site alternates these with white content bands.
One signature green (`{colors.primary}`) carries every call to action,
link, and highlight. Corners are squared (`{rounded.sm}` to
`{rounded.lg}`, 0-4px), navigation labels read as tracked uppercase, and
product pages end in dense spec tables ruled by hairlines.

This file models the dark surfaces, where the green stays WCAG AA safe as
both fill and text. Reach for this look for hardware marketing, product
configurators, and spec-heavy commerce pages that should feel engineered
and high-performance.

## Colors

- **primary (`#76B900`) / on-primary (`#000000`)** — the signature green,
  the site's only brand accent. As a CTA fill it always carries black text
  (8.7:1); the observed pages do not set white on green.
- **surface (`#000000`) / surface-variant (`#1A1A1A`)** — the black field
  behind heroes and footers, and the charcoal used for cards, panels, and
  raised sections.
- **surface-muted (`#262626`)** — the lighter charcoal seen behind inputs,
  table headers, and hover states.
- **on-surface (`#FFFFFF`) / on-surface-variant (`#CCCCCC`)** — white
  primary text and the light gray used for secondary copy and table data.
- **helper (`#999999`)** — placeholder and fine-print gray (7.4:1 on
  black).
- **border (`#333333`) / border-strong (`#666666`)** — hairline rules on
  spec tables and cards, and the stronger outline on focusable controls.
  Neither is used as text.
- **success (`#76B900`)** — status green; the same hue as
  `{colors.primary}`, since the observed pages use one green for both
  roles.
- **warning (`#FFB300`) / error (`#FF5252`)** — amber and red status hues
  legible on the dark surfaces; amber also works as a fill behind black
  text.

Green text passes AA on `{colors.surface}` (8.7:1) and
`{colors.surface-variant}` (7.2:1) but fails on white (2.4:1), so on the
site's white bands green appears only as a fill with dark text, never as
text.

## Typography

The observed family is a proprietary condensed grotesque in the DIN
tradition — narrow, technical, and set in uppercase for navigation and
eyebrows. It cannot be redistributed, so tokens substitute **Work Sans**
(Google Fonts), which keeps a compact, engineered feel; **JetBrains Mono**
stands in for the monospaced figures seen in spec callouts.

- **display (`{typography.display}`) / heading-lg
  (`{typography.heading-lg}`)** — bold, tight-leading headlines; hero
  copy is short and declarative, often paired with a product name.
- **heading (`{typography.heading}`)** — section and card titles at
  semibold weight.
- **body (`{typography.body}`) / body-sm (`{typography.body-sm}`)** —
  regular weight at a calm 1.5 line height; paragraphs stay brief and
  spec-like.
- **label (`{typography.label}`)** — small, semibold, tracked 0.08em; used
  uppercase for nav items, eyebrows, and table headers.
- **code (`{typography.code}`)** — monospace for model numbers, clock
  speeds, and other figures in dense tables.

## Spacing & Layout

Spacing observed on the site follows a 4px rhythm: `{spacing.xxs}` (4px)
and `{spacing.xs}` (8px) inside controls and table cells, `{spacing.sm}`
(12px) to `{spacing.md}` (16px) for control padding and grid gutters,
`{spacing.lg}` (24px) for card padding, and `{spacing.xl}` through
`{spacing.3xl}` (32-64px) between full-width bands. Layouts are wide,
banded, and grid-driven: edge-to-edge hero imagery, 3-4 column product
grids, and spec tables ruled with `{colors.border}` hairlines instead of
shadows.

## Components

- **button-primary** — solid `{colors.primary}` green with
  `{colors.on-primary}` black text and squared `{rounded.sm}` corners; the
  one loud element per view.
- **button-secondary** — charcoal `{colors.surface-variant}` with
  `{colors.on-surface}` text and a `{colors.border-strong}` outline for
  secondary actions.
- **card** — `{colors.surface-variant}` product tile with `{rounded.md}`
  corners, imagery on top, and a green link or price row below.
- **field** — `{colors.surface-muted}` input with `{colors.on-surface}`
  text; the `{colors.border-strong}` outline, not the fill, signals focus.
- **link** — `{colors.primary}` green text on the dark surfaces.
- **nav-label** — `{typography.label}` set uppercase in
  `{colors.on-surface}`; the site's condensed all-caps navigation voice.
- **helper-text** — `{colors.helper}` fine print, placeholders, and legal
  copy; `{colors.on-surface-variant}` handles secondary body text.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` for
  spec-table rows and footer columns, and `{colors.border-strong}` where a
  section break or focused control needs more weight.
- **spec-table-header** — `{colors.surface-muted}` row with tracked
  uppercase `{colors.on-surface-variant}` labels above data rows.
- **status-success / status-error** — `{colors.success}` and
  `{colors.error}` label text for stock and compatibility states.
- **badge-warning** — `{colors.warning}` amber fill with black
  `{colors.on-primary}` text for limited-stock and notice chips.

## Motion

Observed motion is restrained and cinematic: slow crossfades and pans on
hero media, subtle scale on product-card hover, and quick sub-200ms
transitions on buttons and links. Nothing bounces. Honor
`prefers-reduced-motion` by replacing media motion with static frames.

## Do's and Don'ts

- **Do** pair `{colors.primary}` fills with `{colors.on-primary}` black
  text (8.7:1); **don't** set white text on green — it fails AA at 2.4:1.
- **Do** keep green as the only accent; **don't** introduce a second brand
  hue — hierarchy comes from the gray ramp.
- **Do** use green text on `{colors.surface}` and
  `{colors.surface-variant}` only; **don't** set green text on white
  bands, where it fails at 2.4:1.
- **Do** keep corners squared at `{rounded.sm}`-`{rounded.lg}` (0-4px);
  **don't** use pill buttons or heavily rounded cards — `{rounded.full}`
  is for tiny dot indicators only.
- **Do** set navigation, eyebrows, and table headers in tracked uppercase
  `{typography.label}`; **don't** run body copy in all caps.
- **Do** rule spec tables and cards with `{colors.border}` hairlines;
  **don't** use drop shadows or tinted glows for structure.
- **Do** stage product imagery on dark gradients between
  `{colors.surface}` and `{colors.surface-variant}`; **don't** place body
  text over busy imagery.
- **Do** use `{colors.warning}` as text on dark or as a fill behind black
  text; **don't** set amber or green as text on white.

## Agent Prompt Guide

When generating UI in this observed NVIDIA-like style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.label}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA 4.5:1; green fills take
   `{colors.on-primary}` black text, and green text appears only on
   `{colors.surface}` or `{colors.surface-variant}`.
3. Default composition: black `{colors.surface}` field, charcoal
   `{colors.surface-variant}` cards, `{colors.border}` hairlines for
   tables, and one green `button-primary` per view.
4. Keep corners squared (`{rounded.sm}` for controls, `{rounded.md}` for
   cards) and spacing on the 4px rhythm.
5. Tokens use Work Sans / JetBrains Mono as stand-ins for the observed
   proprietary condensed sans; never ship font binaries you have not
   licensed.
6. This is an independent analysis of observable patterns — treat it as
   inspiration for an original system, not an official NVIDIA spec.
