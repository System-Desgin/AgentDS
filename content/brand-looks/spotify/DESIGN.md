---
version: alpha
name: Spotify
description: Spotify's publicly observable dark-first look — near-black surfaces, elevated gray cards, bold tight display type, and one signature green reserved for play and the primary CTA.
colors:
  primary: "#1DB954"
  on-primary: "#000000"
  primary-bright: "#1ED760"
  surface: "#121212"
  on-surface: "#FFFFFF"
  surface-variant: "#181818"
  surface-raised: "#1F1F1F"
  on-surface-variant: "#A7A7A7"
  border-subtle: "#292929"
  success: "#1ED760"
  warning: "#FFA42B"
  error: "#F15E6C"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.03em
  heading-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
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
    letterSpacing: 0.08em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 16px
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
    rounded: "{rounded.full}"
    padding: 12px 32px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 12px 32px
  button-play:
    backgroundColor: "{colors.primary-bright}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 12px
  chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  card-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 10px 16px
  link:
    textColor: "{colors.on-surface}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
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

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by Spotify AB. All trademarks belong to their
> owners. Use as inspiration for an original system.

## Overview

Spotify's public web player and marketing pages are dark-first: a near-black
base in `{colors.surface}` with cards a step lighter in
`{colors.surface-variant}`, white primary text, and muted gray secondary text
in `{colors.on-surface-variant}`. One signature green (`{colors.primary}`)
carries the entire interactive voice — the primary CTA and the circular play
control — and it always pairs with black text or a black glyph, never white.
Everything actionable is a pill; display type is heavy and tightly set; the
only other color on screen comes from album and playlist artwork.

Reach for this look when a consumer app should feel like a stage: a dark,
recessive frame, content imagery doing the visual work, and a single loud
accent for the one action that matters.

## Colors

- **surface (`#121212`)** — the observed near-black base of the web player
  and dark marketing sections; text on it is `{colors.on-surface}`.
- **surface-variant (`#181818`) / surface-raised (`#1F1F1F`)** — the elevated
  card family: resting cards sit at `{colors.surface-variant}` and lighten to
  `{colors.surface-raised}` on hover or for raised elements like chips and
  the search field.
- **on-surface (`#FFFFFF`) / on-surface-variant (`#A7A7A7`)** — titles and
  primary copy read as pure white; artist names, descriptions, timestamps,
  and other metadata read as the muted gray.
- **primary (`#1DB954`) / primary-bright (`#1ED760`)** — the signature green.
  The CTA fill is `{colors.primary}`; the web player's play buttons and
  hover states render the brighter `{colors.primary-bright}`. Both carry
  `{colors.on-primary}` (black) content.
- **border-subtle (`#292929`)** — hairline dividers between list rows and
  page sections on the dark field.
- **success (`#1ED760`) / warning (`#FFA42B`) / error (`#F15E6C`)** — status
  text on dark surfaces; positive states reuse the bright green, and the
  warning amber and soft error red stay legible against `{colors.surface}`.

These tokens model the observed dark product surfaces. Every pairing above
holds WCAG AA on the dark field: white on `{colors.surface}` is about 18.7:1,
`{colors.on-surface-variant}` about 7.8:1, and black on `{colors.primary}`
about 8.1:1. Green fills take black content because green with white text
measures only about 2.6:1.

## Typography

The observed pages set everything in a proprietary circular-style geometric
sans; these tokens substitute **Inter** (open, Google Fonts). No code face is
observable on the analyzed pages; `{typography.code}` provides JetBrains Mono
as a neutral monospace so generated UIs have one.

- **display (`{typography.display}`)** — the marketing hero voice: very
  heavy, tightly tracked, and short. Headlines read as near-black-weight
  slabs of white text.
- **heading-lg / heading** — page and section titles step down through
  `{typography.heading-lg}` and `{typography.heading}`, staying bold; the web
  player's playlist titles scale with viewport but keep this weight.
- **body (`{typography.body}`) / body-sm (`{typography.body-sm}`)** — regular
  weight for descriptions and settings copy; body-sm is the density of track
  rows and card subtitles.
- **label (`{typography.label}`)** — small, bold, tracked uppercase, seen in
  the eyebrow above titles ("Playlist", "Album") and in section labels.

## Spacing & Layout

