# PRD — AgentDS v1

**Status:** Draft 1.1 · **Owner:** Oday Bakkour · **Date:** 2026-07-02
**Identity:** AgentDS · web https://agent-ds.oday-bakkour.com · api https://api.agent-ds.oday-bakkour.com · repo github.com/System-Design/AgentDS (private during build → public at Phase 4) · contact contact@oday-bakkour.com · license: code Apache-2.0 / content CC BY 4.0
**Related docs:** `01-PROJECT-IDEA.md`, `03-DEV-CHECKLIST.md`, `04-DATA-SOURCES.md`, `DESIGN.md`, `CLAUDE.md`

---

## 1. Problem statement

Developers using coding agents (Claude Code, Cursor, Codex, Copilot, Windsurf, Kiro) get visually generic, inconsistent UI because agents lack design-system context. The open DESIGN.md format solves the mechanism, but there is no trustworthy library of the famous design systems in that format, no visual way to choose between them, and no programmatic source agents can fetch from. Every hour a developer spends re-prompting colors and spacing is the cost of this gap.

## 2. Goals

1. **G1 — Coverage:** 40+ published entries at launch (≥25 Official Systems from real token packages, ≥15 Brand Looks), each passing the official linter.
2. **G2 — Choose in under a minute:** a visitor can identify the right system for their use case via previews + purpose filters without opening a single file.
3. **G3 — Zero-friction adoption:** from detail page to "agent is using it" in ≤2 actions (copy file, or one CLI command).
4. **G4 — Programmatic canonical source:** public fetch API serving raw files with stable URLs, consumed by our skills.sh skill.
5. **G5 — Trust:** 100% of published files show a lint-pass badge and token provenance (Official path) or an independence disclaimer (Brand Looks path).

## 3. Non-goals (v1)

- **No accounts/auth, bookmarks, or comments** — free open catalog; personalization adds cost without validating core value.
- **No MCP server** — API-first now; MCP is a thin layer on the same data later (P2).
- **No live interactive component playgrounds** — static token/typography preview cards only (explicit product decision; playgrounds are a heavy per-system build).
- **No Arabic/RTL UI or content** — EN only for v1 (RTL adaptation notes per system are a P2 content idea).
- **No paid features** — fully free; monetization deliberately deferred.
- **No user-submitted files** — curation is the moat; community contribution flow is P2 (via GitHub PRs against the content repo, gated by CI lint + maintainer QA).

## 4. Personas

- **P1 — Agent-first developer ("vibe coder"):** builds with Claude Code/Cursor, wants a good-looking app in one prompt, doesn't know design vocabulary.
- **P2 — Product engineer at a team:** must make agent output match an adopted system (Carbon, Fluent, ADS). Cares about token accuracy and license.
- **P3 — Designer/founder evaluating systems:** browsing "what should our product look like"; previews and purpose descriptions matter most.
- **P4 — Tool/agent builder:** wants an API to pull design context into their own product or skill.

## 5. User stories (priority order)

- As an agent-first developer, I want to browse systems by purpose ("SaaS dashboard", "docs site", "e-commerce") so that I pick a fit without design knowledge.
- As an agent-first developer, I want a one-command install (`npx skills add …`) or a copy button for the raw file so that my agent uses it immediately.
- As a product engineer, I want to see exactly which npm package + version the tokens came from so that I can trust and audit the file.
- As a product engineer, I want per-agent setup snippets (CLAUDE.md reference, `.cursor/rules`, `.kiro/steering`, AGENTS.md) so that integration matches my tool.
- As a designer, I want palette, type scale, spacing, and radius previews rendered from the actual tokens so that I judge the look before downloading.
- As a designer, I want to filter by path (Official / Brand Looks), category, and license so that results match my constraints.
- As a tool builder, I want `GET /v1/systems/{slug}/design.md` with open CORS, ETags, and documented rate limits so that I can integrate reliably.
- As any visitor, I want to read what DESIGN.md is and how each agent consumes it so that I understand the workflow (SEO surface).
- As the maintainer, I want new entries to flow content-as-code (Git → CI lint → ingest) so that publishing is auditable and reversible.
- Edge: as a visitor on a restricted system (e.g., DSFR), I want a clear "reference only — license restricts use" state instead of a download button, so that I'm not misled.
- Edge: as an API consumer hitting rate limits, I want a `429` with `Retry-After` so that my client can back off cleanly.

## 6. Information architecture & content model

### 6.1 Pages (Next.js, `apps/web`)

