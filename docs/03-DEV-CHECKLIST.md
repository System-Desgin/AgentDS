# Development Checklist — AgentDS v1

Phases map to PRD §11. Every box is a mergeable unit of work. Requirement IDs (F-x) reference `02-PRD.md`.

---

## Phase 0 — Foundation (Week 1)

> **Status (verified 2026-09-04):** the foundation and production infrastructure
> are live: Vercel serves the web app and branch previews; Dokploy serves the API
> and PostgreSQL; DNS and TLS are healthy; five workflows run from
> `.github/workflows/`; and `main` requires CI, gitleaks, one approval, and
> resolved conversations. Scheduling daily database backups and completing a
> restore drill remain owner-operated Phase 5 work.

### Repo & tooling
- [x] GitHub org + repo exist: `System-Desgin/AgentDS` (private during build; public since 2026-07-21)
- [x] Org slug verified against the live public repo (2026-07-21): it is `System-Desgin` — all install commands, badges, and links updated to match
- [x] Repo hygiene: LICENSE (Apache-2.0) at root + `content/LICENSE` (CC BY 4.0) + NOTICE, SECURITY.md (contact@oday-bakkour.com), README, `gitleaks` in pre-commit + CI, and protected `main` (PR, CI, one approval, resolved conversations)
- [x] Scaffold monorepo (`pnpm` workspaces + Turborepo): `apps/web`, `apps/api`, `packages/shared`, `packages/pipeline`, `content/`, `skills/`
- [x] Root configs: TypeScript strict (no `any`), ESLint + Prettier, `.editorconfig`, commitlint (conventional commits), husky pre-commit (lint-staged)
- [x] Add project `DESIGN.md` and `CLAUDE.md` to repo root (deliverables 5 & 6)
- [x] `.claude/` project config: `/generate-system <slug>` command (read-only tool allowlist) + settings; `ANTHROPIC_API_KEY` kept unset everywhere. A controlled headless benchmark confirmed `authMethod: claude.ai`, `subscriptionType: max`, `apiProvider: firstParty`, and no API-key presence before running.
- [x] `packages/shared`: zod schema for `meta.yaml`, shared types/DTOs, purpose-taxonomy constants (+ 14 schema tests)
- [x] GitHub Actions active under `.github/workflows/`: CI, content validation, gitleaks, Dokploy deploy, and scheduled/manual upstream verification

### Environments
- [x] Vercel project linked to `apps/web` (monorepo root + build filters); production and branch preview deployments verified
- [x] API container: multi-stage `Dockerfile` (node:22-alpine, non-root, `HEALTHCHECK` on `/v1/health`) + single `docker-compose.yml` (api + postgres, Traefik labels for Dokploy); deployed through the webhook workflow
- [~] PostgreSQL on Dokploy (dedicated DB + user, least privilege); production health reports `db: up` — _remaining owner actions: schedule daily backups and complete a restore drill_
- [x] Env management: `.env.example` per app + root compose env; secrets only in Vercel/Dokploy, never in Git
- [x] DNS on oday-bakkour.com: `agent-ds` points to Vercel and `api.agent-ds` to the Dokploy host; both domains serve valid Let's Encrypt HTTPS

## Phase 1 — Content pipeline + first 10 systems (Weeks 2–3)

> **Status (verified 2026-09-04):** the complete pipeline is exercised across 42
> published entries. Every entry has passing schema, lint, verification, and
> human QA gates. Figma's public HTML/CSS/SVG adapter recovered sufficient source
> evidence to close the final draft, and the protected content workflow passed.

