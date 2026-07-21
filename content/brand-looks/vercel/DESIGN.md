---
version: alpha
name: Vercel
description: The visual language observed on Vercel's public site — radical black-on-white monochrome with hairline borders and one electric blue.
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#FAFAFA"
  surface-muted: "#F2F2F2"
  on-surface: "#171717"
  on-surface-variant: "#666666"
  border: "#EAEAEA"
  border-strong: "#999999"
  accent: "#0070F3"
  error: "#EE0000"
  warning: "#F5A623"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.35
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 6px
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
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 10px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  link:
    textColor: "{colors.accent}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  code-block:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
    typography: "{typography.code}"
  status-info:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 10px
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Vercel Inc. All trademarks belong to their
> owners. Use as inspiration for an original system.

## Overview

The look observed across vercel.com, vercel.com/design, and nextjs.org is
radical monochrome. Pure black (`{colors.primary}`) and pure white
(`{colors.surface}`) do almost all the talking: black buttons and inverse
sections on a white field, near-black text (`{colors.on-surface}`), and a
precise gray ramp for everything in between. Depth comes from 1px
`{colors.border}` hairlines rather than shadows, corners sit at a restrained
6-8px, and one electric blue (`{colors.accent}`) marks links and info
accents. The triangle mark is the only ornament the pages allow themselves.

Reach for this look when building developer tools, consoles, or minimal
marketing pages that should feel fast, terse, and engineered.

## Colors

- **primary (`#000000`) / on-primary (`#FFFFFF`)** — the site's strongest
  voice: solid black CTAs, the footer, and full inverse hero sections, always
  with white text or the reverse.
- **surface (`#FFFFFF`) / surface-variant (`#FAFAFA`) / surface-muted
  (`#F2F2F2`)** — the white base field, the faintly gray secondary panel, and
  the slightly deeper fill seen behind code and hover states.
- **on-surface (`#171717`)** — body and heading text reads as near-black,
  the dark end of the public Geist gray ramp.
- **on-surface-variant (`#666666`)** — secondary copy, captions, and muted
  nav items; the mid-gray of the observed ramp.
- **border (`#EAEAEA`) / border-strong (`#999999`)** — the signature 1px
  hairline on cards, inputs, and table rows, and the darker gray that borders
  take on hover or focus. Neither is used as text.
- **accent (`#0070F3`)** — the one saturated color in regular rotation:
  links, info states, and occasional gradient moments on marketing pages.
- **error (`#EE0000`) / warning (`#F5A623`)** — the red and amber observed
  in validation and alerts; amber is a fill behind dark text, never text.

Black-on-white pairings are maximally contrasted by construction. The blue
and red text roles sit at roughly 4.5:1 on pure white, so they are used on
`{colors.surface}` only — not on the gray surfaces.

## Typography

The observed typefaces are **Geist Sans** and **Geist Mono**, Vercel's own
open-source families (SIL OFL). They are not on this catalog's preview
loader allow-list, so tokens substitute **Inter** for UI text and
**JetBrains Mono** for code; treat the metrics below as the observed scale.

- **display (`{typography.display}`) / heading-lg (`{typography.heading-lg}`)**
  — large, bold, and tightly tracked (-0.02em); hero headlines read terse and
  geometric, often just a few words.
- **heading (`{typography.heading}`)** — section titles at semibold weight.
- **body (`{typography.body}`) / body-sm (`{typography.body-sm}`)** — regular
  weight with a calm 1.5 line height; paragraphs stay short.
- **label (`{typography.label}`)** — small medium-weight text for form labels,
  nav items, and badges.
- **code (`{typography.code}`)** — monospace is a first-class citizen:
  install commands and file paths appear on nearly every page, set on
  `{colors.surface-muted}` fills.

## Spacing & Layout

Spacing observed on the site follows a 4px rhythm: `{spacing.xxs}` (4px) and
`{spacing.xs}` (8px) inside controls, `{spacing.sm}` (12px) to `{spacing.md}`
(16px) for control padding and gaps, `{spacing.lg}` (24px) for card padding,
and `{spacing.xl}` through `{spacing.3xl}` (32-64px) between page sections.
Layouts are centered, single-column or simple grids, with generous white
space and hairline `{colors.border}` rules doing the structural work that
other sites give to shadows and background tints.

## Components

- **button-primary** — solid `{colors.primary}` black with
  `{colors.on-primary}` text and `{rounded.sm}` corners; on hover the
  observed pattern inverts to white with a black border.
- **button-secondary** — white `{colors.surface}` with `{colors.on-surface}`
  text and a 1px `{colors.border}` hairline that darkens toward
  `{colors.border-strong}` on hover.
- **card** — flat white on white: `{colors.surface}` with a `{colors.border}`
  hairline and `{rounded.md}` corners; no drop shadow at rest.
- **field** — white input with a `{colors.border}` hairline; the border, not
  the fill, signals focus and error states.
- **link** — `{colors.accent}` text, plain black text with underline in some
  body contexts.
- **helper-text / caption** — `{colors.on-surface-variant}` secondary text.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and, for
  hovered or emphasized rows, `{colors.border-strong}`; the signature
  separators.
- **code-block** — `{colors.surface-muted}` fill, `{typography.code}` type,
  `{rounded.sm}` corners.
- **status-info / status-error** — `{colors.accent}` and `{colors.error}`
  label text on white surfaces.
- **badge-warning** — `{colors.warning}` pill with dark `{colors.on-surface}`
  text.

## Motion

Observed motion is minimal and quick: short opacity and transform
transitions on hover (borders darkening, buttons inverting) and subtle fades
on scroll-in for marketing sections. Keep transitions under about 200ms and
honor `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** let black and white carry the design; **don't** introduce brand
  colors beyond `{colors.accent}` blue and the two status hues.
- **Do** separate regions with 1px `{colors.border}` hairlines; **don't**
  stack drop shadows or tinted panels.
- **Do** keep corners at `{rounded.sm}`-`{rounded.md}` (6-8px); **don't**
  fully round buttons or cards — only badges use `{rounded.full}`.
- **Do** track large headings tight (-0.02em) and keep them short; **don't**
  set long decorative display copy.
- **Do** set commands and paths in `{typography.code}` on
  `{colors.surface-muted}`; **don't** style code as colorful hero art.
- **Do** keep `{colors.accent}` and `{colors.error}` text on white
  `{colors.surface}`; **don't** put them on gray surfaces — below 4.5:1.
- **Do** use warning amber as a fill behind `{colors.on-surface}` text;
  **don't** set `{colors.warning}` as text on white.
- **Do** use inverse black sections sparingly for heroes and footers;
  **don't** alternate black and white bands on every scroll.

## Agent Prompt Guide

When generating UI in this observed Vercel-like style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA 4.5:1; keep
   `{colors.accent}` and `{colors.error}` text on `{colors.surface}` white
   only.
3. Default composition: white `{colors.surface}` field, `{colors.border}`
   hairlines for structure, one black `button-primary` per view, blue
   reserved for links.
4. Corners at `{rounded.sm}` for controls and `{rounded.md}` for cards;
   spacing on the 4px rhythm.
5. Tokens use Inter / JetBrains Mono as stand-ins for the observed Geist
   Sans / Geist Mono; never ship font binaries you have not licensed.
6. This is an independent analysis of observable patterns — treat it as
   inspiration for an original system, not an official Vercel spec.
