---
name: supabase
description: Use when working with Supabase in this repo: auth setup, env vars, schema patterns, multi-app configuration. Reference: .agent/platforms/supabase.yaml (authoritative config).
---

# Supabase

Use when working with Supabase: auth setup, env vars, schema patterns, multi-app configuration. **Authoritative config:** `.agent/platforms/supabase.yaml`

---

## Multi-app auth configuration

**Requirement:** When multiple apps share one Supabase project, OAuth redirects can land on the wrong app unless:

1. **Site URL** in Supabase Dashboard → Auth → URL Configuration is set to the **root domain** (e.g. `https://fitautomate.com`), not a single app subdomain.
2. **Redirect URLs** in the same URL Configuration include **every app's `/login` route explicitly**.

Without both, Supabase may fall back to Site URL after OAuth and users can end up on the wrong host. Keep the list in sync with `.agent/platforms/supabase.yaml` `auth_redirect_urls` and the Dashboard.

---

## Environment variables

**Server (required for API + JWT verification):**

- `SUPABASE_URL` — project base URL (`https://<project-ref>.supabase.co`). Never include `/login` or path.
- `SUPABASE_ANON_KEY` — anon key (same project); required for `getUser(jwt)`.
- `SUPABASE_SERVICE_ROLE_KEY` — for server-side DB access (bypass RLS when needed).

**Client (Vite):**

- `VITE_SUPABASE_URL` — same value as `SUPABASE_URL`.
- `VITE_SUPABASE_ANON_KEY` — same as `SUPABASE_ANON_KEY`.
- `VITE_AUTH_REDIRECT_URL` (optional) — explicit OAuth return URL. Use to avoid redirecting to wrong app; client should enforce same-host when set.

**Alignment rule:** `SUPABASE_URL` and `VITE_SUPABASE_URL` must be identical. If the server points at a different project or a URL with a path, login can succeed in the UI while protected API routes return 401.

**Multi-environment:** Optional overrides per env: `SUPABASE_URL_DEV`, `SUPABASE_SERVICE_ROLE_KEY_DEV`, `SUPABASE_DB_SCHEMA_DEV`, and `_DEMO` / `_PROD` variants. Default schema when using schemas: `SUPABASE_DB_SCHEMA` (e.g. `n8n_inventory`).

---

## URL normalization

Normalize Supabase URL from env before creating clients: trim, strip quotes, then use only `protocol + host` (no path). Prevents misconfiguration where `SUPABASE_URL` was set to `https://<ref>.supabase.co/login` and caused 401s.

```ts
export function normalizeSupabaseUrl(rawValue: string | undefined): string | undefined {
  if (!rawValue) return undefined;
  const cleaned = rawValue.trim().replace(/^['"]+|['"]+$/g, "");
  if (!cleaned) return undefined;
  try {
    const parsed = new URL(cleaned);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return cleaned;
  }
}
```

Use in both server and client Supabase client creation.

---

## Auth: server

- Create client with `normalizeSupabaseUrl(process.env.SUPABASE_URL)` and `SUPABASE_ANON_KEY`.
- Options: `auth: { persistSession: false, autoRefreshToken: false }` for server-side only.
- Verify JWT via `client.auth.getUser(token)`; token from `Authorization: Bearer <token>` or cookie `sb-<project-ref>-auth-token` (value may be JSON `{ access_token }` or raw string).
- Middleware: attach `req.user` from verification; optional `requireAuth` that returns 401 when auth is configured and `req.user` is null. When `SUPABASE_ANON_KEY` is unset, keep behavior permissive so existing deployments still work.
- Localhost bypass: some apps skip auth on localhost; others require env and show "Supabase not configured" on `/login` when unset.

---

## Auth: client

- Create client with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (normalized URL). Options: `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: true`.
- OAuth: `signInWithOAuth({ provider: 'google' | 'github' | 'azure' })` with redirect; magic link: `signInWithOtp({ email })`. Redirect URL should be same-host or explicit `VITE_AUTH_REDIRECT_URL`; reject cross-host redirect when not localhost to avoid sending one app's login to another.
- Send token to API: store access token from session and add `Authorization: Bearer <token>` to fetch/API client so protected routes accept it.

---

## Schema patterns

- Use a **non-public schema** per app/domain (e.g. `n8n_inventory`) to isolate data. Create with `CREATE SCHEMA IF NOT EXISTS <name>;` in migrations.
- Server client: `createClient(url, serviceRoleKey, { db: { schema: process.env.SUPABASE_DB_SCHEMA ?? "n8n_inventory" } })`.
- Expose schema to PostgREST: `ALTER ROLE authenticator SET pgrst.db_schemas = 'public, n8n_inventory';` then `NOTIFY pgrst, 'reload schema';`.
- Grant: `GRANT USAGE ON SCHEMA n8n_inventory TO authenticated, service_role;` and appropriate table grants.

---

## OAuth provider callback

For Google, GitHub, Azure: the **authorized redirect URI** in the provider (Google Cloud, GitHub App, Entra) must be the **Supabase callback**, not the app URL:

`https://<project-ref>.supabase.co/auth/v1/callback`

App URLs (e.g. `https://tools.fitautomate.com/login`) are configured only in **Supabase Auth → URL Configuration → Redirect URLs**, not as provider redirect URIs.

---

## Checklist for new app on shared project

1. Add app's production (and dev/preview) `/login` URLs to `.agent/platforms/supabase.yaml` `auth_redirect_urls` and to Supabase Dashboard → Auth → URL Configuration.
2. Ensure Site URL is the root domain.
3. Set `SUPABASE_URL` / `VITE_SUPABASE_URL` to project base URL; use normalized URL in code.
4. Use same `SUPABASE_ANON_KEY` / `VITE_SUPABASE_ANON_KEY` for the project.
5. If the app has its own data, add a schema and list it in `.agent/platforms/supabase.yaml` `schemas`; use `SUPABASE_DB_SCHEMA` (and env-specific overrides if needed).
