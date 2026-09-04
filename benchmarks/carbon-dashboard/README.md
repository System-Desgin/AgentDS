# Carbon dashboard benchmark

This benchmark tests a narrow claim: does giving the same coding agent
AgentDS's Carbon `DESIGN.md` make one generated dashboard follow Carbon's
published design tokens more closely?

It does not claim that one run proves general UI quality or that AgentDS always
improves every model. The generated source, exact inputs, hashes, and evaluator
are committed so the result can be inspected and repeated.

## Controlled setup

- Exact prompt: [`prompt.txt`](./prompt.txt)
- Generator: recorded in [`outputs/run.json`](./outputs/run.json)
- Baseline input: an otherwise empty Git repository
- Treatment input: the same empty repository plus
  [`content/official/carbon/DESIGN.md`](../../content/official/carbon/DESIGN.md)
- Same model, reasoning effort, prompt, sandbox, and network-free output
  constraints for both runs
- No manual changes to either generated HTML file

The prompt itself tells the agent to read `DESIGN.md` if one exists. That line
is identical in both runs; the presence of the file is the sole treatment
difference.

## Inspect the evidence

- [`outputs/baseline.html`](./outputs/baseline.html) — generated without design
  context
- [`outputs/carbon.html`](./outputs/carbon.html) — generated with the verified
  Carbon file
- [`outputs/results.json`](./outputs/results.json) — machine-readable rubric and
  source evidence
- [`outputs/run.json`](./outputs/run.json) — CLI/model settings and SHA-256
  hashes for every input and output
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

In the recorded run, the baseline passes **0/7** design-system checks and the
Carbon treatment passes **5/7**. The treatment uses Carbon's primary, typeface,
radii, semantic status colors, and no-shadow rule, but it still invents 11
unpublished colors and several off-scale spacing values. That imperfection is
part of the evidence: `DESIGN.md` strongly steers the result, while automated
source checks and human review remain necessary for strict compliance.

## Reproduce

Requirements: Node.js 22+, Codex CLI authenticated with a ChatGPT/Codex account,
and access to the pinned model recorded in `scripts/run-carbon-benchmark.mjs`.
No API key is read by the runner.

```bash
pnpm benchmark:carbon
```

That command generates both variants in fresh temporary Git repositories,
prints the evaluation, and leaves the temporary output path for inspection.
To deliberately replace the committed evidence:

```bash
pnpm benchmark:carbon -- --record
```

Review the diff before committing a new run. Model output is nondeterministic,
so hashes may change even when all recorded inputs remain identical.
