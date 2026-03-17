begin;

create extension if not exists pgcrypto;

create schema if not exists fit_accounting_demo;

create table if not exists fit_accounting_demo.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'admin')),
  full_name text,
  email text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists fit_accounting_demo.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null,
  email text not null,
  subject text not null,
  message text not null
);

create table if not exists fit_accounting_demo.client_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  filename text not null,
  storage_path text not null,
  uploaded_at timestamptz not null default timezone('utc', now()),
  status text not null default 'received' check (status in ('received', 'under_review', 'complete'))
);

create table if not exists fit_accounting_demo.portal_downloads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  storage_path text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists client_documents_user_id_idx
  on fit_accounting_demo.client_documents (user_id);

create or replace function fit_accounting_demo.is_admin(check_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = fit_accounting_demo, public
as $$
  select exists (
    select 1
    from fit_accounting_demo.profiles profile_row
    where profile_row.user_id = check_user_id
      and profile_row.role = 'admin'
  );
$$;

grant usage on schema fit_accounting_demo to anon, authenticated, service_role;
grant execute on function fit_accounting_demo.is_admin(uuid) to authenticated, service_role;

grant select on fit_accounting_demo.profiles to authenticated;
grant insert on fit_accounting_demo.contact_submissions to anon, authenticated;
grant select, insert on fit_accounting_demo.client_documents to authenticated;
grant select on fit_accounting_demo.portal_downloads to authenticated;

grant all privileges on all tables in schema fit_accounting_demo to service_role;
grant all privileges on all sequences in schema fit_accounting_demo to service_role;
alter default privileges in schema fit_accounting_demo
  grant all privileges on tables to service_role;
alter default privileges in schema fit_accounting_demo
  grant all privileges on sequences to service_role;

alter table fit_accounting_demo.profiles enable row level security;
alter table fit_accounting_demo.contact_submissions enable row level security;
alter table fit_accounting_demo.client_documents enable row level security;
alter table fit_accounting_demo.portal_downloads enable row level security;

drop policy if exists profiles_select_own on fit_accounting_demo.profiles;
create policy profiles_select_own
  on fit_accounting_demo.profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists contact_insert_public on fit_accounting_demo.contact_submissions;
create policy contact_insert_public
  on fit_accounting_demo.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists contact_select_admin on fit_accounting_demo.contact_submissions;
create policy contact_select_admin
  on fit_accounting_demo.contact_submissions
  for select
  to authenticated
  using (fit_accounting_demo.is_admin(auth.uid()));

drop policy if exists client_documents_select_own_or_admin on fit_accounting_demo.client_documents;
create policy client_documents_select_own_or_admin
  on fit_accounting_demo.client_documents
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or fit_accounting_demo.is_admin(auth.uid())
  );

drop policy if exists client_documents_insert_own_or_admin on fit_accounting_demo.client_documents;
create policy client_documents_insert_own_or_admin
  on fit_accounting_demo.client_documents
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    or fit_accounting_demo.is_admin(auth.uid())
  );

drop policy if exists client_documents_update_admin on fit_accounting_demo.client_documents;
create policy client_documents_update_admin
  on fit_accounting_demo.client_documents
  for update
  to authenticated
  using (fit_accounting_demo.is_admin(auth.uid()))
  with check (fit_accounting_demo.is_admin(auth.uid()));

drop policy if exists portal_downloads_select_authenticated on fit_accounting_demo.portal_downloads;
create policy portal_downloads_select_authenticated
  on fit_accounting_demo.portal_downloads
  for select
  to authenticated
  using (true);

drop policy if exists portal_downloads_write_admin on fit_accounting_demo.portal_downloads;
create policy portal_downloads_write_admin
  on fit_accounting_demo.portal_downloads
  for all
  to authenticated
  using (fit_accounting_demo.is_admin(auth.uid()))
  with check (fit_accounting_demo.is_admin(auth.uid()));

alter role authenticator set pgrst.db_schemas = 'public, n8n_inventory, fit_accounting_demo';
notify pgrst, 'reload schema';

commit;
