---
version: alpha
name: Figma
description: Figma's publicly observable web look, with white fields and near-black ink, a five-color brand set used as accents, a bright blue for in-product actions, and compact 5-6px corners.
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  action: "#0D99FF"
  action-deep: "#0A6DBA"
  on-action: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#F5F5F5"
  on-surface: "#1E1E1E"
  on-surface-variant: "#666666"
  border: "#E6E6E6"
  brand-red: "#F24E1E"
  brand-orange: "#FF7262"
  brand-purple: "#A259FF"
  brand-blue: "#1ABCFE"
  brand-green: "#0ACF83"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.35
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 5px
  md: 6px
  lg: 12px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-action:
    backgroundColor: "{colors.action-deep}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-success:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-error:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-info:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-beta:
    backgroundColor: "{colors.brand-purple}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by Figma, Inc. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

Figma's public pages read as a creative tool that takes work seriously.
The structure is monochrome: white and near-white fields
(`{colors.surface}`, `{colors.surface-variant}`) under near-black ink,
observed as true black `{colors.primary}` on marketing pages and the softer
`{colors.on-surface}` family inside the product. The five-color brand set
appears in illustration, badges, and one accent moment per section, never as
UI chrome. Inside the tool, primary actions turn `{colors.action}` blue,
panels compress to small `{typography.label}` type behind `{colors.border}`
hairlines, and corners hold at a compact 5-6px. Marketing pages keep the same
ink and add air: big headlines, wide margins, generous section gaps.

Reach for this look when a product should feel playful but precise:
monochrome structure, disciplined density, color saved for delight.

## Colors

- **primary (`#000000`) / on-primary (`#FFFFFF`)** — the marketing ink:
  headlines, body copy, and solid CTA fills on the marketing pages sit in
  true black on white.
- **on-surface (`#1E1E1E`)** — the softer near-black text family observed in
  the product UI; **on-surface-variant (`#666666`)** covers secondary text on
  both kinds of page.
- **action (`#0D99FF`)** — the bright product blue observed on in-product
  primary buttons, selection, and focus. White on it measures about 3.0:1,
  so these tokens use it as an accent under dark text; see the contrast
  note below.
- **action-deep (`#0A6DBA`)** — the darker end of the product blue family
  (hover and pressed territory); the fill this file gives action buttons so
  their white label holds AA.
- **surface (`#FFFFFF`) / surface-variant (`#F5F5F5`)** — the white field and
  the near-white gray used for marketing tiles and secondary panels.
- **border (`#E6E6E6`)** — the hairline that structures panels, toolbars, and
  property rows.
- **brand-red (`#F24E1E`) / brand-orange (`#FF7262`) / brand-purple
  (`#A259FF`) / brand-blue (`#1ABCFE`) / brand-green (`#0ACF83`)** — the
  five-color set from the logo mark, observed as illustration fills and
  accents only.

Contrast notes: white text fails WCAG AA on all five brand hues (about 2.0:1
to 3.9:1) and on `{colors.action}` itself (about 3.0:1), so every vivid fill
carries dark text. `{colors.primary}` black passes on each brand hue (5.4:1
to 10.3:1) and on `{colors.action}` (about 7.0:1), while `{colors.on-surface}`
falls just short on `{colors.brand-purple}` (about 4.3:1) — badges here
always use `{colors.primary}` text. The observed product button pairs white
on flat `{colors.action}`, which fails AA; rather than publish that pairing,
`button-action` fills with `{colors.action-deep}`, where `{colors.on-action}`
white measures about 5.4:1 (decision documented in QA).

## Typography

Headlines and UI copy on the site are set in a proprietary grotesk family;
these tokens substitute **Inter** (open, Google Fonts). **JetBrains Mono**
stands in for the monospace used in code snippets.

- **display (`{typography.display}`)** — the marketing hero voice: large,
  bold, tightly tracked, and short, usually one or two lines.
- **heading-lg / heading** — section titles step down through
  `{typography.heading-lg}` and `{typography.heading}` with a lighter
  tracking taper.
- **body (`{typography.body}`)** — the 16px reading size for marketing copy
  and long-form pages.
- **body-sm (`{typography.body-sm}`)** — the compact size that dense product
  surfaces gravitate to.
- **label (`{typography.label}`)** — the product's famously small 11px UI
  text for panel labels, property rows, and toolbar captions.
- **code (`{typography.code}`)** — monospace for snippets and technical
  values.

## Spacing & Layout

