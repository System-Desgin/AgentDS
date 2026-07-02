# QA — ant-design

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with **zero errors** (3 contrast warnings — see note)
- [x] 10+ token values spot-checked against the documented antd v6 default light tokens (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT); `restricted: false`
- [x] Fonts: antd ships no brand font (system stack); open Inter used, JetBrains Mono for code
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Contrast note (3 warnings — accurate, not defects to hide)

Ant's palette is intentionally vivid, so these real Ant pairings fall below the
WCAG AA 4.5:1 threshold for normal text (all are Ant's actual button/status
colours; they meet the 3:1 large-text/UI threshold except the hover state):

- white on `primary` #1677FF — 4.10:1
- white on `primary-hover` #4096FF — 2.99:1
- white on `error` #FF4D4F — 3.27:1

Guidance (in the file): pair vivid colours with large/bold labels or icons. A
human reviewer should confirm this is acceptable for the entry before publish.

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** antd generates tokens via its JS
> theme algorithm (no static value file). Values are the documented v6 default
> (light) seed/map tokens; cross-check against ant.design before publish.

| Token (file)              | Value in file | Source (antd v6 default)     | OK  |
| ------------------------- | ------------- | ---------------------------- | --- |
| colors.primary            | #1677FF       | colorPrimary                 | ✓   |
| colors.primary-hover      | #4096FF       | colorPrimaryHover            | ✓   |
| colors.link               | #1677FF       | colorLink                    | ✓   |
| colors.surface-variant    | #F5F5F5       | colorBgLayout                | ✓   |
| colors.fill               | #F0F0F0       | colorFillSecondary           | ✓   |
| colors.border             | #D9D9D9       | colorBorder                  | ✓   |
| colors.success            | #52C41A       | colorSuccess                 | ✓   |
| colors.warning            | #FAAD14       | colorWarning                 | ✓   |
| colors.error              | #FF4D4F       | colorError                   | ✓   |
| colors.on-surface         | #1F1F1F       | colorText (solid equivalent) | ✓   |
| colors.on-surface-variant | #595959       | colorTextSecondary           | ✓   |

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`);
  confirm the 3 contrast warnings are acceptable and cross-check tokens against ant.design.
- Reviewer:
- Date:
