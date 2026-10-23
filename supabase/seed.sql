-- Seed data. Drafts only (TDD v2.0 §7.6): nothing here is published, and the
-- constraints stop it being published until a person verifies it.

-- Every credential starts as "not held". There is no "coming soon" state.
insert into public.credentials (key) values
  ('12ab'), ('80g'), ('csr1'), ('fcra'), ('cin'), ('pan'), ('section8')
on conflict (key) do nothing;

-- Off until the Foundation confirms each one (§12).
insert into public.feature_flags (key, enabled, note) values
  ('outbound_alerts', false, 'WhatsApp, SMS and email alerts'),
  ('live_ingestion', false, 'Nightly government source ingestion'),
  ('search_indexing', false, 'Search engines may index the site'),
  ('retention_job', false, 'Deletes enquiries and intents after the Foundation''s retention period')
on conflict (key) do nothing;
