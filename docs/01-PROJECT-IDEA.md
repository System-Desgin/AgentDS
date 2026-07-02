# Project Idea — AgentDS

> **Name (confirmed):** AgentDS (Agent Design Systems)
> **Owner:** Oday Bakkour · **Domain:** https://agent-ds.oday-bakkour.com · **API:** https://api.agent-ds.oday-bakkour.com
> **GitHub:** https://github.com/System-Design/AgentDS (private during build → public at Phase 4) · **Install:** `npx skills add System-Design/AgentDS`
> **Contact:** contact@oday-bakkour.com · **License:** code Apache-2.0 · catalog content CC BY 4.0
> **One-liner:** A free, curated catalog of agent-ready design system files (DESIGN.md + tokens) with visual previews, purpose guidance, and a public fetch API — so any coding agent (Claude Code, Cursor, Codex, Copilot, Windsurf, Kiro…) can build UI that follows a real design system instead of generic AI defaults.

---

## 1. Problem

AI coding agents have no persistent awareness of design systems. Ask Claude Code or Cursor for a dashboard and you get default Tailwind blue, inconsistent spacing, and a different visual language on every screen. Google's answer is DESIGN.md — an open-sourced (Apache 2.0, April 2026) plain-markdown format combining machine-readable design tokens (YAML front matter) with human-readable rationale that agents load before generating UI.

The format exists. The tooling exists (`npx @google/design.md` — lint, diff, export). What's missing is a **trustworthy, complete, purpose-organized library** of the world's famous design systems in this format.

## 2. Market context (validated by research, June 2026)

| Player | What they offer | Weakness |
|---|---|---|
| **getdesign.md** (VoltAgent) | 300+ DESIGN.md "analyses" of brand **websites** (Apple, Nike, Stripe, BMW), preview pages, paid private requests | Reverse-engineered from public CSS, not real design systems. Their "IBM" file describes ibm.com's marketing site, not Carbon's actual tokens. |
| **designmd.app** | 461 open-source files organized by **aesthetic style/era** (Swiss, brutalism, Y2K) | Style templates, not real design systems. No token provenance. |
| **better-design.com** | MCP server + shadcn registry, 31 brand themes with component code | Requires MCP setup + API key; component-code focused, not file-first. |
| **Official channels** (Carbon MCP, shadcn MCP) | First-party agent access for a single system | One system each. No cross-system catalog, no DESIGN.md output. |
| **design.dev generator, Figma plugins** | Build/extract your own DESIGN.md | Tooling, not a library. |

**Demand signal:** design skills dominate skills.sh — `anthropics/skills/frontend-design` is the #2 skill ecosystem-wide (~611K installs).

## 3. The gap we own

Nobody offers **the famous, official design systems** — Material 3, Carbon, Primer, Fluent 2, Cloudscape, Atlassian ADS, Ant, Paste, Orbit, Flowbite, TDesign, Semi, Arco, Pajamas, Base, Spectrum… — as DESIGN.md files **built from their real, published open-source token packages** (`@carbon/themes`, `@primer/primitives`, `@cloudscape-design/design-tokens`, …). That means exact values, verifiable provenance, and a clean license story — the opposite of CSS scraping.

And nobody bundles the four things users actually need in one place:

1. **Two paths, visitor's choice:**
   - **Official Systems** — real design systems from real tokens (our differentiator).
   - **Brand Looks** — visual-language analyses of famous product sites (the getdesign.md category, done with our quality pipeline).
2. **Purpose guidance** — "which system for which job": enterprise dashboards → Carbon/Cloudscape/Ant; dev tools → Primer/Pajamas; travel → Orbit; Tailwind-native → Flowbite; data-dense Asia-market apps → TDesign/Semi/Arco.
3. **Static visual previews** rendered from the tokens themselves — palette swatches, type scale, spacing/radius, component token cards — so users see the system before downloading a single byte.
4. **Every consumption path per system:** view → copy → download DESIGN.md → download tokens.json (DTCG) / Tailwind config → per-agent setup snippet (Claude Code, Cursor, Kiro, Windsurf, AGENTS.md) → raw fetch-API URL → `npx skills add` (via our skills.sh repo).

## 4. Trust as the brand

Skill/file registries have a documented quality problem (security audits found ~6.3 issues per skill on average across major registries; prompt injection found in a third of tested skills in one study). Our counter-position:

