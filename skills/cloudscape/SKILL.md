---
name: cloudscape
description: Build UI in AWS's Cloudscape design system style — dense, functional cloud-console layouts with a confident AWS blue. Use when the user asks for Cloudscape, an AWS-console-style UI, or a data-dense config-heavy dashboard look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Cloudscape (AWS) design system

Build UI that follows AWS's Cloudscape design system — dense, functional cloud-console layouts with a confident AWS blue on a neutral, content-first surface.

## When to use this skill

Use this skill when the user:

- Asks for Cloudscape or an AWS-console-style UI
- Builds cloud consoles, infrastructure dashboards, or config-heavy screens with dense tables and forms
- Wants Cloudscape's real light-mode tokens instead of guessed values

## Apply it

1. Read the bundled `DESIGN.md` in this skill's directory — it contains
   Cloudscape's light-mode tokens and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, build content-first tables/forms density, keep
   every text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/cloudscape/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Desgin/AgentDS --skill design-systems`.
