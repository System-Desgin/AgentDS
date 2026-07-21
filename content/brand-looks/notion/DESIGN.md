---
version: alpha
name: Notion
description: Observed paper-white look of notion.com — warm near-black type, one sparing blue accent, soft corners, and muted callout tints.
colors:
  primary: "#1D72C9"
  primary-bright: "#2383E2"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#191918"
  on-surface-variant: "#767572"
  surface-variant: "#F1F1EF"
  surface-panel: "#F7F7F5"
  border-subtle: "#E9E9E7"
  border-strong: "#CFCDC9"
  tint-blue: "#E7F3F8"
  tint-yellow: "#FBF3DB"
  tint-red: "#FDEBEC"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 1.875rem
    fontWeight: 600
    lineHeight: 1.3
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
  sm: 4px
  md: 6px
  lg: 12px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  card:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 6px 10px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  menu-item:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  callout:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  badge-blue:
    backgroundColor: "{colors.tint-blue}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  badge-yellow:
    backgroundColor: "{colors.tint-yellow}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  badge-red:
    backgroundColor: "{colors.tint-red}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Notion Labs, Inc. All trademarks belong to
> their owners. Use as inspiration for an original system.

## Overview

This Brand Look describes the visual language observable on notion.com, its
product pages, and its help center. The site reads like paper: a warm white
field (`{colors.surface}`), a near-black warm-toned text colour
(`{colors.on-surface}`), and hierarchy carried almost entirely by warm grays
rather than by colour. Blue appears sparingly — buttons, links, selection — and
everything else stays quiet. Corners are softly rounded in the 4-6px range,
structure comes from faint warm hairlines and pale hover fills, and content
sits in generous document-like line lengths. Serif and handwritten illustration
accents appear in marketing artwork, but the UI itself stays in one restrained
sans.

## Colors

- **surface (`#FFFFFF`) / surface-panel (`#F7F7F5`)** — the paper-white page
  field and the slightly warm off-white observed on marketing cards, panels,
  and the app sidebar.
- **on-surface (`#191918`)** — the warm near-black used for body copy and
  headings; it measures about 17.6:1 on `{colors.surface}`.
- **on-surface-variant (`#767572`)** — the warm secondary gray for captions,
  placeholders, and metadata; the site's observed secondary gray sits in this
  family, and this value holds 4.6:1 on `{colors.surface}` for WCAG AA.
- **surface-variant (`#F1F1EF`)** — the pale warm fill that appears on hover
  rows, default callouts, and quiet gray blocks.
- **primary (`#1D72C9`) / primary-bright (`#2383E2`)** — two members of the
  observed blue family. `{colors.primary-bright}` is the brighter blue seen on
  focus rings, selection tints, and large accents, but it measures about 3.9:1
  on white; `{colors.primary}` is the deepened member these tokens use for
  link text and button fills, holding 4.9:1 with `{colors.on-primary}`.
- **border-subtle (`#E9E9E7`) / border-strong (`#CFCDC9`)** — warm hairlines
  for dividers and the firmer outline observed on inputs and secondary
  buttons.
- **tint-blue (`#E7F3F8`) / tint-yellow (`#FBF3DB`) / tint-red (`#FDEBEC`)** —
  representative members of the muted block palette used behind callouts and
  tag chips; gray, brown, orange, green, purple, and pink tints in the same
  soft register are also observable. Text on tints stays
  `{colors.on-surface}`.

## Typography

The site sets UI and marketing copy in a system-style sans stack
(ui-sans-serif, -apple-system, Segoe UI-class fallbacks); **Inter** (SIL OFL,
Google Fonts) is the open stand-in used by these tokens. The editor also
offers serif and mono page styles for documents, and code renders in an SF
Mono/Consolas-style stack — **JetBrains Mono** (OFL) stands in for it here.

- **display (`{typography.display}`)** — bold page and hero titles with a
  slight negative tracking; large but never decorative.
- **heading-lg / heading (`{typography.heading-lg}`, `{typography.heading}`)**
  — semibold section headings that step down calmly; weight stays at 600
  rather than jumping to black weights.
- **body (`{typography.body}`)** — 16px-equivalent reading text at a 1.5 line
  height, set on long document-like measures.
- **body-sm (`{typography.body-sm}`)** — 14px-equivalent for sidebar items,
  table cells, and dense UI copy.
- **label (`{typography.label}`)** — 12px medium for section labels, property
  names, and small UI captions.
- **code (`{typography.code}`)** — monospace for inline code and code blocks.

Hierarchy is deliberately soft: most contrast between levels comes from size
and the gray step from `{colors.on-surface}` to `{colors.on-surface-variant}`,
not from colour or heavy weights.

## Spacing & Layout

