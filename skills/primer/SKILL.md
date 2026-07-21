---
name: primer
description: Build UI in GitHub's Primer design system style — calm neutral canvas, accent blue interaction, dense legible text-first layouts. Use when the user asks for Primer, a GitHub-style UI, or a developer-tool look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Primer (GitHub) design system

1. Read the bundled `DESIGN.md` in this skill's directory — it contains Primer's
   tokens (functional colors, type, spacing, borders) and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, keep the canvas neutral with blue reserved for
   interaction, keep every text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/primer/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Design/AgentDS --skill design-systems`.
