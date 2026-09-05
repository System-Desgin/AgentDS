# Carbon dashboard benchmark

This benchmark tests a narrow claim: does giving the same coding agent
AgentDS's Carbon `DESIGN.md` make one generated dashboard follow Carbon's
published design tokens more closely?

It does not claim that one run proves general UI quality or that AgentDS always
improves every model. The generated source, exact inputs, hashes, and evaluator
are committed so the result can be inspected and repeated.

## Controlled setup

- Exact prompt: [`prompt.txt`](./prompt.txt)
- Generators: recorded in [`outputs/run.json`](./outputs/run.json) and
  [`outputs/claude-code/run.json`](./outputs/claude-code/run.json)
- Baseline input: an otherwise empty Git repository
- Treatment input: the same empty repository plus
  [`content/official/carbon/DESIGN.md`](../../content/official/carbon/DESIGN.md)
- Within each agent pair, the same model, reasoning effort, prompt, sandbox,
  and network-free output constraints for baseline and treatment
- No manual changes to either generated HTML file

The prompt itself tells the agent to read `DESIGN.md` if one exists. That line
is identical in both runs; the presence of the file is the sole treatment
difference.

## Inspect the evidence

- [`outputs/`](./outputs/) — the recorded Codex baseline, Carbon treatment,
  machine-readable evaluation, and run metadata
- [`outputs/claude-code/`](./outputs/claude-code/) — the equivalent evidence
  from Claude Code
- [`outputs/comparison.html`](./outputs/comparison.html) — side-by-side visual
  wrapper used to capture the launch image
- [`evaluate.mjs`](./evaluate.mjs) — zero-dependency source evaluator
- [`check.mjs`](./check.mjs) — CI integrity check for inputs, outputs, hashes,
  constraints, and the recorded evaluation

The evaluator checks only claims that can be established from static source:
whether colors come from the verified Carbon palette, Carbon blue is used,
IBM Plex Sans is named, radii and spacing stay on the published scales, drop
shadows are absent, and Carbon's success/error tokens are used. It does not
assign a subjective beauty score.

| Agent       | Baseline | With Carbon `DESIGN.md` |
| ----------- | -------: | ----------------------: |
| Codex       |      0/7 |                     5/7 |
| Claude Code |      1/7 |                     5/7 |

Both recorded treatments use Carbon's primary, typeface, radii, semantic
status colors, and no-shadow rule. Neither reaches strict compliance: the
Codex treatment invents 11 unpublished colors and several off-scale spacing
values; Claude Code invents 2 colors and uses one off-scale spacing value.
Those imperfections are part of the evidence: `DESIGN.md` strongly steers both
agents, while automated source checks and human review remain necessary.

## Reproduce

Requirements: Node.js 22+ and either the Codex CLI authenticated with a
ChatGPT/Codex account or Claude Code authenticated through a claude.ai plan.
No API key is read by the runner; the Claude path refuses to run when
`ANTHROPIC_API_KEY` is present.

```bash
pnpm benchmark:carbon
pnpm benchmark:carbon:claude
```

Each command generates both variants in fresh temporary Git repositories,
prints the evaluation, and leaves the temporary output path for inspection.
To deliberately replace the committed evidence:

```bash
pnpm benchmark:carbon -- --record
pnpm benchmark:carbon:claude -- --record
```

Review the diff before committing a new run. Model output is nondeterministic,
so hashes may change even when all recorded inputs remain identical.