### Pipeline (`packages/pipeline`) — F-6/F-7/F-8
- [x] `extract <slug>`: `npm-tokens` (fetch token JSON via jsDelivr — no tarball unpack), `repo-json` (raw JSON URLs), `css-analysis` (automated public HTML/CSS/SVG capture) → `tokens.raw.json` + provenance
- [x] Token normalizer: every extraction now persists bounded, source-derived `NormalizedTokens` candidates (colors/typography/rounded/spacing/components) plus coverage statistics; legacy raw payloads normalize at generation time. The versioned prompt receives the candidates, provenance, and author-owned guidance through tested placeholder rendering. _Generation + human QA own semantic role selection and `{token.ref}` cross-links — a compact DESIGN.md is a distillation, not a raw dump._
- [x] `generate <slug>`: guardrailed `claude -p` wrapper (asserts `ANTHROPIC_API_KEY` unset, `--max-turns` cap, read-only `--allowedTools`), prompt template + tokens → DESIGN.md; interactive alternative `/generate-system`. _Runs where the Claude CLI is installed; guardrail unit-tested._
- [x] `validate <slug>`: official linter (`design.md lint --format json`) + shared meta schema; persists `lint-report.json`; exits non-zero on errors
- [x] `export <slug>`: `tokens.json` (DTCG) + `tailwind.css` (Tailwind v4) via the official exporter; `bundle.zip` (+ `LICENSE-NOTICE.txt` with CC BY 4.0 attribution, upstream license/provenance, and Brand-Look disclaimer)
- [x] `new <slug>` scaffolder: folder + `meta.yaml` template + `QA.md` checklist template _(delivered in Phase 0)_
- [x] Prompt templates versioned in `packages/pipeline/prompts/` (Official + Brand-Looks; Brand-Looks injects the disclaimer header)

