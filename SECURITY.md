# Security Policy

Security and trust are the brand of AgentDS. We take reports seriously and
respond quickly.

## Reporting a vulnerability

Please report suspected vulnerabilities privately to:

**contact@oday-bakkour.com**

Include, where possible:

- A description of the issue and its impact.
- Steps to reproduce (proof-of-concept, affected URL/endpoint, or file).
- The component: `apps/web`, `apps/api`, `packages/*`, published `content/`, or
  the `skills/` distribution.

Please do **not** open a public issue for security reports, and please do not
run automated scanning against the production hosts (`agent-ds.oday-bakkour.com`,
`api.agent-ds.oday-bakkour.com`) beyond what is necessary to demonstrate an
issue.

We aim to acknowledge reports within 3 business days and to provide a
remediation timeline after triage.

## Scope

In scope:

- The web app, public read-only API, content pipeline, and shared packages.
- Integrity of published catalog files (e.g. any way to get executable content,
  HTML, or scripts into a published `DESIGN.md`).
- Rate-limit, CORS, header, and information-disclosure issues on the API.

Out of scope:

- Findings that require a compromised maintainer machine or leaked credentials.
- Denial of service through sheer request volume against cache-friendly file
  endpoints (these are designed to be cheap to serve and are CDN/proxy cached).
- Reports about third-party design systems' own tokens or trademarks.

## Handling of secrets

This repository is public from Phase 4 onward, and its full history ships when
visibility flips. No secrets, client data, or proprietary assets are ever
committed. Secret scanning (`gitleaks`) runs in pre-commit and CI. If you find a
committed secret, report it privately using the address above.
