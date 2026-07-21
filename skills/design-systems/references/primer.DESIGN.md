---
version: alpha
name: Primer
description: GitHub's design system — a calm, utilitarian language for developer tools, led by GitHub blue.
colors:
  primary: "#1F883D"
  on-primary: "#FFFFFF"
  accent: "#0969DA"
  on-accent: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#1F2328"
  surface-variant: "#F6F8FA"
  on-surface-variant: "#59636E"
  border: "#D1D9E0"
  emphasis: "#25292E"
  on-emphasis: "#FFFFFF"
  danger: "#CF222E"
  attention: "#9A6700"
typography:
  display:
    fontFamily: Mona Sans
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Mona Sans
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  heading:
    fontFamily: Mona Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  subheading:
    fontFamily: Mona Sans
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: Mona Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Mona Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Mona Sans
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 3px
  md: 6px
  lg: 12px
  full: 100px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-emphasis:
    backgroundColor: "{colors.emphasis}"
    textColor: "{colors.on-emphasis}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  well:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  link:
    textColor: "{colors.accent}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-attention:
    backgroundColor: "{colors.attention}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Primer is GitHub's design system for developer tools and code-centric products.
Its temperament is calm and utilitarian: a white canvas (`{colors.surface}`),
tight spacing, highly legible UI type, and GitHub's blue (`{colors.accent}`)
reserved for interaction. Colour is used sparingly and semantically, so dense,
text-heavy screens — file trees, diffs, issue lists, tables — stay readable.

Reach for Primer when you want a product that feels native to a developer's
workflow: information-dense, quiet, and precise.

## Colors

- **primary (`#1F883D`)** — the primary action colour (GitHub's green button);
  pair with `{colors.on-primary}`.
- **accent (`#0969DA`)** — GitHub blue for links, focus rings, and selection,
  on `{colors.on-accent}` where used as a fill.
- **surface (`#FFFFFF`) / surface-variant (`#F6F8FA`)** — canvas and a subtle
  inset for wells, code blocks, and secondary panels.
- **on-surface (`#1F2328`) / on-surface-variant (`#59636E`)** — primary and
  muted text.
- **border (`#D1D9E0`)** — the default hairline for controls and dividers.
- **emphasis (`#25292E`)** — neutral high-contrast surface for tooltips and
  counter/neutral buttons; use with `{colors.on-emphasis}`.
- **danger (`#CF222E`) / attention (`#9A6700`)** — destructive and warning
  states; keep them semantic.

All text pairings above meet WCAG AA against their stated backgrounds.

## Typography

Primer's UI face is **Mona Sans** (GitHub's open-source family, available on
Google Fonts — no substitution needed). Code uses **JetBrains Mono** here in
place of GitHub's system monospace stack (`ui-monospace`, SF Mono).

- **display / heading-lg / heading / subheading** — Mona Sans Semibold for the
  title hierarchy, from `{typography.display}` down to `{typography.subheading}`.
- **body / body-sm** — Mona Sans Regular for reading and dense UI text; body
  sits at `{typography.body}` with a 1.5 line height.
- **label** — Mona Sans Medium for form labels, table headers, and eyebrows.
- **code** — `{typography.code}` for inline code, snippets, and identifiers.

## Spacing & Layout

Spacing is a strict 4px base: `{spacing.xxs}` (4px) through `{spacing.md}`
(16px) to `{spacing.2xl}` (40px). Dense layouts lean on `{spacing.xs}`–
`{spacing.sm}` for control padding and list rows; `{spacing.lg}`–`{spacing.xl}`
separate sections. Prefer `{colors.border}` hairlines over heavy shadows for
structure.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}` text
  and `{rounded.md}` corners, for the main action.
- **button-secondary** — `{colors.surface}` with a `{colors.border}` outline and
  `{colors.on-surface}` label.
- **button-emphasis** — `{colors.emphasis}` with `{colors.on-emphasis}` text,
  for neutral high-contrast controls.
- **card / well** — `{colors.surface}` (card, `{rounded.lg}`) and
  `{colors.surface-variant}` (well, `{rounded.md}`), both padded `{spacing.md}`.
- **input** — `{colors.surface}` field, `{colors.border}` outline, `{rounded.md}`
  corners; focus uses a `{colors.accent}` ring.
- **link** — `{colors.accent}` text.
- **divider** — a 1px `{colors.border}` hairline.
- **badge-danger / badge-attention** — pill status chips in `{colors.danger}`
  and `{colors.attention}`.

## Motion

Motion is minimal and functional: quick 150–200ms transitions on hover, focus,
and disclosure; no ambient or decorative animation. Honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.accent}` for interaction and `{colors.primary}` for the
  main action; **don't** use them as decorative fills.
- **Do** rely on `{colors.border}` hairlines and whitespace; **don't** stack
  heavy shadows or gradients.
- **Do** keep `{colors.danger}` and `{colors.attention}` semantic; **don't**
  repurpose them as brand accents.
- **Do** use `{colors.on-surface-variant}` for muted text; **don't** drop text
  below AA contrast.
- **Do** set UI copy in Mona Sans and code in `{typography.code}`; **don't** mix
  families within a run.
- **Do** keep layouts dense but aligned to the 4px scale; **don't** invent
  off-scale spacing.

## Agent Prompt Guide

When generating UI in the Primer style:

1. Reference tokens by name (`{colors.accent}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` canvas → bordered cards and wells →
   one `button-primary` per view, `{colors.accent}` for links and focus.
4. Keep colour semantic: `{colors.primary}` for the main action,
   `{colors.danger}`/`{colors.attention}` for state only.
5. Use Mona Sans for UI and substitute a named open monospace for code; never
   ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
