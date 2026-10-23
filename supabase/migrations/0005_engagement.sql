-- 0005 Engagement: leads, newsletter subscribers, alert subscriptions,
-- notification events, outbox, donation intents, donations (TDD v2.0 §7.3,
-- §10). Visitors may add rows through the grants in 0007 but never read any
-- back. Editors read enquiries; only Administrators read subscribers and
-- donations (§7.5). No personal data in logs (§12).

-- The seven choices of "I am getting in touch about" on Contact.
create type public.enquiry_type as enum (
  'csr_partnership', 'institutional_partnership', 'grant', 'volunteering',
  'scheme_help', 'media', 'other');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  source_page text not null check (length(source_page) <= 200),
  locale public.locale not null,
  enquiry_type public.enquiry_type not null,
  name text not null check (length(btrim(name)) between 1 and 200),
  organisation text check (length(organisation) <= 200),
  email text check (length(email) <= 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text check (length(phone) <= 40),
  message text not null check (length(btrim(message)) between 1 and 5000),
  consent_notice_version text not null,
  assigned_owner uuid references public.admin_users (id),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint can_be_reached check (email is not null or phone is not null)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (length(email) <= 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  locale public.locale not null,
  consent_notice_version text not null,
  confirm_token_hash text,
  token_expires_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create type public.alert_channel as enum ('whatsapp', 'sms', 'email');

create table public.alert_subscriptions (
  id uuid primary key default gen_random_uuid(),
  channel public.alert_channel not null,
  address text not null check (length(address) <= 320),
  locale public.locale not null,
  states text[] not null default '{}',
  categories text[] not null default '{}',
  consent_notice_version text not null,
  confirm_token_hash text,
  token_expires_at timestamptz,
  double_opt_in_confirmed boolean not null default false,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (channel, address),
  constraint confirmed_has_time check (not double_opt_in_confirmed or confirmed_at is not null)
);

create table public.notification_events (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid references public.schemes (id),
  kind text not null check (kind in ('scheme_opened', 'scheme_changed', 'scheme_closing', 'scheme_shut')),
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Alert idempotency (App. B): one delivery per event, subscriber and channel,
-- and a crash after the provider accepted a message cannot send it again.
create table public.outbox (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.notification_events (id),
  subscription_id uuid not null references public.alert_subscriptions (id),
  channel public.alert_channel not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'failed', 'skipped')),
  provider_message_id text,
  attempts int not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  unique (event_id, subscription_id, channel),
  constraint accepted_is_final check (status <> 'accepted' or provider_message_id is not null)
);

-- A visitor's intention to give, captured before the hosted Razorpay page.
-- PAN is stored only encrypted with the Foundation's Cloud KMS key (§12).
create table public.donation_intents (
  id uuid primary key default gen_random_uuid(),
  amount_paise bigint not null check (amount_paise > 0),
  frequency text not null check (frequency in ('once', 'monthly')),
  project_id uuid references public.projects (id),
  giving_tier_id uuid references public.giving_tiers (id),
  name text not null check (length(btrim(name)) between 1 and 200),
  email text not null check (length(email) <= 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  pan_ciphertext bytea,
  pan_key_version text,
  address text check (length(address) <= 1000),
  marketing_consent boolean not null default false,
  consent_notice_version text not null,
  locale public.locale not null,
  created_at timestamptz not null default now(),
  constraint pan_is_keyed check ((pan_ciphertext is null) = (pan_key_version is null))
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  intent_id uuid references public.donation_intents (id),
  razorpay_payment_id text unique,
  amount_paise bigint not null check (amount_paise > 0),
  payment_status text not null check (payment_status in ('captured', 'refunded', 'failed', 'offline')),
  offline_flag boolean not null default false,
  receipt_number text unique,
  received_at timestamptz not null,
  audit_note text,
  created_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint offline_has_note check (not offline_flag or audit_note is not null),
  constraint online_has_payment check (offline_flag or razorpay_payment_id is not null)
);

create trigger leads_touch before update on public.leads
  for each row execute function app.touch_updated_at();
create trigger donations_touch before update on public.donations
  for each row execute function app.touch_updated_at();

select app.secure_table('public.leads', 'staff', 'staff');
select app.secure_table('public.newsletter_subscribers', 'admin', 'admin');
select app.secure_table('public.alert_subscriptions', 'admin', 'admin');
select app.secure_table('public.notification_events', 'staff', 'none');
select app.secure_table('public.outbox', 'admin', 'none');
select app.secure_table('public.donation_intents', 'admin', 'admin');
select app.secure_table('public.donations', 'admin', 'admin');