| Route | Purpose |
|---|---|
| `/` | Home: thesis hero, path split (Official vs Brand Looks), featured systems, "how it works" 3 steps, live install command |
| `/systems` | Catalog: path toggle, search, filters (category, license, tags), sort (newest / most fetched), card grid with mini palette preview |
| `/systems/[slug]` | Detail page (see 7.2) |
| `/what-is-design-md` | Educational/SEO: the format, spec, YAML+prose model, linter |
| `/agents/[agent]` | Setup guide per agent: claude-code, cursor, kiro, windsurf, codex, copilot |
| `/api` | API landing → links to hosted OpenAPI/Swagger on the backend |
| `/about` | Project story, methodology, legal/disclaimers, licenses page |

### 6.2 Content entry (one folder per system in `content/`)

```
content/official/carbon/
├── DESIGN.md        # spec-compliant: YAML front matter + ordered ## sections
├── meta.yaml        # catalog metadata (below)
├── tokens.json      # DTCG export (generated: `design.md export --format dtcg`)
└── tailwind.css     # Tailwind v4 theme export (generated)
```

`meta.yaml` fields: `slug`, `name`, `path` (official|brand-look), `maker`, `summary` (≤140 chars), `description`, `categories[]` (purpose taxonomy), `tags[]`, `best_for[]`, `license` {spdx, url, notes}, `provenance` {source_type: npm|repo|css-analysis, package, version, repo, commit, extracted_at}, `restricted` (bool + reason), `links` {official_site, docs, figma, github}, `status` (draft|published), `spec_version`.

**Purpose taxonomy (v1, fixed list):** enterprise-dashboard, dev-tools, saas-product, e-commerce, docs-content, marketing-site, fintech, government, travel-consumer, data-dense, mobile-first, tailwind-native.

## 7. Requirements

### 7.1 Must-have (P0) — Catalog & detail

**F-1 Catalog page**
- [ ] Path toggle (Official / Brand Looks / All) persists in URL query.
- [ ] Full-text search over name/maker/summary/tags (Postgres `tsvector` is sufficient).
- [ ] Filters: category (multi), license (spdx), tags. Combinable; empty state with reset.
- [ ] Card shows: name, maker, one-line summary, 5-swatch mini palette + display-font initial rendered from tokens, path badge, category chips.
- [ ] Given filters are applied, when the user shares the URL, then the same filtered view loads.

**F-2 Detail page**
- [ ] Header: name, maker, path badge, lint-pass badge, license badge, "best for" line.
- [ ] Preview cards rendered **from the file's parsed YAML tokens at build time** (no screenshots): color palette with roles + hex, typography scale specimen (loaded via Google Fonts where licensed; system-font fallback otherwise), spacing scale bars, radius samples, component token table (button/card/input values).
- [ ] Raw file viewer: syntax-highlighted DESIGN.md with copy button; collapsible.
- [ ] Actions: Copy file · Download DESIGN.md · Download tokens.json · Download tailwind.css · Download bundle.zip · Copy API URL · Copy `npx skills add` command.
- [ ] Per-agent tabs with exact setup snippet for Claude Code, Cursor, Kiro, Windsurf, Codex/AGENTS.md.
- [ ] Provenance block (Official): package@version, repo link, extraction date. Disclaimer block (Brand Looks): "Independent analysis of publicly observable patterns; not affiliated with or endorsed by {maker}."
- [ ] Restricted entries: downloads/API disabled, explanatory notice shown (Given `restricted: true`, when the page renders, then no download/copy-file actions appear).
- [ ] Per-system OG image generated from tokens (name + palette) for link sharing.

**F-3 Counters**
- [ ] Downloads, file copies, and API fetches counted per system (fire-and-forget event to API; no PII, no cookies required).
- [ ] "Most fetched" sort uses these counters.

### 7.2 Must-have (P0) — Fetch API (`apps/api`, NestJS 11 + Express)

**F-4 Endpoints (all `GET`, JSON unless noted)**

| Endpoint | Returns |
|---|---|
| `/v1/systems` | Paginated list; query: `path`, `category`, `q`, `license`, `sort`, `page`, `limit` (max 100) |
| `/v1/systems/{slug}` | Full metadata + parsed token summary |
| `/v1/systems/{slug}/design.md` | Raw markdown, `text/markdown; charset=utf-8` |
| `/v1/systems/{slug}/tokens.json` | DTCG tokens |
| `/v1/systems/{slug}/tailwind.css` | Tailwind v4 theme |
| `/v1/systems/{slug}/bundle.zip` | Zip of the above + LICENSE-NOTICE.txt |
| `/v1/categories` | Taxonomy with counts |
| `/v1/health` | liveness/readiness |

