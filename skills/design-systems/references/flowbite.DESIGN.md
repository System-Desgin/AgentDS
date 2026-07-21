---
version: alpha
name: Flowbite
description: A Tailwind-native component system — Inter, an electric brand blue, and utility-first neutrals.
colors:
  primary: "#1C64F2"
  on-primary: "#FFFFFF"
  primary-strong: "#1A56DB"
  link: "#1C64F2"
  surface: "#FFFFFF"
  on-surface: "#111827"
  on-surface-variant: "#6B7280"
  surface-variant: "#F9FAFB"
  fill: "#F3F4F6"
  border: "#E5E7EB"
  success: "#0E9F6E"
  warning: "#9F580A"
  error: "#E02424"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading:
    fontFamily: Inter
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.875rem
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  section:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.lg}"
  badge-neutral:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 10px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  link:
    textColor: "{colors.link}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 10px
---

## Overview

Flowbite is a Tailwind-native, open-source component system. Its language is
utility-first and modern: Inter typography, an electric brand blue
(`{colors.primary}`), Tailwind's neutral gray ramp, and generous rounding. It
suits teams already building with Tailwind who want a consistent, ready-made
component look.

Reach for Flowbite for Tailwind projects — marketing sites, SaaS dashboards, and
admin UIs that should feel current and utility-first.

## Colors

- **primary (`#1C64F2`) / on-primary (`#FFFFFF`)** — the electric brand blue for
  primary actions; **primary-strong (`#1A56DB`)** for hover/pressed.
- **link (`#1C64F2`)** — inline links.
- **surface (`#FFFFFF`) / surface-variant (`#F9FAFB`)** — content and section
  backgrounds; **fill (`#F3F4F6`)** for neutral badges and quiet fills.
- **on-surface (`#111827`) / on-surface-variant (`#6B7280`)** — primary and
  secondary text (Tailwind gray-900 / gray-500).
- **border (`#E5E7EB`)** — the default control and divider line.
- **success (`#0E9F6E`) / warning (`#9F580A`) / error (`#E02424`)** — status
  colours; success as a fill with dark text, warning as text, error as a fill.

All text pairings above meet WCAG AA against their stated backgrounds.

## Typography

Flowbite uses **Inter** (open, SIL OFL, on Google Fonts), with **JetBrains Mono**
for code. Headings lean bold and tight; body is comfortable at
`{typography.body}` with a 1.6 line height.

- **display / heading / title** — Inter Bold/Semibold for the title hierarchy.
- **body / body-sm** — Inter Regular for reading and dense UI text.
- **label** — Inter Medium for buttons, form labels, and captions.
- **code** — `{typography.code}` for snippets and identifiers.

## Spacing & Layout

Spacing is Tailwind's 4px scale: `{spacing.xxs}` (4px) through `{spacing.md}`
(16px) to `{spacing.2xl}` (48px). Use `{spacing.lg}`–`{spacing.xl}` for card and
section padding. Rounding is generous — `{rounded.md}` (8px) for controls,
`{rounded.lg}` for cards, `{rounded.full}` for pills and avatars.

## Components

- **button-primary** — `{colors.primary}` with `{colors.on-primary}`, `{rounded.md}`
  corners; hover shifts to `{colors.primary-strong}`.
- **button-secondary** — `{colors.surface}` with a `{colors.border}` outline and
  `{colors.on-surface}` label.
- **card / section** — `{colors.surface}` cards on `{colors.surface-variant}`
  sections.
- **badge-neutral** — `{colors.fill}` chip with `{colors.on-surface}` text.
- **input** — `{colors.surface}` field, `{colors.border}` outline, `{rounded.md}`
  corners; focus uses a `{colors.primary}` ring.
- **link** — `{colors.link}` text.
- **caption** — `{colors.on-surface-variant}` secondary text.
- **divider** — a 1px `{colors.border}` hairline.
- **badge-success / status-warning / badge-error** — status in `{colors.success}`,
  `{colors.warning}`, and `{colors.error}`.

## Motion

Flowbite motion is light: 150–300ms transitions on hover, focus, dropdowns, and
modals. Honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interaction; **don't** use it as a large
  decorative fill.
- **Do** use generous rounding (`{rounded.md}`–`{rounded.lg}`); **don't** square
  everything off.
- **Do** layer `{colors.surface}` on `{colors.surface-variant}` sections;
  **don't** rely on heavy shadows.
- **Do** keep status colours semantic and AA (success as a fill with dark text);
  **don't** set bright green as small text on white.
- **Do** set copy in Inter and code in `{typography.code}`; **don't** mix
  families within a run.
- **Do** stay on Tailwind's 4px spacing scale; **don't** invent off-scale values.

## Agent Prompt Guide

When generating UI in the Flowbite style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface-variant}` sections → `{colors.surface}`
   cards → one `button-primary` per view, generous `{rounded.md}`–`{rounded.lg}`.
4. Use Inter and Tailwind's 4px spacing scale.
5. Inter is open — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
