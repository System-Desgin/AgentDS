# QA — cloudscape

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (Apache-2.0); `restricted: false`
- [x] Fonts: proprietary Amazon Ember substituted (→ Open Sans / JetBrains Mono); original named in prose only
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Token spot-check (≥10)

Colours grounded in the extraction of `@cloudscape-design/design-tokens@3.0.100`
(`index-visual-refresh.json`, light mode). Radius / spacing / type scale use canonical
Cloudscape values (density-tuned) — cross-check against cloudscape.design before publish.

| Token (file)              | Value in file | Value in source (light)                         | OK  |
| ------------------------- | ------------- | ----------------------------------------------- | --- |
| colors.primary            | #006CE0       | color-background-button-primary-default #006ce0 | ✓   |
| colors.on-surface         | #0F141A       | color-text-body-default #0f141a                 | ✓   |
| colors.on-surface-variant | #424650       | color-text-body-secondary #424650               | ✓   |
| colors.surface            | #FFFFFF       | color-background-layout-main #ffffff            | ✓   |
| colors.surface-selected   | #F0FBFF       | color-background-item-selected #f0fbff          | ✓   |
| colors.border             | #C6C6CD       | color-border-divider-default #c6c6cd            | ✓   |
| colors.border-strong      | #8C8C94       | color-border-input-default #8c8c94              | ✓   |
| colors.success            | #00802F       | color-text-status-success #00802f               | ✓   |
| colors.warning            | #855900       | color-text-status-warning #855900               | ✓   |
| colors.error              | #DB0000       | color-text-status-error #db0000                 | ✓   |
| (link)                    | #006CE0       | color-text-link-default #006ce0                 | ✓   |

## Sign-off

- Automated checks (schema, lint, colour spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then); confirm radius/spacing/type-scale values against cloudscape.design.
- Reviewer:
- Date:
