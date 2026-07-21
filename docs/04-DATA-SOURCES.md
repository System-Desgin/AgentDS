# Data Sources, References & Extraction Guides — AgentDS

Everything the pipeline and content team pull from. **All URLs and package names were compiled June–July 2026 — verify at build time** (ecosystems move; Phase 1 checklist includes this verification).

---

## 1. Core format & tooling (canonical)

| Resource | URL | Use |
|---|---|---|
| DESIGN.md spec repo (Google Labs, Apache-2.0, version "alpha") | https://github.com/google-labs-code/design.md | Normative spec (`docs/spec.md`), token schema, section order |
| Official CLI | `npx @google/design.md` | `lint` (structure + WCAG AA + broken refs), `diff`, `export --format dtcg|json-tailwind|css-tailwind`, `spec` |
| Linter as library | `import { lint } from '@google/design.md/linter'` | CI + ingest validation, structured JSON findings |
| Stitch DESIGN.md docs | https://stitch.withgoogle.com/docs/design-md/format/ | Reference behavior of the origin tool |
| Google announcement | https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/ | Positioning/citation for the /what-is-design-md page |
| W3C Design Tokens (DTCG) | https://design-tokens.github.io/community-group/format/ | tokens.json export target format |

**File anatomy (memorize):** YAML front matter (`name`, `colors`, `typography`, `rounded`, `spacing`, `components`, `{path.to.token}` refs) + Markdown `##` sections in fixed order: Overview/Theme → Colors → Typography → Spacing & Layout → Components → (Motion) → Do's and Don'ts → Agent Prompt Guide.

## 2. Agent integration references (for `/agents/[agent]` guides + snippets)

| Agent | Mechanism | Reference |
|---|---|---|
| Claude Code | Reference `./DESIGN.md` from `CLAUDE.md` ("Read DESIGN.md before any UI work") | docs.claude.com → Claude Code memory/CLAUDE.md |
| Cursor | `.cursor/rules` rule injecting DESIGN.md into UI-generation contexts | Cursor rules docs |
| Kiro | Place file in `.kiro/steering/` | Kiro steering docs |
| Windsurf | Point `global_rules.md` at DESIGN.md | Windsurf memories/rules docs |
| Codex / generic | Reference from `AGENTS.md` ("UI & Design System" section) | agents.md convention |
| Copilot | Repo custom instructions (`.github/copilot-instructions.md`) referencing the file | GitHub Copilot docs |

## 3. Agent Skills & skills.sh (distribution)

| Resource | URL | Use |
|---|---|---|
| skills.sh directory + docs | https://www.skills.sh/ · /docs · /docs/cli · /docs/api | How indexing/ranking works: GitHub repos + anonymous install telemetry via `npx skills add owner/repo`; **no upload — publish a public repo** |
| skills CLI (open source) | https://github.com/vercel-labs/skills | Install flow our fetch-script complements |
| Agent Skills standard (SKILL.md) | Anthropic Agent Skills docs (docs.claude.com) + https://github.com/anthropics/skills | SKILL.md frontmatter format, progressive disclosure, `references/` + `scripts/` layout |
| Architecture blueprint | https://github.com/VoltAgent/awesome-design-md/issues/90 | Proven pattern: master skill = SKILL.md + 7 bundled archetype systems + catalog index + fetch script (~60KB); rest fetched on demand |
| Install badge | `https://skills.sh/b/System-Desgin/AgentDS` → links to `skills.sh/System-Desgin/AgentDS` | README badges |

## 4. Official Systems — token sources

### Tier 1 (launch set, F-6 targets — code-first, permissive licenses)

