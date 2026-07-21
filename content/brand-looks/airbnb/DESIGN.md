---
version: alpha
name: Airbnb
description: Airbnb's publicly observable web look, with white surfaces, near-black type, a coral-to-magenta CTA family on pill and soft-corner controls, and photography-led rounded cards.
colors:
  primary: "#FF385C"
  primary-deep: "#D70466"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#F7F7F7"
  on-surface: "#222222"
  on-surface-variant: "#6A6A6A"
  helper: "#717171"
  border: "#DDDDDD"
  border-subtle: "#EBEBEB"
  outline: "#B0B0B0"
  success: "#008A05"
  error: "#C13515"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 1.625rem
    fontWeight: 600
    lineHeight: 1.25
  heading:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
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
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.33
rounded:
  sm: 8px
  md: 12px
  lg: 24px
  xl: 32px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 13px 23px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs}"
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  search-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 14px 24px
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  link:
    textColor: "{colors.on-surface}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
---

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by Airbnb, Inc. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

Airbnb's public site is warm consumer travel design: an uninterrupted white
field (`{colors.surface}`), near-black text (`{colors.on-surface}`), and one
signature coral-to-magenta accent family (`{colors.primary}` to
`{colors.primary-deep}`) that appears almost nowhere except the primary CTA
and the wishlist heart. Photography carries the page; the UI around it stays
quiet, with hairline dividers, soft 8-12px corners on controls and cards,
and big 24-32px radii on sheets and the search pill.

Reach for this look when a consumer product should feel friendly and
browsable: listings first, generous touch targets, and one unmistakable
action per view.

## Colors

- **primary (`#FF385C`)** — the observed coral-red brand accent, seen on the
  wishlist heart and as the light end of the CTA gradient. White text on it
  measures about 3.5:1, so this file never uses it as a solid text-bearing
  fill.
- **primary-deep (`#D70466`)** — the darker magenta end of the same observed
  CTA gradient; solid buttons anchor here so `{colors.on-primary}` labels
  pass WCAG AA at about 5.1:1.
- **surface (`#FFFFFF`) / surface-variant (`#F7F7F7`)** — the default white
  field and the faint gray used for input wells and quiet panels.
- **on-surface (`#222222`)** — near-black primary text everywhere.
- **on-surface-variant (`#6A6A6A`) / helper (`#717171`)** — the secondary
  gray family for listing metadata, captions, and helper copy.
- **border (`#DDDDDD`) / border-subtle (`#EBEBEB`)** — understated hairline
  dividers; **outline (`#B0B0B0`)** outlines inputs and secondary
  buttons.
- **success (`#008A05`) / error (`#C13515`)** — status text greens and reds
  in the families observed in confirmation and form-error messaging.

All component text pairings in this file pass WCAG AA 4.5:1;
`{colors.success}` on white passes narrowly at about 4.5:1, so keep it to
short status lines.

## Typography

Text on the site is set in a proprietary rounded geometric sans; these
tokens substitute **Inter** (open, Google Fonts) and name the original only
generically.

- **display (`{typography.display}`)** — large friendly headlines on
  marketing and host pages; short lines, slight negative tracking.
- **heading-lg (`{typography.heading-lg}`)** — listing titles and page
  headings around 26px.
- **heading / heading-sm** — section titles step down through
  `{typography.heading}` and `{typography.heading-sm}` with the same
  semibold weight.
- **body (`{typography.body}`)** — 16px reading text at a 1.5 line height;
  **body-sm (`{typography.body-sm}`)** covers metadata and card copy.
- **label (`{typography.label}`)** — small captions, badges, and status
  lines.

## Spacing & Layout

The layout breathes at touch scale: controls hold 44px+ hit areas, cards sit
in a photo grid with `{spacing.lg}` gutters, and page sections separate at
`{spacing.2xl}` to `{spacing.3xl}`. Inside components the rhythm runs
`{spacing.xxs}` through `{spacing.md}`. Structure comes from whitespace and
1px hairlines (`{colors.border-subtle}`), not from boxes: listing pages read
as one continuous white column divided by quiet rules.

## Components

- **button-primary** — the signature CTA. Observed as a pill or `{rounded.sm}`
  rectangle filled with a gradient across the coral family; the solid token
  anchors on `{colors.primary-deep}` with `{colors.on-primary}` text so the
  pairing passes AA.
- **button-secondary** — `{colors.surface}` with `{colors.on-surface}` text
  and a thin `{colors.on-surface}` or `{colors.outline}` outline.
- **card** — the photography-led listing card: image with `{rounded.md}`
  corners, text stacked below in `{typography.body-sm}`, no border, only a
  subtle shadow on hover.
- **sheet** — modals and bottom sheets in `{colors.surface}` with big
  `{rounded.lg}` to `{rounded.xl}` corners and a soft wide shadow.
- **search-pill** — the `{rounded.full}` white search bar with a hairline
  `{colors.border}` edge, a floating shadow, and segment dividers.
- **field** — white input with a `{colors.outline}` outline,
  `{rounded.sm}` corners, and a near-black 2px focus ring.
- **link** — underlined `{colors.on-surface}` text; the site keeps links
  near-black rather than coloring them.
- **helper-text** — `{colors.helper}` copy in `{typography.body-sm}` under
  fields and prices.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  and `{colors.border}`.
- **badge** — the small white `{rounded.full}` pill overlaid on photos
  (for example a favorite or discount flag) with `{colors.on-surface}` text.
- **status-success / status-error** — short status text in
  `{colors.success}` and `{colors.error}` at `{typography.label}` size.

## Motion

Motion is small and tactile: buttons compress slightly on press, the
wishlist heart pops with a quick scale bounce, photo carousels slide with
gentle easing, and sheets slide up from the bottom edge. Everything runs in
the 150-300ms range with no ambient animation; honour
`prefers-reduced-motion` by dropping the bounce and slide effects.

## Do's and Don'ts

- **Do** reserve the coral family for the primary CTA and wishlist accents;
  **don't** spread `{colors.primary}` across backgrounds, icons, or long
  text.
- **Do** anchor solid CTA fills on `{colors.primary-deep}` so white labels
  pass AA; **don't** set white text on `{colors.primary}`, which measures
  about 3.5:1.
- **Do** let photography lead cards with bare `{rounded.md}` images;
  **don't** box listings in borders or heavy shadows.
- **Do** keep links underlined `{colors.on-surface}`; **don't** color links
  coral.
- **Do** separate content with `{colors.border-subtle}` hairlines and
  whitespace; **don't** draw dark rules or panel boxes.
- **Do** use `{rounded.full}` pills for search and badges, `{rounded.sm}`
  for buttons and fields; **don't** square controls off.
- **Do** keep touch targets at 44px or larger; **don't** compress controls
  to desktop-dense sizing.
- **Do** keep secondary text in the `{colors.on-surface-variant}` and
  `{colors.helper}` grays; **don't** push text lighter than
  `{colors.helper}`.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.primary-deep}`, `{spacing.lg}`,
   `{typography.body}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1. Solid CTA fills
   use `{colors.primary-deep}`; `{colors.primary}` is an accent only and
   never carries white text.
3. Default composition: a white `{colors.surface}` page, a `search-pill` up
   top, a photo-led `card` grid, one `button-primary` per view, and
   underlined `{colors.on-surface}` links.
4. Keep corners soft: `{rounded.sm}`-`{rounded.md}` on controls and cards,
   `{rounded.lg}`-`{rounded.xl}` on sheets, `{rounded.full}` on pills.
5. Use Inter (open, Google Fonts); the site's proprietary rounded geometric
   sans is referenced generically in prose only and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
