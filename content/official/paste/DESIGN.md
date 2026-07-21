---
version: alpha
name: Paste
description: Twilio's design system — a calm, accessible, token-driven visual language led by a confident blue.
colors:
  primary: "#006DFA"
  on-primary: "#FFFFFF"
  primary-strong: "#001489"
  on-primary-strong: "#FFFFFF"
  link: "#0263E0"
  surface: "#FFFFFF"
  on-surface: "#121C2D"
  surface-variant: "#F4F4F6"
  on-surface-variant: "#606B85"
  border: "#8B93AA"
  border-weak: "#CACDD8"
  success: "#14B053"
  warning: "#F47C22"
  error: "#C72323"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
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
    lineHeight: 1.45
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.01em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.5rem
  2xl: 2rem
  3xl: 2.75rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary-strong}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  link:
    textColor: "{colors.link}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-weak:
    backgroundColor: "{colors.border-weak}"
    height: 1px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Paste is Twilio's design system for building customer-engagement products. Its
character is calm and highly legible: generous whitespace, a restrained neutral
surface, and a single confident blue (`{colors.primary}`) carrying interaction.
Accessibility is foundational — colour pairings are chosen to meet WCAG AA, and
the type scale stays comfortable at reading sizes.

Use Paste when you want an accessible, product-focused interface that feels
composed rather than loud — dashboards, communications tooling, and settings-
heavy SaaS all fit its temperament.

## Colors

Paste centres on a decisive blue against a clean neutral field.

- **primary (`#006DFA`)** — the interactive blue. Primary buttons, active
  states, focus. `{colors.on-primary}` (white) sits on it at AA contrast.
- **primary-strong (`#001489`)** — deep navy for hover/active on primary
  surfaces and for high-emphasis moments; pair with `{colors.on-primary-strong}`.
- **link (`#0263E0`)** — inline text links; slightly deeper than primary so
  links read clearly against body copy.
- **surface (`#FFFFFF`) / surface-variant (`#F4F4F6`)** — the page and a subtle
  raised fill for cards, wells, and table zebra rows.
- **on-surface (`#121C2D`)** — primary text ink; **on-surface-variant
  (`#606B85`)** — secondary and helper text.
- **border (`#8B93AA`) / border-weak (`#CACDD8`)** — control and divider lines;
  use the weak variant for quiet separation.
- **success (`#14B053`) / warning (`#F47C22`) / error (`#C72323`)** — status
  colours, reserved for feedback (validation, toasts, inline errors).

All text pairs above meet WCAG AA; verify any new pairing before adding it.

## Typography

Paste ships in the TwilioSans family; this file substitutes the metrically
similar open **Inter** for UI text and **JetBrains Mono** for code (the original
families are TwilioSansText, TwilioSansDisplay, and TwilioSansMono).

- **display / heading-lg / heading** — Inter Semibold for page titles and
  section headers; step down through `{typography.display}` → `{typography.heading}`.
- **body / body-sm** — Inter Regular for reading and dense UI text; body copy
  measures comfortably at `{typography.body}` with a 1.5 line height.
- **label** — Inter Medium, slightly tracked, for form labels, table headers,
  and eyebrows.
- **code** — JetBrains Mono for inline code, snippets, and API values via
  `{typography.code}`.

## Spacing & Layout

Spacing follows a soft 4px base (`{spacing.xxs}` = 0.25rem) growing through
`{spacing.md}` (1rem) to `{spacing.3xl}` (2.75rem). Card and form internals use
`{spacing.md}`; group gaps use `{spacing.xs}`–`{spacing.sm}`; section rhythm uses
`{spacing.2xl}`–`{spacing.3xl}`. Favour whitespace over rules; when a divider is
needed, use a hairline in `{colors.border-weak}`.

## Components

- **button-primary** — solid `{colors.primary}` fill with `{colors.on-primary}`
  text and `{rounded.md}` corners; hover shifts to `{colors.primary-strong}`.
- **button-secondary** — `{colors.surface}` with a `{colors.border}` outline and
  `{colors.primary}` label, for secondary actions.
- **card** — `{colors.surface}` on the page with `{rounded.lg}` corners and
  `{spacing.md}` padding; separate with borders, not heavy shadows.
- **input** — `{colors.surface}` field, `{rounded.md}` corners, `{colors.border}`
  outline; focus uses a `{colors.primary}` ring.
- **link** — `{colors.link}` text, underlined on hover.
- **badge-success** — pill (`{rounded.full}`) in `{colors.success}` for positive
  status.

## Motion

Motion is quiet and functional: 150–200ms ease transitions on hover, focus, and
disclosure. Avoid decorative or ambient animation, and honour
`prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interaction; **don't** use it for large
  decorative fills or headings.
- **Do** rely on whitespace and `{colors.border-weak}` hairlines for structure;
  **don't** stack heavy drop shadows.
- **Do** reserve `{colors.success}`, `{colors.warning}`, and `{colors.error}` for
  status; **don't** use them as brand accents.
- **Do** set headings in the semibold display/heading scale; **don't** use the
  serif or all-caps for body copy.
- **Do** keep `{colors.on-surface-variant}` for secondary text; **don't** drop
  body text below AA contrast.
- **Do** render code in `{typography.code}`; **don't** mix mono and text families
  in the same run.

## Agent Prompt Guide

When generating UI in the Paste style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the palette.
3. Default composition: `{colors.surface}` page → bordered `{colors.surface}`
   cards → one `button-primary` action per view section.
4. Use `{colors.primary}` only for interaction; keep status colours for feedback.
5. Substitute proprietary fonts (TwilioSans → Inter / JetBrains Mono); never ship
   proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