| System | Maker | Site / Docs | Token source (extract from) | License* | Notes |
|---|---|---|---|---|---|
| Carbon | IBM | carbondesignsystem.com | npm `@carbon/themes`, `@carbon/colors`, `@carbon/type`, `@carbon/layout` | Apache-2.0 | Cleanest token packages in the industry; Carbon MCP exists (cite as validation, not dependency). IBM Plex fonts are OFL. |
| Material 3 | Google | m3.material.io | `material-components/material-web` repo (SCSS/CSS tokens) + npm `@material/material-color-utilities`; M3 token tables in docs | Apache-2.0 | Roboto/Roboto Flex on Google Fonts. |
| Primer | GitHub | primer.style | npm `@primer/primitives` (colors, typography, spacing as JSON/CSS vars) | MIT | Archetype: dev-tools. |
| Fluent 2 | Microsoft | fluent2.microsoft.design | npm `@fluentui/tokens` (+ `@fluentui/react-components` theme) | MIT | Segoe UI is proprietary → substitute (e.g., "Open Sans"/system) + note. |
| Cloudscape | AWS | cloudscape.design | npm `@cloudscape-design/design-tokens` | Apache-2.0 | Archetype: cloud console/dashboards. |
| Ant Design | Ant Group | ant.design | Programmatic: `antd` `theme.getDesignToken()` (seed/map/alias tokens); repo `ant-design/ant-design` | MIT | Extract via small Node script in pipeline, not CSS. |
| Paste | Twilio | paste.twilio.design | npm `@twilio-paste/design-tokens` | MIT | Ships DTCG-friendly token JSON. |
| Flowbite | Themesberg | flowbite.com | repo `themesberg/flowbite` + Tailwind preset | MIT (core) | Archetype: tailwind-native; keep to open-source core, not Pro. |
| Orbit | Kiwi.com | orbit.kiwi | npm `@kiwicom/orbit-design-tokens` | MIT | Archetype: travel/consumer. |
| Base Web | Uber | base.uber.com | repo `uber/baseweb` (`baseui/themes`) | MIT | Repo in maintenance mode — pin version, note in provenance. |

### Tier 2 (Phase 4 expansion)

| System | Maker | Token source | License* | Notes |
|---|---|---|---|---|
| Atlassian ADS | Atlassian | npm `@atlaskit/tokens` | Apache-2.0 (verify pkg license) | Purpose: productivity/B2B. |
| Spectrum | Adobe | repo/npm `adobe/spectrum-tokens` (`@adobe/spectrum-tokens`) | Apache-2.0 | DTCG-style already. |
| TDesign | Tencent | repo `Tencent/tdesign-common` (design tokens) | MIT | Asia-market data-dense archetype. |
| Semi Design | ByteDance/Douyin | repo `DouyinFE/semi-design` (semi-theme tokens) | MIT | |
| Arco Design | ByteDance | repo `arco-design/arco-design` (style tokens) | MIT | |
| Pajamas | GitLab | design.gitlab.com + repo `gitlab-org/gitlab-ui` tokens | MIT | Dev-tools archetype #2. |
| Forma 36 | Contentful | npm `@contentful/f36-tokens` | MIT | |
| Amplify UI | AWS | repo `aws-amplify/amplify-ui` (theme tokens) | Apache-2.0 | |
| Vaadin (Lumo) | Vaadin | npm `@vaadin/vaadin-lumo-styles` | Apache-2.0 | |
| Backstage | Spotify | npm `@backstage/theme` | Apache-2.0 | Dev-portal archetype. |
| Vitamin | Decathlon | repo `Decathlon/vitamin-web` (`@vtmn/*` tokens) | Apache-2.0 | Sport/retail. |
| Evergreen | Segment | repo `segmentio/evergreen` theme | MIT | |
| Vibe | monday.com | repo `mondaycom/vibe` | MIT | monday's actual DS is "Vibe" (the Figma "Monday UI Kit" maps here). |
| Moon | Yolo Group | repo `coingaming/moon-design` | MIT | |
| Radius | Rangle | repo `rangle/radius` | MIT (verify) | |

### Tier 3 — license-gated or Figma-only (handle per PRD §12 / restricted flag)

- **Lightning (SLDS), Salesforce** — npm `@salesforce-ux/design-system`; code BSD-3-Clause but Salesforce Sans + branding restricted → verify, likely publish with font substitution + strict notes.
- **DSFR "Composants" (French gov)** — repo `GouvernementFR/dsfr`; code MIT but **visual identity legally restricted to French state** → reference-only page, `restricted: true`, no downloads.
- **Henaket (Saudi, ISAA)** — Figma community only (file 1257654638425705295); verify issuing org + license; strategic P2 (RTL) candidate.
- **Figma-first, no public token code (extract manually from Figma variables or skip):** Goldman Sachs UI Kit, Pipedrive Convention UI, Apron (Cookpad), DBS Data Visualisation, WFP UI, Kyper (MX), Allium (TELUS — check `telus/tds` repo), Lexicon/Clay (Liferay — check `liferay/clay`), Airtable Base SDK, Pluralsight (check archived `pluralsight/design-system`), Mail.ru Paradigm, QBlocks (Quora), Flywheel (Revenue), Voog, Bold (Bridge), Coderhouse, Flamingo, yoko:space.
- Figma extraction helpers if needed: Figma REST API (variables endpoint) · "DESIGN.md Generator" Figma community plugin · figmadesignmd.com.

\* License column = code/token license; **trademarks and proprietary fonts are always separate** — see §7.