Two densities share one scale. In-product panels run tight: `{spacing.xxs}`
to `{spacing.sm}` insets, `{typography.label}` text, and `{colors.border}`
hairlines between rows. Marketing pages open up: content blocks separated by
`{spacing.lg}` to `{spacing.xl}`, section gaps at `{spacing.2xl}` to
`{spacing.3xl}`, and a centered column with wide margins. Keep each surface
one density or the other: a screen is either a dense tool panel or an airy
marketing section, never a blend.

## Components

- **button-primary** — the marketing CTA: solid `{colors.primary}` black with
  a `{colors.on-primary}` label and `{rounded.md}` corners.
- **button-secondary** — a `{colors.surface}` button with a
  `{colors.primary}` label and a hairline `{colors.border}` outline.
- **button-action** — the in-product primary: an `{colors.action-deep}` fill
  with a `{colors.on-action}` label, compact padding, `{rounded.sm}` corners;
  plain `{colors.action}` stays on selection and focus.
- **card** — a `{colors.surface-variant}` marketing tile with `{rounded.lg}`
  corners and `{spacing.lg}` padding.
- **panel** — a dense `{colors.surface}` tool panel: `{spacing.sm}` insets,
  `{colors.border}` hairlines, `{typography.label}` captions.
- **field** — a white input with a `{colors.border}` outline and
  `{rounded.sm}` corners; focus shows an `{colors.action}` ring.
- **link** — marketing links stay in the ink (`{colors.primary}`) with
  underlines; in-product links pick up `{colors.action}`.
- **helper-text** — `{colors.on-surface-variant}` in `{typography.body-sm}`
  for captions and metadata.
- **divider** — a 1px `{colors.border}` hairline.
- **badge-success / badge-warning / badge-error / badge-info / badge-beta** —
  small pills that put the brand set to work as status fills:
  `{colors.brand-green}`, `{colors.brand-orange}`, `{colors.brand-red}`,
  `{colors.brand-blue}`, and `{colors.brand-purple}`, always carrying dark
  `{colors.primary}` text.

## Motion

Observed motion is brief and functional: hover shifts on buttons, fade-up
reveals on marketing sections, and autoplaying product demos; the tool itself
favors instant response over transitions. Keep effects in the 100-250ms
range and honour `prefers-reduced-motion` by dropping reveals and pausing
demo loops.

## Do's and Don'ts

- **Do** keep the brand set (`{colors.brand-red}` through
  `{colors.brand-green}`) for accents, badges, and illustration; **don't**
  build buttons, navigation, or other UI chrome from it.
- **Do** set headlines and CTAs in `{colors.primary}` ink on
  `{colors.surface}`; **don't** set long copy in any brand hue.
- **Do** put dark text on brand-hue and `{colors.action}` fills; **don't**
  put white text on them — every one fails AA under white. White labels
  belong on `{colors.primary}` and `{colors.action-deep}` fills only.
- **Do** reserve the action blues (`{colors.action}`, `{colors.action-deep}`)
  for product-style actions, selection, and focus; **don't** spread them
  across marketing surfaces that already carry black CTAs.
- **Do** hold corners at `{rounded.sm}`-`{rounded.md}` for controls;
  **don't** inflate every element into a pill — `{rounded.full}` is for
  badges and avatars.
- **Do** let marketing sections breathe at `{spacing.2xl}`-`{spacing.3xl}`
  while panels stay at `{spacing.xxs}`-`{spacing.sm}`; **don't** mix the two
  densities on one surface.
- **Do** structure dense UI with `{colors.border}` hairlines; **don't** stack
  drop shadows to separate panels.
- **Do** set UI copy in Inter and code in `{typography.code}` (both open);
  **don't** ship the site's proprietary grotesk.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.action}`, `{spacing.sm}`,
   `{typography.label}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1. In practice: white
   text sits only on `{colors.primary}` or `{colors.action-deep}` fills;
   brand hues and `{colors.action}` take `{colors.primary}` dark text; plain
   `{colors.action}` marks selection, focus rings, and accents.
3. Default composition: `{colors.surface}` field, `{colors.primary}` ink and
   CTAs, `{colors.surface-variant}` tiles, one brand-hue accent moment per
   section, `{colors.action}` only inside product-style UI.
4. Pick one density per surface: airy marketing
   (`{spacing.2xl}`-`{spacing.3xl}` gaps, `{typography.display}` headlines)
   or dense panels (`{spacing.sm}` insets, `{typography.label}` text,
   `{colors.border}` hairlines).
5. Use Inter and JetBrains Mono (both open); the proprietary grotesk is named
   in prose only and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
