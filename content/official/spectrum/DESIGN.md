---
version: alpha
name: Spectrum
description: Adobe's cross-product design system — a restrained blue accent on a meticulous gray ramp, built to stay out of the way of creative work.
colors:
  primary: "#3B63FB"
  on-primary: "#FFFFFF"
  background: "#FFFFFF"
  layer-1: "#F8F8F8"
  gray-100: "#E9E9E9"
  neutral-content: "#292929"
  neutral-subdued: "#505050"
  helper: "#717171"
  border: "#DADADA"
  border-strong: "#8F8F8F"
  focus: "#4B75FF"
  positive: "#05834E"
  notice: "#C24E00"
  negative: "#D73220"
typography:
  display:
    fontFamily: Source Sans 3
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 1.3
  heading-lg:
    fontFamily: Source Sans 3
    fontSize: 1.75rem
    fontWeight: 800
    lineHeight: 1.3
  heading:
    fontFamily: Source Sans 3
    fontSize: 1.25rem
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: Source Sans 3
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
  detail:
    fontFamily: Source Sans 3
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.06em
  code:
    fontFamily: Source Code Pro
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 10px
  xl: 16px
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
    rounded: "{rounded.full}"
    padding: 8px 18px
  button-secondary:
    backgroundColor: "{colors.gray-100}"
    textColor: "{colors.neutral-content}"
    rounded: "{rounded.full}"
    padding: 8px 18px
  panel:
    backgroundColor: "{colors.layer-1}"
    textColor: "{colors.neutral-content}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.neutral-content}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.neutral-content}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  link:
    textColor: "{colors.primary}"
  helper-text:
    textColor: "{colors.neutral-subdued}"
    typography: "{typography.body-sm}"
  caption:
    textColor: "{colors.helper}"
    typography: "{typography.detail}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 2px
  focus-ring:
    backgroundColor: "{colors.focus}"
    height: 2px
  status-positive:
    textColor: "{colors.positive}"
    typography: "{typography.detail}"
  status-negative:
    textColor: "{colors.negative}"
    typography: "{typography.detail}"
  badge-notice:
    backgroundColor: "{colors.notice}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 2px 8px
---

## Overview

Spectrum is Adobe's design system, shared across Creative Cloud, Document
Cloud, and Experience Cloud. Its character is calm and workmanlike: white and
near-white surfaces, a finely stepped neutral gray ramp, pill-shaped controls,
and one restrained blue accent (`{colors.primary}`) reserved for the main
action. Chrome stays quiet so the user's content — artwork, documents, data —
carries the color.

Reach for Spectrum when building creative-pro tools, productivity suites, or
any product family that must feel consistent across many surfaces without
shouting over its content.

## Colors

Values come from the Spectrum 2 token set (`@adobe/spectrum-tokens`), light
theme.

- **primary (`#3B63FB`)** — Spectrum blue at the accent-900 step (Spectrum
  calls this role the accent color); the fill for the primary call to action
  and the link color, paired with `{colors.on-primary}` white.
- **background (`#FFFFFF`) / layer-1 (`#F8F8F8`)** — the base field and the
  first elevation layer (gray-50); cards sit white on the gray layer.
- **gray-100 (`#E9E9E9`)** — the quiet fill for secondary buttons and subtle
  controls.
- **neutral-content (`#292929`) / neutral-subdued (`#505050`)** — default and
  subdued text (gray-800 and gray-700); **helper (`#717171`)** — gray-600 for
  placeholders and captions, the lightest gray that still passes AA on white.
- **border (`#DADADA`) / border-strong (`#8F8F8F`)** — hairline dividers
  (gray-300) and control outlines (gray-500).
- **focus (`#4B75FF`)** — the dedicated focus-indicator blue, one step lighter
  than the accent.
- **positive (`#05834E`) / notice (`#C24E00`) / negative (`#D73220`)** — status
  colors at the 900 step of their perceptual ramps, tuned to work both as text
  on white and as fills under white text.

Every pairing above meets WCAG AA 4.5:1 against its stated background.

## Typography

Adobe sets Spectrum in **Adobe Clean**, a proprietary family that cannot be
redistributed. Tokens substitute **Source Sans 3**, Adobe's own open family
(SIL OFL, on Google Fonts), which keeps the humanist proportions. Code uses
**Source Code Pro** — that is the actual family named in the token set, no
substitution needed.

