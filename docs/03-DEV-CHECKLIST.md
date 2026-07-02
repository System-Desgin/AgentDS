# Development Checklist — AgentDS v1

Phases map to PRD §11. Every box is a mergeable unit of work. Requirement IDs (F-x) reference `02-PRD.md`.

---

## Phase 0 — Foundation (Week 1)

> **Status (2026-07-02, branch `phase-0`):** all in-repo foundation delivered and
> verified green (`pnpm typecheck && pnpm lint && pnpm test && pnpm build`, audit
> clean at `--audit-level=high`, API boots and serves `/v1/health` with helmet +
> throttler + Swagger). Remaining Phase 0 items are **external infra that must be
> configured manually** in the respective dashboards: GitHub branch protection,
> Vercel project link, Dokploy app + Postgres provisioning + deploy webhook, and
> DNS. The GitHub Actions workflows are authored + verified but staged under
> `ci/` (not `.github/workflows/`) because the push token lacks the `workflow`
> scope — activate by moving them into `.github/workflows/` (see `ci/README.md`).
> Toolchain notes: pnpm **catalog** centralizes versions; ESLint pinned to
> latest 9.x (the Next lint config + typescript-eslint 8 don't support ESLint 10
> yet); TS 6 uses `ignoreDeprecations: "6.0"` for `node10` resolution; Prisma is
> scaffolded (datasource/generator only) — models + migrations are Phase 2.

### Repo & tooling
- [x] GitHub org + repo exist: `System-Design/AgentDS` (private)
- [x] Org slug corrected to `System-Design` (2026-07-02) — install command is final
- [x] Repo hygiene: LICENSE (Apache-2.0) at root + `content/LICENSE` (CC BY 4.0) + NOTICE, SECURITY.md (contact@oday-bakkour.com), README, `gitleaks` in pre-commit + CI — _remaining: enable branch protection on `main` (PR + CI required) in GitHub settings_
- [x] Scaffold monorepo (`pnpm` workspaces + Turborepo): `apps/web`, `apps/api`, `packages/shared`, `packages/pipeline`, `content/`, `skills/`
- [x] Root configs: TypeScript strict (no `any`), ESLint + Prettier, `.editorconfig`, commitlint (conventional commits), husky pre-commit (lint-staged)
- [x] Add project `DESIGN.md` and `CLAUDE.md` to repo root (deliverables 5 & 6)
- [x] `.claude/` project config: `/generate-system <slug>` command (read-only tool allowlist) + settings; `ANTHROPIC_API_KEY` kept unset everywhere — _remaining: one-time manual check that a headless `claude -p` run bills to the plan's Agent SDK credit_
- [x] `packages/shared`: zod schema for `meta.yaml`, shared types/DTOs, purpose-taxonomy constants (+ 14 schema tests)
- [x] GitHub Actions: `ci.yml` (install → typecheck → lint → test → build → audit + gitleaks) on PR/push; `content.yml` (meta schema validation + `npx @google/design.md lint` on `content/**`); `deploy.yml` (Dokploy webhook trigger) — _authored + verified; staged in `ci/` pending a `workflow`-scoped push to `.github/workflows/` (see `ci/README.md`)_

### Environments
- [ ] Vercel project linked to `apps/web` (monorepo root + build filters); preview deployments on PR — _external: configure in Vercel dashboard_
- [x] API container: multi-stage `Dockerfile` (node:22-alpine, non-root, `HEALTHCHECK` on `/v1/health`) + single `docker-compose.yml` (api + postgres, Traefik labels for Dokploy) — _remaining: create the Dokploy app + auto-deploy webhook from `main`_
- [ ] PostgreSQL on Dokploy (dedicated DB + user, least privilege); connection via env; automated daily backup + tested restore — _external: provision in Dokploy (compose defines the `postgres` service)_
- [x] Env management: `.env.example` per app + root compose env; secrets only in Vercel/Dokploy, never in Git
- [ ] DNS on oday-bakkour.com: `agent-ds` CNAME → Vercel, `api.agent-ds` A/AAAA → Dokploy host; attach both domains (Vercel project + Dokploy/Traefik with Let's Encrypt); verify HTTPS on both — _external: DNS + dashboards_

## Phase 1 — Content pipeline + first 10 systems (Weeks 2–3)

> **Status (branch `phase-1`):** the pipeline **engine** is built, tested, and
> proven end-to-end on a real package (Paste): `extract → validate → export` run
> against `@twilio-paste/design-tokens` produce `tokens.raw.json`, a passing
> `lint-report.json`, and `tokens.json` + `tailwind.css` + `bundle.zip`. Uses the
> official `@google/design.md` linter/exporter via its bundled CLI. **Generating
> the 10 systems' prose is the remaining content effort** — it needs the Claude
> Code runtime (`claude -p`, no API key) plus human QA sign-off, which can't be
> produced autonomously here.

### Pipeline (`packages/pipeline`) — F-6/F-7/F-8
- [x] `extract <slug>`: `npm-tokens` (fetch token JSON via jsDelivr — no tarball unpack), `repo-json` (raw JSON URLs), `css-analysis` (Brand Looks: prints the documented manual-capture procedure) → `tokens.raw.json` + provenance
- [~] Token normalizer: `NormalizedTokens` model + `buildFrontMatter` (model → DESIGN.md front matter) + a DTCG/plain-map flattener. _The full source→compact-DESIGN.md curation (semantic role mapping, `{token.ref}` cross-links) is done during generate + QA — a compact DESIGN.md is a distillation, not a raw dump._
- [x] `generate <slug>`: guardrailed `claude -p` wrapper (asserts `ANTHROPIC_API_KEY` unset, `--max-turns` cap, read-only `--allowedTools`), prompt template + tokens → DESIGN.md; interactive alternative `/generate-system`. _Runs where the Claude CLI is installed; guardrail unit-tested._
- [x] `validate <slug>`: official linter (`design.md lint --format json`) + shared meta schema; persists `lint-report.json`; exits non-zero on errors
- [x] `export <slug>`: `tokens.json` (DTCG) + `tailwind.css` (Tailwind v4) via the official exporter; `bundle.zip` (+ `LICENSE-NOTICE.txt` with CC BY 4.0 attribution, upstream license/provenance, and Brand-Look disclaimer)
- [x] `new <slug>` scaffolder: folder + `meta.yaml` template + `QA.md` checklist template _(delivered in Phase 0)_
- [x] Prompt templates versioned in `packages/pipeline/prompts/` (Official + Brand-Looks; Brand-Looks injects the disclaimer header)

### First content batch (prove the pipeline end-to-end)
- [~] Pipeline proven end-to-end on a real package (Paste: extract → validate → export). _Publishing the 10 Official systems (Carbon, Material 3, Primer, Fluent 2, Cloudscape, Ant Design, Paste, Flowbite, Orbit, Base) needs the generation runtime + signed `QA.md` per entry — content effort, not autonomously producible here._
- [ ] Verify every `04-DATA-SOURCES.md` link/package used (URLs from research may have drifted — confirm at build time). _Confirmed live: `@google/design.md` (0.3.0), Carbon/Material/Primer/Cloudscape/Paste token packages all resolve._
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
