---
version: alpha
name: Netflix
description: Netflix's publicly observable cinematic dark look — a pure-black backdrop, near-black browse surfaces, poster-led carousels with minimal chrome, and one signature red reserved for the primary CTA.
colors:
  primary: "#E50914"
  primary-dim: "#C11119"
  on-primary: "#FFFFFF"
  background: "#000000"
  surface: "#141414"
  surface-variant: "#181818"
  surface-raised: "#333333"
  on-surface: "#FFFFFF"
  on-surface-variant: "#B3B3B3"
  muted: "#808080"
  border-subtle: "#404040"
  success: "#46D369"
  warning: "#E87C03"
  error: "#F16A5E"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.01em
  heading:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 700
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
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0.05em
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
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
  field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  link:
    textColor: "{colors.on-surface-variant}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  caption:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  badge-new:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
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

> Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by Netflix, Inc. All trademarks belong to their owners. Use as inspiration for an original system.

## Overview

Netflix's public pages read like a dark theater. Marketing and hero sections
sit on a pure black `{colors.background}`; the browse experience sits a step up
on near-black `{colors.surface}`. Titles are white, metadata is muted gray in
`{colors.on-surface-variant}`, and nearly all remaining color arrives through
poster and billboard artwork. One signature red (`{colors.primary}`) carries
the interactive voice — the primary CTA and small brand badges — and it always
pairs with `{colors.on-primary}` white text. Chrome is minimal: a transparent
header over content, hairline separation, modest corners, and heavy, tightly
set display type.

Reach for this look when content imagery should do the talking: a recessive
cinematic frame, rows of artwork, and a single loud red for the one action
that matters.

## Colors

- **background (`#000000`) / surface (`#141414`)** — the observed two-level dark
  field: pure black behind heroes, the player, and marketing bands; near-black
  as the browse base. White text on either exceeds 18:1.
- **surface-variant (`#181818`) / surface-raised (`#333333`)** — the elevated
  family: detail panels and expanded cards sit at `{colors.surface-variant}`;
  inputs, secondary buttons, and loading placeholders read as the lighter
  `{colors.surface-raised}` gray.
- **on-surface (`#FFFFFF`) / on-surface-variant (`#B3B3B3`)** — titles and
  primary copy render white; synopsis text, cast lists, and footer links read
  as the signature muted gray (about 8.8:1 on `{colors.surface}`).
- **muted (`#808080`)** — the quietest observed text step, for copyright lines
  and fine print; it holds AA on `{colors.surface}` at about 4.7:1, so keep it
  to short caption-length runs.
- **primary (`#E50914`) / primary-dim (`#C11119`)** — the signature red.
  White on `{colors.primary}` measures about 4.8:1, a tight AA pass; the
  darker observed hover state `{colors.primary-dim}` passes more comfortably
  at about 6.2:1. Red is a fill
  color only — as text on `{colors.surface}` it measures about 3.8:1 and
  fails AA for normal text.
- **border-subtle (`#404040`)** — hairlines between sections, table rows, and
  the outlined maturity-rating badge on dark surfaces.
- **success (`#46D369`) / warning (`#E87C03`) / error (`#F16A5E`)** — a sparse
  status set as text on dark: the match-percentage green, the alert orange
  seen on account and sign-in notices, and a soft red for errors. All three
  hold AA on `{colors.surface}` (about 9.5:1, 6.4:1, and 6.1:1).

## Typography

The observed pages set everything in a proprietary grotesque sans; headline
settings are bold and condensed-feeling. These tokens substitute **Inter**
(open, Google Fonts). No code face appears on the analyzed pages;
`{typography.code}` provides JetBrains Mono as a neutral monospace so
generated UIs have one.

- **display (`{typography.display}`)** — the hero voice: very heavy, tightly
  tracked, and short, as in the big landing-page headline over black.
- **heading-lg / heading** — section and title-card headings step down through
  `{typography.heading-lg}` and `{typography.heading}`, staying bold; row
  titles in the browse grid sit at the smaller end.
- **body (`{typography.body}`) / body-sm (`{typography.body-sm}`)** — regular
  weight for synopsis and plan copy; body-sm is the density of metadata rows
  and FAQ text.
