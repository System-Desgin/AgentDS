# Post-launch review — 2026-09-05

This is the first formal review after the 2026-07-21 public release. It was
completed on day 46, so it closes the overdue day-7 review and includes the
day-30 leading-indicator check. All measurements are aggregate and cookieless.

## Snapshot

| PRD measure | Observed | Assessment |
| --- | --- | --- |
| Published catalog | 42 systems; all 42 pass the offline publication gate | Met (target: 40+) |
| API fetch traffic | 13,658 lifetime `api_fetch` events, about 300/day over 45.56 days | Above the 200/day day-30 target, but includes site rendering, agents, crawlers, and test traffic |
| File copies/downloads | 4 copies + 2 downloads recorded | Far below the 1,000/month target |
| skills.sh | Listing live; badge reports 12 total installs | Organic installs exist, but distribution is still small |
| GitHub | 0 stars, 0 forks | Far below the 500-star day-90 target |
| Search | Home and Carbon pages are indexed; AgentDS was not observed in the first result set for the four target queries | Indexed, but target rankings are not yet demonstrated |
| Catalog → detail CTR | Unavailable | Umami is not provisioned |
| Detail → action rate | Unavailable | Umami is not provisioned; API counters alone have no page-view denominator |
| Returning-visitor share | Unavailable | Umami is not provisioned |

## Operational follow-up — 2026-09-05

- Self-hosted Umami is live at `analytics.agent-ds.oday-bakkour.com`; the
  `AgentDS` website is configured, both Vercel variables are present in
  Production and Preview, and an external browser verified successful
  `/script.js` and `/api/send` requests. Funnel measurements now have a
  denominator; meaningful trends begin with this date rather than being
  backfilled into the snapshot above.
- Uptime Kuma is live at `status.agent-ds.oday-bakkour.com`. Its 60-second
  monitors cover the home page, `/systems`, and `/v1/health`; all three were up
  with certificate-expiry checks and the owner notification assigned.
- Daily Postgres backups and the scratch restore drill remain intentionally
  deferred by the owner. No backup configuration was changed during this work.

The API rate is directional rather than a unique-user measure. The counter is
incremented for every successful raw-artifact response and intentionally stores
no IP, cookie, referrer, or user identity.

## Evidence collected

- `GET /v1/systems?limit=100` reported 42 published systems and 13,658 total
  fetches; the 42 detail responses reported 4 copy and 2 download events.
- `https://skills.sh/b/System-Desgin/AgentDS` reported 12 installs.
- GitHub's repository API reported 0 stars, 0 forks, no open issues, and no open
  Dependabot alerts.
- Search sampling covered `design system DESIGN.md`, `carbon DESIGN.md`,
  `material 3 DESIGN.md`, and `primer DESIGN.md`. Search results are not a
  substitute for Search Console, so the ranking observation is recorded as a
  snapshot rather than an exact position.
- Production web returned 200; API health returned `status: ok` and `db: up`.
- Main CI, gitleaks, the content publication gate, and Vercel deployment were
  green at the time of review.

## Bug triage

No user-filed issues exist yet. The repository and production checks exposed
and closed the actionable launch defects found during the review cycle:

- source-verification drift and Figma extraction coverage;
- dependency/workflow compatibility failures;
- benchmark evidence gaps for Codex and Claude Code;
- incomplete source-token normalization and unresolved generation placeholders;
- an empty-value bypass in the `ANTHROPIC_API_KEY` billing guard;
- an Actions “Deploy” job that was green while silently skipping deployment;
- the unresolved CSP grade-versus-static-rendering decision.

No known code-owned P0 defect remains open. Cursor's behavioral benchmark and
the deferred Postgres backup/restore work still require owner infrastructure.

## Decisions and next priorities

1. **Distribute before expanding.** The catalog is already above the 40-system
   launch target, while stars, explicit file actions, and skill installs are
   low. The GitHub social card was uploaded on 2026-09-05; publish the prepared
   launch posts before adding another large content batch.
2. **Restore the missing funnel denominator — completed 2026-09-05.**
   Cookieless Umami and both Vercel variables are live; collect a fresh funnel
   snapshot after enough post-install traffic exists.
3. **Finish operational safety — partially completed 2026-09-05.** Uptime Kuma
   owner alerts are live. Daily Postgres backups and one scratch restore remain
   deferred by the owner.
4. **Finish the agent benchmark matrix.** Authenticate Cursor CLI and run the
   existing same-prompt Carbon protocol without changing its evaluator.
5. **Then start P1.** Keep the PRD order: compare view, local collections, then
   RSS/JSON feeds. Do not start those features until launch measurement and
   operations are working.

The homepage and category pages already sort “most fetched” from live aggregate
counters, so that part of the monthly maintenance task is automatic.
