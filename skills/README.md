# skills/

Agent Skills (`SKILL.md`) distributed via [skills.sh](https://www.skills.sh/).
This directory goes **public at the start of Phase 4** — `npx skills add` needs a
reachable public repo.

Planned (Phase 4 — see `docs/03-DEV-CHECKLIST.md` and PRD F-9):

- **`design-systems/`** — master skill: `SKILL.md` with workflows ("use system
  X", "list systems", "create a DESIGN.md"), `references/` bundling ~7 archetype
  systems, and `scripts/fetch_design_md.(py|sh)` calling
  `GET https://api.agent-ds.oday-bakkour.com/v1/systems/{slug}/design.md`.
  Target package size ≤ ~100KB.
- **Flagship individual skills** (carbon, material-3, primer, fluent-2,
  cloudscape, flowbite, ant-design) — each a thin `SKILL.md` + bundled file so it
  ranks individually on the skills.sh leaderboard.

Install (once live):

```bash
npx skills add System-Design/AgentDS --skill design-systems
```

Nothing is published here in Phase 0.
