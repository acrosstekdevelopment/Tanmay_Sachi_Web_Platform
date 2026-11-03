# TASK 1: Finish the foundation, then build the admin panel and CMS

**For:** any Claude session picking this up cold. Read this whole file first; it is written to be followed top to bottom.
**Two parts, strictly in this order:**
- **Part A: finish the partly-done foundation work** (builder.html **0.3, 0.4, 2.1-2.6, 3.1**). Do not start Part B until Part A's gate (end of section 3A) is green, because the admin's publish step, previews and review queue all assume the public site reads from the database and that CI exists.
- **Part B: the admin panel and CMS** (builder.html **5.1 Admin core** and **5.2 Content / media / consent**, plus the TDD v2.0 §9.1 modules that depend only on tables that already exist).
**Contract basis:** Agreement cl. 3.1-3.3, 3.7, PRD A5, TDD v2.0 §5, §9, §7.5, §12, §14.
**Status when written:** 2026-11-03. Part A is partly built (see section 1 and 3A); nothing of Part B exists.

---

## 0. Ground rules (read before touching anything)

1. **Only the `tanmaysaachi/` folder is pushed to GitHub.** This file lives at `docs/tasks/task1.md` inside it. The project folder around the repo (`Tanmaysaachi-Vault/`, `graphify-out/`, the Agreement / TDD / PRD PDFs and MDs) is local reference material: it is **not** on GitHub, so where this file names those documents, ask the user for them if you cannot see them. Never `git add` anything from outside `tanmaysaachi/`.
2. **Document authority, highest wins:** Agreement > **TDD.pdf (v2.0)** > PRD v2.0 > BUILD_GUIDE.md / builder.html > Handoff. `TDD.md` at the project root is an *older* text export (it differs in places, e.g. the `schemes_public` view); read `TDD.pdf` (`pdftotext -layout TDD.pdf out.txt`). Obsidian vault `Tanmaysaachi-Vault/` summarises all of it; start with `05 Architecture/Admin Panel.md`, `Data Model.md`, `Security and Privacy.md`, `01 Rules/*`, `08 Open Items/*`.
3. **Branch flow (the user's standing instruction): feature branch → dev → test → prod, by pull request.** Since 2026-11-03 GitHub rulesets enforce it (see `docs/branches.md`).
   - **Direct pushes to `dev`, `test` and `prod` are rejected.** Push a feature branch, open a PR into `dev` (`https://github.com/acrosstekdevelopment/Tanmay_Sachi_Web_Platform/compare/dev...<branch>?expand=1`), wait for the five required checks (about 4 minutes), then merge. Never use the owner's "bypass rules" button.
   - Promote with a PR `dev` → `test` the same way. Stop there.
   - **Never open a PR into `prod`, push to `main`, deploy to Cloud Run, or apply migrations to the live Supabase project without the user saying so explicitly** (see section 3).
   - The `gh` CLI is not installed on the dev machine; use the GitHub web UI in Chrome.
   - Commit messages end with the attribution line the harness gives you.
4. **No invented legal, credential or contact values.** Placeholders stay placeholders. Seed content is **draft only**; nothing seeded may be publishable until a person verifies it (TDD §7.6).
5. **The admin is not in the Approved Design mockup.** The "exact match to the mockup" rule applies to public pages. For the admin, reuse the existing tokens, fonts and primitives (`apps/web/app/globals.css`, `components/ui/primitives.tsx`) so it looks like the same product. Do not introduce a new visual language, a UI kit, or Tailwind plugins. Desktop-first but usable at 360 px; WCAG 2.1 AA (the Agreement requires an audit at the end).
6. **The service-role key never enters the web app** (TDD §2.2). The admin runs entirely as the signed-in staff member's own session; the database (RLS) decides what they can do. If a feature seems to need the service role, stop and read section 7 (open decisions) instead of working around it.
7. **Database rules are the source of truth.** Whatever the UI validates, the database must also refuse. When you add a rule, add it as a constraint/trigger/policy and add a test that tries to break it.
8. Pin new dependencies to an exact version at least two weeks old (`npm view <pkg> time --json`). `next-intl` stays pinned at 4.4.0 (newer pulls native `@swc/core`, which fails to load on this machine). Run `npm install --workspace @tanmaysaachi/web --save-exact <pkg>@<ver>`.
9. Match the surrounding code: comment density, naming, idiom. Server actions use Zod, return a typed state, and log no personal data (see `app/[locale]/(public)/contact/actions.ts` and `lib/forms/enquiry.ts` for the pattern).

---

## 1. Where things are now

Repo: `C:\ADEX Project\Isocode Client Projects\Tanmay Sachi\tanmaysaachi` (npm workspaces; the app is `apps/web`). Remote: `https://github.com/acrosstekdevelopment/Tanmay_Sachi_Web_Platform.git`. Branches `dev` and `main` are both at `ab0ed5d`; `test` does not exist yet. There is no CI (`.github/` is absent; that is a separate task, step 0.4).

**Stack:** Next.js 15.5.28 App Router, React 19.1.1, TypeScript strict, Tailwind 3.4.19 (preflight off), next-intl 4.4.0 (`/en`, `/hi`, `localePrefix: always`), `@supabase/supabase-js` 2.117.0, `zod` 4.6.5.

**Routing today:** `app/layout.tsx` is a passthrough root layout; `app/[locale]/layout.tsx` renders `<html>`; public pages live in `app/[locale]/(public)/`. `middleware.ts` runs next-intl on everything except `api`, `_next`, `_vercel` and paths with a dot. There is **no** `(admin)` route group yet.

**Database (Supabase, Mumbai):** project `Tanmay_Sachi_Web`, ref `yvrkzyzsltyfemzsgrqk`, URL `https://yvrkzyzsltyfemzsgrqk.supabase.co`, org "acrosstekdevelopment's Org" (FREE plan; the dashboard shows a "grace period is over" banner). Migrations `supabase/migrations/0001`-`0007` and `seed.sql` are applied. Read them: they are the data model.

- `app.secure_table(tbl, read_by, write_by)` turns on RLS and creates staff policies. Audiences: `staff` (editor + administrator), `admin`, `none`. Use it for every new table.
- `app.staff_role()`, `app.is_staff()`, `app.is_admin()` resolve the caller from `auth.uid()` and `public.admin_users` (`role` = `administrator` | `editor`, `is_active`).
- Anonymous role: revoked from every base table; reads only the `*_public` views (granted by a loop at the end of 0007); may INSERT only into `leads`, `newsletter_subscribers`, `alert_subscriptions`, `donation_intents`, `article_feedback`.
- Enforced commitments already in SQL: metrics provenance, objective lock (`app.publish_project`, `forbid_locked_mutation`, `forbid_objective_after_publish`, `lock_objectives_on_publish`), tiers derive from cost lines with a four-field adjustment (`guard_tier_override` limits adjustment to administrators), `schemes_public.is_stale`, credentials need a certificate, media consent/alt-text rules, `schemes.published_is_verified`.
- Tests: `supabase/tests/0001_public_lockout.sql` and `0002_commitments.sql` (transactional, roll back). They passed on the live database.
- Seed: seven credentials as "not held"; four feature flags (`outbound_alerts`, `live_ingestion`, `search_indexing`, `retention_job`) all off.

**Local env:** `apps/web/.env.local` (gitignored) already holds `NEXT_PUBLIC_SITE_URL`, `ROBOTS_MODE=noindex`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable key; safe in a browser by design). `lib/supabase/public.ts` builds the anonymous client. Names for every other variable are in TDD App. C and `.env.example`. Never commit values.

