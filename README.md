# Tanmay Sachi Web Platform

Web platform for the Tanmaysaachi Mahila Empower Foundation (Agreement AM/TMS/2026/01, Phase 1).
Bilingual public website (English and Hindi), with admin panel, scheme engine, SEO suite and
messaging to follow, on Next.js 15 + Supabase.

## Layout

One repository, npm workspaces (TDD §4):

```
apps/web          Next.js 15 (App Router, TypeScript strict, Tailwind 3): public site, admin later
packages/         shared business rules, schemas and i18n catalogues (added as they are needed)
```

Inside `apps/web`:

```
app/globals.css               Approved Design styles, ported mechanically from the mockup (do not restyle)
app/[locale]/(public)/        public pages, one per mockup page, served at /en/... and /hi/...
i18n/ + middleware.ts         next-intl routing: "/" → "/en", locale-aware Link/router
messages/en.json, hi.json     interface strings; Hindi falls back to English per key (see messages/README.md)
components/ui/                primitives: Button, TextLink, Chip, Badge, Source, Led, Plane, Sheet, Shot
components/shell/             web header, mobile header + drawer, footer, tab bar, language switch
components/{ask,give}/        the few interactive pieces
tests/e2e/                    Playwright: no horizontal scroll, one h1, interactions, bilingual, axe
```

## Languages

English and Hindi are full locales on their own paths (Agreement cl. 3.2). Until the Foundation
supplies Hindi copy, `/hi` pages show the English content with a visible notice, are marked
`lang="en"` and are `noindex`. `npm run i18n:check` lists the interface strings still missing in Hindi.
Never machine-translate or invent Hindi copy.

## Commands

Run from the repository root (Node 20.9+; developed on Node 24):

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npm run typecheck
npm run test:e2e     # Chromium, WebKit and Firefox; first run: npx playwright install
npm run i18n:check   # Hindi strings still missing (add -- --strict to fail on gaps)
```

## Rules that apply to every change

- **The design is fixed.** Pages reproduce `tanmaysaachi-full-site-mockup.html` (the Approved Design)
  exactly. Port markup first, then data, then interactions (BUILD_GUIDE §0). Read grid ratios
  from `app/globals.css`, never eyeball them.
- **Never invent legal or credential values** (CIN, PAN, 12AB, 80G, CSR-1, FCRA, addresses).
  Placeholders stay as honest empty states until the Foundation supplies the record.
- **No horizontal scroll from 360px; WCAG 2.1 AA; Android 7+ and iOS 14+** (see `COMPATIBILITY.md`).
- **Never commit secrets.** `.env*` and service-account files are git-ignored; `.env.example` holds names only.
- Work on feature branches into `dev`; `test` is staging; `prod` releases only on the Foundation's written approval.

## Status

Base build (pass 1): all 14 pages of the Approved Design are ported with the mockup's copy as
static content, plus the shell and interactions. Bilingual framework (builder step 3.1) in place;
Hindi copy pending from the Foundation. Data (Supabase), forms, admin panel and scheme engine
follow in later steps.