- **label (`{typography.label}`)** — small, bold, tracked, for badges,
  eyebrows, and rating text.

## Spacing & Layout

The browse layout is rows of full-bleed carousels: gutters of `{spacing.xxs}`
to `{spacing.xs}` between poster tiles, `{spacing.lg}` to `{spacing.xl}`
between rows, and row titles inset by the same margin as the tile edge.
Marketing pages stack tall black bands separated by thick dark dividers, with
`{spacing.2xl}` to `{spacing.3xl}` of vertical padding and centered content.
Detail panels pad content with `{spacing.md}` to `{spacing.lg}`. Chrome stays
out of the way: the header is transparent over artwork and gains a solid
`{colors.surface}` fill only on scroll.

## Components

- **button-primary** — the signature CTA: a `{colors.primary}` rectangle with
  modest `{rounded.sm}` corners and a short bold `{colors.on-primary}` label;
  the observed hover darkens toward `{colors.primary-dim}`.
- **button-secondary** — the paired gray action ("More Info" style): a
  `{colors.surface-raised}` fill with white text, same shape as the primary.
- **card** — the expanded detail panel in `{colors.surface-variant}` with
  `{rounded.md}` corners, white title, and `{colors.on-surface-variant}`
  metadata.
- **tile** — the poster unit of the carousels: artwork edge-to-edge on a
  `{colors.surface-raised}` placeholder with `{rounded.sm}` corners and no
  chrome of its own.
- **field** — sign-up and search inputs: a `{colors.surface-raised}` fill,
  white text, gray placeholder in `{colors.on-surface-variant}`, and
  `{rounded.sm}` corners.
- **link** — footer and helper links render in `{colors.on-surface-variant}`
  with an underline on hover.
- **helper-text / caption** — `{colors.on-surface-variant}` for metadata and
  descriptions; `{colors.muted}` in `{typography.label}` for fine print.
- **divider** — 1px `{colors.border-subtle}` hairlines between list rows and
  footer sections.
- **badge-new** — the small red badge ("New episodes" style): a
  `{colors.primary}` fill with tiny bold `{colors.on-primary}` text.
- **status-success / status-warning / status-error** — status text in
  `{typography.label}`; the green doubles as the match-percentage voice.

## Motion

Observed motion is cinematic and unhurried: poster tiles scale up after a
short hover delay and expand into a detail card, carousels slide a full page
of tiles at a time, and billboard artwork cross-fades into autoplaying
preview video, mostly in the 250-400ms range. Honour
`prefers-reduced-motion` by dropping the hover zoom and autoplay entirely.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for the primary CTA and small badges;
  **don't** spread red into borders, icons, or long text runs.
- **Do** pair red fills with `{colors.on-primary}` white and darken to
  `{colors.primary-dim}` on hover; **don't** set `{colors.primary}` as
  normal-size text on dark surfaces — it measures about 3.8:1 and fails AA.
- **Do** build depth with the surface ramp (`{colors.background}` →
  `{colors.surface}` → `{colors.surface-variant}` → `{colors.surface-raised}`);
  **don't** rely on drop shadows on the dark field.
- **Do** let poster artwork supply the color moments; **don't** introduce a
  second brand accent to compete with it.
- **Do** keep corners modest at `{rounded.sm}` and `{rounded.md}`; **don't**
  round cards and buttons into pills.
- **Do** keep titles white and metadata in `{colors.on-surface-variant}`;
  **don't** set anything longer than a caption in `{colors.muted}`.
- **Do** keep chrome minimal — a transparent header and `{colors.border-subtle}`
  hairlines; **don't** box carousels and rows in visible containers.
- **Do** set display type very heavy and tight per `{typography.display}`;
  **don't** letterspace headlines positively.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.display}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; white on
   `{colors.primary}` is a tight pass, so keep CTA labels short and bold, and
   never use red as small text on dark surfaces.
3. Default composition: `{colors.background}` heroes over a `{colors.surface}`
   base, artwork tiles in edge-to-edge carousels, one `button-primary` per
   view with a gray `button-secondary` beside it.
4. Set titles in heavy white type, metadata in `{colors.on-surface-variant}`,
   and badges in `{typography.label}`.
5. Use Inter in tokens; the observed proprietary grotesque sans is named in
   prose only and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
