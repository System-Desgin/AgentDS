# ci/ — GitHub Actions workflows (pending activation)

These are the project's CI/CD workflow definitions. They live here instead of
`.github/workflows/` for one mechanical reason: the automated push token used to
create this branch lacks the GitHub **`workflow`** OAuth scope, so it cannot
create files under `.github/workflows/`. The content is final and verified.

## Activate (one manual step)

Move the three files into `.github/workflows/` and push with a token that has
the `workflow` scope (a normal maintainer push, or the GitHub web UI — which
allows adding workflow files directly):

```bash
git mv ci/ci.yml       .github/workflows/ci.yml
git mv ci/content.yml  .github/workflows/content.yml
git mv ci/deploy.yml   .github/workflows/deploy.yml
git rm ci/README.md
git commit -m "ci: activate GitHub Actions workflows"
git push
```

## What they do

| Workflow      | Trigger                             | Job                                                                 |
| ------------- | ----------------------------------- | ------------------------------------------------------------------- |
| `ci.yml`      | push (`main`, `phase-**`), every PR | install → typecheck → lint → test → build → `pnpm audit` + gitleaks |
| `content.yml` | PR/push touching `content/**`       | `meta.yaml` schema validation + `@google/design.md` lint            |
| `deploy.yml`  | push to `main`                      | trigger the Dokploy API redeploy webhook (no-op if secret unset)    |

Web (`apps/web`) deploys via Vercel's Git integration; the API redeploys on
Dokploy. Configure `DOKPLOY_WEBHOOK_URL` as a repository secret to enable the
deploy trigger.
