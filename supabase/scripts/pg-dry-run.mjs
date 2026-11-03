// Dry-run the Supabase migrations and DB tests on an in-process Postgres (PGlite)
// with Supabase's roles and `auth` schema stubbed. Nothing touches a real database.
//
//   npm run db:test   (from the repository root; needs only npm install)
//   or: node supabase/scripts/pg-dry-run.mjs supabase
//
// Runs migrations/*.sql in name order, then seed.sql, then tests/*.sql in name
// order. Each test file raises on failure. Exits non-zero if anything fails.
//
// The stub auth.uid() reads the `request.jwt.claim.sub` setting and auth.jwt()
// reads `request.jwt.claims`, so a test can impersonate someone with:
//   select set_config('request.jwt.claim.sub', '<uuid>', true);
//   select set_config('request.jwt.claims', '{"aal":"aal2"}', true);
//   set local role authenticated;
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) throw new Error("usage: node pg-dry-run.mjs <supabase dir>");
const db = new PGlite();
await db.exec(`
  create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
  grant usage on schema public to anon, authenticated, service_role;
  alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
  create schema auth; grant usage on schema auth to anon, authenticated, service_role;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create function auth.role() returns text language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claim.role', true), ''), current_user::text) $$;
  create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
  grant execute on function auth.uid(), auth.role(), auth.jwt() to anon, authenticated, service_role;
`);

const run = async (file) => {
  try {
    const res = await db.exec(readFileSync(file, "utf8"));
    const last = res.at(-1)?.rows?.[0];
    console.log("ok  ", file.split(/[\\/]/).slice(-2).join("/"), last ? JSON.stringify(last) : "");
  } catch (e) {
    console.log("FAIL", file, "\n   ", e.message);
    process.exitCode = 1;
    await db.exec("rollback; reset role;").catch(() => {});
  }
};

for (const f of readdirSync(join(dir, "migrations")).sort()) await run(join(dir, "migrations", f));
await run(join(dir, "seed.sql"));
for (const f of readdirSync(join(dir, "tests")).sort()) await run(join(dir, "tests", f));
