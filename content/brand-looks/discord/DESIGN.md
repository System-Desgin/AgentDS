---
version: alpha
name: Discord
description: Observed dark-first look of discord.com — blurple actions on a layered near-black grey ramp, chunky rounded buttons, bold playful type.
colors:
  primary: "#5865F2"
  on-primary: "#FFFFFF"
  link: "#00A8FC"
  surface: "#313338"
  surface-variant: "#2B2D31"
  surface-sunken: "#1E1F22"
  neutral: "#4E5058"
  on-surface: "#DBDEE1"
  on-surface-variant: "#B5BAC1"
  muted: "#949BA4"
  border: "#3F4147"
  success: "#23A55A"
  warning: "#F0B232"
  error: "#F23F43"
  error-text: "#FA777C"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.375
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0.02em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  nav-item:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    padding: 6px 8px
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
    typography: "{typography.label}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.surface-sunken}"
    rounded: "{rounded.full}"
    padding: 2px 8px
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error-text}"
    typography: "{typography.label}"
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Discord Inc. All trademarks belong to their
> owners. Use as inspiration for an original system.

## Overview

This Brand Look describes the visual language observable on discord.com and its
download page, including the app presentation those pages showcase. The look is
dark-first and playful: a layered ramp of near-black greys builds depth without
shadows, soft off-white text (`{colors.on-surface}`) does the reading work, and
one saturated blue-violet accent (`{colors.primary}`) carries nearly every
primary action and brand moment. Buttons are chunky and friendly with
`{rounded.md}` corners, display type is very bold, and cartoon illustration
accents keep the mood light even on dark surfaces.

Tokens here model the dark presentation, which is the brand's default and
signature look; the site's occasional light sections are mentioned in prose
only.

## Colors

- **surface (`#313338`) / surface-variant (`#2B2D31`) / surface-sunken
  (`#1E1F22`)** — the three-step grey ramp observed across the site's app
  imagery: the main content field, the one-step-darker panel tone for sidebars
  and cards, and the deepest tone for rails, wells, and inline inputs. Depth
  comes from stepping down this ramp, not from shadows.
- **on-surface (`#DBDEE1`)** — the soft off-white used for body and chat-style
  text; headings push toward white for emphasis.
- **on-surface-variant (`#B5BAC1`) / muted (`#949BA4`)** — the cool grey
  secondary text family: the lighter grey for navigation labels and captions,
  the darker grey for timestamps, hints, and placeholder-style text. The muted
  grey sits at the WCAG AA threshold on `{colors.surface}` and reads more
  comfortably on the darker `{colors.surface-variant}` and
  `{colors.surface-sunken}`.
- **primary (`#5865F2`)** — the signature saturated blue-violet, used as a fill
  for primary buttons, brand badges, and selection moments, always with
  `{colors.on-primary}` text.
- **link (`#00A8FC`)** — the bright cyan-blue observed on inline links in
  chat-style content.
- **neutral (`#4E5058`)** — the mid-grey fill for secondary buttons and quiet
  controls.
- **border (`#3F4147`)** — low-contrast hairlines that separate panels and list
  regions.
- **success (`#23A55A`) / warning (`#F0B232`) / error (`#F23F43`)** — the
  status family observed in presence dots, badges, and alerts. Warning reads as
  text on the grey ramp; green and red do not, so green is used as a fill with
  dark text and red text routes through **error-text (`#FA777C`)**, the lighter
  red that passes AA on `{colors.surface}`.

## Typography

The site sets its copy in a proprietary rounded, bold-forward sans-serif
family; these tokens substitute **Inter** (SIL OFL, Google Fonts) and name the
original only generically, per the font-substitution policy. Monospace snippets
use **JetBrains Mono** (OFL) as the open stand-in.

- **display (`{typography.display}`)** — very bold (800) marketing headlines
  with tight 1.1 leading and slight negative tracking; the loud, playful voice
  of the hero sections.
- **heading-lg / heading** — bold section titles stepping down to
  `{typography.heading}` for card and panel titles.
- **body (`{typography.body}`)** — 16px-equivalent reading text with the
  compact 1.375 leading observed in chat-style content.
- **body-sm (`{typography.body-sm}`)** — 14px-equivalent for dense meta text.
- **label (`{typography.label}`)** — small, bold, tracked labels in the style
  of the app's uppercase category headers; pair with `{colors.muted}` or
  `{colors.on-surface-variant}`.
- **code (`{typography.code}`)** — monospace for inline code and snippets.

Weight does the hierarchy work: headings jump to 700-800 while body stays at
400, so contrast between levels is strong even at small sizes.

## Spacing & Layout

