---
version: alpha
name: TDesign
description: Tencent's enterprise design system — pragmatic and compact, led by TDesign Blue on a cool gray field.
colors:
  primary: "#0052D9"
  on-primary: "#FFFFFF"
  primary-light: "#F2F3FF"
  link: "#003CAB"
  surface: "#FFFFFF"
  surface-variant: "#F3F3F3"
  surface-page: "#EEEEEE"
  on-surface: "#191919"
  on-surface-variant: "#666666"
  placeholder: "#999999"
  border: "#DDDDDD"
  border-subtle: "#E8E8E8"
  success: "#2BA471"
  warning: "#E37318"
  error: "#D54941"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.22
  heading-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.33
  heading:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.44
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.57
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.67
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.67
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.57
rounded:
  sm: 2px
  md: 3px
  lg: 6px
  xl: 9px
  full: 999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 5px 15px
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 5px 15px
  menu-item-active:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 16px 24px
  layout:
    backgroundColor: "{colors.surface-page}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 5px 8px
  link:
    textColor: "{colors.link}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  placeholder:
    textColor: "{colors.placeholder}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border}"
    height: 1px
  tag:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 0px 8px
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  badge-count:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 0px 6px
---

## Overview

TDesign is Tencent's design system for enterprise products, shipped as matching
Vue, React, and mobile libraries on one shared token layer. Its character is
pragmatic and compact: gray pages carrying white containers, a cool neutral
ramp, small radii, a 14px base type size, and TDesign Blue
(`{colors.primary}`) as the single interactive voice. Everything is tuned for
admin consoles and data screens where density and scan speed beat spectacle,
and where Chinese and Latin text often share the same line.

Reach for TDesign when building B2B tools that should feel businesslike and
calm: consoles, dashboards, settings surfaces, and form-heavy workflows.

## Colors

- **primary (`#0052D9`)** — TDesign Blue, step 7 of a 10-step brand ramp; used
  for primary buttons, active states, and focus. Pair with
  `{colors.on-primary}`.
- **primary-light (`#F2F3FF`)** — step 1 of the same ramp; the fill behind
  selected menu items and checked options, carrying `{colors.primary}` text.
- **link (`#003CAB`)** — a darker blue (ramp step 8) for standalone text links.
- **surface (`#FFFFFF`) / surface-variant (`#F3F3F3`) / surface-page
  (`#EEEEEE`)** — the container-on-page model: white cards and inputs sit on a
  gray page; the light-gray variant fills tags, table headers, and secondary
  panels.
- **on-surface (`#191919`) / on-surface-variant (`#666666`) / placeholder
  (`#999999`)** — the text hierarchy. TDesign defines these as black at 90%,
  60%, and 40% alpha; values here are flattened over the white container.
- **border (`#DDDDDD`) / border-subtle (`#E8E8E8`)** — control outlines and
  quiet dividers from the gray ramp.
- **success (`#2BA471`) / warning (`#E37318`) / error (`#D54941`)** — the
  functional trio: green, orange, red. Use them as small status text, icons,
  and fills — not as body text on white, where they sit below AA.

## Typography

TDesign ships no brand font: it uses the platform stack (PingFang SC,
Microsoft YaHei, Arial), leaning on system CJK fonts for Chinese text. Tokens
here use open **Inter** as the Latin stand-in, with **JetBrains Mono** for
code. The scale is compact and pixel-snapped, with a 14px body.