- **display / heading-lg / heading** — extra-bold (800) headings from
  `{typography.display}` down to `{typography.heading}`, all at the tight 1.3
  heading line height; Spectrum 2 headings are heavy, not large.
- **body (`{typography.body}`)** — the 14px (0.875rem) desktop default with a
  1.5 line height; **body-sm** at 0.75rem for dense UI.
- **detail (`{typography.detail}`)** — small, medium-weight, tracked at 0.06em;
  Spectrum's label style for eyebrows, field labels, and statuses.
- **code (`{typography.code}`)** — Source Code Pro for tokens, values, and
  snippets.

## Spacing & Layout

Spacing follows Spectrum's stepped scale: `{spacing.xxs}` (2px) and
`{spacing.xs}` (4px) for hairline gaps, `{spacing.sm}` (8px) through
`{spacing.md}` (16px) for control and card padding, and `{spacing.lg}` (24px)
up to `{spacing.3xl}` (64px) for section rhythm. Layer the page as
`{colors.background}` base, `{colors.layer-1}` panels, and white cards on top;
separate dense regions with `{colors.border}` hairlines instead of shadows.

Corners are soft but deliberate: `{rounded.sm}` (4px) for small controls,
`{rounded.md}` (8px) for fields, `{rounded.lg}` (10px) for large controls, and
`{rounded.xl}` (16px) for cards and panels. Buttons are full pills
(`{rounded.full}`).

## Components

- **button-primary** — Spectrum's accent button: a `{colors.primary}` pill with
  `{colors.on-primary}` text; one per view.
- **button-secondary** — a `{colors.gray-100}` pill with
  `{colors.neutral-content}` text for everything that is not the main action.
- **panel / card** — a `{colors.layer-1}` panel layer, and white
  `{colors.background}` cards on top of it with generous `{rounded.xl}`
  corners and `{spacing.md}` padding.
- **field** — white input with a `{colors.border-strong}` outline and
  `{rounded.md}` corners.
- **link** — `{colors.primary}` text; underline on hover.
- **helper-text / caption** — `{colors.neutral-subdued}` help text and
  `{colors.helper}` captions in `{typography.detail}`.
- **divider / divider-strong** — 1px `{colors.border}` and 2px
  `{colors.border-strong}` rules, matching Spectrum's divider weights.
- **focus-ring** — a 2px `{colors.focus}` indicator drawn outside the control,
  matching the focus-indicator thickness token.
- **status-positive / status-negative** — status text in `{colors.positive}`
  and `{colors.negative}` with the tracked `{typography.detail}` style.
- **badge-notice** — a `{colors.notice}` fill with `{colors.on-primary}` text
  for warnings that must be seen.

## Motion

The token package ships no motion values, so keep motion conservative: brief
transitions on hover, focus, and press only, nothing ambient or decorative,
and always honour `prefers-reduced-motion`.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for the primary action and links; **don't**
  use it for headings, icons at rest, or decorative fills.
- **Do** keep buttons pill-shaped (`{rounded.full}`); **don't** mix square and
  pill controls in the same view.
- **Do** build depth with the layer model (background, layer-1, white cards);
  **don't** stack drop shadows to fake elevation.
- **Do** use the gray ramp in order — `{colors.helper}` is the lightest text
  gray allowed on white; **don't** set gray-500 or lighter as text.
- **Do** keep status colors at their 900-step values so they pass AA as text
  and as fills; **don't** brighten them for emphasis.
- **Do** set headings heavy (800) and small rather than large; **don't**
  inflate font sizes to create hierarchy.
- **Do** use Source Sans 3 and Source Code Pro (both open); **don't** ship
  Adobe Clean binaries — name it in prose only.
- **Do** give focus a visible `{colors.focus}` ring; **don't** remove focus
  styles or reuse the accent fill as the indicator.

## Agent Prompt Guide

When generating UI in the Spectrum style:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.body}`) — never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; the palette is tuned
   so the documented pairings pass — do not invent new ones.
3. Default composition: `{colors.background}` base, `{colors.layer-1}` panels,
   white cards, one `button-primary` pill per view, `{colors.primary}` links.
4. Keep controls pill-shaped and cards at `{rounded.xl}`; hold spacing to the
   documented scale.
5. Use Source Sans 3 for UI text and Source Code Pro for code; Adobe Clean is
   proprietary and must never be embedded.
6. If a needed token is missing, propose it in a PR — do not invent values.
