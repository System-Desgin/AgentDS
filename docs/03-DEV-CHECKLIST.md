# Development Checklist — AgentDS v1

Phases map to PRD §11. Every box is a mergeable unit of work. Requirement IDs (F-x) reference `02-PRD.md`.

---

## Phase 0 — Foundation (Week 1)

### Repo & tooling
- [x] GitHub org + repo exist: `System-Design/AgentDS` (private)
- [x] Org slug corrected to `System-Design` (2026-07-02) — install command is final
- [ ] Repo hygiene (repo stays **private during build**): LICENSE (Apache-2.0) at root + `content/LICENSE` (CC BY 4.0) + NOTICE, SECURITY.md (contact@oday-bakkour.com), README stub, branch protection on `main` (PR + CI required); GitHub's free secret-scanning/push-protection covers public repos only → add `gitleaks` to pre-commit + CI from day one
- [ ] Scaffold monorepo (`pnpm` workspaces + Turborepo): `apps/web`, `apps/api`, `packages/shared`, `packages/pipeline`, `content/`, `skills/`
- [ ] Root configs: TypeScript strict, ESLint + Prettier, `.editorconfig`, commitlint (conventional commits), husky pre-commit (lint-staged)
- [ ] Add project `DESIGN.md` and `CLAUDE.md` to repo root (deliverables 5 & 6)
- [ ] `.claude/` project config: `/generate-system <slug>` command + settings (read-only tool allowlist); verify a headless `claude -p` test run bills to the plan's monthly Agent SDK credit — **never set `ANTHROPIC_API_KEY` in any environment**
- [ ] `packages/shared`: zod schema for `meta.yaml`, shared types, purpose-taxonomy constants
- [ ] GitHub Actions: `ci.yml` (install → typecheck → lint → test) on PR; `content.yml` (meta schema validation + `npx @google/design.md lint` on `content/**` changes)

