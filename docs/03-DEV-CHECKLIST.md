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
- [x] All 10 Official Tier-1 entries produced through the pipeline: **Carbon, Material 3, Primer, Fluent 2, Cloudscape, Ant Design, Paste, Flowbite, Orbit, Base Web**. Each: `new → extract → generate (/generate-system) → validate → export`, DESIGN.md **lints with 0 errors**, `tokens.json` + `tailwind.css` exported, `QA.md` with a token spot-check. **Published 2026-07-21** (owner-directed sign-off recorded in each QA.md; the open preview-render box was closed by rendering every entry through the Phase 3 renderer first). Grounding: Paste/Primer/Cloudscape/Carbon/Orbit extraction-grounded (JSON / CSS custom-props / safe JS-text regex); Material 3/Fluent 2/Ant/Flowbite/Base authored from documented canonical values (flagged in each QA for cross-check). Ant (3) and Orbit (1) carry accurate sub-AA contrast warnings for their vivid brand/status colours (documented, not hidden).
- [~] Verify every `04-DATA-SOURCES.md` link/package used. _Confirmed live and used: `@google/design.md` 0.3.0; `@twilio-paste/design-tokens`, `@primer/primitives`, `@cloudscape-design/design-tokens`, `@carbon/styles`, `@material/web`, `@fluentui/tokens`, `antd`, `flowbite`, `@kiwicom/orbit-design-tokens`, `baseui`._
- [~] Spot-check ≥10 tokens per system, recorded in each `QA.md` (extraction spot-checks where grounded; canonical cross-check list otherwise). _Final human verification is part of the QA sign-off._

## Phase 2 — Backend API (Weeks 3–4) — F-4/F-5

> **Status (2026-07-21, branch `phase-2`):** the API is feature-complete and
> green (`pnpm typecheck && lint && test && build`; 38 tests incl. supertest
> e2e). Prisma 7 uses the new `prisma-client` generator (client emitted into
> `src/generated`, compiled into dist — no runtime generate) + the
> `@prisma/adapter-pg` driver adapter; connection URL lives in
> `prisma.config.ts` (Prisma 7 requirement). Smoke-tested against a local
> Postgres 17: boot ingest ran 10/10 real entries, drafts 404 publicly,
> unauthenticated ingest 503. Remaining box: the **external Dokploy deploy**.

- [x] NestJS scaffold (Express adapter): modules `systems`, `categories`, `events`, `ingest`, `health`; validation at the edge (shared zod schemas via `ZodValidationPipe` + global class-validator pipe), global exception filter with problem-details JSON (incl. proper 451 error name)
- [x] Prisma schema: `System`, `Category`, `SystemCategory`, `Counter`, `LintReport`; init migration checked in (`prisma/migrations/20260721091240_init`)
- [x] Ingest service: reads `CONTENT_DIR` (baked at `/app/content`, auto-resolved in dev), validates meta (shared zod) + lint report (zero errors) + front matter, pre-builds `bundle.zip`, computes per-artifact sha256 ETags, upserts, demotes entries missing from disk; runs on boot + `POST /internal/ingest` (bearer token, timing-safe compare + IP allowlist, outside `/v1`)
- [x] Endpoints per PRD table incl. raw-file responses with correct `Content-Type`, `ETag`/`If-None-Match` 304, `Cache-Control: public, max-age=300, stale-while-revalidate=86400`; `451` + JSON reason for restricted; pagination envelope `{data, meta}`; `limit` max 100
- [x] `@nestjs/throttler` (global 60/min, file routes 120/min via `@Throttle` override) + `helmet`; pino logging without bodies/IP retention; `trust proxy: 1` for correct per-IP limits behind Traefik
- [x] Swagger at `/docs`, spec at `/docs-json`; every endpoint tagged with operation summaries + examples
- [x] Counters: `POST /v1/events` {slug, type: download|copy|api_fetch} — 202, aggregate-only upsert; api_fetch also incremented server-side (fire-and-forget) on raw-file GETs
- [x] Tests: unit (services, guard, pipe, controller) + e2e (supertest) for list/detail/raw/304/404/429+Retry-After/451/events/ingest-auth; **96% stmts / 98.7% lines on `systems` module** (in-memory Prisma fake + content fixtures — no DB needed in CI)
- [ ] Deploy to Dokploy; smoke-test from external network; confirm TLS, gzip/br, health checks, restart policy — _external: Dockerfile now bakes `content/`, generates the client at build, and runs `prisma migrate deploy` on boot; compose passes `INGEST_IP_ALLOWLIST`_

## Phase 3 — Frontend (Weeks 4–6) — F-1/F-2/F-3

> **Status (2026-07-21, branch `phase-3`):** frontend feature-complete and
> green (16/16 turbo tasks, no cache). Verified in the browser against the API
> serving fixture content (published entries): home, catalog with URL filters,
> detail with previews/viewer/tabs, restricted state, 404 status for unknown
> slugs (route-grouped loading boundary so `notFound()` resolves pre-stream),
> OG image, sitemap, llms.txt. Umami itself is external infra (Dokploy);
> the script slot is env-gated and ships dormant.

