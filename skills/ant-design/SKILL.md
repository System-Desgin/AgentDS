---
name: ant-design
description: Build UI in Ant Design's style — vivid brand blue, crisp neutrals, dense data-rich enterprise layouts. Use when the user asks for Ant Design, antd, or a data-heavy admin/back-office CRUD look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Ant Design design system

Build UI that follows Ant Design — a vivid brand blue, crisp neutrals, and dense data-rich enterprise layouts.

## When to use this skill

Use this skill when the user:

- Asks for Ant Design, antd, or a data-heavy admin/back-office look
- Builds CRUD apps, admin panels, or dense enterprise dashboards
- Wants the real antd default-theme tokens instead of guessed values

## Apply it

1. Read the bundled `DESIGN.md` in this skill's directory — it contains the
   antd default-theme tokens and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, keep layouts dense but ordered, pair vivid colors
   with large/bold labels where contrast requires it, keep body text WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/ant-design/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Desgin/AgentDS --skill design-systems`.
