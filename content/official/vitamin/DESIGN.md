---
version: alpha
name: Vitamin
description: Decathlon's design system — energetic sport-retail UI led by a saturated brand blue, an accent yellow, and friendly rounded controls.
colors:
  primary: "#007DBC"
  on-primary: "#FFFFFF"
  action: "#00699D"
  accent: "#FFE928"
  surface: "#FFFFFF"
  surface-secondary: "#F7F8F9"
  surface-tertiary: "#EFF1F3"
  on-surface: "#001018"
  on-surface-secondary: "#4E5D6B"
  on-surface-tertiary: "#687787"
  border: "#D9DDE1"
  positive: "#23A942"
  warning: "#FF600A"
  negative: "#E32630"
typography:
  display:
    fontFamily: Roboto
    fontSize: 3.75rem
    fontWeight: 700
    lineHeight: 1
  heading-lg:
    fontFamily: Roboto
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.1
  heading:
    fontFamily: Roboto
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.14
  body:
    fontFamily: Roboto
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.42
  label:
    fontFamily: Roboto
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.34
  code:
    fontFamily: Roboto Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  pill: 32px
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
    padding: 14px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.action}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
  button-conversion:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 12px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  link:
    textColor: "{colors.action}"
  helper-text:
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.on-surface-tertiary}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  status-positive:
    textColor: "{colors.positive}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  price-discount:
    backgroundColor: "{colors.negative}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

## Overview

Vitamin is Decathlon's design system for sport and retail products. Its
character is energetic and approachable: a clean white field, a saturated brand
blue (`{colors.primary}`) for actions, a loud accent yellow (`{colors.accent}`)
reserved for conversion moments, and a blue-tinted near-black
(`{colors.on-surface}`) that keeps text high-contrast without feeling harsh.
Corners are softly rounded, chips go full pill, and the layout breathes on a
4px-based spacing scale.

Reach for Vitamin when building consumer commerce: product listings, checkout
flows, campaign pages, and mobile-first storefronts that should feel active and
friendly rather than corporate.

## Colors

- **primary (`#007DBC`)** — the Decathlon brand blue for primary buttons and
  brand surfaces; pair with `{colors.on-primary}`.
- **action (`#00699D`)** — a darker blue for links and interactive text on
  light surfaces; it reads more comfortably than `{colors.primary}` at small
  sizes.
- **accent (`#FFE928`)** — the conversion yellow. Vitamin uses it as a fill
  behind `{colors.on-surface}` text for its highest-priority commercial call to
  action; never use it as a text colour.
- **surface (`#FFFFFF`) / surface-secondary (`#F7F8F9`) / surface-tertiary
  (`#EFF1F3`)** — the white field and two cool-grey layers for page sections
  and quiet panels.
- **on-surface (`#001018`) / on-surface-secondary (`#4E5D6B`) /
  on-surface-tertiary (`#687787`)** — primary, secondary, and tertiary text on
  light surfaces.
- **border (`#D9DDE1`)** — hairlines, dividers, and the 2px secondary-button
  outline.
- **positive (`#23A942`) / warning (`#FF600A`) / negative (`#E32630`)** — the
  semantic set. Negative passes AA as text on white and doubles as the
  discount red in pricing. Positive and warning clear only the 3:1
  large-text/UI threshold on white, so keep them to icons, bold short labels,
  and borders, with body copy in `{colors.on-surface}`.

## Typography

Vitamin sets everything in **Roboto**, with **Roboto Condensed Bold** for the
two hero display styles on decathlon.design; both families are free Google
Fonts, so no substitution is needed. The tokens here carry Roboto throughout —
switch `{typography.display}` to Roboto Condensed when your target can load it.

- **display (`{typography.display}`)** — 3.75rem bold, line height 1, for hero
  and campaign headlines; condensed in the source system.
- **heading-lg / heading** — Roboto Bold at `{typography.heading-lg}` and
  `{typography.heading}` for page and section titles.
- **body / body-sm** — Roboto Regular; `{typography.body}` for reading text,
  `{typography.body-sm}` for dense product and cart rows.
