---
name: flowbite
description: Build UI in the Flowbite style — Tailwind-native components, Inter type, an electric blue, utility-first neutrals. Use when the user asks for Flowbite or a polished Tailwind CSS component look for SaaS or marketing sites.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Flowbite design system

1. Read the bundled `DESIGN.md` in this skill's directory — it contains
   Flowbite's default-theme tokens and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, stay on the Tailwind gray ramp, keep every
   text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/flowbite/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Design/AgentDS --skill design-systems`.
