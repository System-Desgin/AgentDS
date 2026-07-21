# CLAUDE.md — AgentDS

Instructions for Claude Code working in this repository. Follow them exactly; when a rule here conflicts with a general habit, this file wins.

## Project identity

- **Name:** AgentDS · **Owner:** Oday Bakkour
- **Production:** web `https://agent-ds.oday-bakkour.com` (Vercel) · API `https://api.agent-ds.oday-bakkour.com` (Dokploy)
- **Repo:** `github.com/System-Desgin/AgentDS` — private during build, **public from Phase 4**. Treat every commit as world-readable from day one (the full history ships when visibility flips): no secrets, no client data, no internal Cyberpedia material, ever.
- **Skills install (public contract):** `npx skills add System-Desgin/AgentDS --skill design-systems`
- **Contact / security reports:** contact@oday-bakkour.com
- **Licensing:** code Apache-2.0 · catalog content (`content/`) CC BY 4.0 with per-entry upstream notices

## What this project is

AgentDS is a free catalog of agent-ready design system files: **Official Systems** (DESIGN.md files generated from real open-source token packages — Carbon, Material 3, Primer, Fluent 2, Cloudscape…) and **Brand Looks** (independent visual-language analyses of famous product sites). Users browse previews, copy/download files, hit a public fetch API, or install via skills.sh. Reference docs live in `docs/` (`01-PROJECT-IDEA.md`, `02-PRD.md`, `03-DEV-CHECKLIST.md`, `04-DATA-SOURCES.md`). The PRD is the source of truth for scope — do not add features it doesn't define without asking.

## Repository map

```
apps/web/          Next.js (App Router, RSC, Tailwind v4) — deployed on Vercel
apps/api/          NestJS (Express adapter) + Prisma + PostgreSQL — Docker on Dokploy
packages/shared/   zod schemas (meta.yaml, API DTOs), TS types, taxonomy constants, preview renderer
packages/pipeline/ Content CLI: extract | generate | validate | export | new  (+ prompts/)
content/
  official/<slug>/     DESIGN.md · meta.yaml · tokens.json · tailwind.css · QA.md
  brand-looks/<slug>/  same layout, disclaimer header mandatory
skills/            Agent Skills (SKILL.md) mirrored to the public skills repo
docs/              Project docs (idea, PRD, checklist, data sources)
DESIGN.md          THIS SITE'S own design system — read before any UI work
```

## Commands

```bash
pnpm install                 # root, pnpm workspaces
pnpm dev                     # turborepo: web + api in watch mode
pnpm dev --filter web        # frontend only (http://localhost:3000)
pnpm dev --filter api        # backend only (http://localhost:4000, swagger at /docs)
pnpm build                   # all apps/packages
pnpm lint && pnpm typecheck  # must pass before any commit
pnpm test                    # unit; pnpm test:e2e for api supertest suite
pnpm --filter api prisma migrate dev    # DB migrations (never edit applied migrations)
pnpm pipeline <cmd> <slug>   # extract | generate | validate | export | new
                             # generate = headless Claude Code (claude -p), versioned prompts,
                             # billed to the plan's Agent SDK credit — NO API key
/generate-system <slug>      # interactive alternative, run inside Claude Code
npx @google/design.md lint <file>       # official linter — gate for all content
```

## Non-negotiable rules

### UI / frontend
1. **Read `/DESIGN.md` before writing or changing any UI.** Use its tokens by name; never invent colors, radii, fonts, or spacing. New tokens require editing DESIGN.md first (then run the official linter on it).
2. Server Components by default; `"use client"` only for real interactivity. Preview cards (palette, type scale, spacing, radius) are pure server-rendered HTML/CSS from parsed YAML — no client JS to view them.
3. Accessibility is a feature: keyboard nav, visible focus (2px accent ring), WCAG AA contrast, `prefers-reduced-motion` respected. We badge other systems' WCAG results — failing it ourselves is a launch blocker.
4. Every catalog/detail page needs loading, empty, error, and (where applicable) restricted states.