**Run it:** from `tanmaysaachi/`: `npm run dev` (port 3000), `npm run typecheck`, `npm run lint`, `npm run i18n:check`, and `npx playwright test` in `apps/web` (3 engines; 546 tests passed at last run; the desktop accessibility specs can flake under load, so rerun failures with `--workers=2` before assuming a regression).

**Deployed:** public site is on Cloud Run asia-south1 behind Firebase Hosting at `tanmaysaachi.org`. Do not touch it.

---

## 2. What to build (scope of Part B, the admin and CMS)

Part A's scope is in section 3A. This section is Part B only.

Source of scope, in authority order: **Agreement cl. 3.3** (auth, two roles, DB-layer access control; CRUD for schemes, articles, projects, site pages, organisation record; media library; consent register + publish gate; draft/published; analytics), then **TDD v2.0 §9** (modules, sign-in, image publishing, publishing rules).

### In scope
Admin hostname-aware shell, sign-in with mandatory two-step verification, two roles, and these modules:

| Module | Must do |
|---|---|
| Dashboard | Counts and lists: review backlog, source health, recent enquiries, schemes nearing 75/90 days. Source-health and review-backlog widgets read real tables but show an honest "no data yet" until the engine exists. |
| Schemes | CRUD, tranches (`scheme_tranches`), revisions list, **review queue UI** over `change_signals` (side-by-side diff, edit summary + Hindi draft, approve → publish with new verified date), manual import (paste/JSON). The ingestion engine itself is out of scope (step 6.x). |
| Articles and site pages | CRUD, per-language status, preview, reader-feedback summary (`article_feedback`). |
| Projects | Cost lines, giving tiers (derived; administrator-only adjustment with reason + named person + time, shown "adjusted"), objectives (locked on publish; dated additions), raised figure, completed-project validation (outcomes, utilisation, shortfall note required), pillar link. |
| Organisation record | Legal identity and contacts of the Foundation. |
| Media | Upload, variants, alt text EN + HI, art-direction note per slot, consent register, publish gate, withdrawal with affected-pages report. |
| Curated content | The home page "People near you are asking" list, chosen by staff. |
| Enquiries and subscribers | List, filter, assign owner, status, CSV export (subscribers and donations visible to administrators only). |
| Donations | Manual (offline) entry with a mandatory audit note, refund recorded with note, preview of effect on the raised figure. |
| Settings | Feature switches (`feature_flags`), integration status, `site_settings`. |
| Users | Two roles; activate/deactivate; change role (see open decision D3). |
| Analytics | Enquiry volume and article feedback from the database now. Google Analytics usage/most-viewed behind an integration-status card that says "not connected" until credentials exist (D6). |

### Explicitly out of scope (do not build, do not "helpfully" add)
- **Editing** pillars, team members, values, documents, credentials, metrics, "what we haven't proven". TDD §9.4 and Open Decision 12 say the dev team loads these; making them editable is a priced Change Request. At most provide read-only list pages so staff can see them. (PRD A5 lists some of these as content types; the Agreement and TDD v2.0 outrank it.)
- The SEO module (step 7.1), the scheme ingestion engine (6.x), alerts/WhatsApp/SMS/newsletter sending (7.2), AI drafting, Razorpay integration, the background worker app.
- Approval gates, audit log UI, scheduled publishing, five roles, enquiry SLA inbox (all Phase 2; reserve nothing beyond what the schema already reserves).
- Rewiring the public pages to the database is **Part A (A2)**, not Part B. Part B only adds publishing-triggered revalidation (Stage 3) on top of it.

---

## 3. Stage 0: before writing code, settle these with the user

