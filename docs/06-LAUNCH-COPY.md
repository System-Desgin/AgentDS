# Launch copy — AgentDS

Drafts for PH / HN / X / LinkedIn. Voice per DESIGN.md writing rules: plain,
specific, active.

**Assets (in `docs/assets/launch/`):**

- `demo.gif` — install → prompt → agent reads DESIGN.md → on-system Carbon
  dashboard → end card (1000×562, 5 scenes, 64KB)
- `comparison.png` — an actual recorded Codex run from the same prompt, without
  and with Carbon DESIGN.md (2400×1000); exact source, hashes, settings, and
  evaluator live in `benchmarks/carbon-dashboard/`
- `carbon-dashboard.png` — clean still of the on-system result

Where a draft says [demo GIF] or [comparison screenshot], attach these.

## Product Hunt

- **Name:** AgentDS
- **Tagline (≤60 chars):** Give your coding agent a real design system
- **Topics:** Developer Tools · Design Tools · Artificial Intelligence

**Description:**

Coding agents are brilliant engineers with no taste. AgentDS is a free catalog
of 42 agent-ready design systems — each one a single DESIGN.md file: real
design tokens (colors, type, spacing, radius, components) plus concise rules
written for agents. Official Systems are extracted from published token
packages (Carbon, Material 3, Primer, Fluent 2, Cloudscape…) with recorded
provenance; Brand Looks are independent analyses of famous product sites
(Stripe, Linear, Vercel, Notion…). Browse previews, copy the file, hit the
free API, or install the skill:

`npx skills add System-Desgin/AgentDS --skill design-systems`

Works with Claude Code, Cursor, Codex, Copilot, Windsurf, Kiro, OpenCode, Pi.

**Maker first comment:**

I built AgentDS because every agent-generated UI looks the same: violet
gradients, rounded-2xl, Inter, shadow-lg. The fix isn't a better prompt — it's
giving the agent the same thing you'd give a new hire: the design system.
Every file is linted with Google's official design.md linter, WCAG-checked,
and served over a free read-only API. Ask me anything about how the extraction
pipeline works — the whole thing is open source (Apache-2.0 code, CC BY 4.0
content).

I also committed a reproducible same-prompt benchmark. The baseline passed 0/7
static Carbon checks; adding Carbon DESIGN.md moved the result to 5/7. The two
remaining failures are published too: the agent still invented colors and
off-scale spacing, so AgentDS improves steering but does not replace review.

## Show HN

**Title:** Show HN: AgentDS – 42 design systems as agent-ready DESIGN.md files

**Body:**

Coding agents default to the same generic look (violet gradient, rounded-2xl,
Inter) because they have no design context. AgentDS gives them some: a free
catalog of DESIGN.md files — design tokens in YAML front matter plus short
usage rules — for real design systems.

Two kinds of entries. Official Systems are generated from each maker's
published open-source token packages (Carbon from @carbon/styles, Primer from
@primer/primitives, and so on) with provenance recorded per entry
(package@version) and validation by Google's design.md linter with zero
errors. Brand Looks are independent visual-language analyses of famous product
sites, each carrying a non-affiliation disclaimer and honest notes about what
was verified versus modeled.

You can browse token previews on the site, curl any file from the read-only
API, or install it as an agent skill. The whole pipeline is open source:
extraction, linting, WCAG contrast checks, and a human QA gate before anything
publishes.

Site: https://agent-ds.oday-bakkour.com
API: https://api.agent-ds.oday-bakkour.com/v1/systems
Repo: https://github.com/System-Desgin/AgentDS

Happy to answer questions about the extraction pipeline, the license handling
(one system got rejected for a field-of-use restriction), or the security
model for agent-consumed content.

## X / Twitter thread

**1/** Your coding agent is a brilliant engineer with no taste.

Every UI it builds: violet gradient, rounded-2xl, shadow-lg, Inter.

I built AgentDS to fix that — 42 real design systems, each as one
agent-ready DESIGN.md file. Free.

[demo GIF]

**2/** DESIGN.md = design tokens (YAML) + usage rules an agent can follow.

Official Systems are extracted from real token packages — Carbon, Material 3,
Primer, Fluent 2, Cloudscape — provenance recorded, linted with Google's
official linter, WCAG-checked.

**3/** Brand Looks are independent analyses of the sites everyone asks for:
Stripe, Linear, Vercel, Notion, Spotify, Apple…

Not affiliated — every file says so — but close enough that "make it feel
like Linear" finally means something.

[comparison screenshot]

The screenshot is an actual recorded Codex run: 0/7 Carbon checks without the
file, 5/7 with it. Exact prompt, HTML, model settings, hashes, and evaluator are
in the repo. The remaining drift is disclosed, not cropped out.

**4/** Works with any agent that reads a file: Claude Code, Cursor, Codex,
Copilot, Windsurf, Kiro, OpenCode, Pi.

One install: `npx skills add System-Desgin/AgentDS --skill design-systems`

Or curl the API — read-only, no key: https://api.agent-ds.oday-bakkour.com

**5/** Everything is open source: the catalog (CC BY 4.0), the extraction
pipeline, the API, the site (Apache-2.0).

https://agent-ds.oday-bakkour.com

## LinkedIn

Coding agents write excellent code and design mediocre interfaces — not
because they can't follow a design system, but because nobody hands them one.

I've launched AgentDS: a free, open-source catalog of 42 design systems
packaged the way agents actually consume them. One markdown file per system —
machine-readable tokens plus human-readable rules — extracted from real
published token packages (IBM Carbon, Google Material 3, GitHub Primer,
Microsoft Fluent 2, AWS Cloudscape…) with recorded provenance, zero-error
linting, and accessibility checks. Plus independent visual analyses of the
products everyone wants to look like: Stripe, Linear, Notion, Vercel.

Point your agent at one file and "build me a dashboard" stops producing the
same generic UI every time.

I tested that claim with a reproducible same-prompt Codex run. The baseline
passed 0/7 source-level Carbon checks; the result with DESIGN.md passed 5/7.
The generated source and the two failed checks are public too, because stronger
design steering is useful evidence even when it is not perfect compliance.

Browse: https://agent-ds.oday-bakkour.com
Install: npx skills add System-Desgin/AgentDS --skill design-systems

Apache-2.0 code, CC BY 4.0 content. Feedback welcome — especially from teams
standardizing agent output on a house design system.
