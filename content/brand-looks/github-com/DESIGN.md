---
version: alpha
name: GitHub.com
description: The look observed on GitHub's marketing pages — near-black glow heroes, huge heavy headlines, white feature sections, and one green CTA.
colors:
  primary: "#238636"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#1F2328"
  on-surface-variant: "#59636E"
  surface-variant: "#F6F8FA"
  border: "#D1D9E0"
  hero: "#0D1117"
  on-hero: "#FFFFFF"
  on-hero-muted: "#9198A1"
  hero-border: "#30363D"
  accent: "#0969DA"
  glow-purple: "#A371F7"
  glow-blue: "#79C0FF"
  glow-green: "#3FB950"
typography:
  display:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.03em
  heading-lg:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  heading:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
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
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0.02em
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 6px
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
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  link:
    textColor: "{colors.accent}"
  helper-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  stat:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.on-hero}"
    typography: "{typography.display}"
  stat-caption:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.on-hero-muted}"
    typography: "{typography.body-sm}"
  code-block:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.glow-blue}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    typography: "{typography.code}"
  eyebrow-purple:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.glow-purple}"
    typography: "{typography.label}"
  badge-green:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.glow-green}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-hero:
    backgroundColor: "{colors.hero-border}"
    height: 1px
---

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by GitHub, Inc. All trademarks belong to
> their owners. Use as inspiration for an original system.

## Overview

The look observed on GitHub's public marketing pages (github.com/home and the
features pages) is a stage built from near-black. Heroes sit on a
`{colors.hero}` canvas washed with `{colors.glow-purple}`, `{colors.glow-blue}`,
and `{colors.glow-green}` gradients behind huge, heavy, tightly tracked
headlines. Feature sections alternate to white (`{colors.surface}`) with
near-black `{colors.on-surface}` text, one green call to action
(`{colors.primary}`) repeats on every page, code-editor screenshots serve as
hero art, and oversized stats numerals carry the proof.

Note the positioning: this catalog also carries Primer, GitHub's product
design system, as an official entry. Primer is the calm product-UI voice; this
Brand Look is the theatrical marketing voice layered over the same palette
family. Reach for it on developer-facing launch and landing pages.

## Colors

- **hero (`#0D1117`) / on-hero (`#FFFFFF`) / on-hero-muted (`#9198A1`)** — the
  near-black stage, its white headline text (18.9:1), and the muted gray for
  supporting copy on dark (6.5:1).
- **glow-purple (`#A371F7`) / glow-blue (`#79C0FF`) / glow-green (`#3FB950`)**
  — the hero glow and highlight hues; as text they sit only on `{colors.hero}`
  (5.6:1 to 9.7:1) — all three fail AA on white.
- **primary (`#238636`) / on-primary (`#FFFFFF`)** — the green sign-up CTA;
  white on it passes AA at 4.63:1 with little margin, so the green is never
  lightened.
- **surface (`#FFFFFF`) / surface-variant (`#F6F8FA`)** — the white feature
  sections and the faint gray bands and panels between them.
- **on-surface (`#1F2328`) / on-surface-variant (`#59636E`)** — near-black
  body text on white (15.8:1) and the secondary gray (6.1:1).
- **border (`#D1D9E0`) / hero-border (`#30363D`)** — 1px hairlines on white
  and on dark sections respectively; neither is used as text.
- **accent (`#0969DA`)** — the observed link blue on light surfaces (5.2:1).

## Typography

The observed display and UI family is **Mona Sans**, GitHub's own open-source
typeface (SIL OFL). It is not on this catalog's preview loader allow-list, so
tokens substitute **Inter**, with **JetBrains Mono** for the observed system
monospace stack. Treat the sizes and tracking below as the observed scale.

- **display (`{typography.display}`)** — the signature move: extra-bold,
  tracked tight at -0.03em, set as short declarative headlines and as the
  huge stats numerals ("100M+" style figures).
- **heading-lg (`{typography.heading-lg}`) / heading (`{typography.heading}`)**
  — bold section and feature titles, still tightly tracked.
- **body (`{typography.body}`) / body-sm (`{typography.body-sm}`)** — regular
  weight, calm 1.5 line height; paragraphs stay short under the big display.
- **label (`{typography.label}`)** — small semibold text with positive
  tracking for eyebrow labels, badges, and nav items.
- **code (`{typography.code}`)** — monospace for the editor-screenshot hero
  art and inline commands, set on `{colors.hero}` fills.

## Spacing & Layout

