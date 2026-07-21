---
version: alpha
name: Linear
description: Observed dark-first look of linear.app — near-black surfaces, one muted indigo accent, hairline structure, compact Inter type.
colors:
  primary: "#5E6AD2"
  on-primary: "#FFFFFF"
  primary-bright: "#828FFF"
  surface: "#08090A"
  on-surface: "#F7F8F8"
  surface-variant: "#141516"
  on-surface-variant: "#8A8F98"
  border-subtle: "#23252A"
  border-strong: "#34363C"
  success: "#4CB782"
  warning: "#F2C94C"
  error: "#EB5757"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.3125rem
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.33
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
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
  xl: 40px
  2xl: 64px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  link:
    textColor: "{colors.primary-bright}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  kbd:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
    typography: "{typography.code}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 10px
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Linear Orbit, Inc. All trademarks belong to
> their owners. Use as inspiration for an original system.

## Overview

This Brand Look describes the visual language observable on linear.app and its
features and method pages. The site presents dark-first: a deep near-black
field (`{colors.surface}`), soft off-white text (`{colors.on-surface}`), and a
single muted indigo-violet accent (`{colors.primary}`) doing all the brand work.
Structure comes from hairline borders at very low contrast and faint glass and
glow effects, not from shadows or bright fills. Type is compact, tightly
tracked, and disciplined about hierarchy; motion is minimal.

Tokens here model the dark presentation, matching the site's default. The site
also shows light surfaces in places, but the dark set is what reads as the
signature look and is what these values keep WCAG-AA consistent.

## Colors

- **surface (`#08090A`) / surface-variant (`#141516`)** — the near-black page
  field and the slightly lifted panel tone used for cards, inputs, and chips.
- **on-surface (`#F7F8F8`) / on-surface-variant (`#8A8F98`)** — soft white for
  primary text and a cool gray for secondary text; both pass WCAG AA on either
  surface.
- **primary (`#5E6AD2`)** — the muted indigo-violet accent seen on primary
  buttons and brand moments; used as a fill with `{colors.on-primary}` text.
- **primary-bright (`#828FFF`)** — the lighter indigo used where the accent
  must read as text or a link on dark; `{colors.primary}` itself is a fill
  colour, not a text colour, on these surfaces.
- **border-subtle (`#23252A`) / border-strong (`#34363C`)** — solid equivalents
  of the site's low-alpha hairlines; subtle for structure, strong for
  interactive outlines.
- **success (`#4CB782`) / warning (`#F2C94C`) / error (`#EB5757`)** — the
  status family observed in product imagery; all read as text on
  `{colors.surface}` at AA or better.

## Typography

The site sets UI and marketing copy in **Inter Variable**; Inter is on Google
Fonts under the SIL OFL, so the tokens use Inter directly with no substitution.
Monospaced type appears in keyboard hints and technical snippets; **JetBrains
Mono** (OFL) is the open stand-in used here.

- **display (`{typography.display}`)** — large, semibold, tightly tracked
  (-0.02em) with a 1.1 line height; headlines read dense, not airy.
- **heading-lg / heading** — the same semibold voice stepping down to
  `{typography.heading}` for section and card titles.
- **body (`{typography.body}`)** — compact 15px-equivalent reading text with a
  relaxed 1.6 line height.
- **body-sm / label** — 13px and 12px sizes for dense UI copy, captions, and
  small labels; label carries a medium weight instead of extra size.
- **code (`{typography.code}`)** — monospace for shortcuts, identifiers, and
  snippets.

Hierarchy discipline is the point: weight stays in a narrow 400-600 band and
contrast between levels comes from size and colour, not from heavy weights.

## Spacing & Layout

Spacing follows a 4/8 rhythm: `{spacing.xxs}` and `{spacing.xs}` for chip and
icon insets, `{spacing.sm}` through `{spacing.md}` for control padding,
`{spacing.lg}` for card interiors, and `{spacing.xl}` through `{spacing.3xl}`
for the generous section gaps the marketing pages use. Content sits in a
narrow centered column with wide dark margins. Panels separate from the field
with `{colors.border-subtle}` hairlines and a one-step lift to
`{colors.surface-variant}` — never with heavy drop shadows.

## Components

- **button-primary** — solid `{colors.primary}` fill, `{colors.on-primary}`
  text, `{rounded.md}` corners, compact 8px vertical padding.
- **button-secondary** — `{colors.surface-variant}` fill with
  `{colors.on-surface}` text and a `{colors.border-subtle}` hairline edge.
- **card** — `{colors.surface-variant}` panel, `{rounded.lg}` corners,
  `{spacing.lg}` interior; on the site these panels often carry a faint glass
  blur and inner glow.
- **field** — `{colors.surface-variant}` input with a `{colors.border-strong}`
  outline on focus plus the accent focus ring.
- **link** — `{colors.primary-bright}` text; underlines appear on hover, not at
  rest.
- **helper-text** — `{colors.on-surface-variant}` secondary text at
  `{typography.label}` for hints and captions.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}` and
  `{colors.border-strong}`.
- **kbd** — the signature keyboard-shortcut chip: `{colors.surface-variant}`
  fill, `{colors.on-surface-variant}` monospace glyph, `{rounded.sm}` corners.
- **status-success / status-warning / status-error** — status text in
  `{colors.success}`, `{colors.warning}`, and `{colors.error}`;
  **badge-primary** — a pill (`{rounded.full}`) in `{colors.primary}` with
  `{colors.on-primary}` text.

## Motion

Motion on the site is extremely restrained: short opacity and small transform
transitions on hover and reveal, with occasional slow ambient glows in hero
imagery. Nothing bounces and nothing loops in functional UI. Keep transitions
under roughly 200ms, prefer fades over movement, and honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the only brand colour, used sparingly on
  primary actions; **don't** spread indigo across headings, icons, and fills.
- **Do** use `{colors.primary-bright}` when the accent must read as text on
  dark; **don't** set `{colors.primary}` as body-size text on
  `{colors.surface}` — it lands below AA.
- **Do** build structure with `{colors.border-subtle}` hairlines and the
  one-step lift to `{colors.surface-variant}`; **don't** stack drop shadows or
  bright panels.
- **Do** track display type tight (-0.02em) and keep weights in the 400-600
  band; **don't** use heavy weights or loose letterspacing.
- **Do** keep body copy compact (`{typography.body}`, 15px-equivalent);
  **don't** inflate UI text sizes — density is part of the look.
- **Do** keep glass and glow effects faint and local to hero panels; **don't**
  blur or glow functional controls.
- **Do** reserve `{colors.success}` / `{colors.warning}` / `{colors.error}`
  for status; **don't** use them decoratively.
- **Do** show keyboard shortcuts as `kbd` chips in `{typography.code}`;
  **don't** write shortcuts inline as plain prose.

## Agent Prompt Guide

When generating UI in this Linear-inspired look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; on dark surfaces use
   `{colors.primary-bright}` for accent-coloured text and keep
   `{colors.primary}` for fills paired with `{colors.on-primary}`.
3. Default composition: `{colors.surface}` field, `{colors.surface-variant}`
   panels edged with `{colors.border-subtle}`, one `button-primary` per view.
4. Keep type compact and disciplined: Inter only, negative tracking on
   headings, weights 400-600, monospace confined to `{typography.code}`.
5. Keep motion under 200ms, fade-first, and honour `prefers-reduced-motion`.
6. This is an independent Brand Look for inspiration — do not present output
   as Linear's official design system, and propose missing tokens in a PR
   rather than inventing values.