- [ ] OpenAPI via `@nestjs/swagger` served at `/docs`; spec JSON at `/docs-json`.
- [ ] Open CORS for GET; `ETag`/`If-None-Match` + `Cache-Control: public, max-age=300, stale-while-revalidate=86400` on file endpoints.
- [ ] Rate limiting: `@nestjs/throttler` (e.g., 60 req/min/IP; file endpoints 120) + Dokploy/Traefik-level limit; `429` includes `Retry-After`.
- [ ] Restricted systems return `451` with a JSON reason on file endpoints.
- [ ] Versioned prefix `/v1`; breaking changes require `/v2`.

**F-5 Ingestion**
- [ ] `POST /internal/ingest` (token-authenticated, IP-allowlisted) re-syncs DB from the content directory baked into the API image; also runs on boot.
- [ ] Ingest validates: meta.yaml schema (zod), DESIGN.md lint pass recorded, slug uniqueness. Invalid entries are skipped with logged errors, never partially published.

### 7.3 Must-have (P0) — Content pipeline (`packages/pipeline`)

**F-6 Official-path extraction**
- [ ] CLI: `pnpm pipeline extract <slug>` → fetches the system's npm token package (per `04-DATA-SOURCES.md`), normalizes to the DESIGN.md YAML schema (colors/typography/rounded/spacing/components), writes provenance.
- [ ] Generation via **Claude Code, no API key**: interactive `/generate-system <slug>` project command, or `pnpm pipeline generate <slug>` wrapping headless `claude -p` with the versioned prompt template + normalized tokens + curated paraphrased guidance → prose sections in official order (Overview, Colors, Typography, Spacing, Components, Do's & Don'ts, Agent Prompt Guide). Headless runs bill to the Max plan's monthly Agent SDK credit. Guardrails: `ANTHROPIC_API_KEY` must be unset (its presence reroutes billing to an API account), `--max-turns` cap, read-only tool allowlist. Never copies source text verbatim.
- [ ] CLI: `pnpm pipeline validate <slug>` → runs `npx @google/design.md lint`, blocks on errors, stores the report.
- [ ] CLI: `pnpm pipeline export <slug>` → tokens.json (DTCG) + tailwind.css via the official CLI.

**F-7 Brand-Looks methodology**
- [ ] Documented, repeatable capture procedure (public CSS custom properties + computed styles of key elements), same generate/validate/export steps, mandatory disclaimer injected into the file header.

**F-8 Human QA gate**
- [ ] A `QA.md` checklist per entry (token spot-check against source, prose accuracy, license verified, fonts substitution correct, preview renders sane) must be checked in the PR before `status: published`.
- [ ] CI runs schema validation + linter on every PR touching `content/`.

### 7.4 Must-have (P0) — skills.sh distribution

**F-9 Skills distribution** (skills ship from `skills/` in the monorepo, which flips to **public at the start of Phase 4** — `npx skills add` requires a reachable public repo; a dedicated repo is optional later if leaderboard branding demands it)
- [ ] Master skill `design-systems`: SKILL.md (workflows: "use system X", "list systems", "create a DESIGN.md") + `references/` bundling 7 archetype systems + `scripts/fetch_design_md.(py|sh)` calling `GET https://api.agent-ds.oday-bakkour.com/v1/systems/{slug}/design.md`. Package ≤ ~100KB. Install: `npx skills add System-Design/AgentDS --skill design-systems`.
- [ ] 5–7 individual flagship skills (carbon, material-3, primer, fluent-2, cloudscape, flowbite, ant-design) — each a thin SKILL.md + bundled file, so they rank individually on the skills.sh leaderboard.
- [ ] README with install badges (`skills.sh/b/...`), agent compatibility list, disclaimer.

### 7.5 Nice-to-have (P1)

- Compare view: 2–3 systems side-by-side (palette/type/spacing).
- "Random system" + curated collections ("Best for dashboards", "Dark-first systems").
- RSS/JSON feed of new entries; simple changelog per system (`design.md diff` output).
- llms.txt on the site; sitemap-driven programmatic SEO pages per category.
- Copy-as: AGENTS.md snippet variant that inlines the file reference.

### 7.6 Future (P2 — design for, don't build)

- MCP server exposing the same catalog (thin layer over `/v1`).
- Community submissions via content-repo PRs with automated lint gate.
- Arabic/RTL: RTL adaptation notes per system; AR interface.
- Private/custom DESIGN.md generation service; team features.
- Live component playgrounds per system.

## 8. Non-functional requirements