### First content batch (prove the pipeline end-to-end)
- [x] All 10 Official Tier-1 entries produced through the pipeline: **Carbon, Material 3, Primer, Fluent 2, Cloudscape, Ant Design, Paste, Flowbite, Orbit, Base Web**. Each: `new → extract → generate (/generate-system) → validate → export`, DESIGN.md **lints with 0 errors**, `tokens.json` + `tailwind.css` exported, `QA.md` with a token spot-check. **Published 2026-07-21** (owner-directed sign-off recorded in each QA.md; the open preview-render box was closed by rendering every entry through the Phase 3 renderer first). Grounding: Paste/Primer/Cloudscape/Carbon/Orbit extraction-grounded (JSON / CSS custom-props / safe JS-text regex); Material 3/Fluent 2/Ant/Flowbite/Base authored from documented canonical values (flagged in each QA for cross-check). Ant (3) and Orbit (1) carry accurate sub-AA contrast warnings for their vivid brand/status colours (documented, not hidden).
- [x] Verify every source link/package used through the live-source verifier. The 2026-09-04 sweep exposed two real upstream drifts (Linear and Raycast); `verify --fix` re-grounded them, and the refreshed branch then passed the full clean-checkout workflow ([run 33895585887](https://github.com/System-Desgin/AgentDS/actions/runs/33895585887)). Figma's expanded public HTML/CSS/SVG extraction subsequently grounded all 16 color roles (15 exact, 1 close) and passed the protected content workflow ([run 33899505985](https://github.com/System-Desgin/AgentDS/actions/runs/33899505985)).
- [x] Spot-check ≥10 tokens per system, recorded in each `QA.md`; every published entry has human sign-off and a passing `verify-report.json`

## Phase 2 — Backend API (Weeks 3–4) — F-4/F-5

> **Status (verified 2026-09-04):** the API is feature-complete, green, and live
> on Dokploy. Production health reports the database up; the public catalog
> serves 42 published entries, including DSFR's intentional restricted state.
> The suite contains 38 tests including Supertest e2e coverage.

- [x] NestJS scaffold (Express adapter): modules `systems`, `categories`, `events`, `ingest`, `health`; validation at the edge (shared zod schemas via `ZodValidationPipe` + global class-validator pipe), global exception filter with problem-details JSON (incl. proper 451 error name)
- [x] Prisma schema: `System`, `Category`, `SystemCategory`, `Counter`, `LintReport`; init migration checked in (`prisma/migrations/20260721091240_init`)
- [x] Ingest service: reads `CONTENT_DIR` (baked at `/app/content`, auto-resolved in dev), validates meta (shared zod) + lint report (zero errors) + front matter, pre-builds `bundle.zip`, computes per-artifact sha256 ETags, upserts, demotes entries missing from disk; runs on boot + `POST /internal/ingest` (bearer token, timing-safe compare + IP allowlist, outside `/v1`)
- [x] Endpoints per PRD table incl. raw-file responses with correct `Content-Type`, `ETag`/`If-None-Match` 304, `Cache-Control: public, max-age=300, stale-while-revalidate=86400`; `451` + JSON reason for restricted; pagination envelope `{data, meta}`; `limit` max 100
- [x] `@nestjs/throttler` (global 60/min, file routes 120/min via `@Throttle` override) + `helmet`; pino logging without bodies/IP retention; `trust proxy: 1` for correct per-IP limits behind Traefik
- [x] Swagger at `/docs`, spec at `/docs-json`; every endpoint tagged with operation summaries + examples
- [x] Counters: `POST /v1/events` {slug, type: download|copy|api_fetch} — 202, aggregate-only upsert; api_fetch also incremented server-side (fire-and-forget) on raw-file GETs
- [x] Tests: unit (services, guard, pipe, controller) + e2e (supertest) for list/detail/raw/304/404/429+Retry-After/451/events/ingest-auth; **96% stmts / 98.7% lines on `systems` module** (in-memory Prisma fake + content fixtures — no DB needed in CI)
- [x] Deploy to Dokploy; smoke-test from external network; confirm TLS, gzip/br, health checks, restart policy — **deployed + verified 2026-07-21** at `api.agent-ds.oday-bakkour.com` (Hetzner via Dokploy compose; `api.agent-ds` DNS is gray-cloud/DNS-only — Cloudflare Universal SSL can't cover a 2-level subdomain). External smoke test: health ok + db up, Let's Encrypt cert valid, 42 systems listed, 404 + 451 (DSFR reason JSON) correct, `ETag`/`If-None-Match` 304, `Cache-Control` as specced, throttle verified (70-burst → 59×200 + 11×429 with `Retry-After`). Fixed en route: `pnpm deploy --legacy` in the Dockerfile (pnpm 10 injected-workspace requirement, PR #6)

## Phase 3 — Frontend (Weeks 4–6) — F-1/F-2/F-3

> **Status (verified 2026-09-04):** the frontend is feature-complete and live on
> Vercel with branch previews. Production serves the catalog, detail and purpose
> pages, restricted state, metadata routes, and API-down bundled-content fallback.
> The fallback was also exercised from a production build with an unreachable API.
> Umami remains optional external infrastructure; its script slot is env-gated.

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

> **Status (verified 2026-09-04):** 27 Official systems and 15 Brand Looks are
> published. All 42 entries pass schema, `design.md lint`, source verification,
> and human QA. License findings:
> **Lexicon/Clay** and **Kyper** ship no public token code, and **Shopify
> Polaris** (first replacement candidate) was rejected because polaris-tokens
> v5+ carries a custom license restricting visually-similar third-party UIs —
> replaced with **Garden (Zendesk)** and **Gestalt (Pinterest)**, both verified
> permissive. **DSFR** ships `restricted: true` reference-only (code is
> etalab-2.0, identity reserved for the French state); **SLDS** ships normally
> under BSD-3-Clause with strict font/trademark notes.

- [x] Official +15 (delivered as +17 incl. the two restricted-handling entries): **Atlassian ADS, Spectrum, TDesign, Semi, Arco, Pajamas, Forma 36, Amplify UI, Vaadin Lumo, Backstage, Vitamin, Moon, Vibe (monday.com), Garden, Gestalt** + **SLDS, DSFR** — each passed the full publish workflow and live-source verification
- [x] Brand Looks ×15: **Stripe, Linear, Vercel, Notion, Spotify, Airbnb, Figma, Supabase, Raycast, Apple, NVIDIA, Discord, Netflix, GitHub.com, OpenAI** — all pass the complete publish workflow; Figma's public HTML/CSS/SVG adapter recovered 30 source colors and grounded all 16 published roles
- [x] Restricted-entry handling verified for DSFR + SLDS (PRD §12): DSFR is `restricted: true` reference-only with a 451 reason (API 451 path covered by the Phase 2 e2e suite); SLDS publishes under BSD-3-Clause with strict font-substitution + trademark notes
- [x] **Flip repo to public** — done 2026-07-21 by the owner; live at `github.com/System-Desgin/AgentDS` (org slug verified; all references updated)
- [x] `skills/` live in-repo: master `design-systems` skill (SKILL.md + 7 bundled archetypes + `fetch_design_md.sh|py` hitting `/v1`) + 7 flagship individual skills (carbon, material-3, primer, fluent-2, cloudscape, flowbite, ant-design)
- [~] Test installs on real agents: `npx skills add System-Desgin/AgentDS --skill design-systems` discovered all 8 skills and installed the master skill into isolated Claude Code and shared Cursor/Codex layouts (2026-09-04). Controlled same-prompt benchmarks improved design-system compliance from 0/7 to 5/7 in Codex and from 1/7 to 5/7 in Claude Code; all misses are disclosed with committed source evidence. _Remaining: repeat the behavioral benchmark in Cursor after its headless CLI is installed and authenticated._
- [x] README with skills.sh badges, compatibility matrix, legal disclaimer, and live skills.sh indexing. The listing reports Trust Hub Pass and Socket Pass; request a fresh Snyk scan after the checksum-hardening PR merges.

## Phase 5 — Hardening & launch (Week 8)

### Security review (own it — this is the brand)
- [x] Dependency audit: `pnpm audit --audit-level=high` reports no known vulnerabilities and GitHub reports zero open Dependabot alerts on `main` (verified 2026-09-04)
- [x] Web: full security-header set live (HSTS preload, nosniff, DENY framing, strict referrer, Permissions-Policy, COOP/CORP) + CSP locked to self/API/fonts. **Observatory: B+ (80, 9/10 tests)** — launch decision recorded 2026-09-05: retain SSG/ISR and accept the constrained `script-src 'unsafe-inline'` residual risk instead of abandoning static rendering for request-time nonces. API side: helmet, problem-details errors, throttler verified under load — done
- [x] Abuse test (2026-07-21): 600 requests at 62 rps against raw-file endpoints → 240 served (incl. 22 ETag 304s), 360 clean 429s, zero errors/5xx, p50 144ms, healthy after
- [~] Secrets rotation + backup/restore + deploy runbook documented in `docs/05-OPERATIONS.md` — _remaining owner actions: schedule the daily Postgres backup in Dokploy + one restore test; quarterly access review_
- [x] Pipeline output review (2026-09-04): all 42 published catalog DESIGN.md files pass schema/lint/sanitizer, verification, and QA checks; preview tests keep asserting script-free server markup

### Launch
- [x] Lighthouse ≥95 perf/a11y/SEO on home + 3 detail pages — **met** (mobile emulation, production, 2026-07-21): home **99**/96/100, carbon **98**/97/100, stripe **97**/97/100 (CLS 0), spectrum **96**/97/100. Two fixes en route: specimen-fonts stylesheet deferred off the critical path (was render-blocking, LCP 3.3s), then specimens clamped to one clipped line (font swap had introduced CLS 0.318)
- [x] 404/500 pages: 404 returns a real status; root `error.tsx` + `global-error.tsx` are styled to DESIGN.md
- [ ] Provision Uptime Kuma on Dokploy and configure owner alerting
- [x] Launch assets: channel-specific copy plus a reproducible, same-prompt Codex benchmark with exact prompt, run metadata, scored outputs, and an honest Carbon comparison image in `docs/assets/launch/`
- [~] Custom 1280×640 GitHub social preview asset is ready at `docs/assets/launch/github-social-preview.png`; _remaining owner action: upload it in the authenticated repository settings UI_
- [~] Publish and distribute: the repository, production app/API, and skills.sh listing are public; owner-authorized launch posts and appropriate awesome-list submissions remain
- [ ] Day-7 review: metrics vs PRD §10, bug triage, P1 backlog grooming

## Continuous (post-launch backlog seeds)

- [x] Weekly pipeline drift check: the scheduled/manual workflow detected Linear/Raycast drift, the ordered code → content → skill-integrity stack repaired it, and the final full live-source sweep—including newly published Figma—passed on merged `main` ([run 33900112329](https://github.com/System-Desgin/AgentDS/actions/runs/33900112329), 2026-09-04)
- [ ] Monthly: add 4–6 systems; refresh counters-based "most fetched" ordering
- [ ] P1 items from PRD §7.5 in priority order (compare view → collections → RSS)
