---
name: fluent-2
description: Build UI in Microsoft's Fluent 2 design system style — calm neutrals, subtle rounding, a confident brand blue, Microsoft 365 coherence. Use when the user asks for Fluent, a Microsoft/Office-style UI, or a Windows-adjacent productivity app look.
license: Skill code Apache-2.0; bundled DESIGN.md CC BY 4.0.
---

# Fluent 2 (Microsoft) design system

Build UI that follows Microsoft's Fluent 2 — calm soft neutrals, subtle rounding, a confident brand blue, Microsoft 365 coherence.

## When to use this skill

Use this skill when the user:

- Asks for Fluent, a Microsoft/Office-style UI, or a Windows-adjacent look
- Builds productivity apps, enterprise tools, or Microsoft-ecosystem products
- Wants the real Fluent 2 web light-theme roles instead of guessed values

## Apply it

1. Read the bundled `DESIGN.md` in this skill's directory — it contains Fluent 2
   web light-theme tokens and usage rules.
2. Copy it into the project root as `DESIGN.md` (or merge on the user's direction).
3. Follow its "Do's and Don'ts" and "Agent Prompt Guide" sections exactly:
   reference tokens by name, keep surfaces soft and neutral with blue for
   interaction, keep every text/background pair WCAG AA.

Refresh from the live catalog when needed:
`curl -fsSL https://api.agent-ds.oday-bakkour.com/v1/systems/fluent-2/design.md`
(also available: `tokens.json`, `tailwind.css`, `bundle.zip`). Full catalog with
30+ systems: https://agent-ds.oday-bakkour.com — or install the master skill:
`npx skills add System-Desgin/AgentDS --skill design-systems`.
