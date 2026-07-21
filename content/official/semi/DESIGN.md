---
version: alpha
name: Semi Design
description: ByteDance's design system — blue-accent minimalism, quiet grey structure, and first-class light/dark theming for information-dense products.
colors:
  primary: "#0064FA"
  primary-tint: "#EAF5FF"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#1C1F23"
  on-surface-variant: "#494C4F"
  helper: "#727477"
  fill: "#F5F5F5"
  border: "#EDEDED"
  success: "#3BB346"
  success-tint: "#ECF7EC"
  warning: "#FC8800"
  warning-tint: "#FFF8EA"
  danger: "#F93920"
  danger-tint: "#FEF2ED"
typography:
  display:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.375
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.33
  heading:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
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
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.43
rounded:
  sm: 3px
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
  2xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  button-secondary:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  input:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 20px
  form-label:
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.helper}"
    typography: "{typography.body}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  nav-item-active:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  banner-success:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 12px
  banner-warning:
    backgroundColor: "{colors.warning-tint}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 12px
  banner-danger:
    backgroundColor: "{colors.danger-tint}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 12px
---

## Overview

Semi Design is ByteDance's design system, built by the Douyin front-end and UED
teams to close the gap between design files and shipped code. Its look is
modern minimalism tuned for information density: white surfaces, one vivid
Semi Blue (`{colors.primary}`) as the interactive voice, near-black text
(`{colors.on-surface}`), translucent grey fills instead of shadows, and
compact `{rounded.sm}` corners. Every semantic role has a paired dark-mode
value in the source theme, so light and dark are equal citizens.

Reach for Semi when building SaaS products, admin consoles, and data-heavy
tools that should feel crisp, quiet, and engineered for both themes.

## Colors

- **primary (`#0064FA`)** — Semi Blue for primary buttons, links, focus rings,
  and selection; pair with `{colors.on-primary}`. Use `{colors.primary-tint}`
  for selected items and tinted backgrounds (Semi's primary-light-default).
- **surface (`#FFFFFF`) / fill (`#F5F5F5`)** — the page field and the light
  grey fill Semi uses for inputs and secondary buttons; in the source these
  fills are grey at low opacity, flattened here for solid rendering.
- **on-surface (`#1C1F23`) / on-surface-variant (`#494C4F`) / helper
  (`#727477`)** — Semi's three text strengths, from primary copy down to
  helper and placeholder text.
- **border (`#EDEDED`)** — the default hairline for dividers, card outlines,
  and table rules; structure comes from these lines, not shadows.
- **success (`#3BB346`) / warning (`#FC8800`) / danger (`#F93920`)** — status
  accents, each with a tinted companion (`{colors.success-tint}`,
  `{colors.warning-tint}`, `{colors.danger-tint}`) mirroring Semi's
  light-default background tokens for banner and tag fills.

Saturated status colours are accents for icons, borders, and short status
text; body copy on light status fills stays `{colors.on-surface}`.

## Typography

Semi ships no branded font. Its default stack leads with open **Inter**
(Google Fonts) before system and CJK fallbacks (PingFang SC, Microsoft YaHei),
so Inter is the faithful token value, not a substitute. Code samples here use
open JetBrains Mono; Semi itself defers to system monospace.

- **display / heading-lg / heading** — semibold titles stepping 2rem, 1.5rem,
  1.25rem (`{typography.display}` to `{typography.heading}`); Semi's full
  heading ramp runs 32px down to 16px.
- **body (`{typography.body}`)** — 0.875rem regular on a 20px line; Semi's
  base size is 14px, which keeps dense tables and forms compact.
- **body-sm (`{typography.body-sm}`)** — 0.75rem for captions and metadata.
- **label (`{typography.label}`)** — semibold 0.875rem, matching Semi's form
  labels.
- **code (`{typography.code}`)** — monospace at body size for identifiers.

## Spacing & Layout

Spacing is a 4px-based ramp: `{spacing.xxs}` (2px) and `{spacing.xs}` (4px)
for icon gaps and tight insets, `{spacing.sm}` (8px) for control gaps,
`{spacing.md}` (16px) as the default content inset, and `{spacing.lg}` (24px)
through `{spacing.2xl}` (40px) for section structure. Semi also defines 12px
and 20px intermediate steps; controls sit on fixed heights (24, 32, 40px) with
12px horizontal padding. Separate regions with `{colors.border}` hairlines and
flat `{colors.fill}` panels rather than elevation.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text, `{rounded.sm}` corners, 32px default height.
- **button-secondary** — Semi's signature "light" button: `{colors.fill}`
  background with a `{colors.primary}` label, no border.
- **input** — flat `{colors.fill}` field with no visible border until focus,
  when a `{colors.primary}` ring appears.
- **card** — `{colors.surface}` on `{rounded.md}` corners with a
  `{colors.border}` outline and 20px padding.
- **form-label** — semibold `{typography.label}` in `{colors.on-surface}`;
  **helper-text** in `{colors.helper}`; **caption** in
  `{colors.on-surface-variant}`.
- **link** — `{colors.primary}` text, darkening on hover.
- **divider** — 1px `{colors.border}` hairline.
- **nav-item-active** — the selected navigation item: a `{colors.primary-tint}`
  fill behind `{colors.on-surface}` text, with the item icon in
  `{colors.primary}`.
- **banner-success / banner-warning / banner-danger** — light status fills
  with `{colors.on-surface}` copy; the saturated status colour carries the
  icon and the 1px border of the bordered variant. Inline form errors set
  short text directly in `{colors.danger}`.

## Motion

Semi's default theme ships every transition duration token at 0ms: state
changes are instant, and motion is an opt-in theme decision. The token set
reserves durations from 50ms to 500ms with standard easing curves for themes
that enable animation. Keep transitions instant or fast and functional, and
honour prefers-reduced-motion.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for actions, links, focus, and selection;
  **don't** spread saturated blue across decorative surfaces.
- **Do** build secondary controls from `{colors.fill}`; **don't** add borders
  and shadows to buttons and inputs — Semi controls are flat fills.
- **Do** use `{colors.border}` hairlines and spacing for structure; **don't**
  stack drop shadows on cards and tables.
- **Do** keep corners compact (`{rounded.sm}` controls, `{rounded.md}`
  containers, `{rounded.lg}` modals); **don't** mix pill shapes into dense
  layouts except tags using `{rounded.full}`.
- **Do** set body copy at `{typography.body}` (14px base); **don't** inflate
  dense screens with 16px body text.
- **Do** pair light status fills with `{colors.on-surface}` copy; **don't**
  set `{colors.warning}` or `{colors.danger}` as long text on white.
- **Do** design light and dark together — every role here has a dark
  counterpart in Semi's theme; **don't** hardcode values that only work on
  white.
- **Do** keep type semibold (600) for emphasis; **don't** use heavier weights
  — Semi's scale stops at 600.

## Agent Prompt Guide

When generating UI in the Semi Design style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw hex or pixel values.
2. Every text/background pairing must meet WCAG AA 4.5:1; keep body copy in
   `{colors.on-surface}` and reserve status colours for accents.
3. Default composition: `{colors.surface}` page, `{colors.fill}` inputs and
   secondary buttons, one `button-primary` per view, `{colors.border}`
   hairlines between regions.
4. Keep controls on 32px heights with `{rounded.sm}` corners and the 14px
   `{typography.body}` base.
5. Use Inter (open, Google Fonts — Semi's own first-choice family); never
   ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