- [x] Design tokens from project `DESIGN.md` as Tailwind v4 theme (full palette incl. warning/error, radii, next/font-backed font stacks); base layout with skip link, nav, footer
- [x] Home page per DESIGN.md (hero thesis, path split, featured grid — hidden while catalog is empty, 3-step how-it-works, install command block with copy)
- [x] Catalog `/systems`: server components + URL-state filters (path toggle, q, category, license, sort, page — shareable URLs), search wired to API, skeleton/empty/error states, pagination
- [x] Token-preview renderer (`@agentds/shared/preview`): palette swatches with role + hex, type specimen (Google Fonts css2 loader + proprietary-font substitution map with system fallback), spacing bars, radius chips, component token table, catalog mini-palette — pure server-rendered, snapshot-tested against Official + Brand Look fixtures
- [x] Detail page `/systems/[slug]`: badges (lint-pass/restricted/license chips), previews from parsed front matter, shiki viewer on the code register (collapsible `<details>` + copy), actions (copy file / downloads / copy API URL / copy skills command), per-agent tabs ×6 (ARIA tablist), provenance + Brand-Look disclaimer blocks, restricted state without downloads
- [x] OG image route (`next/og`) — per-system share card from real tokens (name + palette + hex)
- [x] Static pages: `/what-is-design-md`, `/agents/[agent]` ×6 (claude-code, cursor, kiro, windsurf, codex, copilot), `/api`, `/about` (legal, licensing, privacy, contact)
- [x] SSG/ISR: `generateStaticParams` from API ∪ bundled content; `POST /api/revalidate` (bearer REVALIDATE_TOKEN) for ingest-triggered refresh; graceful fallback serving bundled `content/` files when the API is unreachable (`outputFileTracingIncludes`)
- [x] SEO: per-page metadata + OG, JSON-LD (`SoftwareSourceCode`) on detail, sitemap.xml, robots.txt, canonical URLs, llms.txt
- [~] Analytics: env-gated Umami script slot on web + copy/download events wired to `/v1/events` — _remaining: provision Umami on Dokploy and set the two env vars_
- [x] a11y: skip link, keyboard-operable tabs/forms, 2px accent `:focus-visible` rings, AA token pairs per DESIGN.md, `prefers-reduced-motion` disables the entrance fade

## Phase 4 — Content sprint + skills.sh (Weeks 6–8) — F-9

> **Status (2026-07-21, branch `phase-4`):** the in-repo work is delivered. 32
> new entries (17 Official incl. DSFR + SLDS, 15 Brand Looks) all pass schema +
> `design.md lint` (zero errors) + preview-render check; `validate-content` is
> green across all 42 entries and the full typecheck/lint/test/build gate
> passes. New entries are **`status: draft` pending human QA sign-off** (the
> non-negotiable gate); the 10 Tier-1 entries are published. License findings:
> **Lexicon/Clay** and **Kyper** ship no public token code, and **Shopify
> Polaris** (first replacement candidate) was rejected because polaris-tokens
> v5+ carries a custom license restricting visually-similar third-party UIs —
> replaced with **Garden (Zendesk)** and **Gestalt (Pinterest)**, both verified
> permissive. **DSFR** ships `restricted: true` reference-only (code is
> etalab-2.0, identity reserved for the French state); **SLDS** ships normally
> under BSD-3-Clause with strict font/trademark notes. Remaining boxes are
> **external**: flip the repo public, real-agent install tests (needs the
> public repo), and skills.sh indexing.

- [~] Official +15 (delivered as +17 incl. the two restricted-handling entries): **Atlassian ADS, Spectrum, TDesign, Semi, Arco, Pajamas, Forma 36, Amplify UI, Vaadin Lumo, Backstage, Vitamin, Moon, Vibe (monday.com), Garden, Gestalt** + **SLDS, DSFR** — each through `new → extract (or package-source verification, recorded per entry) → author → validate (0 errors) → export`, with grounding + license verification recorded in QA.md. _Drafts pending human QA sign-off._
- [~] Brand Looks ×15: **Stripe, Linear, Vercel, Notion, Spotify, Airbnb, Figma, Supabase, Raycast, Apple, NVIDIA, Discord, Netflix, GitHub.com, OpenAI** — each with the mandatory verbatim disclaimer, css-analysis provenance, AA-verified pairings, and a QA flag that values are canonical-not-captured pending the §5 manual CSS capture cross-check. _Drafts pending human QA sign-off._
- [x] Restricted-entry handling verified for DSFR + SLDS (PRD §12): DSFR is `restricted: true` reference-only with a 451 reason (API 451 path covered by the Phase 2 e2e suite); SLDS publishes under BSD-3-Clause with strict font-substitution + trademark notes
- [ ] **Flip repo to public** (Settings → Change visibility): review the full git history first — all of it becomes public; confirm LICENSE/SECURITY.md/README are in place — _external: owner action in GitHub settings_
- [x] `skills/` live in-repo: master `design-systems` skill (SKILL.md + 7 bundled archetypes + `fetch_design_md.sh|py` hitting `/v1`) + 7 flagship individual skills (carbon, material-3, primer, fluent-2, cloudscape, flowbite, ant-design)
- [ ] Test installs on real agents: Claude Code, Cursor, Codex — `npx skills add System-Design/AgentDS --skill design-systems` end-to-end, agent generates on-system UI — _external: requires the repo to be public first_
- [~] README with skills.sh badges, compatibility matrix, legal disclaimer — done; _remaining: submit/verify indexing on skills.sh once the repo is public_

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