Spacing observed on the site follows a 4px rhythm: `{spacing.xxs}` (4px) and
`{spacing.xs}` (8px) inside controls and badges, `{spacing.sm}`-`{spacing.md}`
(12-16px) for control padding and gaps, `{spacing.lg}` (24px) for card
padding, and `{spacing.xl}`-`{spacing.2xl}` (32-48px) between blocks.
Marketing sections breathe at `{spacing.3xl}` (96px) of vertical padding.
Layouts stay centered with a wide measure for display type; structure comes
from section color changes and `{colors.border}` / `{colors.hero-border}`
hairlines, not shadows.

## Components

- **button-primary** — the green CTA: `{colors.primary}` fill,
  `{colors.on-primary}` text, `{rounded.md}` corners, generous 12px 24px
  padding.
- **button-secondary** — white `{colors.surface}` with `{colors.on-surface}`
  text and a `{colors.border}` hairline; on the dark stage the observed
  variant is `{colors.on-hero}` text with a `{colors.hero-border}` outline.
- **card** — white `{colors.surface}` with `{rounded.lg}` corners and a
  `{colors.border}` hairline; used for feature grids on light bands.
- **field** — white input, `{colors.border}` hairline, `{rounded.md}` corners;
  the hero email capture is the canonical instance.
- **link** — `{colors.accent}` text on light surfaces.
- **helper-text** — `{colors.on-surface-variant}` small text for captions and
  legal lines.
- **stat** — an oversized `{typography.display}` numeral in
  `{colors.on-hero}` on the dark stage.
- **stat-caption** — the short `{colors.on-hero-muted}` line under each stat
  numeral.
- **code-block** — the editor-art pattern: `{colors.hero}` fill,
  `{colors.glow-blue}` monospace text, `{rounded.lg}` corners.
- **eyebrow-purple** — a `{colors.glow-purple}` label above dark-section
  headlines.
- **badge-green** — a `{rounded.full}` pill with `{colors.glow-green}` text on
  the dark stage for announcements.
- **divider / divider-hero** — 1px hairlines: `{colors.border}` on white
  sections, `{colors.hero-border}` on the dark stage.

## Motion

Observed motion is theatrical but contained: glow gradients drift slowly
behind heroes, sections fade and rise on scroll, and code art types itself in.
Controls keep fast, plain transitions under about 200ms. Honor
`prefers-reduced-motion` by disabling the drifts and typing effects.

## Do's and Don'ts

- **Do** keep the glow hues (`{colors.glow-purple}`, `{colors.glow-blue}`,
  `{colors.glow-green}`) on the `{colors.hero}` stage; **don't** set them as
  text on white — all three fall below AA there.
- **Do** use one green `button-primary` per view; **don't** scatter
  `{colors.primary}` into body text, icons, or decorative fills.
- **Do** alternate near-black hero bands with white feature sections;
  **don't** run the entire page dark — the white sections do the explaining.
- **Do** track `{typography.display}` tight and keep headlines to a few words;
  **don't** set paragraphs in display weight or size.
- **Do** set code art in `{typography.code}` on `{colors.hero}` with a glow
  hue; **don't** render code as faint decoration below AA contrast.
- **Do** structure with `{colors.border}` and `{colors.hero-border}`
  hairlines; **don't** stack drop shadows on either field.
- **Do** keep `{colors.on-hero-muted}` for secondary text on dark; **don't**
  drop dark-section text below AA by dimming it further.

## Agent Prompt Guide

When generating UI in this observed GitHub.com marketing style:

1. Reference tokens by name (`{colors.hero}`, `{spacing.3xl}`,
   `{typography.display}`) — never hardcode raw values.
2. Every text/background pairing must meet WCAG AA 4.5:1: glow hues as text
   only on `{colors.hero}`, and never lighten `{colors.primary}` — white on
   it passes at 4.63:1 with little margin.
3. Default composition: a `{colors.hero}` glow hero with one green
   `button-primary`, then white `{colors.surface}` feature sections, a stats
   band, and a closing dark CTA section.
4. Corners at `{rounded.md}` for controls and `{rounded.lg}` for cards and
   code art; spacing on the 4px rhythm with `{spacing.3xl}` section padding.
5. Tokens use Inter / JetBrains Mono as stand-ins for the observed Mona Sans
   and monospace stack; never ship font binaries you have not licensed.
6. This is an independent analysis of observable patterns — treat it as
   inspiration for an original system, not an official GitHub spec (GitHub's
   product system is Primer, a separate official entry in this catalog).
