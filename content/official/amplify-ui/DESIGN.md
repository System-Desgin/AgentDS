---
version: alpha
name: Amplify UI
description: AWS's design system for Amplify app front-ends — a teal interactive voice over pragmatic neutrals and rounded-but-sober controls.
colors:
  primary: "#047D95"
  primary-hover: "#005566"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-variant: "#FAFAFA"
  surface-tertiary: "#EFF0F0"
  on-surface: "#0D1926"
  on-surface-variant: "#304050"
  border: "#89949F"
  focus: "#00404C"
  success: "#365E3D"
  warning: "#663300"
  error: "#660000"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 300
    lineHeight: 1.25
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.25
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
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
    fontWeight: 600
    lineHeight: 1.25
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: 0.125rem
  sm: 0.25rem
  md: 0.5rem
  lg: 1rem
  xl: 2rem
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  3xl: 4.5rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 0.5rem 1rem
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 0.5rem 1rem
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 0.5rem 1rem
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 2px
  focus-ring:
    backgroundColor: "{colors.focus}"
    height: 2px
  badge:
    backgroundColor: "{colors.surface-tertiary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 0.5rem 0.75rem
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

## Overview

Amplify UI is AWS's design system for application front-ends built on Amplify:
sign-in flows, account pages, data views, and the product screens around them.
Its character is developer-console adjacent — pragmatic and quiet. A single
teal (`{colors.primary}`) carries all interaction over a white field and a
cool gray ramp; corners are rounded but sober (`{rounded.sm}` on controls),
and the space scale is rem-based and roomy.

Reach for Amplify UI when building AWS-adjacent SaaS products, tools with
authentication-heavy flows, or mobile-first apps that should feel calm and
utilitarian rather than branded.

## Colors

- **primary (`#047D95`)** — the teal interactive voice for primary buttons and
  links; hover deepens to `{colors.primary-hover}` and pressed and focus
  states reach `{colors.focus}`, the darkest teal.
- **surface (`#FFFFFF`) / surface-variant (`#FAFAFA`) / surface-tertiary
  (`#EFF0F0`)** — the white field, the whisper-gray layer for striped table
  rows and filled messages, and the fill for badges and disabled controls.
- **on-surface (`#0D1926`) / on-surface-variant (`#304050`)** — near-black
  primary text and the softer secondary text, both from the cool neutral ramp.
- **border (`#89949F`)** — the visible mid-gray outline that defines fields,
  default buttons, and outlined cards; structure comes from it, not shadows.
- **success (`#365E3D`) / warning (`#663300`) / error (`#660000`)** — deep
  status text colors; in the live theme each sits on a matching pale tint,
  and all of them pass AA on white as well.

Every text pairing above meets WCAG AA against its stated background,
including `{colors.on-primary}` on `{colors.primary}`.

## Typography

Amplify UI ships no font binaries; its default stack leads with **Inter** and
falls back to system fonts, so Inter (open, on Google Fonts) is the token
family here. There is no mono token in the default theme — **JetBrains Mono**
is the open stand-in used for `{typography.code}`.

- **display (`{typography.display}`)** — 3rem at weight 300. Amplify's heading
  scale is distinctive: the largest headings are the lightest, and weight
  increases as size shrinks.
- **heading-lg / heading** — 2rem at 500 and 1.5rem at 600, continuing that
  inverse weight ramp, all on a tight 1.25 line height.
- **body (`{typography.body}`) / body-sm** — 1rem and 0.875rem regular with a
  1.5 line height for reading and dense UI text.
- **label (`{typography.label}`)** — small semibold text for badges, field
  labels, and status lines.

## Spacing & Layout

The space scale is rem-based and doubles through the mid range: `{spacing.xxs}`
(0.25rem) and `{spacing.xs}` (0.5rem) for tight insets, `{spacing.sm}`
(0.75rem) and `{spacing.md}` (1rem) for control and card padding, then
`{spacing.lg}` through `{spacing.3xl}` (4.5rem) for section rhythm. Controls
share one metric: fields and buttons both pad 0.5rem block and 1rem inline,
so forms and toolbars align without adjustment. Cards are flat by default;
edges come from `{colors.border}` outlines and `{colors.surface-variant}`
layer changes, not shadows.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  bold text and `{rounded.sm}` corners; **button-primary-hover** moves the
  fill to `{colors.primary-hover}`, and pressed states reach `{colors.focus}`.
- **button-secondary** — the default button: `{colors.surface}` fill,
  `{colors.on-surface}` text, and a visible `{colors.border}` outline.
- **card** — flat `{colors.surface}` with `{spacing.md}` padding and
  near-square `{rounded.xs}` corners; the outlined variant adds a
  `{colors.border}` edge.
- **field** — `{colors.surface}` input with a `{colors.border}` outline and
  `{rounded.sm}` corners.
- **focus-ring** — a 2px `{colors.focus}` ring drawn outside focused controls.
- **link / helper-text** — `{colors.primary}` links; field descriptions in
  `{colors.on-surface-variant}` at `{typography.body-sm}`.
- **divider** — a 2px `{colors.border}` rule (the live theme softens it to 60%
  opacity).
- **badge** — a `{colors.surface-tertiary}` pill (`{rounded.xl}`) with
  semibold `{colors.on-surface}` text.
- **status-success / status-warning / status-error** — deep status text in
  `{typography.label}`; pair with the matching pale tint fills when you need
  alert surfaces.

## Motion

Motion is brief and functional: 100ms for small state changes, 250ms for
expansion and reveals, 500ms for the longest transitions. Buttons and fields
transition background and border only. Honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the only interactive color; **don't**
  spread teal onto headings, icons, or decorative fills.
- **Do** use the darkening teal ramp (`{colors.primary}` →
  `{colors.primary-hover}` → `{colors.focus}`) for hover and pressed states;
  **don't** lighten or desaturate on interaction.
- **Do** outline controls with `{colors.border}`; **don't** rely on shadows or
  fills to define fields and buttons.
- **Do** follow the inverse heading ramp — bigger means lighter; **don't** set
  `{typography.display}` in bold.
- **Do** keep status colors as deep text (`{colors.success}`,
  `{colors.error}`) on white or pale tints; **don't** use saturated status
  fills behind white text.
- **Do** keep cards flat with `{rounded.xs}` corners; **don't** round
  containers more than controls.
- **Do** stay on the rem space scale (`{spacing.xs}`, `{spacing.md}`,
  `{spacing.lg}`); **don't** invent pixel-odd gaps.
- **Do** set text in Inter with the true system-stack fallback; **don't** ship
  proprietary font binaries.

## Agent Prompt Guide

When generating UI in the Amplify UI style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA; validate against the
   palette before shipping.
3. Default composition: `{colors.surface}` field → `{colors.surface-variant}`
   layers → outlined controls → one `button-primary` per view, with
   `{colors.primary}` reserved for interaction.
4. Keep controls at `{rounded.sm}`, containers at `{rounded.xs}`, and pills at
   `{rounded.xl}`; pad controls 0.5rem block and 1rem inline.
5. Use Inter (open) for UI text and JetBrains Mono for code; name the system
   stack only in prose, never as a shipped binary.
6. If a needed token is missing, propose it in a PR — do not invent values.