Spacing follows an 8px rhythm: `{spacing.xxs}` and `{spacing.xs}` for badge and
icon insets, `{spacing.sm}` for gaps inside controls and list rows,
`{spacing.md}` for card interiors, `{spacing.lg}` and `{spacing.xl}` for panel
padding, and `{spacing.2xl}`-`{spacing.3xl}` for the marketing pages' generous
section breaks. App-style layouts read as columns of the grey ramp side by
side: a `{colors.surface-sunken}` rail, a `{colors.surface-variant}` sidebar,
and a `{colors.surface}` content field, separated by `{colors.border}`
hairlines rather than shadows.

## Components

- **button-primary** — solid `{colors.primary}` fill, `{colors.on-primary}`
  text, chunky `{rounded.md}` corners; the pairing measures about 4.6:1, so
  keep labels at body size or larger and bold.
- **button-secondary** — `{colors.neutral}` fill with `{colors.on-primary}`
  text for quiet actions.
- **card** — `{colors.surface-variant}` panel with `{rounded.lg}` corners and
  `{spacing.md}` interior padding.
- **field** — a sunken input: `{colors.surface-sunken}` fill,
  `{colors.on-surface}` text, `{rounded.sm}` corners.
- **link** — `{colors.link}` text; underline on hover in chat-style content.
- **helper-text** — `{colors.muted}` at `{typography.label}` for hints and
  timestamps; prefer it on `{colors.surface-variant}` or darker.
- **caption** — `{colors.on-surface-variant}` at `{typography.body-sm}` for
  secondary descriptions.
- **divider** — 1px hairline in `{colors.border}`.
- **nav-item** — the sidebar list row: `{colors.surface-variant}` fill,
  `{colors.on-surface-variant}` label, `{rounded.sm}` corners; text brightens
  toward `{colors.on-surface}` on hover and selection.
- **badge-primary** — the small bot-style tag: `{colors.primary}` fill,
  `{colors.on-primary}` bold label, `{rounded.sm}` corners.
- **badge-success** — a `{rounded.full}` pill in `{colors.success}` with dark
  `{colors.surface-sunken}` text; green stays a fill, never body text.
- **status-warning / status-error** — status text in `{colors.warning}` and
  `{colors.error-text}`; the saturated `{colors.error}` itself is reserved for
  dots, fills, and destructive accents without text on them.

## Motion

Motion on the site is short and playful: quick hover and press transitions on
buttons, small scale and fade reveals on scroll, and the signature
shape-morphing hover treatment on app-style icons (circle easing into a rounded
square). Keep functional transitions under roughly 200ms, save the playful
moves for hero and empty states, and honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for primary actions, brand badges, and
  selection; **don't** flood panels and headings with the accent — the field
  stays grey.
- **Do** build depth by stepping down the ramp from `{colors.surface}` to
  `{colors.surface-variant}` to `{colors.surface-sunken}`; **don't** stack drop
  shadows to separate panels.
- **Do** keep buttons chunky with `{rounded.md}` corners and avatars fully
  round (`{rounded.full}`); **don't** sharpen corners — the look is friendly,
  not severe.
- **Do** route red text through `{colors.error-text}`; **don't** set
  `{colors.error}` or `{colors.success}` as normal-size text on the grey ramp —
  both land below WCAG AA.
- **Do** use `{colors.on-surface}` for long text runs; **don't** set body copy
  in pure white — the off-white is part of the softness.
- **Do** use `{typography.label}` bold tracked caps for section and category
  labels; **don't** use label styling for reading copy.
- **Do** keep illustration accents playful and local to heroes and empty
  states; **don't** decorate functional chat or settings UI with them.
- **Do** keep `{colors.muted}` on `{colors.surface-variant}` or darker where it
  clears AA comfortably; **don't** use it for long text on `{colors.surface}`,
  where it only just reaches the threshold.

## Agent Prompt Guide

When generating UI in this Discord-inspired look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1: red text uses
   `{colors.error-text}`, green is fill-only with `{colors.surface-sunken}`
   text, and `button-primary` labels stay body-size or larger and bold because
   the white-on-blurple pairing passes with a slim margin.
3. Default composition: a `{colors.surface}` content field beside
   `{colors.surface-variant}` panels and a `{colors.surface-sunken}` rail,
   `{colors.border}` hairlines between regions, one `button-primary` per view.
4. Keep geometry friendly: `{rounded.md}` buttons, `{rounded.lg}` cards,
   `{rounded.full}` avatars, and spacing on the 8px grid.
5. Set all UI text in Inter (the open substitute for the observed proprietary
   family) and code in `{typography.code}` — never ship proprietary font
   binaries.
6. This is an independent Brand Look for inspiration — do not present output as
   Discord's official design system, and propose missing tokens in a PR rather
   than inventing values.
