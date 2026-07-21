---
version: alpha
name: Forma 36
description: Contentful's design system for content tools — one functional blue on cool grays, with compact UI type built for editorial density.
colors:
  primary: "#0059C8"
  primary-strong: "#0041AB"
  on-primary: "#FFFFFF"
  primary-tint: "#E8F5FF"
  surface: "#FFFFFF"
  surface-variant: "#F7F9FA"
  on-surface: "#1B273A"
  on-surface-variant: "#414D63"
  subdued: "#67728A"
  border: "#CFD9E0"
  border-subtle: "#E7EBEE"
  positive: "#006D23"
  warning: "#CC4500"
  negative: "#BD002A"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.33
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.5
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.6
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
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.43
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
rounded:
  sm: 4px
  md: 6px
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
    padding: 10px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.subdued}"
    typography: "{typography.body-sm}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-primary:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-strong}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  status-positive:
    textColor: "{colors.positive}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-negative:
    textColor: "{colors.negative}"
    typography: "{typography.label}"
---

## Overview

Forma 36 is Contentful's open-source design system, built for the tools people
use to model, edit, and publish content. Its character is calm and workmanlike:
white surfaces over a faint gray field, a cool blue-tinted gray ladder for text
and structure, one functional blue (`{colors.primary}`) as the only interactive
voice, and a compact 14px working size (`{typography.body}`) that keeps field
editors, entry lists, and long forms dense without feeling cramped.

Reach for Forma 36 when building editorial tools, CMS-adjacent apps, or SaaS
product surfaces where users spend hours reading and entering structured
content.

## Colors

- **primary (`#0059C8`)** — the functional blue (source `color-primary`,
  blue-600) for primary buttons, links, focus, and selection; pair with
  `{colors.on-primary}`. **primary-strong (`#0041AB`)** (blue-700) is the
  hover/active step, and **primary-tint (`#E8F5FF`)** (blue-100) tints selected
  rows and primary badges.
- **surface (`#FFFFFF`) / surface-variant (`#F7F9FA`)** — white cards and
  controls over the faint gray-100 page field.
- **on-surface (`#1B273A`) / on-surface-variant (`#414D63`)** — body and
  secondary text (source `color-text-base` and `color-text-mid`); **subdued
  (`#67728A`)** (`color-text-lightest`) for helper and placeholder text.
- **border (`#CFD9E0`) / border-subtle (`#E7EBEE`)** — gray-300 control
  outlines and gray-200 hairline dividers.
- **positive (`#006D23`) / warning (`#CC4500`) / negative (`#BD002A`)** — the
  system's semantic trio (`color-positive`, `color-warning`,
  `color-negative`); all three hold WCAG AA as text on `{colors.surface}`.

The grays are deliberately cool: every step from `{colors.border-subtle}` to
`{colors.on-surface}` carries a blue cast, which keeps dense gray UI feeling
tied to the blue primary rather than flat and neutral.

## Typography

Forma 36's tokens name **Geist Sans** first (`font-stack-primary`: Geist Sans,
then -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial) and **Geist
Mono** for monospace. Geist is open (SIL OFL) but not on this catalog's preview
loader list, so the tokens carry **Inter** and **JetBrains Mono** as open
stand-ins; use the true stack when you can load it.

- **display / heading-lg / heading** — Semibold (600) titles from
  `{typography.display}` (2.25rem, `font-size-3xl`) down to
  `{typography.heading}` (1.25rem, `font-size-xl`).
- **body (`{typography.body}`)** — the 0.875rem (`font-size-m`) workhorse; the
  base rem is 16 (`font-base-default`) but UI text sits one step down for
  editorial-tool density.
- **body-sm** — 0.75rem (`font-size-s`) for captions and metadata.
- **label** — 0.875rem Medium (500, `font-weight-medium`) for form labels.
- **code** — `{typography.code}` for IDs, snippets, and API values. Default
  letter spacing is 0 (`letter-spacing-default`); do not track UI text.

## Spacing & Layout

Spacing is a rem ladder taken straight from the `spacing-*` tokens:
`{spacing.xxs}` (0.25rem) and `{spacing.xs}` (0.5rem) for tight insets,
`{spacing.sm}` (0.75rem) and `{spacing.md}` (1rem) for control and card
padding, `{spacing.lg}` through `{spacing.3xl}` for section rhythm. Content
maxes out at 1280px (`content-width-default`) with a 768px measure
(`content-width-text`) for reading columns. Structure comes from
`{colors.border-subtle}` hairlines and the `{colors.surface}` on
`{colors.surface-variant}` layering, not from heavy shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and `{rounded.md}` (6px, `border-radius-medium`) corners; darken to
  `{colors.primary-strong}` on hover.
- **button-secondary** — `{colors.surface}` with `{colors.on-surface}` text
  and a `{colors.border}` outline.
- **card / field** — white surfaces with `{colors.border}` outlines and
  `{rounded.md}` corners; fields keep compact 10px 12px padding.
- **link** — `{colors.primary}` text, underline on hover.
- **helper-text / caption** — `{colors.subdued}` and
  `{colors.on-surface-variant}` in `{typography.body-sm}` under fields and
  metadata rows.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  and `{colors.border}` for quiet and firmer separation.
- **badge-primary** — `{colors.primary-tint}` fill with
  `{colors.primary-strong}` text and `{rounded.sm}` (4px) corners.
- **status-positive / status-warning / status-negative** — semantic status
  text in `{typography.label}`; use `{rounded.full}` only for avatars and
  pills.

## Motion

Motion tokens are short and productive: 0.1s (`transition-duration-short`) for
hovers, 0.2s (`transition-duration-default`) for most transitions, 0.3s
(`transition-duration-long`) for panels. Easing is `ease-in-out` by default
with a decisive `cubic-bezier(0.13, 0.62, 0.11, 0.99)` for larger moves. No
decorative animation; honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the single interactive color; **don't**
  use it for decorative fills or headings.
- **Do** set UI text at `{typography.body}` (0.875rem); **don't** bump dense
  tool UI to 1rem — the compactness is the point.
- **Do** use `{rounded.md}` (6px) for buttons, cards, and fields; **don't**
  round containers past 6px or square them off.
- **Do** layer `{colors.surface}` cards on `{colors.surface-variant}` with
  `{colors.border}` outlines; **don't** stack drop shadows for structure.
- **Do** keep `{colors.positive}` / `{colors.warning}` / `{colors.negative}`
  for status only; **don't** repurpose them as accents.
- **Do** stay on the `spacing-*` rem ladder from `{spacing.xxs}` to
  `{spacing.3xl}`; **don't** invent in-between values.
- **Do** reserve `{colors.subdued}` for helper text on white; **don't** use it
  on tinted fills where it drops below AA.

## Agent Prompt Guide

When generating UI in the Forma 36 style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the
   palette before shipping.
3. Default composition: `{colors.surface-variant}` page field, white
   `{colors.surface}` cards with `{colors.border}` outlines, one
   `button-primary` per view, `{colors.primary}` for links and focus.
4. Keep corners at `{rounded.md}`, body text at `{typography.body}`, and
   spacing on the rem ladder.
5. Use Inter / JetBrains Mono as shipped in the tokens (or the true Geist
   stack when loadable) — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
