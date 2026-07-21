---
name: carbon
description: Build UI in IBM's Carbon design system style — precise, enterprise-scale, IBM Blue on a neutral field with a strict 8px rhythm. Use when the user asks for Carbon, an IBM-style UI, or an engineered enterprise dashboard/console look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Carbon (IBM) design system

1. Read the bundled `DESIGN.md` in this skill's directory — it contains Carbon's
   tokens (colors, typography, spacing, radius, components) and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name (`{colors.primary}`, `{spacing.md}`), keep corners
   near-square, stay on the 8px grid, keep every text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/carbon/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Design/AgentDS --skill design-systems`.
