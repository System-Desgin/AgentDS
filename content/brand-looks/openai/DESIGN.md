---
version: alpha
name: OpenAI
description: The visual language observed on OpenAI's public site — editorial monochrome minimalism with near-black pill CTAs on white and off-white fields.
colors:
  primary: "#0D0D0D"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#F7F7F8"
  surface-muted: "#ECECEC"
  on-surface: "#0D0D0D"
  on-surface-variant: "#5D5D5D"
  border: "#E6E6E6"
  border-strong: "#8E8E8E"
  accent: "#10A37F"
  success: "#077D55"
  warning: "#E8A33D"
  error: "#B42318"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-serif:
    fontFamily: Source Serif 4
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.8125rem
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
  lg: 16px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  link:
    textColor: "{colors.on-surface}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  code-block:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    typography: "{typography.code}"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  status-success:
    textColor: "{colors.success}"
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
> with, endorsed by, or sponsored by OpenAI. All trademarks belong to their
> owners. Use as inspiration for an original system.

## Overview

The look observed across openai.com and platform.openai.com/docs is editorial
monochrome minimalism. Marketing and blog pages set near-black
(`{colors.on-surface}`) text on white and off-white fields
(`{colors.surface}`, `{colors.surface-variant}`), with large airy headlines,
generous line lengths, and almost no chrome: no shadows, few borders, and
pill-shaped black CTAs (`{colors.primary}`) as the only heavy elements. The
docs side reads as a clean light developer UI in the same palette, where the
heritage green now appears only as a restrained accent (`{colors.accent}`)
rather than the button color. Imagery is abstract gradient art, which supplies
all of the color the UI itself withholds.

Reach for this look for editorial marketing pages, blogs, and developer
documentation that should feel calm, literary, and confident.

## Colors

- **primary (`#0D0D0D`) / on-primary (`#FFFFFF`)** — the near-black used for
  solid pill CTAs and inverse footer sections, always paired with white text
  or the reverse.
- **surface (`#FFFFFF`) / surface-variant (`#F7F7F8`)** — the white page field
  and the off-white panel tone observed behind cards, alternate sections, and
  the docs sidebar.
- **surface-muted (`#ECECEC`)** — the slightly deeper neutral seen behind code
  and hover states in the developer UI.
- **on-surface (`#0D0D0D`) / on-surface-variant (`#5D5D5D`)** — primary text
  is the same near-black as the CTAs; secondary copy, captions, and muted nav
  items sit at a mid gray.
- **border (`#E6E6E6`) / border-strong (`#8E8E8E`)** — quiet hairlines on
  inputs, tables, and dividers, with a darker gray for focused or hovered
  outlines and the occasional stronger rule. Neither is used as text.
- **accent (`#10A37F`)** — the heritage green, observed only in restrained
  moments (badges, small highlights). It is a fill behind dark text, never
  text itself: it reads at about 3.2:1 on white.
- **success (`#077D55`) / warning (`#E8A33D`) / error (`#B42318`)** — an
  AA-safe status set modeled for this look; observed status color on the
  public pages is sparse (see QA). Warning amber is a fill behind dark text.

Near-black on white and off-white is maximally contrasted by construction;
all text roles above pass WCAG AA on `{colors.surface}` and
`{colors.surface-variant}`.

## Typography

The observed typeface is a proprietary custom sans-serif, self-hosted by the
site; it is not redistributable, so tokens substitute **Inter** for UI and
editorial text and **JetBrains Mono** for code. Occasional serif-accented
editorial moments observed on feature and blog pages are modeled by
`{typography.display-serif}`, with **Source Serif 4** as the open stand-in.

- **display (`{typography.display}`)** — large medium-weight headlines,
  tightly tracked (-0.02em); hero copy is short, declarative, and surrounded
  by space.
- **display-serif (`{typography.display-serif}`)** — the restrained serif
  voice for editorial openers and pull quotes.
- **heading-lg (`{typography.heading-lg}`) / heading (`{typography.heading}`)**
  — section titles at medium weight, never bold-heavy.
- **body (`{typography.body}`)** — 1.125rem with a roomy 1.6 line height; the
  reading experience is the product on blog and research pages.
- **body-sm (`{typography.body-sm}`)** — dense supporting text in the docs UI.
- **label (`{typography.label}`)** — small medium-weight text for nav items,
  tags, and form labels.
