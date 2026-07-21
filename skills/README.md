# skills/

Agent Skills (`SKILL.md`) distributed via [skills.sh](https://www.skills.sh/).
Live from Phase 4 — `npx skills add` reads this public repo directly (skills.sh
indexes repos; there is no upload step).

```bash
npx skills add System-Design/AgentDS --skill design-systems   # master skill
npx skills add System-Design/AgentDS --skill carbon           # single system
```

## Layout

- **`design-systems/`** — master skill: workflows ("use system X", "list
  systems", "create a DESIGN.md"), `references/` bundling 7 archetype systems,
  and `scripts/fetch_design_md.(sh|py)` calling
  `GET https://api.agent-ds.oday-bakkour.com/v1/systems/{slug}/design.md`.
  Package stays ≤ ~100KB.
- **Individual flagship skills** (`carbon/`, `material-3/`, `primer/`,
  `fluent-2/`, `cloudscape/`, `flowbite/`, `ant-design/`) — each a thin
  `SKILL.md` + the bundled `DESIGN.md`, so every system ranks individually on
  the skills.sh leaderboard.

## Keeping bundles fresh

The `DESIGN.md` files here are **mirrors** of `content/official/<slug>/DESIGN.md`.
After a content merge that changes one of the bundled systems, re-copy:

```bash
for s in carbon material-3 primer fluent-2 cloudscape flowbite ant-design; do
  cp "content/official/$s/DESIGN.md" "skills/design-systems/references/$s.DESIGN.md"
  cp "content/official/$s/DESIGN.md" "skills/$s/DESIGN.md"
done
```

CI treats `skills/**` as regular code (lint/format); content rules are enforced
on the `content/` originals.

## Licensing

Skill instructions and scripts: Apache-2.0 (repo license). Bundled catalog
files: CC BY 4.0 with per-entry upstream notices — see `content/LICENSE` and
each entry's `meta.yaml` provenance.