- **label (`{typography.label}`)** — captions, helper text, and badges.
- **code (`{typography.code}`)** — Roboto Mono; Vitamin defines no monospace
  face, so this is the open companion for technical snippets.

Only two weights exist in the system: 400 and 700. Emphasis comes from weight
and size, not from intermediate weights.

## Spacing & Layout

Spacing steps are multiples of 4px: `{spacing.xxs}` (4px) and `{spacing.xs}`
(8px) inside controls, `{spacing.sm}` (12px) and `{spacing.md}` (16px) for
control and card padding, `{spacing.lg}` (24px) through `{spacing.3xl}` (64px)
for section rhythm. Cards and inputs keep `{rounded.sm}`–`{rounded.md}`
corners; chips and filters use the `{rounded.pill}` radius. Structure comes
from `{colors.border}` hairlines and the grey surface layers, not from heavy
shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, `{rounded.sm}` corners, and roomy 14px 24px padding.
- **button-secondary** — `{colors.surface}` with a 2px `{colors.border}` inset
  outline and a `{colors.action}` label.
- **button-conversion** — the signature Decathlon move: an `{colors.accent}`
  fill with `{colors.on-surface}` text for the single strongest commercial
  action on a screen.
- **card** — `{colors.surface}` on `{rounded.md}` corners with `{spacing.md}`
  padding, outlined by `{colors.border}`.
- **field** — white input with `{rounded.sm}` corners and a `{colors.border}`
  outline that turns `{colors.primary}` when active.
- **chip** — pill-shaped (`{rounded.pill}`) filter and selection control.
- **link** — `{colors.action}` text; visited links shift purple in the source
  system.
- **helper-text / caption** — `{colors.on-surface-secondary}` and
  `{colors.on-surface-tertiary}` secondary text.
- **divider** — 1px `{colors.border}` hairline.
- **status-positive / status-warning** — `{colors.positive}` and
  `{colors.warning}` for stock and availability indicators: icons and bold
  short labels, not body copy.
- **price-discount** — `{colors.negative}` fill with `{colors.on-primary}`
  text for promotional prices; the same `{colors.negative}` is the error text
  colour for form validation.

## Motion

Vitamin's motion tokens are brief and functional: a 200ms ease-out transition
on focus rings, 200-500ms fade and slide entrances for alerts and overlays,
and shimmer or indeterminate loops for loading states. Keep motion under half
a second, use it to confirm actions rather than decorate, and honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** reserve `{colors.accent}` for one conversion action per screen;
  **don't** scatter yellow across cards, icons, or text.
- **Do** use `{colors.action}` for links and interactive text; **don't** set
  small text in `{colors.primary}` on grey surfaces.
- **Do** keep `{colors.positive}` and `{colors.warning}` to icons, borders,
  and bold large labels; **don't** set them as small body text on white —
  they clear only the 3:1 large-text threshold.
- **Do** stay on the 4px spacing scale; **don't** invent in-between gaps.
- **Do** use `{rounded.pill}` for chips and `{rounded.sm}`–`{rounded.md}` for
  buttons and cards; **don't** mix radically different radii in one cluster.
- **Do** set headlines in Roboto Bold (condensed for hero display); **don't**
  introduce intermediate font weights — the system only ships 400 and 700.
- **Do** separate content with `{colors.border}` hairlines and grey surfaces;
  **don't** stack drop shadows on white cards.
- **Do** keep `{colors.negative}` consistent between errors and discount
  pricing; **don't** repurpose it as a decorative red.

## Agent Prompt Guide

When generating UI in the Vitamin style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; use
   `{colors.positive}` and `{colors.warning}` only for icons and large or
   bold labels on white — never for body text.
3. Default composition: `{colors.surface}` page → `{colors.surface-secondary}`
   sections → white cards on `{rounded.md}` corners → one `button-primary`,
   and at most one `button-conversion` for the commercial highlight.
4. Use `{colors.action}` for links, `{colors.negative}` for both errors and
   discount pricing, and keep spacing on the 4px scale.
5. Set text in Roboto (400/700 only) with Roboto Condensed as the optional
   display face — both are free Google Fonts; never ship proprietary binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