## 5. Brand Looks — capture methodology

Repeatable, documented, defensible (this is what separates us from sloppy scraping):

1. **Scope:** public marketing/product pages only; no login walls, no assets downloaded, no logos redistributed.
2. **Capture:** in-browser — collect `:root` CSS custom properties; computed styles of canonical elements (body, h1–h3, primary/secondary CTA, card, input, nav): color, font stack, size/weight/line-height/letter-spacing, radius, shadow, spacing rhythm. Record page URLs + capture date in provenance.
3. **Normalize** into the DESIGN.md token schema with semantic role mapping (primary/surface/on-surface…).
4. **Fonts:** name the observed family in prose; token `fontFamily` uses a licensed Google-Fonts substitute from our fixed substitution map (e.g., proprietary grotesk → Inter; SF Pro → Inter; custom serif → Source Serif 4).
5. **Disclaimer header (mandatory, injected by pipeline):** "Independent analysis of publicly observable design patterns. Not affiliated with, endorsed by, or sponsored by {maker}. All trademarks belong to their owners. Use as inspiration for an original system."
6. Same `generate → lint → export → QA` steps as Official path.

Reference collections for calibration only — never copy their files: `VoltAgent/awesome-design-md` (getdesign.md), `VoltAgent/awesome-claude-design`, designmd.app/library, `marvkr/better-design`.

## 6. Prose generation guidance (Claude prompts, `packages/pipeline/prompts/`)

- Input = normalized tokens + our own paraphrased summary of the system's published usage principles. **Never paste official docs text into output; never quote; rationale is rewritten.**
- Fixed section order + length budget (whole file target 300–600 lines; front matter ≤ ~120 tokens entries).
- Every color/typography claim in prose must reference an existing token (linter enforces refs).
- "Do's and Don'ts" = 6–10 concrete pairs derived from the system's documented usage rules, rephrased.
- "Agent Prompt Guide" = 4–6 imperative rules (token referencing, contrast validation, component defaults, what never to invent).
- Brand-Looks variant: describe the *observed* language ("the site uses…"), never claim official status.
- Runtime: Claude Code on the owner's Max plan — interactive `/generate-system <slug>`, or `pnpm pipeline generate` wrapping headless `claude -p` (covered by the plan's monthly Agent SDK credit; keep `ANTHROPIC_API_KEY` unset so runs never bill to an API account). Prompts are fixed + versioned so re-runs stay diff-stable.
- References: Claude Code headless/programmatic docs — https://code.claude.com/docs/en/headless · "Use the Claude Agent SDK with your Claude plan" — https://support.claude.com/en/articles/15036540

## 7. Legal & licensing references

- SPDX license list (per-entry `license.spdx`): https://spdx.org/licenses/
- Font licensing: Google Fonts (OFL) directory for substitutions; **never commit/serve proprietary font binaries** (SF Pro, Segoe, SoDoSans, Salesforce Sans, Styrene…).
- Trademark posture: nominative fair use — name the system factually, no logos in previews, disclaimer on Brand Looks and on /about. Model the disclaimer language on the industry-standard pattern (as-is, no ownership of visual identity claimed).
- Per-entry `LICENSE-NOTICE.txt` in every bundle.zip: upstream license text/URL + our attribution + disclaimer.
- Restricted registry: DSFR (state-only identity), SLDS (verify), any system whose license forbids redistribution of token values (none known among Tier 1/2 — verify).

## 8. Ecosystem/competitor references (positioning + format calibration)

- getdesign.md · designmd.app (+ /what-is-design-md format page) · better-design.com · design.dev/ai/design-md-generator (preview/lint UX reference)
- Official first-party channels to cite on detail pages where they exist: Carbon MCP (carbondesignsystem.com/developing/carbon-mcp), shadcn MCP + registry spec (ui.shadcn.com/docs/mcp) — position as complementary ("use the MCP for components; use our DESIGN.md for visual language").
- Registry-security research (for the /about trust section): 2026 audits reporting widespread issues and prompt-injection in skill registries — our plain-markdown, linted, provenance-pinned model is the answer.

## 9. Verification protocol (applies to every entry)

1. Confirm package/repo exists at pinned version; record `provenance` (package@version or repo@commit, extracted_at).
2. Spot-check ≥10 token values against official docs; log in entry `QA.md`.
3. Run `npx @google/design.md lint` → zero errors; store report.
4. Confirm license SPDX + font substitutions; set `restricted` if applicable.
5. Human sign-off in `QA.md` before `status: published`. CI blocks anything else.