The web player is a dense grid of cards: gutters of `{spacing.md}` to
`{spacing.lg}` between cards, `{spacing.xs}` to `{spacing.sm}` inside them,
and list rows padded to `{spacing.xs}` vertical. Marketing pages open up to
`{spacing.2xl}` and `{spacing.3xl}` between full-bleed dark sections. Content
areas render as large rounded panels (`{rounded.md}` to `{rounded.lg}`) inset
from the viewport edge on the base `{colors.surface}`. Page headers on the
observed player take a color wash sampled from the artwork, fading down into
`{colors.surface}`.

## Components

- **button-primary** — the signature CTA: a chunky `{colors.primary}` pill
  with a short bold `{colors.on-primary}` label; the observed hover state
  brightens toward `{colors.primary-bright}` and scales up slightly.
- **button-secondary** — a dark pill on `{colors.surface}` with a white bold
  label and a visible 1px white outline; used for the paired secondary
  action next to the CTA.
- **button-play** — the circular `{colors.primary-bright}` play control with
  a black glyph; it appears over card artwork on hover in the web player.
- **chip** — filter pills ("All", "Music", "Podcasts") in
  `{colors.surface-raised}` with white text; the selected chip inverts to a
  white fill with black text.
- **card / card-raised** — artwork-led tiles in `{colors.surface-variant}`
  that lighten to `{colors.surface-raised}` on hover, `{rounded.md}` corners,
  title in white and subtitle in `{colors.on-surface-variant}`.
- **field** — the search input: a `{colors.surface-raised}` pill with white
  text and a gray placeholder in `{colors.on-surface-variant}`.
- **link** — text links render in `{colors.on-surface}` with an underline;
  the observed hover shifts them to `{colors.primary-bright}`.
- **helper-text** — `{colors.on-surface-variant}` in `{typography.body-sm}`
  for metadata, durations, and descriptions.
- **divider** — 1px `{colors.border-subtle}` hairlines between list rows and
  footer sections.
- **status-success / status-warning / status-error** — status text in
  `{typography.label}`; positive states reuse the green family.

## Motion

Observed motion is small and quick: cards lighten their background on hover,
the play button fades and lifts in over artwork, and CTA pills scale up by a
few percent, all in roughly the 150-300ms range. The player's progress bar
and equalizer animation are the only continuous movement. Honour
`prefers-reduced-motion` by dropping the scale and fade effects.

## Do's and Don'ts

- **Do** reserve `{colors.primary}` for the primary CTA and play affordances;
  **don't** use green for text links, borders, or decoration.
- **Do** pair green fills with `{colors.on-primary}` black content; **don't**
  set white text on green — it fails contrast at about 2.6:1.
- **Do** build depth with the surface ramp (`{colors.surface}` →
  `{colors.surface-variant}` → `{colors.surface-raised}`); **don't** use
  drop shadows on the dark field.
- **Do** make every button and input a `{rounded.full}` pill; **don't** mix
  square buttons into a view.
- **Do** keep titles white and metadata in `{colors.on-surface-variant}`;
  **don't** set long body copy in muted gray below `{typography.body-sm}`.
- **Do** let artwork supply the color moments, including header washes;
  **don't** introduce a second brand accent.
- **Do** keep display type heavy and tightly tracked per
  `{typography.display}`; **don't** letterspace headlines positively.
- **Do** separate list rows with `{colors.border-subtle}` hairlines;
  **don't** box every row in a bordered container.

## Agent Prompt Guide

When generating UI in this look:

1. Reference tokens by name (`{colors.primary}`, `{spacing.md}`,
   `{typography.display}`); never hardcode raw values.
2. Every text/background pairing must pass WCAG AA 4.5:1; on green fills use
   `{colors.on-primary}` black — white on green fails.
3. Default composition: `{colors.surface}` base, `{colors.surface-variant}`
   cards that hover to `{colors.surface-raised}`, one `button-primary` pill
   per view, and a `button-play` circle over media artwork.
4. Set titles in white bold type, metadata in `{colors.on-surface-variant}`,
   and eyebrows in `{typography.label}` uppercase.
5. Use Inter in tokens; the observed proprietary circular-style sans is named
   in prose only and must never be shipped.
6. If a needed token is missing, propose it; do not invent values.