- Every published file **passes `npx @google/design.md lint`** (structure, broken token refs, WCAG AA contrast) — badge shown on every detail page.
- Every Official System file lists its **token provenance** (npm package + version + repo commit).
- Every file goes through a **human QA checklist** before publish.
- Plain-text markdown only — no scripts, no executables, nothing injectable.

This maps directly onto the Cyberpedia security reputation without needing the Cyberpedia name on the front door.

## 5. Product pillars (v1)

1. **Catalog website** — dual-path browse (Official / Brand Looks), search, filters (purpose category, license, tags), detail pages with preview cards.
2. **Downloads** — raw DESIGN.md, tokens.json, Tailwind config, zip bundle. Copy-to-clipboard everywhere.
3. **Public fetch API** — versioned REST (`/v1/systems/{slug}/design.md` …), open CORS, rate-limited, OpenAPI docs. This is what our skills.sh skill's fetch script calls — the site becomes the canonical source.
4. **skills.sh distribution** — one public GitHub repo: a master `design-systems` skill (bundles ~7 archetype systems + fetch script for the rest) plus individual skills for flagship systems so each ranks on the leaderboard.
5. **Content pipeline** — hybrid: automated extraction (npm tokens / CSS capture → DESIGN.md generation via Claude Code → official linter) + mandatory human QA. Content lives in Git ("content-as-code"), the API ingests it.

## 6. Business model

**Fully free.** Value returned as: SEO/authority asset, skills.sh leaderboard presence, GitHub stars (awesome-design-md hit #150 on GitHub globally — the category compounds), and an audience for future optional layers (explicitly out of scope for v1: private conversions, MCP server, team features).

## 7. Audience

- Developers using coding agents who want non-generic UI in one prompt ("vibe coders" included).
- Teams standardizing agent output on a known system (e.g., internal tools on Carbon or Fluent).
- Designers evaluating which established system fits a new product.
- Agent/tool builders who want a reliable programmatic source of design context.

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Trademark/brand-identity claims | Official path uses Apache-2.0/MIT token packages with attribution; Brand Looks carry explicit "independent analysis, not affiliated" disclaimers (industry-standard pattern). Never redistribute proprietary font files. Per-system license page. |
| Restricted systems (e.g., DSFR limits identity use to the French state; SLDS has its own license) | License-gate: some systems are "reference/educational" pages without one-click download, or excluded. Tracked per-entry in `meta.yaml`. |
| DESIGN.md spec is alpha and may change | Pipeline regenerates from stored normalized tokens; `design.md diff` in CI catches regressions; version field tracked per file. |
| Competitor velocity (VoltAgent ships fast) | Our lane (official systems + purpose guidance + API) is structurally different; quality/linting bar is the moat, not count. |
| Content accuracy drift as systems update | Provenance pinning (package version) + scheduled re-extraction checks in pipeline. |

## 9. Success definition (first 90 days after launch)

- 40+ published systems (25 Official + 15 Brand Looks), 100% linter-pass.
- 1,000+ file downloads/copies per month; measurable API fetch traffic from the skill.
- skills.sh listing live with organic installs; GitHub repo ≥ 500 stars.
- Top-10 Google result for "design system DESIGN.md" and 3+ system-name queries ("carbon DESIGN.md", "material 3 DESIGN.md").

## 10. Identity (decided 2026-07-02)

| Field | Value |
|---|---|
| Product name | **AgentDS** |
| Owner | Oday Bakkour |
| Web (production) | https://agent-ds.oday-bakkour.com (Vercel) |
| API (production) | https://api.agent-ds.oday-bakkour.com (Dokploy) |
| GitHub org / repo | `System-Design` / `AgentDS` — private during build, public from Phase 4 launch |
| Skills install | `npx skills add System-Design/AgentDS --skill design-systems` |
| Contact / security | contact@oday-bakkour.com |
| License | Code: Apache-2.0 · Catalog content: CC BY 4.0 (+ per-entry upstream notices) |
| Generation runtime | Claude Code on the owner's Max plan (interactive = plan limits; headless `claude -p` = the plan's monthly Agent SDK credit — no API key) |

Org slug corrected to `System-Design` on 2026-07-02 — the install command, badges, and URLs above are final.