- **Performance:** catalog + detail pages statically generated (SSG/ISR, revalidate on ingest webhook); LCP < 2.0s on 4G; preview cards are server-rendered HTML/CSS, zero client JS required to view.
- **SEO:** unique meta + OG per system, JSON-LD (`SoftwareSourceCode`/`Dataset`), sitemap, canonical URLs, `/what-is-design-md` as pillar content.
- **Accessibility:** WCAG 2.1 AA on the site itself (non-negotiable given we badge WCAG lint results); keyboard nav, visible focus, reduced-motion respected.
- **Security:** no user data collected; API is read-only public + one token-gated internal route; helmet + strict CSP on web; dependency audit in CI; abuse controls = throttler + proxy rate limits + bot-friendly caching (files are cheap to serve). Threat model note: content is plain markdown — pipeline must never emit HTML/script into published files.
- **Privacy/analytics:** cookieless analytics (e.g., self-hosted Umami/Plausible on Dokploy); counters are aggregate only.
- **Reliability:** API behind Dokploy with health checks + auto-restart; web on Vercel. If the API is down, the web app still serves cached/static file content (files also embedded at build) — degrade gracefully.
- **Licensing compliance:** project licensing (decided) — code Apache-2.0, catalog content CC BY 4.0 with per-entry upstream notices; per-entry SPDX + notes; bundle.zip always includes LICENSE-NOTICE.txt; no proprietary font binaries ever committed or served.

## 9. Tech stack (constraints, decided)

- **Frontend:** Next.js (latest stable, App Router, React Server Components), Tailwind CSS v4, shadcn/ui primitives, deployed on **Vercel** at `agent-ds.oday-bakkour.com`. Site styling follows the project's own `DESIGN.md` (dogfooding).
- **Backend:** NestJS (latest stable) on the **Express** adapter, TypeScript strict, Prisma ORM, **PostgreSQL**, containerized (Dockerfile) and deployed on **Dokploy** at `api.agent-ds.oday-bakkour.com` (Traefik + Let's Encrypt). Swagger for API docs. Optional Redis later for cache — not required v1 (ETag + CDN headers suffice).
- **Monorepo:** pnpm workspaces + Turborepo — `apps/web`, `apps/api`, `packages/shared` (zod schemas/types), `packages/pipeline`, `content/`, `skills/`.
- **CI/CD:** GitHub Actions — lint/typecheck/test, content validation (`design.md lint`), web auto-deploys via Vercel Git integration, API deploys via Dokploy webhook on main.

## 10. Success metrics

**Leading (weeks 1–4):** ≥1,000 file copies/downloads/mo; ≥200 API fetches/day by day 30; catalog→detail CTR ≥35%; detail→action (copy/download/API) ≥25%; skills.sh installs trending.
**Lagging (90 days):** goals in `01-PROJECT-IDEA.md` §9 (40+ systems, 500+ GitHub stars, top-10 SERP for 4+ target queries); returning-visitor share ≥20%.
**Measurement:** counters table + cookieless analytics; evaluate at day 30 and day 90.

## 11. Timeline & phasing

| Phase | Scope | Target |
|---|---|---|
| 0 | Monorepo, environments, CI, project DESIGN.md/CLAUDE.md in repo | Week 1 |
| 1 | Pipeline + first 10 Official entries end-to-end (extract→generate→lint→QA) | Weeks 2–3 |
| 2 | API complete on Dokploy; ingest; Swagger | Weeks 3–4 |
| 3 | Web: catalog, detail, previews, guides, SEO | Weeks 4–6 |
| 4 | Content sprint to 25 Official + 15 Brand Looks; skills repo live | Weeks 6–8 |
| 5 | Security pass, load test, launch (PH/HN/X + skills.sh) | Week 8 |

Dependencies: generation runs on the owner's Claude Max subscription via Claude Code — interactive sessions draw on plan limits, headless `claude -p` batches draw on the plan's monthly Agent SDK credit (no API key anywhere); DNS records for `agent-ds` and `api.agent-ds` under oday-bakkour.com.

## 12. Open questions

- **[Owner]** Google Fonts substitutions policy for systems with proprietary type (e.g., map SF Pro → Inter?) — proposal: always substitute + note the original family in prose. Non-blocking.
- **[Engineering]** Bundle.zip generation: pre-built at ingest vs on-demand — proposal: pre-built at ingest (cheap, cacheable). Non-blocking.
- **[Legal-lite]** Confirm per-entry handling for SLDS (Salesforce) and DSFR before publishing those two. Non-blocking for launch set.
