# Branches and the merge gate

```
feature (dev/<name>) ─▶ dev ─▶ test (staging) ─▶ prod
```

| Branch | Environment | Who changes it | How |
|---|---|---|---|
| `dev/<name>` | local | developer | pull request into `dev` |
| `dev` | development (integration) | developer | merge when CI is green |
| `test` | staging: Foundation review and acceptance | developer promotes | pull request from `dev`, CI green |
| `prod` | production, public | developer, **only on the Foundation's written go-ahead** | pull request from `test`, CI green, one approving review |
| `hotfix/<name>` | from `prod` | developer | fix, full CI, release after acceptance, then merge back into `test` and `dev` |

Rules:

- One direction only: feature → `dev` → `test` → `prod`. No direct commits to `test` or `prod`.
- Every pull request needs the **CI** workflow green. The required jobs are `Build, types, lint, SQL tests, licences`, `Playwright (chromium|webkit|firefox), layout, accessibility`, and `Secret scan`.
- Release to `prod` needs the Foundation's written green flag, recorded in the decision log. Exceptions (security patches, defect corrections) release on a green CI with written notice within one working day (TDD v2.0 §15.1).
- Each environment has its own Supabase project and secrets. See `environments.md`.

## What the gate blocks

| Check | Catches |
|---|---|
| `npm run typecheck` | type errors |
| `npm run lint` | syntax or APIs newer than the Android 7 / iOS 14 floor (`structuredClone`, `.at()`, `Object.hasOwn`, `replaceAll`), images without `alt` |
| `npm run i18n:check` | Hindi keys that English no longer has |
| `npm run db:test` | broken migrations, a table without row-level security, the public key reading a base table, any of the seven commitments breaking |
| `npm run licences:check` | non-permissive production dependencies |
| Playwright × 3 engines | every page in both languages: no horizontal scroll at 360/375/414/1280 px, no serious accessibility violations, the language switch |
| Secret scan (gitleaks) | committed keys or tokens |

`npm run i18n:check -- --strict` (missing Hindi is an error) is enabled once the Foundation's Hindi copy has been loaded.

## Branch protection (applied 2026-11-03 as GitHub rulesets)

| Branch | Ruleset | What it enforces |
|---|---|---|
| `dev` | Protect dev | Pull request required. The five CI checks must pass. No force pushes, no deletion. Repository administrators may push directly (bypass), so day-to-day work by an admin account is not blocked; everyone else needs a pull request. |
| `test` | Protect test | Same, with **no bypass**. Changes arrive only by pull request from `dev`. |
| `prod` | Protect prod | Same, plus **one approving review** and the branch must be up to date with its base before merging. No bypass. Changes arrive only by pull request from `test`, and only on the Foundation's written go-ahead. |

The five required checks are `Build, types, lint, SQL tests, licences`, `Playwright (chromium), layout, accessibility`, `Playwright (firefox), layout, accessibility`, `Playwright (webkit), layout, accessibility` and `Secret scan`.

Verified on 2026-11-03:

- three deliberately bad pull requests (a `structuredClone` call, an `<img>` without `alt`, a 900 px-wide element at 360 px) each failed CI as intended and were closed without merging;
- a direct push to `test` was rejected with "Changes must be made through a pull request".

`main` is the live deployment's source today and is not covered by these rules; it is replaced by `prod` once deployments move to that branch.
