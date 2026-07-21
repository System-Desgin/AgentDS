---
version: alpha
name: Stripe
description: Stripe's publicly observable web look, with a blurple accent over deep navy and near-white fields, pill buttons, generous whitespace, and code-first docs.
colors:
  primary: "#0A2540"
  on-primary: "#FFFFFF"
  accent: "#635BFF"
  on-accent: "#FFFFFF"
  surface: "#FFFFFF"
  surface-tint: "#F6F9FC"
  on-surface: "#0A2540"
  on-surface-variant: "#425466"
  helper: "#596171"
  border: "#E3E8EE"
  success: "#0E6245"
  warning: "#983705"
  error: "#A41C4E"
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
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.06em
  code:
    fontFamily: Source Code Pro
    fontSize: 0.8125rem
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
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  panel-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  link:
    textColor: "{colors.accent}"
  eyebrow:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  code-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
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
---

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by Stripe, Inc. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

Stripe's public site pairs a single vivid blurple accent (`{colors.accent}`)
with two calm fields: near-white sections in `{colors.surface}` and
`{colors.surface-tint}`, and deep navy sections in `{colors.primary}`. The
hero animates a soft mesh gradient; everything after it is restrained. CTAs
are full pills, labels are tracked uppercase, whitespace is generous, and the
docs present code before prose on a grid of precise grays.

Reach for this look when a product should feel like modern financial
infrastructure: polished marketing surfaces up top, engineer-grade
documentation underneath.

## Colors

- **accent (`#635BFF`)** — the observed blurple used for primary CTAs, links,
  and eyebrow labels; pair fills with `{colors.on-accent}`.
- **primary (`#0A2540`)** — the deep navy seen in footers, dark feature
  sections, and docs code blocks; text on it is `{colors.on-primary}`.
- **surface (`#FFFFFF`) / surface-tint (`#F6F9FC`)** — alternating light
  section fields; the tint carries a faint blue cast.
- **on-surface (`#0A2540`) / on-surface-variant (`#425466`)** — headings read
  as navy, body copy as slate; **helper (`#596171`)** covers secondary docs
  text.
- **border (`#E3E8EE`)** — hairline dividers and card outlines on light
  sections.
- **success (`#0E6245`) / warning (`#983705`) / error (`#A41C4E`)** — darkened
  status text accents in the family the docs UI uses; all read as text on
  light surfaces.

Contrast notes: `{colors.on-accent}` on `{colors.accent}` measures about
4.7:1, which passes WCAG AA for normal text but sits close to the line, so
keep accent-filled controls to short bold labels. Accent text on
`{colors.surface-tint}` measures about 4.4:1 and fails AA; place accent text
on `{colors.surface}` only.

## Typography

Headings and UI copy on the site are set in a proprietary grotesk; these
tokens substitute **Inter** (open, Google Fonts). The docs code face is a
monospace stack; **Source Code Pro** stands in.

- **display (`{typography.display}`)** — the hero voice: large, bold, tightly
  tracked, and short. Headlines rarely run past two lines.
- **heading-lg / heading** — section titles step down through
  `{typography.heading-lg}` and `{typography.heading}` with the same negative
  tracking taper.
- **body (`{typography.body}`)** — marketing copy sits around 18px with a
  roomy 1.55 line height; **body-sm (`{typography.body-sm}`)** is the docs
  reading size.
- **label (`{typography.label}`)** — the tracked uppercase eyebrow that sits
  above headlines, usually in `{colors.accent}`.
- **code (`{typography.code}`)** — compact monospace for the code-first docs
  panels.

## Spacing & Layout

Sections breathe: vertical gaps between marketing sections sit at
`{spacing.2xl}` to `{spacing.3xl}`, with content blocks separated by
`{spacing.xl}`. Inside components the rhythm tightens to `{spacing.xs}`
through `{spacing.lg}`. Light and dark sections alternate full-bleed, often
split by a slanted edge; within a section, content holds to a centered column
with wide margins. Docs pages run a three-column layout: navigation, prose,
and a sticky code rail.

## Components

- **button-primary** — an `{colors.accent}` pill with a short
  `{colors.on-accent}` label and an arrow glyph; the observed hover state
  darkens the fill toward navy.
- **button-secondary** — a `{colors.surface}` pill with an `{colors.accent}`
  label for paired secondary CTAs.
- **card** — `{colors.surface}` on tinted sections, `{rounded.md}` corners,
  hairline `{colors.border}` edges, soft shadow.
- **panel-dark** — a `{colors.primary}` block with `{colors.on-primary}` text
  for feature callouts and stats; CTAs inside it flip to `{colors.surface}`
  pills with `{colors.primary}` labels.
- **field** — white input with a `{colors.border}` outline and
  `{rounded.sm}` corners; focus shows an accent ring.
- **link / eyebrow** — `{colors.accent}` text; eyebrows add
  `{typography.label}` tracking and uppercase.
- **helper-text** — `{colors.helper}` in `{typography.body-sm}` for captions
  and docs metadata.
- **divider** — 1px `{colors.border}` hairlines.
- **code-block** — the signature docs element: `{colors.primary}` background,
  light text, `{rounded.md}` corners, tabbed language switcher.
- **status-success / status-warning / status-error** — dark status text
  accents in `{typography.label}`.

## Motion

The hero canvas animates a slow, blended gradient of pinks, blues, and
violets; it is ambient, not interactive. Everything else moves briefly:
hover lifts on cards, arrow nudges on CTAs, and fade-up reveals on scroll,
all in the 150-300ms range. Honour `prefers-reduced-motion` by freezing the
gradient to a static frame and dropping reveals.

## Do's and Don'ts

- **Do** reserve `{colors.accent}` for CTAs, links, and eyebrows; **don't**
  flood whole sections with blurple.
- **Do** alternate `{colors.surface}`, `{colors.surface-tint}`, and
  `{colors.primary}` sections for rhythm; **don't** stack two dark sections
  back to back.
- **Do** keep accent text on `{colors.surface}` white; **don't** set accent
  text on `{colors.surface-tint}`, where it drops below AA.
- **Do** use `{rounded.full}` pills for buttons and `{rounded.md}` for cards;
  **don't** mix pill and square buttons in one view.
- **Do** keep headings navy (`{colors.on-surface}`) and body slate
  (`{colors.on-surface-variant}`); **don't** set long copy in the accent.
- **Do** lead developer content with a `code-block` panel; **don't** bury
  code below marketing prose.
- **Do** let sections breathe at `{spacing.2xl}`-`{spacing.3xl}`; **don't**
  compress the page to dashboard density.
- **Do** keep the animated gradient to the hero; **don't** animate ambient
  color elsewhere.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.accent}`, `{spacing.2xl}`,
   `{typography.display}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; note that
   `{colors.on-accent}` on `{colors.accent}` passes narrowly, and accent text
   belongs on `{colors.surface}` only.
3. Default composition: alternating `{colors.surface}` and
   `{colors.surface-tint}` sections, one `{colors.primary}` feature band, one
   `button-primary` pill per section.
4. Set headings in `{typography.display}`/`{typography.heading-lg}` with an
   `eyebrow` above, body in `{typography.body}`, and code in `code-block`
   panels.
5. Use Inter and Source Code Pro (both open); the site's proprietary grotesk
   is named in prose only and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
