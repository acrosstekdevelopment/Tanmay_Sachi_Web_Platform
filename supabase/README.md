# Database (Supabase, Mumbai)

Schema for the TDD v2.0 data model (§7): forward-only migrations, draft-only
seed data, and the database tests for the public lockout and the seven
commitments.

| Path | What it is |
|---|---|
| `migrations/0001`–`0007` | Foundation and lockout, organisation and trust, content, schemes, engagement, operations, public views and visitor writes |
| `seed.sql` | Drafts only: the seven credentials as "not held", feature flags off |
| `tests/0001_public_lockout.sql` | Fails if any table lacks row-level security or the public key can read a base table |
| `tests/0002_commitments.sql` | Fails if any of the seven commitments can be broken in the database |

Both test files run in a transaction and roll back, so they are safe to run
against any environment.

## Rules

- Never edit an applied migration; add the next number.
- The public site reads only the `*_public` views. A new view must be granted
  in the same migration that creates it; the lockout test fails otherwise.
- The service-role key belongs to the background service only, never the web app.