Spacing follows a 4/8 rhythm: `{spacing.xxs}` and `{spacing.xs}` inside chips
and menu rows, `{spacing.sm}` to `{spacing.md}` for control padding and block
gaps, `{spacing.lg}` and `{spacing.xl}` for card interiors and grouped
sections, and `{spacing.2xl}` to `{spacing.3xl}` for the airy marketing
sections. Documents sit in a centered column with wide margins and generous
line lengths; density comes from tight vertical block spacing, not from
cramped type. Panels separate with `{colors.border-subtle}` hairlines or the
one-step warm lift to `{colors.surface-panel}` — shadows are faint and rare.

## Components

- **button-primary** — solid `{colors.primary}` fill, `{colors.on-primary}`
  text, `{rounded.md}` corners, compact 6px vertical padding; on the site
  primary CTAs are the main place the blue family reads as a fill.
- **button-secondary** — `{colors.surface}` fill with `{colors.on-surface}`
  text and a `{colors.border-strong}` hairline edge.
- **card** — the warm `{colors.surface-panel}` panel seen on marketing
  feature cards, with `{rounded.lg}` corners and `{spacing.lg}` interior
  padding; the app sidebar shares this off-white tone.
- **field** — the gray-tinted input: `{colors.surface-variant}` fill,
  `{colors.on-surface}` text, `{rounded.md}` corners, a
  `{colors.border-strong}` edge, and the `{colors.primary-bright}` focus ring
  on interaction.
- **link** — `{colors.primary}` text; in-document links on the site often
  render as underlined body text instead, with blue reserved for navigation
  and marketing links.
- **helper-text** — `{colors.on-surface-variant}` secondary text at
  `{typography.label}`, kept on `{colors.surface}` backgrounds.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  and `{colors.border-strong}`.
- **menu-item** — the signature hover row: a `{colors.surface-variant}` fill
  that appears on hover, `{rounded.sm}` corners, and `{colors.on-surface}`
  text.
- **callout** — the quiet block: `{colors.surface-variant}` by default, with
  `{colors.tint-blue}` and the other block-palette tints for coloured
  variants, always under `{colors.on-surface}` text.
- **badge-blue / badge-yellow / badge-red** — tag chips on muted tints with
  `{colors.on-surface}` text and `{rounded.sm}` corners; the observed tag
  palette spans the full gray-to-red block family.

## Motion

Motion on the site is minimal and functional: quick fades and
background-color transitions on hover rows and buttons, gentle reveals on
marketing scroll, and no looping or bouncing animation in functional UI. Keep
transitions at roughly 150-250ms, prefer opacity and background fades over
movement, and honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep the page paper-white (`{colors.surface}`) with warm grays doing
  the hierarchy work; **don't** introduce cool blue-grays — the warmth is the
  look.
- **Do** use the blue family sparingly: `{colors.primary}` for links and
  primary fills, `{colors.primary-bright}` for focus and selection; **don't**
  set `{colors.primary-bright}` as body-size text on `{colors.surface}` — it
  measures below AA.
- **Do** show interaction with the pale `{colors.surface-variant}` hover
  fill; **don't** use heavy shadows, outlines, or colour shifts for hover
  states.
- **Do** keep corners soft in the `{rounded.sm}` to `{rounded.md}` range;
  **don't** go sharp-cornered or fully pill-shaped on functional controls.
- **Do** set long, document-like line lengths with a calm 1.5 line height;
  **don't** compress copy into narrow app-style columns.
- **Do** put `{colors.on-surface}` text on callout and tag tints; **don't**
  colour the text to match the tint — the site keeps text near-black on
  coloured blocks.
- **Do** confine serif and handwritten flavour to illustration and editor
  page styles; **don't** mix those families into functional UI chrome.
- **Do** keep weights in the 400-700 band with semibold headings; **don't**
  use black weights or tracked-out uppercase headings.

## Agent Prompt Guide

When generating UI in this Notion-inspired look:

1. Reference tokens by name (`{colors.surface}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1: use
   `{colors.primary}` for blue text and button fills, keep
   `{colors.primary-bright}` for focus and selection, and keep secondary text
   in `{colors.on-surface-variant}` on white only.
3. Default composition: `{colors.surface}` page, `{colors.surface-panel}`
   cards and sidebar, `{colors.border-subtle}` hairlines, hover rows in
   `{colors.surface-variant}`, one `button-primary` per view.
4. Set type in Inter at `{typography.body}` with document-like measures; code
   in `{typography.code}`; note the original system-sans stack in prose only —
   never ship proprietary font binaries.
5. Use the block-palette tints (`{colors.tint-blue}`,
   `{colors.tint-yellow}`, `{colors.tint-red}`) only as fills under
   `{colors.on-surface}` text.
6. This is an independent Brand Look for inspiration — do not present output
   as Notion's official design system, and propose missing tokens in a PR
   rather than inventing values.
