---
version: alpha
name: Pajamas
description: GitLab's design system — utilitarian DevOps-tool density on a calm neutral field, with a blue interactive accent and a 4px grid.
colors:
  primary: "#3A383F"
  on-primary: "#FFFFFF"
  action: "#1F75CB"
  link: "#2F5CA0"
  surface: "#FFFFFF"
  surface-subtle: "#FBFAFD"
  surface-strong: "#ECECEF"
  on-surface: "#3A383F"
  on-surface-subtle: "#626168"
  on-surface-strong: "#18171D"
  border: "#DCDCDE"
  control-border: "#89888D"
  success: "#108548"
  warning: "#AB6100"
  danger: "#DD2B0E"
typography:
  display:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.125
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.54
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.33
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.54
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  xl: 12px
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
    rounded: "{rounded.lg}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 8px 12px
  toggle-checked:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.control-border}"
    height: 1px
  badge-muted:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.on-surface-subtle}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  status-danger:
    textColor: "{colors.danger}"
    typography: "{typography.label}"
---

## Overview

Pajamas is GitLab's design system, shipped as resolved tokens in the
open-source @gitlab/ui library. Its character is utilitarian: a white field
(`{colors.surface}`), a cool near-black neutral ramp for dense dev-tool text,
14px body copy, and an action blue (`{colors.action}`) that marks focus,
selection, and strong actions. Status colors are tuned so success, warning,
and danger all pass WCAG AA as text on white — accessibility is part of the
system, not an afterthought.

Reach for Pajamas when building DevOps tooling, code-adjacent products, or
any data-heavy screen that should read as calm, technical, and legible.

## Colors

- **primary (`#3A383F`)** — what Pajamas calls the confirm button: the primary
  action fill in the current token build; pair with `{colors.on-primary}`
  white text.
- **action (`#1F75CB`)** — GitLab's action blue: focus rings, selected and
  checked controls, and strong confirm fills; **link (`#2F5CA0`)** is the
  darker blue reserved for text links.
- **surface (`#FFFFFF`) / surface-subtle (`#FBFAFD`) / surface-strong
  (`#ECECEF`)** — the base field, a barely-tinted subtle layer, and the strong
  gray used for muted chips and wells.
- **on-surface (`#3A383F`) / on-surface-subtle (`#626168`) / on-surface-strong
  (`#18171D`)** — the three-step text ramp: default copy, secondary copy, and
  headings or emphasized text.
- **border (`#DCDCDE`) / control-border (`#89888D`)** — quiet hairlines for
  layout, and the darker outline that makes inputs findable.
- **success (`#108548`) / warning (`#AB6100`) / danger (`#DD2B0E`)** — the
  green, orange, and red anchors of GitLab's status vocabulary.

GitLab's brand oranges (#FC6D26, #E24329) live in a separate brand constants
group in the token build; no semantic UI role points at them. Keep them for
logo and marketing moments, never for product controls.

## Typography

GitLab's product typeface is **GitLab Sans** with **GitLab Mono** for code.
Both are open fonts but neither is served by Google Fonts, so tokens carry
**Inter** and **JetBrains Mono** as loadable stand-ins — JetBrains Mono is
literally the first fallback in GitLab's own monospace stack.

- **display / heading-lg / heading** — Semibold 600 titles from
  `{typography.display}` (1.75rem, tight 1.125 line height) down to
  `{typography.heading}` (1.125rem); larger headings carry -0.01em tracking.
- **body (`{typography.body}`)** — 0.875rem at a 1.43 line height: the dense
  14px default that lets tables, diffs, and settings pages breathe without
  wasting rows.
- **body-sm / label** — 0.8125rem secondary copy and 0.75rem Semibold labels
  for form captions, table headers, and badges.
- **code (`{typography.code}`)** — 0.8125rem monospace for commits, pipelines,
  and snippets.

## Spacing & Layout

Pajamas runs on a 4px base grid exposed as a numbered spacing scale;
`{spacing.xxs}` (2px) and `{spacing.xs}` (4px) handle icon-tight insets,
`{spacing.sm}` (8px) through `{spacing.md}` (16px) pad controls and cells, and
`{spacing.lg}` (24px) to `{spacing.3xl}` (64px) separate sections. The default
corner radius is `{rounded.md}` (4px); buttons, inputs, cards, and alerts in
the current build round up to `{rounded.lg}` (8px). Structure dense screens
with `{colors.border}` hairlines, not shadows.

## Components

- **button-primary** — the confirm action: `{colors.primary}` fill with
  `{colors.on-primary}` text and `{rounded.lg}` corners.
- **button-secondary** — `{colors.surface}` fill with `{colors.on-surface}`
  text and a `{colors.control-border}`-style outline for secondary actions.
- **card / field** — white `{colors.surface}` blocks with `{rounded.lg}`
  corners; fields take a `{colors.control-border}` outline and swap it for
  `{colors.danger}` in error states.
- **toggle-checked** — the checked switch: an `{colors.action}` blue track,
  the clearest place the action blue shows up as a fill.
- **link** — `{colors.link}` text; underline on hover in running copy.
- **helper-text** — `{colors.on-surface-subtle}` at `{typography.body-sm}` for
  hints under fields.
- **divider / divider-strong** — 1px hairlines in `{colors.border}` and
  `{colors.control-border}`; the strong line doubles as the input outline
  weight.
- **badge-muted** — GitLab's muted pill: `{colors.surface-strong}` fill with
  `{colors.on-surface-subtle}` text for counts and low-key metadata.
- **status-success / status-warning / status-danger** — semantic status text
  in `{colors.success}`, `{colors.warning}`, and `{colors.danger}`.

## Motion

The @gitlab/ui token build ships no motion tokens. Keep transitions brief and
functional — hover, focus, and disclosure only — and always honor
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** reserve `{colors.action}` blue for interactive signals — focus rings,
  selected states, checked toggles; **don't** spread it as a decorative fill
  or heading color.
- **Do** use one `button-primary` per view with `{colors.primary}`; **don't**
  mix dark-neutral and blue fills for the same action in one screen.
- **Do** keep GitLab's brand oranges for logo and marketing surfaces;
  **don't** pull them into product UI controls or status messaging.
- **Do** stay on the 4px grid using the `{spacing.xxs}`–`{spacing.3xl}` scale;
  **don't** invent off-grid padding.
- **Do** separate dense content with `{colors.border}` hairlines; **don't**
  stack drop shadows to fake hierarchy.
- **Do** keep `{colors.danger}` for destructive and error semantics;
  **don't** use it as generic emphasis.
- **Do** set copy in the `{colors.on-surface}` ramp; **don't** use pure black —
  the darkest text is `{colors.on-surface-strong}`.
- **Do** set identifiers, hashes, and CLI output in `{typography.code}`;
  **don't** mix mono and sans within a run of code.

## Agent Prompt Guide

When generating UI in the Pajamas style:

1. Reference tokens by name (`{colors.action}`, `{spacing.sm}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; the palette is tuned
   so all status colors pass as text on `{colors.surface}`.
3. Default composition: `{colors.surface}` field, `{colors.border}` hairlines,
   14px `{typography.body}` copy, one `button-primary`, and `{colors.action}`
   only on focus and selection.
4. Round controls to `{rounded.lg}` and keep everything on the 4px grid.
5. Use Inter and JetBrains Mono as stand-ins for GitLab Sans and GitLab Mono —
   never ship or reference proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