### Backend / API
5. Public API is **read-only GET** under `/v1` + one token-gated `POST /internal/ingest`. Never add unauthenticated write routes.
6. Raw-file endpoints must send correct `Content-Type`, `ETag`, and `Cache-Control` headers; restricted entries return `451` with a JSON reason; rate-limited responses return `429` + `Retry-After`.
7. All input validated at the edge (zod/class-validator via global pipe). No stack traces or internal paths in production error bodies.
8. DB access only through Prisma; schema changes only via migrations; every list endpoint is paginated (`limit` max 100).

### Content
9. **Nothing publishes without:** `meta.yaml` passing the shared zod schema, `npx @google/design.md lint` with zero errors, and a human-signed `QA.md`. CI enforces this — never bypass or weaken the content workflow.
10. Official path: provenance is mandatory (package@version or repo@commit + extracted_at). Brand Looks: the disclaimer header is mandatory and injected by the pipeline — never remove it.
11. Never copy text from official design-system docs or competitor DESIGN.md collections into generated files. Prose is written fresh from tokens + paraphrased principles (see `docs/04-DATA-SOURCES.md` §6).
12. Never commit or serve proprietary font binaries (SF Pro, Segoe, Salesforce Sans, etc.). Use the substitution map in `packages/pipeline`; note the original family in prose only.
13. Published files are plain markdown: no HTML tags, no scripts, no external embeds. The pipeline sanitizer test in `packages/pipeline` must keep passing.

### Security & secrets
14. Secrets live only in Vercel/Dokploy env; `.env*` is gitignored; `.env.example` documents keys without values. Never print secrets in logs or commit history.
15. No PII anywhere: counters and analytics are aggregate and cookieless. Don't add tracking beyond the existing Umami + `/v1/events`.
16. Run `pnpm audit` after adding dependencies; prefer zero-dependency solutions for small utilities.
17. **Generation billing:** pipeline generation uses Claude Code under the owner's Max plan — interactive sessions draw plan limits; `claude -p` draws the plan's monthly Agent SDK credit. **Never set `ANTHROPIC_API_KEY` in any repo environment, script, or CI**: its presence silently reroutes `claude -p` billing to a pay-per-token API account.

## Conventions

- TypeScript strict everywhere; no `any` without an inline justification comment.
- Conventional commits (`feat:`, `fix:`, `content:`, `chore:`, `docs:`); one logical change per PR; PRs touching `content/` are content-only.
- Shared types/DTOs live in `packages/shared` — web and api import from there; never duplicate schema definitions.
- API responses use the `{ data, meta }` envelope; errors use problem-details shape `{ statusCode, error, message }`.
- File naming: kebab-case files, PascalCase React components, camelCase functions. Western digits only in all content and UI.
- Copy tone: plain, specific, active voice ("Copy file", "Download tokens.json") — see DESIGN.md writing rules.

## Testing expectations

- New API endpoints: unit tests for the service + e2e happy path, 404, and one failure mode (429/451 where relevant).
- Pipeline changes: run the full chain on one Tier-1 slug (`carbon`) and attach the lint report to the PR.
- UI: preview renderer gets snapshot tests against 2 fixture DESIGN.md files (one Official, one Brand Look).

## Deployment notes

- `apps/web`: Vercel Git integration — pushing `main` deploys production at `agent-ds.oday-bakkour.com`, PRs get previews. Env: `NEXT_PUBLIC_API_URL=https://api.agent-ds.oday-bakkour.com`.
- `apps/api`: Dokploy builds `apps/api/Dockerfile` on the `main` webhook, served at `api.agent-ds.oday-bakkour.com` (Traefik TLS). Multi-stage build, `node:22-alpine`, non-root user, `HEALTHCHECK` on `/v1/health`. Content in `content/` is baked into the image; ingest runs on boot.
- After content merges: API redeploy → ingest → call the web revalidate webhook. Never hand-edit the production DB.

## Definition of done

A task is done when: typecheck + lint + tests pass; states (loading/empty/error) exist for new UI; new UI matches DESIGN.md tokens; new endpoints appear in Swagger with examples; content changes carry lint report + QA sign-off; and the relevant box in `docs/03-DEV-CHECKLIST.md` can honestly be ticked.

## When unsure

Prefer asking over assuming for: scope beyond the PRD, license/restricted handling for a new system, changes to the public API contract, or edits to this file and DESIGN.md. Everything else: make the smallest correct change, follow the docs, ship.
