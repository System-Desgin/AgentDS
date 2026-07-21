---
name: design-systems
description: Build UI that follows a real design system instead of generic AI defaults. Use when the user asks to style an app like a known design system (Carbon, Material 3, Primer, Fluent 2, Cloudscape, Ant Design, Flowbite, and more), asks for a DESIGN.md, asks to list available design systems, or wants a design system created for their own product. Fetches agent-ready DESIGN.md token files from the free AgentDS catalog.
license: Skill code Apache-2.0; bundled DESIGN.md files CC BY 4.0 (see NOTICE in each file's front matter provenance).
---

# AgentDS design systems

AgentDS is a free catalog of agent-ready design system files. Each entry is a
single `DESIGN.md`: design tokens (colors, typography, spacing, radius,
components) in YAML front matter plus concise usage rules written for coding
agents. Catalog: https://agent-ds.oday-bakkour.com — API base:
`https://api.agent-ds.oday-bakkour.com`.

## Workflow 1 — "Make this look like <system>"

1. Resolve the slug (lowercase, kebab-case): carbon, material-3, primer,
   fluent-2, cloudscape, ant-design, flowbite, paste, orbit, base-web, and more
   (use Workflow 2 to discover the full list).
2. Get the file. Prefer the bundled copy when one exists in `references/<slug>.DESIGN.md`
   (7 archetypes ship with this skill). Otherwise fetch:
   ```bash
   scripts/fetch_design_md.sh <slug>            # or:
   curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/<slug>/design.md
   ```
3. Save it as `DESIGN.md` in the project root (or merge into an existing one at
   the user's direction).
4. Follow it: reference tokens by name (`{colors.primary}`, `{spacing.md}`),
   never hardcode raw values; obey the file's "Do's and Don'ts" and
   "Agent Prompt Guide" sections; keep every text/background pairing WCAG AA.
5. If a needed token is missing, propose adding it to DESIGN.md — do not invent
   values inline.

## Workflow 2 — "What design systems are available?"

```bash
curl -fsSL "https://api.agent-ds.oday-bakkour.com/v1/systems?limit=100"
```

Returns `{ data, meta }` with slug, name, maker, summary, categories, license,
and links per entry. Filter with `?q=`, `?category=` (e.g. `dev-tools`,
`enterprise-dashboard`, `mobile-first`), `?path=official|brand-look`. Present
the user a short list with each system's summary and let them pick.

Two catalog paths exist: **Official Systems** (built from real published token
packages, with provenance) and **Brand Looks** (independent analyses of famous
product sites — not affiliated with those brands; treat as inspiration for an
original system, and keep each file's disclaimer intact).

## Workflow 3 — "Create a DESIGN.md for my product"

Author a fresh file in the same shape as the bundled archetypes:

1. Read 1-2 files in `references/` that are closest to the product's purpose
   (see the table below) to copy the _structure_, not the values.
2. Front matter: `version`, `name`, `description`, then `colors` (11-15 semantic
   roles: primary, on-primary, surface, on-surface, borders, success/warning/
   error), `typography` (~7 levels with fontFamily/fontSize/fontWeight/
   lineHeight), `rounded`, `spacing` (7-8 steps), `components` (10-13 entries
   whose values reference tokens like `"{colors.primary}"`).
3. Prose sections in order: Overview, Colors, Typography, Spacing & Layout,
   Components, Motion, Do's and Don'ts, Agent Prompt Guide.
4. Ask the user for brand color(s) and font; verify WCAG AA (4.5:1) for every
   text/background pair before writing it in.
5. Lint if the toolchain is available: `npx @google/design.md lint DESIGN.md`.

## Bundled archetypes (references/)

| File                 | Reach for it when building                 |
| -------------------- | ------------------------------------------ |
| carbon.DESIGN.md     | enterprise consoles, data-dense dashboards |
| material-3.DESIGN.md | mobile-first, expressive consumer apps     |
| primer.DESIGN.md     | developer tools, text-heavy product UIs    |
| fluent-2.DESIGN.md   | Microsoft-365-style productivity apps      |
| cloudscape.DESIGN.md | cloud consoles, config-heavy screens       |
| ant-design.DESIGN.md | admin/CRUD, data-rich back-office          |
| flowbite.DESIGN.md   | Tailwind-native SaaS and marketing sites   |

## API notes

- Read-only, no auth, no key. Artifacts per system: `design.md`, `tokens.json`
  (DTCG), `tailwind.css` (Tailwind v4 theme), `bundle.zip`.
- HTTP 451 means the entry is reference-only for legal reasons (e.g. restricted
  government identity) — tell the user why and do not work around it.
- HTTP 429 means rate-limited — honor `Retry-After`.
- Responses are cached (`ETag`); send `If-None-Match` when re-fetching.
