# Environments

Names only. Never put values in this repository; secrets live in the host's secret store (Cloud Run / Secret Manager). `apps/web/.env.example` is the template for local development.

| Environment | Branch | Database | Notes |
|---|---|---|---|
| Local | `dev/<name>` | a development Supabase project, or none (the site renders without one) | `apps/web/.env.local`, gitignored |
| Development | `dev` | development Supabase project | integration |
| Staging | `test` | its own Supabase project | password or IP protected, `noindex`; outbound alerts, live ingestion and search indexing **off** |
| Production | `prod` | production Supabase project | the only place the privileged database key exists |

Rules (TDD v2.0 §12, §15.1):

- A separate Supabase project and separate secrets per environment.
- The privileged (service-role) key exists only in production and only in the background service, never in the web application.
- Production data is never copied down un-anonymised.
- In every non-production environment: `ROBOTS_MODE=noindex`, and the feature flags `outbound_alerts`, `live_ingestion`, `search_indexing` and `retention_job` stay off.

## Variables the web application reads

| Name | Public to the browser | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | canonical URL and metadata base |
| `ROBOTS_MODE` | no | `index` only on production |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | the publishable key; safe in a browser because the database refuses everything except the published views and the visitor forms |

Further names (analytics, email, payments, background service) are listed in TDD v2.0 Appendix C and are added here when they are first used.