- **display / heading-lg** — `{typography.display}` and
  `{typography.heading-lg}`, semibold, for page titles and section headers
  (TDesign's headline sizes).
- **heading** — `{typography.heading}` for card titles and dialog headers.
- **body / body-sm** — `{typography.body}` (14px equivalent) for nearly all UI
  text; `{typography.body-sm}` for dense table metadata and footnotes.
- **label** — `{typography.label}`, small and semibold, for tags, marks, and
  emphasized captions.
- **code** — `{typography.code}` for IDs, keys, and snippets in consoles.

## Spacing & Layout

Spacing follows TDesign's component margin scale: `{spacing.xxs}` (2px) and
`{spacing.xs}` (4px) inside controls, `{spacing.sm}` (8px) and `{spacing.md}`
(12px) between related controls, `{spacing.lg}` (16px) for card padding and
sibling blocks, and `{spacing.xl}` through `{spacing.3xl}` (24-40px) between
sections. Compose screens as white `{colors.surface}` containers on a
`{colors.surface-page}` field, separated by real gaps rather than heavy
borders. Radii are deliberately small: `{rounded.md}` (3px) on controls,
`{rounded.lg}` (6px) on cards and dialogs, `{rounded.xl}` (9px) on large
panels.

## Components

- **button-primary** — solid `{colors.primary}` with `{colors.on-primary}`
  text and `{rounded.md}` corners; one per view.
- **button-default** — `{colors.surface}` with `{colors.on-surface}` text and
  a `{colors.border}` outline; the workhorse secondary action.
- **menu-item-active** — `{colors.primary-light}` fill with
  `{colors.primary}` text; TDesign's signature selected state in menus,
  selects, and date pickers.
- **card** — a `{colors.surface}` container with `{rounded.lg}` corners on the
  `{colors.surface-page}` field; **layout** is that gray page itself.
- **input** — `{colors.surface}` with a `{colors.border}` outline; the border
  turns `{colors.primary}` on focus.
- **link** — `{colors.link}` text; **helper-text** — `{colors.on-surface-variant}`
  at `{typography.body-sm}`; **placeholder** — `{colors.placeholder}` text
  inside empty inputs.
- **divider / divider-strong** — 1px hairlines in `{colors.border-subtle}`
  and `{colors.border}`; **tag** — quiet `{colors.surface-variant}` fills
  with `{colors.on-surface}` text.
- **status-success / status-warning** — status text in `{colors.success}` and
  `{colors.warning}` next to icons; **badge-count** — the red notification
  bubble, `{colors.error}` fill with `{colors.on-primary}` text; error status
  text uses `{colors.error}` the same way.

## Motion

TDesign motion is brief and functional: transitions around 200ms with the
system easing curve cubic-bezier(0.38, 0, 0.24, 1) on hover, expand, and
collapse. No decorative animation; honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** keep `{colors.primary}` for interactive elements and selection;
  **don't** use it for headings or decorative fills.
- **Do** place white `{colors.surface}` containers on the
  `{colors.surface-page}` field; **don't** put content directly on the gray
  page.
- **Do** use `{colors.primary-light}` with `{colors.primary}` text for
  selected states; **don't** invert to solid blue for every active row.
- **Do** keep radii small (`{rounded.md}` controls, `{rounded.lg}` cards);
  **don't** round enterprise UI into pills — only `badge-count` uses
  `{rounded.full}`.
- **Do** use `{colors.success}` / `{colors.warning}` / `{colors.error}` for
  small status text, icons, and fills; **don't** set them as long body text on
  white — they sit below AA at 14px.
- **Do** separate dense regions with `{colors.border-subtle}` hairlines and
  spacing; **don't** stack shadows — TDesign reserves them for overlays.
- **Do** respect the text hierarchy (`{colors.on-surface}` →
  `{colors.on-surface-variant}` → `{colors.placeholder}`); **don't** use
  placeholder gray for information users must read.

## Agent Prompt Guide

When generating UI in the TDesign style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA 4.5:1; the one sanctioned
   exception is `badge-count` (4.32:1), which TDesign itself ships — keep it
   to short numerals.
3. Default composition: `{colors.surface-page}` field → `{colors.surface}`
   cards → one `button-primary` per view → `{colors.primary-light}` for
   selected states.
4. Keep corners at `{rounded.md}` for controls and `{rounded.lg}` for cards;
   keep spacing on the 2/4/8/12 scale.
5. Use Inter (stand-in for TDesign's system stack) and JetBrains Mono for
   code — never ship proprietary font binaries.
6. If a needed token is missing, propose it in a PR — do not invent values.