### Environments
- [ ] Vercel project linked to `apps/web` (monorepo root + build filters); preview deployments on PR
- [ ] Dokploy app for `apps/api`: Dockerfile (multi-stage, node:22-alpine, non-root user), health check on `/v1/health`, auto-deploy webhook from `main`
- [ ] PostgreSQL on Dokploy (dedicated DB + user, least privilege); connection via env; automated daily backup + tested restore
- [ ] Env management: `.env.example` per app; secrets only in Vercel/Dokploy, never in Git
- [ ] DNS on oday-bakkour.com: `agent-ds` CNAME → Vercel, `api.agent-ds` A/AAAA → Dokploy host; attach both domains (Vercel project + Dokploy/Traefik with Let's Encrypt); verify HTTPS on both

## Phase 1 — Content pipeline + first 10 systems (Weeks 2–3)

### Pipeline (`packages/pipeline`) — F-6/F-7/F-8
- [ ] `extract <slug>`: source adapters — `npm-tokens` (fetch package tarball, parse token JSON/JS), `repo-json` (raw GitHub token files), `css-analysis` (Brand Looks; documented capture procedure) → normalized token model + provenance
- [ ] Token normalizer: map source tokens → DESIGN.md schema (colors with semantic roles, typography scale, rounded, spacing, components) with `{token.ref}` cross-links
- [ ] `generate <slug>`: wraps headless Claude Code (`claude -p`) with the versioned prompt template (tokens + curated paraphrased guidance) → prose sections in official order; guardrails: assert `ANTHROPIC_API_KEY` unset, `--max-turns` cap, read-only tool allowlist; interactive alternative: `/generate-system <slug>`; never copies source text verbatim
- [ ] `validate <slug>`: run `npx @google/design.md lint`, fail on errors, persist report JSON next to entry
- [ ] `export <slug>`: `tokens.json` (DTCG) + `tailwind.css` via official CLI; `bundle.zip` builder incl. `LICENSE-NOTICE.txt`
- [ ] `new <slug>` scaffolder: folder + `meta.yaml` template + `QA.md` checklist template
- [ ] Prompt templates versioned in `packages/pipeline/prompts/` (Official vs Brand-Looks variants; Brand-Looks injects disclaimer header)

### First content batch (prove the pipeline end-to-end)
- [ ] Official ×10: Carbon, Material 3, Primer, Fluent 2, Cloudscape, Ant Design, Paste, Flowbite, Orbit, Base — each: extract → generate → validate → export → human QA (`QA.md` signed) → `status: published`
- [ ] Verify every `04-DATA-SOURCES.md` link/package used (URLs from research may have drifted — confirm at build time)
- [ ] Spot-check 10 tokens per system against the official docs; record in QA.md

## Phase 2 — Backend API (Weeks 3–4) — F-4/F-5

- [ ] NestJS scaffold (Express adapter): modules `systems`, `categories`, `events`, `ingest`, `health`; global validation pipe (zod or class-validator), global exception filter with problem-details JSON
- [ ] Prisma schema: `System`, `Category`, `SystemCategory`, `Counter`, `LintReport`; migrations checked in
- [ ] Ingest service: read `content/` (baked into image), validate, upsert DB, mark missing entries unpublished; run on boot + `POST /internal/ingest` (bearer token + IP allowlist)
- [ ] Endpoints per PRD table incl. raw-file responses with correct `Content-Type`, `ETag`, `Cache-Control`; `451` for restricted; pagination envelope `{data, meta}`
- [ ] `@nestjs/throttler` (global 60/min, file routes 120/min) + `helmet`; request logging (pino) without IP retention beyond rate-limit window
- [ ] Swagger at `/docs`, spec at `/docs-json`; tag + example every endpoint
- [ ] Counters: `POST /v1/events` {slug, type: download|copy|api_fetch} — fire-and-forget, aggregate only; api_fetch also incremented server-side on raw-file GETs
- [ ] Tests: unit (services), e2e (supertest) for list/detail/raw/429/451 paths; ≥80% on `systems` module
- [ ] Deploy to Dokploy; smoke-test from external network; confirm TLS, gzip/br, health checks, restart policy

## Phase 3 — Frontend (Weeks 4–6) — F-1/F-2/F-3

- [ ] Implement design tokens from project `DESIGN.md` as Tailwind v4 theme; base layout, nav, footer
- [ ] Home page per DESIGN.md (hero thesis, path split, featured grid, 3-step how-it-works, install command block)
- [ ] Catalog `/systems`: server components + URL-state filters (F-1 acceptance criteria), search wired to API, skeleton/empty/error states
- [ ] Token-preview renderer (`packages/shared/preview`): parse YAML front matter → palette swatches, type specimen (Google Fonts loader with fallback map), spacing bars, radius chips, component token table — pure server-rendered
- [ ] Detail page `/systems/[slug]`: all F-2 items — badges, previews, syntax-highlighted viewer (shiki), action buttons, per-agent snippet tabs, provenance/disclaimer blocks, restricted state
- [ ] OG image route (`next/og`) generating per-system share cards from tokens
- [ ] Static pages: `/what-is-design-md`, `/agents/[agent]` ×6, `/api`, `/about` (incl. legal + per-license notes)
- [ ] SSG/ISR: `generateStaticParams` from API at build; revalidate webhook triggered by ingest; graceful fallback when API unreachable (files bundled at build)
- [ ] SEO: metadata, JSON-LD, sitemap.xml, robots.txt, canonical; llms.txt (P1 but cheap — do it)
- [ ] Analytics: self-hosted Umami on Dokploy, script on web; wire copy/download events to `/v1/events`
- [ ] a11y pass: keyboard nav, focus rings, contrast (ironic failure here is unacceptable), reduced motion

## Phase 4 — Content sprint + skills.sh (Weeks 6–8) — F-9

- [ ] Official +15: Atlassian ADS, TDesign, Semi, Arco, Pajamas, Spectrum, Forma 36, Amplify UI, Vaadin, Backstage, Vitamin, Moon, Monday, Lexicon/Clay, Kyper (adjust per license findings)
- [ ] Brand Looks ×15: pick high-search-volume names not requiring restricted assets (e.g., Stripe, Linear, Vercel, Notion, Spotify, Airbnb, Figma, Supabase, Raycast, Apple, NVIDIA, Discord, Netflix, GitHub.com, OpenAI) — each with mandatory disclaimer
- [ ] Restricted-entry handling verified for DSFR + SLDS (reference-only pages or exclusion; PRD §12)
- [ ] **Flip repo to public** (Settings → Change visibility): review the full git history first — all of it becomes public; confirm LICENSE/SECURITY.md/README are in place
- [ ] `skills/` live in-repo: master `design-systems` skill (SKILL.md + 7 bundled archetypes + fetch script hitting `/v1`) + 5–7 flagship individual skills
- [ ] Test installs on real agents: Claude Code, Cursor, Codex — `npx skills add System-Design/AgentDS --skill design-systems` end-to-end, agent generates on-system UI
- [ ] README with skills.sh badges, compatibility matrix, legal disclaimer; submit/verify indexing on skills.sh

## Phase 5 — Hardening & launch (Week 8)

### Security review (own it — this is the brand)
- [ ] Dependency audit (`pnpm audit`, `osv-scanner`) clean or triaged
- [ ] Web: CSP (no unsafe-inline), security headers scored A on observatory; API: helmet, no stack traces in prod errors, throttler verified under load
- [ ] Abuse test: hammer raw-file endpoints; confirm CDN/proxy caching absorbs, 429 behavior correct
- [ ] Secrets rotation documented; Dokploy + DB access reviewed; backups restore-tested
- [ ] Pipeline output review: confirm no HTML/script can pass into published markdown (sanitizer test cases)

### Launch
- [ ] Lighthouse ≥95 perf/a11y/SEO on home + 3 detail pages
- [ ] 404/500 pages, uptime monitoring (Uptime Kuma on Dokploy) + alerting
- [ ] Launch assets: demo GIF (prompt → on-system UI), comparison screenshot (default AI UI vs with DESIGN.md), copy for PH/HN/X/LinkedIn
- [ ] Publish, submit to skills.sh visibility channels, awesome-lists PRs where appropriate
- [ ] Day-7 review: metrics vs PRD §10, bug triage, P1 backlog grooming

## Continuous (post-launch backlog seeds)

- [ ] Weekly pipeline drift check: re-extract published Official systems, `design.md diff`, open PR if tokens changed
- [ ] Monthly: add 4–6 systems; refresh counters-based "most fetched" ordering
- [ ] P1 items from PRD §7.5 in priority order (compare view → collections → RSS)