- **code (`{typography.code}`)** — monospace for API snippets and model
  names, set on `{colors.surface-muted}` fills in the docs.

## Spacing & Layout

Spacing follows a 4px rhythm with unusually generous upper steps:
`{spacing.xxs}` (4px) and `{spacing.xs}` (8px) inside controls,
`{spacing.sm}` (12px) to `{spacing.md}` (16px) for control padding and gaps,
`{spacing.lg}` (24px) for card padding, and `{spacing.xl}` through
`{spacing.3xl}` (40-96px) between sections — the airiness is the signature.
Text columns keep a generous but bounded measure; layouts are centered and
single-column on editorial pages, with a fixed sidebar plus content column in
the docs. Structure comes from whitespace and the occasional
`{colors.border}` hairline, not from boxes or shadows.

## Components

- **button-primary** — a solid `{colors.primary}` pill (`{rounded.full}`)
  with `{colors.on-primary}` text; the single heavy element on any page.
- **button-secondary** — a white `{colors.surface}` pill with
  `{colors.on-surface}` text and a 1px `{colors.border}` hairline.
- **card** — `{colors.surface-variant}` off-white with `{rounded.lg}` corners
  and no shadow; gradient artwork often sits inside the card, not behind it.
- **field** — white input with a `{colors.border}` hairline and
  `{rounded.md}` corners; the border darkens toward `{colors.border-strong}`
  on focus.
- **link** — `{colors.on-surface}` text with an underline; links stay black
  and rely on the underline, not color.
- **helper-text** — `{colors.on-surface-variant}` secondary text for
  captions, form hints, and metadata.
- **divider / divider-strong** — 1px rules in `{colors.border}` and, rarely,
  `{colors.border-strong}`; the light hairline is the default.
- **code-block** — `{colors.surface-muted}` fill with `{typography.code}`
  text and `{rounded.md}` corners.
- **badge-accent** — the heritage green as a `{colors.accent}` pill behind
  dark `{colors.on-surface}` text.
- **status-success / status-error** — `{colors.success}` and
  `{colors.error}` label text on white surfaces.
- **badge-warning** — a `{colors.warning}` pill with dark
  `{colors.on-surface}` text.

## Motion

Observed motion is ambient and slow: gradient artwork drifts, images fade in
on scroll, and controls change with brief opacity transitions. The UI itself
barely moves — motion lives in the art. Keep interface transitions under
about 200ms and honor `prefers-reduced-motion`, pausing ambient artwork when
it is set.

## Do's and Don'ts

- **Do** let near-black on white carry the design; **don't** introduce brand
  colors beyond the restrained `{colors.accent}` green and the status set.
- **Do** keep CTAs as `{colors.primary}` pills with `{rounded.full}` corners;
  **don't** use squared-off or colored buttons.
- **Do** give sections `{spacing.xl}`-`{spacing.3xl}` of breathing room;
  **don't** compress editorial pages into dense grids.
- **Do** set body copy at `{typography.body}` with its 1.6 line height;
  **don't** shrink reading text below `{typography.body-sm}`.
- **Do** reserve `{typography.display-serif}` for occasional editorial
  moments; **don't** set whole pages in the serif voice.
- **Do** use `{colors.accent}` only as a fill behind `{colors.on-surface}`
  text; **don't** set the green as text — it fails AA on white.
- **Do** let abstract gradient art supply the color; **don't** tint surfaces,
  add shadows, or decorate the chrome itself.
- **Do** underline links in `{colors.on-surface}`; **don't** rely on color
  alone to mark them.

## Agent Prompt Guide

When generating UI in this observed OpenAI-like style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA 4.5:1; never use
   `{colors.accent}` or `{colors.warning}` as text — they are fills behind
   `{colors.on-surface}`.
3. Default composition: white `{colors.surface}` field, off-white
   `{colors.surface-variant}` cards, one black pill `button-primary` per
   view, underlined black links.
4. Keep type large and airy: `{typography.display}` heroes,
   `{typography.body}` reading text, sections separated by `{spacing.xl}` or
   more.
5. Tokens use Inter / JetBrains Mono as stand-ins for the site's proprietary
   custom sans; never ship font binaries you have not licensed.
6. This is an independent analysis of observable patterns — treat it as
   inspiration for an original system, not an official OpenAI spec.
