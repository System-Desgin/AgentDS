# Operations runbook — AgentDS

Secrets, rotation, backups, deploys, and incident basics. Written for the
owner; nothing here contains a secret value (CLAUDE.md rule 14).

## Secrets inventory

| Secret | Lives in | Used by | Rotation effect |
| --- | --- | --- | --- |
| `POSTGRES_PASSWORD` | Dokploy env (compose) | api ↔ postgres | Requires api restart; no external callers |
| `INGEST_TOKEN` | Dokploy env | `POST /internal/ingest` bearer | Only the owner calls this; rotate freely |
| `INGEST_IP_ALLOWLIST` | Dokploy env | ingest guard | Config, not secret; keep tight |
| `REVALIDATE_TOKEN` | Vercel env | `POST /api/revalidate` on web | Rotate together with whatever calls it |
| `DOKPLOY_WEBHOOK_URL` | GitHub Actions secret | `deploy.yml` redeploy trigger | Regenerate in Dokploy, update the secret |
| `NEXT_PUBLIC_UMAMI_SRC` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Vercel env | analytics script slot | Public-ish, not sensitive |

`ANTHROPIC_API_KEY` must never exist in any environment (CLAUDE.md rule 17).

## Rotation procedures

Rotate on: personnel/device change, suspected exposure, or every 6 months.

1. **Postgres password**: set the new value in Dokploy env → redeploy the
   compose stack (postgres picks it up only on a fresh volume; for an existing
   volume run `ALTER USER agentds WITH PASSWORD '...'` inside the postgres
   container first, then update the env and redeploy).
2. **INGEST_TOKEN / REVALIDATE_TOKEN**: generate (`openssl rand -hex 32`),
   update Dokploy/Vercel env, redeploy. No coordination needed beyond any
   personal scripts that call them.
3. **Dokploy webhook**: regenerate the deploy webhook in the Dokploy service,
   update the `DOKPLOY_WEBHOOK_URL` GitHub Actions secret.
4. **GitHub**: owner account uses 2FA; review org members and deploy keys
   quarterly (Settings → People / Deploy keys).

## Backups

- **What matters**: the Postgres volume (`pgdata`) holds counters and ingest
  state only — the catalog itself is in git and re-ingested from the image on
  every boot. Losing the DB loses download/fetch counters, nothing else.
- **Schedule**: Dokploy → database/volume backup, daily, retain 7.
- **Restore test** (do once after scheduling, then quarterly): restore the
  latest backup to a scratch database, `SELECT count(*) FROM "System";`
  should match the published catalog count.
- Web has no state; Vercel redeploys from git.

## Deploys

- **Web**: push/merge to `main` → Vercel Git integration deploys production.
- **API**: push/merge to `main` → `deploy.yml` POSTs the Dokploy webhook →
  image rebuild (content baked in) → boot runs `prisma migrate deploy` +
  full ingest. Manual alternative: Deploy button in Dokploy.
- **After content merges**: API redeploy re-ingests; then call the web
  revalidate webhook (or wait for ISR's 300s window).
- Never hand-edit the production DB (CLAUDE.md deployment notes).

## Health + verification

- API: `GET /v1/health` (uptime + db state) — wired to the container
  HEALTHCHECK and suitable for Uptime Kuma.
- Web: `GET /` (200) and `/systems` (200).
- Post-deploy smoke: list endpoint returns the expected system count; a
  restricted entry (dsfr) returns 451 on file routes; an unknown slug 404s.

## Incident basics

- API down: Dokploy → service logs; `docker compose ps` on the host; the web
  keeps serving bundled catalog files (graceful fallback) so the site stays up.
- Rate-limit complaints: throttle is 60/min general, 120/min file routes per
  IP — by design; check for abusive IPs in Traefik logs before raising limits.
- Suspected content problem: `pnpm validate:content` locally, fix, merge —
  the deploy pipeline republishes; entries can be demoted by removing them
  from `content/` (ingest demotes missing entries to draft).
