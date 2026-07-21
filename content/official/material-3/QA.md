# QA — material-3

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the documented M3 baseline (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0); `restricted: false`
- [x] Fonts: Roboto / Roboto Mono are open (Apache-2.0, Google Fonts) — no substitution needed
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** M3 colours are generated from a
> seed via material-color-utilities, so there is no static resolved token file to
> parse. Values below are the **documented M3 baseline light scheme** (default
> seed `#6750A4`). A human reviewer must cross-check against m3.material.io before
> `status: published`.

| Token (file)                | Value in file | Source (M3 baseline light role) | OK  |
| --------------------------- | ------------- | ------------------------------- | --- |
| colors.primary              | #6750A4       | primary                         | ✓   |
| colors.on-primary           | #FFFFFF       | onPrimary                       | ✓   |
| colors.primary-container    | #EADDFF       | primaryContainer                | ✓   |
| colors.on-primary-container | #21005D       | onPrimaryContainer              | ✓   |
| colors.secondary-container  | #E8DEF8       | secondaryContainer              | ✓   |
| colors.surface              | #FEF7FF       | surface                         | ✓   |
| colors.on-surface           | #1D1B20       | onSurface                       | ✓   |
| colors.surface-variant      | #E7E0EC       | surfaceVariant                  | ✓   |
| colors.on-surface-variant   | #49454F       | onSurfaceVariant                | ✓   |
| colors.outline              | #79747E       | outline                         | ✓   |
| colors.error                | #B3261E       | error                           | ✓   |
| typography.body.fontFamily  | Roboto        | M3 type system (Roboto)         | ✓   |

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`).
  Cross-check the baseline colour roles + type/shape scale against m3.material.io
  (values are canonical baseline, not extracted from a static token file).
- Reviewer:
- Date:
