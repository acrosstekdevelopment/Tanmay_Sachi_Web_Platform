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

## Branch protection (applied by a repository administrator)

The CI workflow reports failures, but a failing pull request can still be merged until these rules are switched on (GitHub: Settings → Rules → Rulesets, or Settings → Branches). Creating them needs admin rights on the repository.

| Branch | Rules |
|---|---|
| `dev` | Require a pull request before merging. Require status checks to pass: `Build, types, lint, SQL tests, licences`, `Playwright (chromium), layout, accessibility`, `Playwright (webkit), layout, accessibility`, `Playwright (firefox), layout, accessibility`, `Secret scan`. Block force pushes and deletion. |
| `test` | Same as `dev`. Pull requests come only from `dev`. |
| `prod` | Same as `dev`, plus **one approving review** and branches up to date before merging. Pull requests come only from `test`. |

Checked on 2026-11-03: three deliberately bad pull requests (a `structuredClone` call, an `<img>` without `alt`, a 900 px-wide element at 360 px) each failed CI as intended, and were closed without merging.
