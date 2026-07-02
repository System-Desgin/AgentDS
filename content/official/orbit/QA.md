# QA — orbit

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with **zero errors** (1 contrast warning — see note)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: Roboto is open (Apache-2.0, Google Fonts) — no substitution; JetBrains Mono for code
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Contrast note (1 warning — accurate)

White on `primary` #008F7B is 4.03:1 — below the WCAG AA 4.5:1 threshold for
normal text, but this is Orbit's real primary-button pairing and meets the 3:1
large-text/UI threshold for button labels. A human reviewer should confirm this
is acceptable before publish.

## Token spot-check (≥10)

Grounded in the extraction of `@kiwicom/orbit-design-tokens@11.0.0` (`dist/index.js`,
default theme; values pulled by a safe text regex — no code executed).

| Token (file)              | Value in file | Source (Orbit default palette) | OK  |
| ------------------------- | ------------- | ------------------------------ | --- |
| colors.primary            | #008F7B       | product.normal                 | ✓   |
| colors.primary-strong     | #007061       | product.dark                   | ✓   |
| colors.link               | #0070C8       | blue.normal                    | ✓   |
| colors.on-surface         | #252A31       | ink.dark                       | ✓   |
| colors.on-surface-variant | #4F5E71       | ink.normal                     | ✓   |
| colors.surface-variant    | #F5F7F9       | cloud.light                    | ✓   |
| colors.border             | #E8EDF1       | cloud.normal                   | ✓   |
| colors.border-strong      | #BAC7D5       | cloud.dark                     | ✓   |
| colors.success            | #048724       | green.normal                   | ✓   |
| colors.warning            | #B36200       | orange.normal                  | ✓   |
| colors.error              | #D21C1C       | red.normal                     | ✓   |

## Sign-off

- Automated checks (schema, lint, extraction spot-check, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`);
  confirm the 1 contrast warning is acceptable.
- Reviewer:
- Date:
