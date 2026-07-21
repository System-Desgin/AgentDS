---
name: material-3
description: Build UI in Google's Material 3 (Material You) style — tonal surfaces, rounded shapes, role-based color, Roboto type. Use when the user asks for Material Design, M3, Material You, or an expressive mobile-first Android/Google look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Material 3 (Google) design system

Build UI that follows Google's Material 3 (Material You) — tonal surfaces, rounded shapes, role-based color pairs, Roboto type.

## When to use this skill

Use this skill when the user:

- Asks for Material Design, M3, Material You, or a Google/Android look
- Builds mobile-first or expressive consumer product UIs
- Wants the real M3 baseline scheme (primary/container/on-roles, shape scale) instead of guessed values

## Apply it

1. Read the bundled `DESIGN.md` in this skill's directory — it contains the M3
   baseline tokens (color roles, type scale, shape, spacing) and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, use container/on-container pairs as designed, keep
   every text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/material-3/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Desgin/AgentDS --skill design-systems`.
