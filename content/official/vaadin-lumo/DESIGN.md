---
version: alpha
name: Vaadin Lumo
description: Vaadin's default theme — friendly rounded controls, airy spacing, and a clear blue primary for pragmatic business apps.
colors:
  primary: "#006AF5"
  on-primary: "#FFFFFF"
  primary-text: "#005FDB"
  primary-tint: "#E4F0FF"
  surface: "#FFFFFF"
  contrast-5: "#F3F5F7"
  contrast-10: "#E8EBEF"
  on-surface: "#263445"
  on-surface-variant: "#616D7C"
  border: "#C4CAD3"
  success: "#0A7637"
  error: "#CA150C"
  warning: "#FFCC00"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.25
  heading-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.25
  heading:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.375
rounded:
  sm: 4px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-secondary:
    backgroundColor: "{colors.contrast-5}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.contrast-10}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  field-label:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  link:
    textColor: "{colors.primary-text}"
  divider:
    backgroundColor: "{colors.contrast-10}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  badge:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 2px 8px
---

## Overview

Lumo is the default theme of the Vaadin web framework, published as CSS custom
properties (the `--lumo-*` scale) that every Vaadin component reads. Its
character is business-app pragmatism with a friendly face: a clear hsl-based
blue primary (`{colors.primary}`), softly rounded 4px controls, generous line
height, and neutrals built from translucent "contrast" tints over a white base.

Values in this file are the Lumo light theme; Lumo's alpha tints are composited
over the white base color into flat hex so agents can use them directly. Reach
for Lumo when building CRUD screens, admin consoles, and form-heavy business
apps that should feel approachable rather than austere.

## Colors

- **primary (`#006AF5`)** — the interactive blue for primary buttons, focus
  rings, and selection; pair with `{colors.on-primary}`.
- **primary-text (`#005FDB`)** — a darker blue reserved for links and button
  labels on light surfaces; Lumo keeps a separate text-grade blue so copy
  clears WCAG AA.
- **primary-tint (`#E4F0FF`)** — the 10 percent primary tint behind default
  badges and selected rows; text on it is `{colors.primary-text}`.
- **surface (`#FFFFFF`) / contrast-5 (`#F3F5F7`) / contrast-10 (`#E8EBEF`)** —
  Lumo derives every neutral from one contrast ramp: the white base, a whisper
  of gray-blue for secondary buttons and panels, and a firmer step for input
  fills and dividers.
- **on-surface (`#263445`) / on-surface-variant (`#616D7C`)** — body text and
  secondary text, both blue-tinted grays from the same contrast ramp.
- **border (`#C4CAD3`)** — the 30 percent contrast step for outlined cards and
  control borders.
- **success (`#0A7637`) / error (`#CA150C`)** — text-grade status greens and
  reds; their solid fill variants carry `{colors.on-primary}` text.
- **warning (`#FFCC00`)** — warning yellow is a fill only, always carrying dark
  `{colors.on-surface}` text; Lumo never renders warning copy in yellow.

All text pairings in the components above meet WCAG AA against their stated
backgrounds.

## Typography

Lumo ships no font binaries: it uses a system stack (-apple-system,
BlinkMacSystemFont, Roboto, Segoe UI, Helvetica, Arial). **Inter** stands in
for that stack in this catalog; swap in the native stack in production. Lumo
does not define a monospace family, so **JetBrains Mono** is the stand-in for
`{typography.code}`.

- **display / heading-lg / heading** — headings are semibold (600) with a tight
  1.25 line height, stepping 2.5rem, 1.75rem, 1.375rem down Lumo's xxxl-xl
  font-size scale.
- **body (`{typography.body}`)** — 1rem with a roomy 1.625 line height; this
  airiness is a big part of Lumo's friendly feel.
- **body-sm / label** — 0.875rem for dense UI text; field labels use
  `{typography.label}` at weight 500. Helper and validation messages step down
  to Lumo's 0.8125rem xs size.
