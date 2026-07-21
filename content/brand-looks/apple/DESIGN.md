---
version: alpha
name: Apple
description: Apple's publicly observable web look, alternating vast white and near-black sections around product photography, with big tightly tracked type, blue pill CTAs, and hairline gray precision.
colors:
  primary: "#1D1D1F"
  on-primary: "#F5F5F7"
  accent: "#0071E3"
  on-accent: "#FFFFFF"
  link: "#0066CC"
  surface: "#FFFFFF"
  surface-tint: "#F5F5F7"
  on-surface: "#1D1D1F"
  on-surface-variant: "#6E6E73"
  border: "#D2D2D7"
  promo: "#B64400"
  success: "#008009"
  error: "#E30000"
typography:
  display:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.015em
  heading-lg:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.14
  body:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.47
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.33
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 12px
  lg: 18px
  full: 980px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 48px
  2xl: 80px
  3xl: 120px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.full}"
    padding: 12px 22px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
    rounded: "{rounded.full}"
    padding: 12px 22px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  panel-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  footnote:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-new:
    textColor: "{colors.promo}"
    typography: "{typography.label}"
  status-available:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
---

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by Apple Inc. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

Apple's public site is premium minimalism: vast white sections in
`{colors.surface}` alternate with near-black bands in `{colors.primary}`, and
product photography is the visual protagonist in both. Copy is short and set
large; text reads as near-black `{colors.on-surface}` on white or quiet gray
`{colors.surface-tint}` fields. A single blue family carries interaction:
`{colors.link}` for text links and `{colors.accent}` for pill-shaped CTA
fills. Structure comes from hairline `{colors.border}` dividers, not shadows
or boxes.

Reach for this look when a product page should feel premium and confident:
one product per section, one message per screen, and nothing decorative
competing with the photography.

## Colors

- **surface (`#FFFFFF`) / surface-tint (`#F5F5F7`)** — the two light fields;
  white for hero sections, the quiet gray for store modules and footers.
- **primary (`#1D1D1F`)** — the near-black band used for alternating dark
  hero sections; text on it is `{colors.on-primary}`, the same quiet gray
  the light field uses.
- **on-surface (`#1D1D1F`) / on-surface-variant (`#6E6E73`)** — headlines and
  body read near-black; captions and secondary copy read mid-gray.
- **accent (`#0071E3`)** — the observed fill of pill CTA buttons ("Buy"-style
  actions); pair only with `{colors.on-accent}`.
- **link (`#0066CC`)** — the darker blue of inline text links and
  "Learn more"-style arrows; it passes AA on both light fields.
- **border (`#D2D2D7`)** — hairline dividers, input outlines, and the rules
  between footer columns.
- **promo (`#B64400`) / success (`#008009`) / error (`#E30000`)** — the small
  orange "New" flag on product tiles, availability text in the store flow,
  and form-error red; all read as text on light fields, never as fills.

Contrast notes: `{colors.on-accent}` on `{colors.accent}` measures 4.70:1,
which passes WCAG AA for normal text but only narrowly — keep accent fills
to short button labels. The darker `{colors.link}` measures 5.57:1 on white
and 5.11:1 on `{colors.surface-tint}`, so it is the anchor for link text.

## Typography

Every level on the site is set in SF Pro, Apple's proprietary family; these
tokens substitute **Inter** (open, Google Fonts). Code is not prominent on
the observed pages; **JetBrains Mono** stands in for the rare monospace.

- **display (`{typography.display}`)** — the product headline voice: very
  large, semibold, tightly tracked, often just a product name and one line.
- **heading-lg / heading** — section titles step down through
  `{typography.heading-lg}` and `{typography.heading}`, keeping the negative
  tracking as sizes grow.
- **body (`{typography.body}`)** — reading copy sits at 17px with a roomy
  1.47 line height; **body-sm (`{typography.body-sm}`)** covers captions and
  store metadata.
- **label (`{typography.label}`)** — the small print: footnotes, legal
  strings, and the tiny "New" flag above tile headlines.
