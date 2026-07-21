---
version: alpha
name: Garden
description: Zendesk's design system for support software — calm, approachable clarity with blue interaction, kale chrome, and AA-tuned status hues.
colors:
  primary: "#1F73B7"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-subtle: "#F8F9F9"
  on-surface: "#293239"
  on-surface-subtle: "#5C6970"
  border: "#D8DCDE"
  border-subtle: "#E8EAEC"
  chrome: "#16494F"
  on-chrome: "#FFFFFF"
  success: "#037F52"
  warning: "#AC5918"
  danger: "#CD3642"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.22
  heading-lg:
    fontFamily: Inter
    fontSize: 1.625rem
    fontWeight: 600
    lineHeight: 1.23
  heading:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.27
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.33
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.43
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.54
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 40px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  well:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  link:
    textColor: "{colors.primary}"
  hint:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  chrome-nav:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.on-chrome}"
    padding: "{spacing.sm}"
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

Garden is Zendesk's design system for support software. Its character is calm
and approachable: a white field, a compact 14px type base built for long agent
shifts, 4px-grounded corners, and a cool palette where blue
(`{colors.primary}`) carries every interaction and deep kale
(`{colors.chrome}`) frames navigation. Accessibility is engineered in — each
status hue is dark enough to pass WCAG AA as text on the white surface.

Reach for Garden when building help desks, ticketing queues, and agent
workspaces that should feel friendly, dense, and dependable at once.

## Colors

- **primary (`#1F73B7`)** — Garden blue for buttons, links, focus, and
  selection; pair fills with `{colors.on-primary}` text.
- **surface (`#FFFFFF`) / surface-subtle (`#F8F9F9`)** — the white field and
  the faint grey layer for wells, table headers, and recessed panels.
- **on-surface (`#293239`) / on-surface-subtle (`#5C6970`)** — primary text and
  the softer grey for hints, captions, and placeholders.
- **border (`#D8DCDE`) / border-subtle (`#E8EAEC`)** — the standard grey
  outline for cards and form controls, and the fainter hairline for dividers
  inside dense content.
- **chrome (`#16494F`)** — Garden's kale, the deep teal from Zendesk's
  heritage, reserved for the navigation shell with `{colors.on-chrome}` text.
- **success (`#037F52`) / warning (`#AC5918`) / danger (`#CD3642`)** — status
  hues deliberately deepened so each reads as AA-compliant text on
  `{colors.surface}`.

Every text pairing declared above meets WCAG AA 4.5:1 against its stated
background, including all three status colors used as plain text.

## Typography

Garden ships no brand font: it uses the native system stack (system-ui, Segoe
UI, Roboto, Helvetica Neue) with a native mono stack (SF Mono, Consolas,
Menlo) for code. Tokens substitute open **Inter** and **JetBrains Mono** so
output renders the same everywhere; name the system stack only in prose.

- **display / heading-lg / heading** — semibold titles from
  `{typography.display}` (2.25rem) down to `{typography.heading}` (1.375rem),
  with tight 1.22 to 1.27 line heights.
- **body (`{typography.body}`)** — the 0.875rem workhorse; Garden runs smaller
  than marketing-site systems because agent screens are dense.
- **body-sm** — 0.75rem for captions, hints, and metadata.
- **label** — same size as body but semibold, for field labels and table
  headers.
- **code (`{typography.code}`)** — 0.8125rem mono for ticket IDs, snippets,
  and API values.

## Spacing & Layout

Everything derives from a 4px base: `{spacing.xxs}` (4px) and `{spacing.xs}`
(8px) for icon gaps and tight insets, `{spacing.sm}` (12px) for control
padding, `{spacing.md}` (20px) for card and form padding, and `{spacing.lg}`
through `{spacing.2xl}` (32 to 48px) for section rhythm. Structure dense
queues with `{colors.border-subtle}` hairlines and `{colors.surface-subtle}`
bands rather than shadows; keep the kale `{colors.chrome}` rail as the only
dark region on screen.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and `{rounded.md}` corners.
- **button-secondary** — `{colors.surface}` with a `{colors.primary}` label
  and border for secondary actions.
- **card / well** — white cards with `{colors.border}` outlines; wells sit on
  `{colors.surface-subtle}` for recessed context.
- **field** — white inputs with a grey `{colors.border}` outline that shifts
  to `{colors.primary}` on focus.
- **link** — `{colors.primary}` text, underlined on hover.
- **hint** — `{colors.on-surface-subtle}` support text under labels and below
  content.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  and `{colors.border}`.
- **chrome-nav** — the `{colors.chrome}` navigation shell with
  `{colors.on-chrome}` icons and labels.
- **status-success / status-warning / status-danger** — semibold status text
  in `{colors.success}`, `{colors.warning}`, and `{colors.danger}`.

## Motion

Garden motion is quick and functional: short fades and border/background
transitions of roughly 0.1s to 0.3s on hover, focus, and disclosure. No
decorative or ambient animation; honor `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` as the single interactive hue; **don't**
  spend it on decoration or headings.
- **Do** reserve `{colors.chrome}` kale for the navigation shell; **don't**
  use it as a text or button color inside content.
- **Do** stay on the 4px grid with `{rounded.md}` corners as the default;
  **don't** round cards past `{rounded.lg}` — Garden is soft, not bubbly.
- **Do** use the three status hues as text straight on `{colors.surface}` —
  they are AA-tuned for it; **don't** lighten them to pastel shades.
- **Do** keep body copy at `{typography.body}` and rely on `{typography.label}`
  weight for hierarchy; **don't** inflate font sizes to fill space.
- **Do** separate dense regions with `{colors.border-subtle}` hairlines and
  `{colors.surface-subtle}` bands; **don't** stack drop shadows.
- **Do** write UI copy in a plain, helpful service voice; **don't** use
  jargon where an agent-facing label can be direct.

## Agent Prompt Guide

When generating UI in the Garden style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; the palette is
   pre-tuned for it, so do not substitute lighter shades.
3. Default composition: `{colors.surface}` content field, a `{colors.chrome}`
   navigation rail, `{colors.surface-subtle}` wells, and one `button-primary`
   per view.
4. Keep type compact: `{typography.body}` at 0.875rem, semibold
   `{typography.label}` for labels, `{typography.code}` for identifiers.
5. Use Inter and JetBrains Mono as declared — Garden's native system stack is
   named in prose only; never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