- **code (`{typography.code}`)** — identifiers and snippets.

## Spacing & Layout

Lumo's space scale maps to `{spacing.xs}` (4px), `{spacing.sm}` (8px),
`{spacing.md}` (16px), `{spacing.lg}` (24px), and `{spacing.xl}` (40px);
`{spacing.xxs}` and `{spacing.2xl}` are catalog extensions for micro-alignment
and page sections. Controls sit on a parallel size scale with a 36px default
control height, so buttons and fields align on a row automatically. Keep
layouts airy: pad cards with `{spacing.md}`, separate form sections with
`{spacing.lg}`, and divide dense regions with 1px `{colors.contrast-10}`
hairlines instead of boxes inside boxes.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, weight 500, 36px tall, `{rounded.md}` corners.
- **button-secondary** — Lumo's default button: a quiet `{colors.contrast-5}`
  fill with a `{colors.primary-text}` label.
- **card** — `{colors.surface}` with `{rounded.md}` corners; the outlined
  variant adds a `{colors.border}` border, and dialogs and overlays step up to
  `{rounded.lg}` with soft layered shadows.
- **field** — filled inputs: `{colors.contrast-10}` background,
  `{colors.on-surface}` value text, 36px tall; invalid fields shift to a red
  tint with `{colors.error}` messaging.
- **field-label / helper-text** — `{colors.on-surface-variant}` secondary text;
  labels use `{typography.label}`, helpers read smaller.
- **link** — `{colors.primary-text}`, underlined on hover only.
- **divider / divider-strong** — 1px hairlines: `{colors.contrast-10}` between
  content, `{colors.border}` where structure needs more weight.
- **badge / status-success / status-error** — the default badge is
  `{colors.primary-tint}` with `{colors.primary-text}`; statuses read as
  `{colors.success}` and `{colors.error}` text.
- **badge-warning** — a `{colors.warning}` fill with dark `{colors.on-surface}`
  text; never render warning yellow as text.

## Motion

Lumo keeps motion small and quick: field labels and interactive states
transition in about 0.2s, and overlays fade in briefly. Nothing decorative or
ambient; honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for the main action and focus; **don't** flood
  headers or panels with it — use `{colors.primary-tint}` for emphasis areas.
- **Do** use `{colors.primary-text}` for links and text-grade blue; **don't**
  swap it with the button blue — Lumo separates the two roles on purpose.
- **Do** build every neutral from `{colors.contrast-5}`, `{colors.contrast-10}`,
  and `{colors.border}`; **don't** introduce outside gray ramps.
- **Do** keep corners modest — `{rounded.md}` controls, `{rounded.lg}`
  overlays; **don't** crank radii into pill shapes except `{rounded.full}`
  avatars.
- **Do** keep warning yellow as a fill with `{colors.on-surface}` text;
  **don't** set `{colors.warning}` as text on white.
- **Do** hold controls to the 36px height rhythm; **don't** cram forms —
  Lumo's airy `{typography.body}` line height needs room.
- **Do** set field labels in `{typography.label}` at weight 500; **don't**
  bold body copy for emphasis beyond 600.
- **Do** use the system font stack in production; **don't** ship or embed
  proprietary font binaries.

## Agent Prompt Guide

When generating UI in the Lumo style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the
   palette before shipping.
3. Default composition: `{colors.surface}` page → `{colors.contrast-5}` panels
   and secondary buttons → `{colors.contrast-10}` inputs and dividers → one
   `button-primary` per view, `{colors.primary-text}` links.
4. Keep controls 36px tall with `{rounded.md}` corners and spacing on the Lumo
   scale (4, 8, 16, 24, 40).
5. Use Inter as the stand-in for Lumo's system stack (JetBrains Mono for code);
   never bundle proprietary fonts.
6. If a needed token is missing, propose it in a PR — do not invent values.