- **code (`{typography.code}`)** — included for completeness; the observed
  pages barely use monospace.

## Spacing & Layout

Sections are generous and centered: full-bleed bands separated by
`{spacing.2xl}` to `{spacing.3xl}` of vertical air, with the headline block
and photography sharing one axis. Inside modules the rhythm tightens through
`{spacing.md}` and `{spacing.lg}`; tile grids sit close together on
`{spacing.sm}` gutters so the colored bands read as a mosaic. Content columns
are narrow and centered — copy rarely runs wide — and the layout collapses
to a single column on small screens without changing its voice.

## Components

- **button-primary** — an `{colors.accent}` pill (`{rounded.full}`) with a
  short `{colors.on-accent}` label; the observed hover state darkens the
  fill slightly.
- **button-secondary** — a `{colors.surface}` pill with a `{colors.link}`
  label, used as the quieter partner of a primary CTA.
- **card** — a `{colors.surface}` tile with `{rounded.lg}` corners on a
  `{colors.surface-tint}` field; store cards lean on photography and a
  headline rather than borders.
- **panel-dark** — the `{colors.primary}` band with `{colors.on-primary}`
  text for alternating dark heroes; CTAs inside it keep the same blue pills.
- **field** — a white input with a `{colors.border}` outline,
  `{rounded.md}` corners, and a blue focus ring.
- **link** — `{colors.link}` text, usually trailed by a chevron; underline
  appears on hover only.
- **helper-text / footnote** — `{colors.on-surface-variant}` copy in
  `{typography.body-sm}` and `{typography.label}` for captions, disclaimers,
  and the numbered legal notes at the page foot.
- **divider** — 1px `{colors.border}` hairlines between footer sections and
  spec rows.
- **badge-new** — the `{colors.promo}` "New" flag in `{typography.label}`,
  sitting above a tile headline.
- **status-available / status-error** — store availability text in
  `{colors.success}` and form validation text in `{colors.error}`.

## Motion

Motion is restrained and scroll-driven: product imagery fades and rises as
sections enter the viewport, and flagship product pages scrub photographic
sequences to scroll position. Transitions elsewhere are short opacity and
transform eases; nothing loops or blinks. Honour `prefers-reduced-motion` by
replacing scroll-scrubbed sequences with static frames and dropping reveals.

## Do's and Don'ts

- **Do** let photography carry each section with one short headline;
  **don't** stack competing messages in a single band.
- **Do** alternate `{colors.surface}` and `{colors.primary}` sections for
  rhythm; **don't** place two near-black bands back to back.
- **Do** keep `{colors.accent}` for pill CTA fills and `{colors.link}` for
  text links; **don't** use blue as a heading or decorative color.
- **Do** use `{rounded.full}` pills for buttons and `{rounded.lg}` for
  cards; **don't** mix pill and square buttons in one view.
- **Do** track display type tight (`{typography.display}`) and keep body at
  `{typography.body}`; **don't** set long copy in display sizes.
- **Do** separate content with `{colors.border}` hairlines and whitespace;
  **don't** add drop shadows or visible boxes around sections.
- **Do** keep `{colors.promo}`, `{colors.success}`, and `{colors.error}` as
  small text accents; **don't** use them as fills or large surfaces.
- **Do** hold section spacing at `{spacing.2xl}`-`{spacing.3xl}`; **don't**
  compress the page to dashboard density.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.accent}`, `{spacing.2xl}`,
   `{typography.display}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; note that
   `{colors.on-accent}` on `{colors.accent}` passes narrowly at 4.70:1, so
   keep accent fills to short button labels and use `{colors.link}` for all
   link text.
3. Default composition: a white `{colors.surface}` hero, a `{colors.primary}`
   dark band, then `{colors.surface-tint}` store modules — one headline, one
   image, and at most two pill CTAs per section.
4. Set headlines in `{typography.display}` or `{typography.heading-lg}` with
   tight tracking, body in `{typography.body}`, and legal text in
   `{typography.label}`.
5. Use Inter (and JetBrains Mono if code appears) — the observed SF Pro is
   proprietary, named in prose only, and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