Ask the user (one short message covering every row, with your recommended default for each) and wait. These block correctness, not just taste. D1 and D7-D10 affect Part A; D1-D6 affect Part B.

| # | Question | Recommended default |
|---|---|---|
| D1 | Which database do I develop against? The only Supabase project is labelled PRODUCTION. Auth work needs real test users. | Ask the user to create a second project `Tanmay_Sachi_Web_Test` (Mumbai, same org). Develop and apply migrations there first; apply to the live project only when told. If they decline: write and verify everything with the PGlite harness (`supabase/scripts/pg-dry-run.mjs` (`npm run db:test`)) and do not apply anything live. |
| D2 | Admin hostname. TDD requires a separate host (`admin.<domain>`), never linked from the public site. | Same Next app. Middleware routes by `Host`: on the admin host `/` maps to the admin area; on the public host the admin paths 404. Locally use `/admin`. Provision `admin.tanmaysaachi.org` (Firebase custom domain + Hostinger DNS) only when the user asks. |
| D3 | Creating staff accounts needs Supabase Auth's admin API, which needs the service-role key, which the web app must never hold (TDD §2.2). | Phase 1: the user invites staff from the Supabase dashboard (public sign-ups disabled). The Users module lists `admin_users`, lets an administrator set role / active flag, and shows "invite from Supabase dashboard" instructions. If the user wants in-app invites, that needs the background service; ask before building it. |
| D4 | Image variants (resize/WebP) in a server action need `sharp`, a native module. | Try `sharp` in a server action. If it will not load on this machine or on Cloud Run, store the original, mark variants "pending", and leave generation to the worker (TDD §6); say so in the report. |
| D5 | CDN purge on consent withdrawal (TDD §9.3). The public CDN invalidation account (`CDN_INVALIDATION_SA`) does not exist yet. | Implement a purge adapter interface with a "not configured" implementation that records status `not_configured` per path and shows it truthfully in the confirmation. Never claim a purge happened. |
| D6 | Google Analytics / Search Console credentials. | Not available yet. Build the integration-status card and the database-only analytics; leave GA behind a flag. |
| D7 | Has the Foundation sent the Hindi copy (Agreement cl. 7.1(a), due Week 3; list in the vault's `08 Open Items/Hindi Copy Request.md`)? | If yes, ask where the file is and load it (A4). If no, do **not** machine-translate or invent Hindi; build everything else and leave `/hi` falling back to English with the notice. |
| D8 | Donor PAN needs a Cloud KMS key in the Foundation's project (TDD §12). No key exists. | Build the Give donation-intent form **without** storing PAN: the PAN field stays hidden behind a flag until a key exists. Never store PAN in plain text. |
| D9 | GitHub changes for step 0.4: create `test` and `prod` branches, protect them, add Actions workflow(s), required status checks. | Push the workflow and `test`; ask before creating `prod` or changing protection rules. |
| D10 | Visual parity needs published illustrative content (the mockup's sample schemes, articles, projects), but seeded content must be draft-only and cannot be published unverified. | Keep prod/live seed draft-only. Add a clearly labelled `supabase/seed-demo.sql` that publishes illustrative rows **only** in local/test databases (never the live project), with source name "Illustrative (Approved Design mockup)". Visual-regression tests run against that. |

Record the answers in `docs/tasks/task1-decisions.md` (create it) so later sessions do not re-ask.

---

## 3A. PART A: finish the partly-done foundation (do first)

Status of each item when written, from the build log: **0.3** done except the real-device check; **0.4** done (see A1); **2.1-2.5** all pages exist and match the mockup but their text is hard-coded; **2.6** only the Contact form is wired (to the `leads` table); **3.1** `/en` + `/hi` routing, switcher, fallback notice done, Hindi copy not supplied.

Work in this order. Each item is its own commit group on `dev`; promote to `test` when its check passes.

### A1. Step 0.4: Branches and CI gate: DONE (2026-11-03)
Delivered and verified; nothing left to do here except keep it green.

- `.github/workflows/ci.yml` runs on every PR and push to `dev`/`test`/`prod`: typecheck, lint (device-floor syntax rules and `jsx-a11y/alt-text` as an error), `i18n:check`, `npm run db:test` (migrations, seed and DB tests in-process via PGlite), `npm run licences:check`, build, Playwright on chromium + webkit + firefox (layout, axe), and a gitleaks secret scan. No secrets or cloud keys are used.
- Three deliberately bad PRs (a `structuredClone` call, an `<img>` without `alt`, a 900 px-wide element) each failed CI and were closed; the branches were deleted.
- Branches `test` and `prod` exist (`prod` = the live `main` commit `ab0ed5d`). Rulesets "Protect dev / Protect test / Protect prod" are active: PR required, five checks required, no force push, no deletion; `prod` also needs one approving review and an up-to-date branch. A direct push to `test` and to `dev` was rejected as expected.
- `docs/branches.md` and `docs/environments.md` document the flow and the per-environment variables (names only).
- Open points for the user, not blockers: the owner can still bypass the rules from the GitHub merge box; `main` (the live deploy's source) is not protected until deploys move to `prod`; the CI jobs run on `ubuntu-latest`, which GitHub is migrating to Ubuntu 26.

### A2. Steps 2.1-2.5: pages read from the database (and look identical to the mockup)
Today each page in `apps/web/app/[locale]/(public)/` is static markup ported verbatim from `tanmaysaachi-full-site-mockup.html`. Pass 2 (BUILD_GUIDE §0) replaces hard-coded text with data **without changing a pixel**.

1. **Inventory first.** For each of the 14 pages (Home, Work, Pillar detail, Projects, Project detail, Schemes, Knowledge, Article, Partner, Accountability, About, Give, Contact, Ask) list every piece of content and the table/view that should hold it, using the CMS annotation comments left in the ported pages (`{/* cms: ... */}`) and the vault's `03 Pages/*.md`. Save as `docs/tasks/task1-content-map.md`. Content with no home in the schema is a finding to report, not something to invent a table for silently; Part B's migration 0008 may add tables, but ask first if a change affects the contract.
2. **Data access layer** `apps/web/lib/content/`: one typed function per view (`getSchemes`, `getSchemeBySlug`, `getArticles`, `getProjects`, `getPillars`, `getMetrics`, `getCredentials`, `getTeam`, `getValues`, `getDocuments`, `getUnproven`, `getOrganisation`, ...), each reading **only `*_public` views** with the anonymous client, validating rows with Zod, returning `[]`/`null` when the database is unconfigured or errors (log the code, never data). Locale-aware: use the `hi` row when published, else fall back to `en` and report `fellBack: true` so the page shows the existing fallback notice.
3. **Rendering rules (non-negotiable, from the seven commitments and candour rules):**
   - A metric with no verified published row renders **"—"**, never a number. Credentials render "not held" honestly; there is no "coming soon". The 90-day stale banner is server-rendered from `is_stale` and has no dismiss control.
   - Giving tiers on Give come from `giving_tiers_public` (derived; "adjusted" label when `is_adjusted`). Money is whole paise; one ₹ formatter under `apps/web/lib/format/` with Indian grouping (`₹1,30,000`), tested.
   - No page states or implies a visitor is eligible for anything.
   - Where the mockup shows illustrative sample content with no verified database row, keep the mockup's existing placeholder treatment (the `.ph` placeholders, the "Illustrative response" note on Ask). Never fabricate figures.
4. **Caching:** server components with ISR; tag every fetch (`scheme:<slug>`, `schemes`, `article:<slug>`, ...) so Part B's publish step can `revalidateTag`. `generateStaticParams` keeps working for known slugs; `dynamicParams` must now allow slugs published later.
5. **Visual parity is the acceptance test.** With D10's demo seed loaded and published in a local or test database, every page at 360, 375, 414 and 1280 px must match the current static rendering. Add Playwright screenshot tests (route × locale × breakpoint; TDD §14) with baselines taken from the **current static pages before you change anything**; commit the baselines. Allow a tiny pixel tolerance; any other diff is a bug in your wiring.
6. Existing layout, i18n and axe specs stay green. Add integration tests for the data layer where practical.

**Gate A2:** all 14 pages × 2 locales read through the data layer; with an empty database they render without errors and show honest empty states ("—", "not held", placeholders); with the demo seed they match the baselines; no page reads a base table (a test fails on any `.from('<name>')` outside `lib/content` and the form actions that is not a `*_public` view).

### A3. Step 2.6: the remaining forms
Inventory every form-like element in the public pages (`grep -rn "<form\|<input\|<textarea\|<select" apps/web/app apps/web/components`) against the TDD §10.2 / Agreement cl. 3.7 list. Expected set:

| Form | Table | Notes |
|---|---|---|
| Contact (done) | `leads` | Reference implementation: `contact/actions.ts`, `lib/forms/enquiry.ts`, `components/contact/contact-form.tsx`. |
| Callback request (footer "Request a callback") | `leads` | Name + phone + preferred time; same spam checks and consent-notice version. |
| Partner enquiry (if the Partner page has a form) | `leads` | Routes by enquiry type. |
| Give donation intent | `donation_intents` | Amount in paise, frequency, project/tier, donor name/email/address. **PAN not stored** until D8; hide the PAN field behind a flag until a KMS key exists. After saving, send the visitor to the Foundation's hosted Razorpay page (`RAZORPAY_PAGE_URL`); if unset, show an honest "payments open soon" state, not a dead button. Razorpay itself is step 7.2. |
| Newsletter signup | `newsletter_subscribers` | Double opt-in: store only a **hash** of the confirmation token with an expiry. Sending the confirmation email is step 7.2, so the row stays unconfirmed for now. Confirmation uses `public.confirm_subscription(token_hash)`. |
| Alert subscription (if a UI exists on Schemes) | `alert_subscriptions` | Channel + address + states + categories; same double opt-in; no sending yet. |
| Article "Was this useful?" | `article_feedback` | Anonymous insert only. |
| Knowledge search box | none | UI only until search exists (7.1 / TDD §10.4); do not fake results. |
| Ask box | none | Stays the static illustrative answer (AI answers are Phase 2). |

Every writing form: Zod schema in `lib/forms/`, server action next to its page, honeypot + minimum-time check, per-IP rate limit (a small `public.bump_rate_limit(bucket, key_hash, window, max)` security-definer function anon may call, using `rate_limits` with a **hashed** identifier; add it in migration 0008 with a DB test), consent-notice version stored, typed values kept after a failed send, accessible status/alert message, works without JavaScript, EN and HI strings through next-intl (the `Contact` namespace shows the pattern; Hindi values stay empty until D7). The anonymous role may insert only into the five allowed tables; if a form needs another, stop and ask.
Tests: server actions with the Supabase client mocked; exercise the real path manually against the test project (D1) and list what was exercised in the progress file.

**Gate A3:** every form in the inventory works or is listed as deferred with the reason; none posts personal data anywhere except its table; a visitor can never read a row back.

### A4. Step 3.1: bilingual completion
Done already: `/en`, `/hi`, switcher, fallback notice, `noindex` for locales without published content, hreflang only for versions that exist. Left:

1. **Load Hindi when it exists (D7).** Interface strings go into `apps/web/messages/hi.json` under the same keys as `en.json` (`npm run i18n:check` lists what is missing). Page content goes into the `*_translations` tables as `status = 'draft'`, `ai_drafted = false`; a person approves it (Part B). Never write Hindi yourself and never machine-translate Foundation copy (Agreement cl. 4).
2. **Devanagari quality pass** (Agreement cl. 3.2): check `Noto Sans Devanagari` metrics (line-height, clipped matras) in headings, buttons, badges, chips, tab bar and footer at 360 px using a **test-only** Devanagari fixture string (never shipped). Fix overflow without changing the English layout.
3. **Locale-aware formatting:** dates and ₹ through one helper using `Intl` (`en-IN`, `hi-IN`), Indian digit grouping, tested in both locales.
4. **hreflang / canonical / sitemap alternates** only for locale versions with published content (TDD §5.2): `lib/i18n/content.ts` (`hasPublishedContent`, currently `locale === 'en'`) must consult the database. Test by faking it.
5. `npm run i18n:check -- --strict` is wired into CI but **enabled only once D7 says the copy has arrived**.

**Gate A4:** with Hindi absent, `/hi/*` shows English + notice, is `noindex`, CI green; with test Hindi fixtures, layouts hold at 360 px and hreflang appears only for translated pages.

### A5. Step 0.3: the real-device check (human step)
Automation cannot do this; make it easy and record it honestly.
1. Check `browserslist`, any polyfills needed for Android 7 / Chrome 64 / iOS 14 / Safari 14, and `COMPATIBILITY.md` against what the code uses now (run the new floor lint from A1).
2. Write `docs/device-check.md`: a one-page checklist for a person with a real Android 7 phone and a real iOS 14 phone: open the test URL, then for each of the 14 pages in EN check no horizontal scroll, nothing cut off, drawer opens and closes, language switch works, contact form submits. Fields for device, OS, browser, date, result, notes.
3. Do **not** tick it yourself. Tell the user it is waiting on a person with those devices (the Foundation Delivery gate needs it).

**Gate A5:** `docs/device-check.md` exists, `COMPATIBILITY.md` matches the code, and the pending human check is reported as pending.

### A6. Template coverage audit
The Agreement counts **29 templates** (TDD v2.0 Appendix A); 14 public pages exist. List every template in Appendix A (read `TDD.pdf`), mark each built / not built, and whether it is an "Approved design" row (must be ported) or a TDD addition (donation return `/donate/thanks`, `/search`, legal and support pages, 404). Save as `docs/tasks/task1-template-coverage.md`. **Do not build the missing ones in this task**; report the gap with a recommendation and ask the user whether they belong in Part A or a new task.

**Gate A (all of Part A):** A1 done, A2-A5 gates green; A6 report delivered; CI green on `dev` and `test`; progress file updated; the user told what remains human-only (A5) and what depends on the Foundation (D7, D8). Only then continue to Part B.

---

## 4. PART B work breakdown, admin panel and CMS (do in order; one commit group per stage)

Each stage lists what to build, where, and its gate. Tick the gate before starting the next stage.

### Stage 1: Migration 0008, the schema the admin needs
New file `supabase/migrations/0008_admin_support.sql` (forward-only; add 0009+ for later fixes, never edit applied files). Every new table uses `app.secure_table`; every new public view is added to the grant loop or granted explicitly in the same migration; extend `supabase/tests/`.

1. **Two-step verification in the database.** Change `app.staff_role()` so a caller counts as staff only when their JWT is `aal2` (`auth.jwt() ->> 'aal' = 'aal2'`). This makes "two-step required for both roles" a database rule, not just a UI step. Keep `service_role` working. Add a test that an `aal1` session with a valid `admin_users` row gets no access (use the `request.jwt.claims` setting; see header of `pg-dry-run.mjs`).
2. **Organisation record**: `organisation_record` (single row: legal name, registration type, registered address, CIN/PAN/12A/80G text left null, grievance officer reference, contact points, all bilingual jsonb where public). A `organisation_record_public` view that omits anything not meant to be public. Staff read, **administrator** write. No invented values in seed; leave empty.
3. **Curated content**: `curated_questions` ("People near you are asking"): `question jsonb`, `position`, `is_published`, `published_at`, creator/editor columns, plus `curated_questions_public`.
4. **Consent register** (TDD §9.3 step 3): `media_consents` with `media_id`, `who` (named person), `how`, `consented_on`, `scope`, `reference`, `is_minor`, `guardian_name`, `withdrawn_at`, `withdrawn_by`, `created_by`. `publish_needs_consent` on `media` must remain true; add a trigger so `media.consent_status = 'held'` requires a matching non-withdrawn `media_consents` row and `consent_reference` is taken from it. Withdrawal sets `consent_status = 'withdrawn'` and `is_published = false` in one function (`app.withdraw_media_consent(media_id)`) that also returns the list of pages affected.
5. **Where media is used** (needed for the affected-pages report): a lightweight `media_usages` (`media_id`, `entity_type`, `entity_id`, `slot`) maintained by the editors' save actions. Keep it simple.
6. **Donations**: add `project_id uuid references projects(id)` and `designation text` to `donations` (offline gifts have no intent), `refunded_amount_paise bigint default 0 check (>= 0)`, `refund_note text`; constraint that a refund needs a note. Add `project_raised_paise` view/function = captured online + offline − refunds per project; administrator-readable only, plus a public-safe `projects_public` raised figure if the PRD requires it on the project page (check `Projects.md` / `Project detail.md` in the vault; do not expose donor data).
7. **Completed-project validation** (TDD §9.4): on `projects`, add `outcomes jsonb`, `utilisation jsonb`, `shortfall_note jsonb`; CHECK that `status = 'completed' and is_published` requires all three non-empty. Expose them through `projects_public` only when completed.
8. **Storage** (Supabase Storage; create via SQL in the migration): buckets `media-private` (private) and `media-public` (public). Policies, via `storage.objects`:
   - staff may insert/select/update/delete in `media-private`;
   - staff may insert into `media-public` **only** if a `media` row exists with `public_path = objects.name`, `consent_status = 'held'` (this is the "file physically is not in the public store until consent is held" guarantee);
   - staff may delete from `media-public`;
   - nobody (anon included) may write; anon may read `media-public` only because the bucket is public.
   Test with the harness where possible; storage schema is not stubbed there, so keep these policies in a separate `0009_storage.sql` that the harness can skip, and verify them against the test Supabase project (D1) with a real upload.
9. **Admin-side helper views/functions** the UI would otherwise reimplement: `scheme_review_queue` (open `change_signals` joined to scheme + latest revision), `schemes_nearing_staleness(days)` (75/90 days), `enquiry_volume_by_week`. All `security_invoker = true` (staff-only, ordinary RLS applies). Never expose these to anon.
10. If Part A (A3) has not already added it: `public.bump_rate_limit(...)` (anon-callable, hashed identifiers) with a DB test. Part A may need migration 0008 before Part B starts; if so, number Part B's migration 0009 onward and adjust the file names in this stage and in the storage item (which becomes `0010_storage.sql`).
11. Extend `supabase/tests/0001_public_lockout.sql` so it covers every new table/view automatically (it already enumerates the catalog; confirm), and add `0003_admin_access.sql`: for each table, an **editor** can/cannot do exactly what the access matrix in TDD §7.5 says (editors cannot read subscribers/donations, cannot manage users/settings/credentials/redirects/integrations, cannot adjust a tier; administrators can), and an **inactive** or **aal1** staff member can do nothing.

**Gate:** `node supabase/scripts/pg-dry-run.mjs <supabase dir>` is all `ok`; migrations are additive and re-runnable in order from empty.

### Stage 2: Admin shell and authentication
1. Add `@supabase/ssr` (exact, ≥ 2 weeks old) and build `lib/supabase/server.ts` (cookie-bound server client using the **publishable** key and the user's session), `lib/supabase/admin-session.ts` (helpers to get user + role + aal).
2. Route group `app/(admin)/` with its **own root layout** (its own `<html lang="en">`; the admin is English-only and outside next-intl). Pick a URL shape that satisfies D2 and keeps `middleware.ts` from running next-intl on admin paths; update the matcher and test it both ways.
3. Pages: `/sign-in` (email + password), `/mfa/enroll` (TOTP via Supabase Auth MFA; show QR + manual secret), `/mfa/verify`, `/no-access` (signed in, no active `admin_users` row), sign-out. Server-side guard in the admin layout: not signed in → sign-in; `aal1` → verify/enrol; no role → no-access. Short sessions: set the Supabase JWT/session lifetime guidance in `supabase/README.md` (it is a dashboard setting; document it, do not claim it is applied).
4. Headers for the admin area: `X-Robots-Tag: noindex, nofollow`, `Cache-Control: no-store`, a strict CSP using a **per-request nonce** (TDD §12: dynamic routes use nonces), `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`. Admin pages are never in the sitemap and never linked from the public site; add a test that no public page links to the admin.
5. Chrome of the admin: left navigation (modules the role may use; administrators see Users and Settings), page header, breadcrumb, flash messages, loading and empty states, a visible "Signed in as ... (Editor)" with role. Keyboard operable, visible focus, skip link, landmarks.
6. Role gate helper `requireRole('administrator')` for admin-only pages, backed by the same database rule (never UI-only).

**Gate:** with the test project and two test users (one editor, one administrator, each with TOTP enrolled): sign-in, MFA, no-access, sign-out and role gating work; an editor opening an admin-only URL is refused; an `aal1` session reads no data. Playwright covers the unauthenticated and no-role paths without needing real credentials; authenticated flows are covered by a documented manual script (section 6) if CI cannot hold test credentials.

### Stage 3: CMS foundations (shared pieces every module uses)
1. **Form kit** in `components/admin/`: field wrapper with label/hint/error, `BilingualField` (EN | HI tabs, per-language status chip: draft / reviewed / published, "AI-drafted" flag, approver), rich-text field storing the project's jsonb body format (decide one minimal block format: paragraphs, headings, lists, links; sanitise on save per TDD §12; document it in the vault), slug field with uniqueness check, status/publish bar with disabled-with-reason publish button (TDD App. B "seed safety": publish disabled with a stated reason).
2. **Server action pattern**: one file per module; Zod schema shared with the form; returns `{status:'ok'|'invalid'|'error', fields, values}` like the contact action so a failed save keeps what was typed; database errors (SQLSTATE `23514`, `23502`, `P0001` raise-exceptions) are mapped to plain-language messages from a single map (`lib/admin/db-errors.ts`) with a test; unknown errors log the code only, never data.
3. **Publish/unpublish helper**: per record and per language; on publish it (a) writes the row, (b) inserts into `cache_refresh_queue` and calls `revalidatePath`/`revalidateTag` for the affected public paths in both locales, (c) updates `search_documents` for the entity (title/body/path) so search works later. Rate-limited cache refresh per TDD §6.2 is the worker's job; here just enqueue.
4. **List/table kit**: server-side pagination, search, filters in the URL, sort, empty states; CSV export helper that streams and never includes columns the role may not read.
5. Preview: draft preview route per entity that renders with the public components once the public pages read data (stub the contract now: `previewUrl(entity)`); until then show the stored content in a plain read view.

**Gate:** unit tests (Vitest is the TDD's unit runner; add it as a dev dependency if absent, exact version, ≥ 2 weeks old) for the db-error map, slug helper, rich-text sanitiser, and CSV helper.

### Stage 4: Content modules
Build in this order; each is a vertical slice (list → create/edit → publish → tests).

1. **Articles** (`articles`, `article_translations`, `article_feedback` summary) and **Site pages** (`pages`, `page_translations`). Fields per the schema; `kind` guide/research/field_note; related articles picker; TOC generated from headings; read-minutes computed. A translation cannot be `published` without `approved_by/approved_at` (database check exists): the UI sets them to the current staff member on publish.
2. **Projects**: details; cost lines CRUD (money entered in rupees, stored in whole **paise**: one helper, one test, never floats); giving tiers generated from cost lines (administrator-only adjust with amount + reason, auto-filled actor and time, labelled "adjusted"; the database trigger already blocks editors); objectives (original list editable until publish; after publish only "add dated addition", which uses `project_objective_additions`; UI must make the lock obvious and the dated history visible); raised-figure panel (reads the Stage 1 function; administrators only); completion panel (outcomes, utilisation, shortfall note) with the stated reason when publish is blocked. Publishing calls `app.publish_project` via RPC.
3. **Schemes**: list with status badges (Open/Soon/Changed/Shut), 75/90-day indicators, filters (state, category, stale). Edit: all fields, tranches editor (paise, `raw_text` fallback), source/provenance block (source name, URL, licence, fetched, verified, verifying editor). **Publish requires provenance and a named verifier** (the DB check `published_is_verified` enforces it; the UI explains it). Every material edit writes a `scheme_revisions` row (decision `accepted`, source `editor`) in the same transaction via an RPC (`app.save_scheme(...)`, security definer is **not** needed; use the caller's role). Revisions tab is read-only history. **Review queue**: list of open `change_signals`, side-by-side diff (published vs proposed, changed fields highlighted), confirm-against-official-page link, edit plain-language summary and Hindi draft, approve (sets `verified_at = now()`, `verifying_editor = caller`, writes revision, resolves signal) or reject/dismiss with reason. Manual import: paste JSON (validate with Zod) into drafts only. **No eligibility language**: add a guard that rejects summaries matching the eligibility patterns agreed with the vault's `Scheme Engine.md` (commitment 6), with a test.
4. **Organisation record** (administrator edit, editor read) and **Curated content** list (reorder, publish).
5. **Read-only lists** for pillars, team members, values, documents, credentials, metrics, unproven claims, with a note "Loaded by the development team on the Foundation's instruction (Phase 1)". No edit forms.

**Gate:** for each module, Playwright (where it does not need credentials) and DB tests cover the commitment it carries (2, 3, 4, 6); a manual script step list exists for the authenticated paths.

### Stage 5: Media library, consent register and publish gate
Follow TDD §9.3 exactly.
1. Upload to `media-private` (type allow-list: JPEG, PNG, WebP, AVIF; size cap; content sniff, not just extension; re-encode images; strip EXIF GPS; see D4). **English alt text required before the upload completes** (database constraint `alt_en_required`).
2. Library grid and detail: preview, alt text EN + HI, caption, album, art-direction note per slot (the notes come from the Approved Design; seed the slot list from the mockup's `.shot` elements; read them from `tanmaysaachi-full-site-mockup.html`), usage list from `media_usages`.
3. Consent: form creating a `media_consents` row (who, how, date, scope, reference, minor/guardian flag). A person's image cannot publish without a named consent (commitment 7). Hindi alt text is required before the media may be published in `hi` (constraint `alt_hi_required_for_hi`); the UI shows which locales are publishable.
4. Publish = one logical step: verify DB preconditions, set `public_path` (content-addressed: `sha256` of the bytes, e.g. `media/ab/cd/<hash>.webp`), copy approved variants to `media-public` (policy from Stage 1 refuses it unless consent is held), then set `is_published = true`. If any step fails, undo the earlier ones and tell the editor what happened.
5. Withdrawal: `app.withdraw_media_consent` then delete the public files, call the purge adapter (D5), enqueue refresh of affected pages, and show the administrator a confirmation listing every affected page and each path's purge status.
6. Credentials' certificate and team photos reference `media`; the read-only lists should link to the media detail.

**Gate:** a real upload against the test Supabase project (D1): consent missing → publish refused at the database; consent held → file appears in `media-public`; withdraw → file gone, pages listed, purge status honest. Record the results in the report.

### Stage 6: Operations modules
1. **Enquiries** (`leads`): list, filter by type/status/owner, detail, assign owner (staff), status workflow `new → in_progress → closed`, CSV export. **Subscribers** (`newsletter_subscribers`, `alert_subscriptions`): administrators only; counts and list with masked addresses by default; export; unsubscribe/delete-on-request action (DPDP: deletion workflow named in TDD §12). Editors see enquiries only.
2. **Donations**: list (administrators only), manual entry form (amount in rupees → paise, date, designation/project, mandatory audit note, `offline_flag = true`), refund recording (note required), live preview of the effect on the project's raised figure before saving. No PAN is ever shown in full; PAN handling needs Cloud KMS and belongs to the donations task (7.2), so do not build PAN entry here.
3. **Settings**: feature flags (administrator; each change needs a one-line reason stored in `note`, shows who/when), integration status cards (Supabase: connected; Brevo, WhatsApp, Razorpay, GA, Vertex: "not configured" read from env presence, never printing values), `site_settings` key/value editor with a typed allow-list of keys (no free-form arbitrary keys).
4. **Users**: list from `admin_users`; administrator sets role and active flag; cannot deactivate themselves or the last active administrator (database rule + UI); explains the invite path (D3).
5. **Dashboard** and **Analytics** (database parts): review backlog, nearing-staleness list (75/90), recent enquiries, enquiry volume by week, article feedback summary, source-health placeholder with honest empty state; GA card per D6.

**Gate:** access-matrix test (`0003_admin_access.sql`) still green; an editor session cannot read subscribers/donations or reach Users/Settings by URL; the last-administrator rule has a DB test.

### Stage 7: Quality, docs, hand-off
1. **Tests**: Playwright specs for the admin shell (unauthenticated redirect, no-access, noindex headers, no public link to admin, middleware does not locale-prefix admin paths); a11y (axe) on every admin page that renders without credentials plus the sign-in and MFA pages; Vitest unit tests from Stage 3; DB tests from Stage 1. Keep the existing 546 public tests green (run the full suite once at the end).
2. **Admin manual** draft in `tanmaysaachi/docs/admin-manual.md` (task-oriented: sign in with two-step, publish an article, add a project and tiers, handle a scheme review, upload an image with consent, withdraw consent, record an offline donation). The Agreement requires an admin manual at handover and three training sessions; this is the first draft. No screenshots of real data.
3. **Vault**: update `Tanmaysaachi-Vault/06 Build Plan/` with a note for this build (what exists, decisions D1-D6, deviations from TDD and why) and `05 Architecture/Admin Panel.md` if anything changed. The vault is outside the repo; do not commit it.
4. Update `supabase/README.md` (new migrations, how to run the harness, session-lifetime guidance) and `.env.example` (names only).

---

## 5. Constraints that are easy to get wrong

- **Never trust the UI for access.** Always also read as the wrong role in a test. The admin reads and writes with the staff member's session; `service_role` is not available to you.
- **Money is whole paise.** One conversion helper, tested; no `number` arithmetic on rupees.
- **Two languages everywhere content is stored**: `{ "en": "...", "hi": "..." }` for jsonb fields, `*_translations` rows for typed content. English required; Hindi may be empty (the public site falls back to English with a notice). Admin chrome is English only.
- **Commitments in the UI must mirror the database**, e.g. do not offer a "publish" button that the database will refuse without saying why; and do not add a way around a constraint (no "force publish").
- **Candour rules** (vault `01 Rules`): no page, label or placeholder may state or imply a visitor is eligible for a scheme; nothing says "coming soon" for a credential; unverified figures show "—".
- **No personal data in logs**; log SQLSTATE and the operation name only.
- **Migrations are forward-only**; a mistake means a new migration, not an edit. The live project already has 0001-0007 applied through the SQL editor, so its `supabase_migrations` history is empty; if you want `supabase db push`, repair the history first and tell the user.
- Windows paths and shells: tools here run in Git Bash/PowerShell; avoid scripts that assume Linux-only binaries.

---

## 6. Verification checklist (what "done" means for this task)

A stage (A1-A6 or Stage 1-7) is done when its gate passes **and** all of these still hold:

- [ ] `npm run typecheck`, `npm run lint`, `npm run i18n:check` clean (from `tanmaysaachi/`).
- [ ] `node supabase/scripts/pg-dry-run.mjs <repo>/tanmaysaachi/supabase` prints only `ok` lines (migrations, seed, all tests).
- [ ] `npx playwright test` in `apps/web`: all pass (rerun any lone a11y failure with `--workers=2`; investigate if it repeats).
- [ ] The public site is visually unchanged: the Playwright screenshot baselines from A2 still pass (Part B should not touch `app/[locale]/(public)` at all).
- [ ] CI (A1) is green on `dev` and `test`.
- [ ] `git status` shows changes only inside `tanmaysaachi/`; no secrets, no `.env*` (except `.env.example`), no test credentials committed.
- [ ] Authenticated flows were exercised against the test Supabase project (D1) with an editor and an administrator, and the result is written in the report; anything that could not be exercised is listed, not skipped silently.

When Part A and all seven Part B stages are done: the build is ready for step 4.1 Foundation Delivery (the user decides when to start it), and Agreement cl. 3.3 items are covered except SEO/analytics-via-GA (later tasks), and the admin is ready for the step 6.2 review workflow to plug into.

---

## 7. Reporting back

After each stage, write a short entry at the bottom of `docs/tasks/task1-progress.md` (create it): stage, commits (hash + subject), gate results (commands and outcomes), what was **not** verified, and any decision the user must make. Keep it factual; do not report something as working unless you ran it.

At the end, tell the user in plain words: what exists, how to try it, what is still missing, and the exact branch and commit it is on (`dev`/`test`). Do not push to `main` and do not deploy.

---

## 8. Open conflicts you may hit (already catalogued; do not re-litigate)

- Giving tiers: mockup says "cannot be typed by hand"; the Foundation chose adjustable-with-reason (TDD v2.0). Build the adjustable version; the public sentence is reworded elsewhere. Pending Foundation reply (Open Decision 1).
- PRD A5 lists pillars/team/values/credentials as editable content types; TDD v2.0 §9.4 and Open Decision 12 say dev-team-loaded in Phase 1. Follow TDD v2.0 (read-only lists).
- TDD v2.0 §7.5 lets administrators manage credentials, §9.4 says the dev team loads them. Follow §9.4 (no edit UI); the `credentials` write policy is already administrator-only if the Foundation later buys the CR.
- `TDD.md` vs `TDD.pdf`: the PDF is v2.0 and wins.
