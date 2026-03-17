# Liquid Financial — FIT Web Pro Demo — Design

> Reference design for a small accounting firm marketing site + client portal + admin. Content is replaceable via a single config for reuse per client.

**Client (demo):** Stanley Jansen, Liquid Financial, GTA (North York, ON).  
**Stack:** Next.js (App Router), Tailwind CSS, shadcn/ui, Supabase Auth + DB/Storage, Vercel.

---

## 1. Sitemap & content config

### Routes

| Route       | Who    | Purpose                                              |
|------------|--------|------------------------------------------------------|
| `/`        | Public | Home (hero, value prop, CTA)                        |
| `/about`   | Public | About Stanley / firm                                |
| `/services`| Public | Service list                                        |
| `/testimonials` | Public | Testimonials carousel                          |
| `/contact` | Public | Contact form + social links                         |
| `/login`   | Public | Sign in; redirect by role to `/portal` or `/admin`   |
| `/portal`  | Client | Upload docs, download forms, view status            |
| `/admin`   | Admin  | Clients, uploads, status, mark reviewed, download    |

Public nav: Home, About, Services, Testimonials, Contact, Login.

### Single replaceable config: `content/site.config.ts`

One exported object; all public content and links read from it. One file swap per client.

**Shape:**

- **`firm`** — `name`, `tagline` (optional)
- **`principal`** — `name`, `title`, `bio`, `headshotPath` (e.g. `"/images/principal.jpg"`)
- **`contact`** — `address`, `phone`, `email` (address as string or `{ line1, city, province, postalCode }`)
- **`services`** — `{ id, title, description }[]`
- **`testimonials`** — `{ id, quote, authorName, authorTitle }[]` (6–8 items)
- **`social`** — optional `{ linkedin?, twitter?, facebook? }` URLs
- **`seo`** — optional `siteName`, `defaultTitle`, `defaultDescription`

**Headshot:** Place file at path given by `principal.headshotPath` (e.g. `public/images/principal.jpg`). Used in hero and About.

---

## 2. Public marketing pages

- **Hero:** Centered layout (no shimmer). Headline/tagline from config, primary CTA → Contact, secondary → Login. Muted sky blue, slate text, one accent (e.g. teal or soft gold). Icons/SVG only besides headshot.
- **About:** Principal name, title, headshot, bio from config; optional short “Why work with us” points.
- **Services:** List/grid from config; icon + title + description per service.
- **Testimonials:** Carousel (6–8 items); quote, author name, title; prev/next and accessible.
- **Contact:** Address, phone, email; form (name, email, subject, message) → API → Supabase and/or email; social links.
- **Global:** Header (logo, nav, Login), footer (nav, contact, social), light/dark theme toggle.

---

## 3. Auth, client portal, admin

- **Auth:** Supabase Auth (email/password; magic link optional). `/login` redirects by role (client → `/portal`, admin → `/admin`).
- **Roles:** Resolved from `fit-accounting-demo.profiles` by `auth.uid()`. Middleware protects `/portal` (client or admin) and `/admin` (admin only).
- **Client portal:** Upload (Supabase Storage + metadata), downloads list (forms/docs), optional “Your submissions” with status.
- **Admin:** Clients list; per-client uploads with download and “Mark as reviewed”; optional upload of portal downloads/forms. No inbox; manual workflow.
- No FIT Automate ongoing maintenance (no scheduled jobs, no n8n).

---

## 4. Supabase schema & RLS

**Schema:** `fit-accounting-demo`.

**Tables:**

- **`profiles`** — `id`, `user_id` (→ auth.users), `role` ('client' | 'admin'), `full_name`, `email`. One admin (Stanley).
- **`contact_submissions`** — `id`, `created_at`, `name`, `email`, `subject`, `message`.
- **`client_documents`** — `id`, `user_id`, `filename`, `storage_path`, `uploaded_at`, `status` ('received' | 'under_review' | 'complete').
- **`portal_downloads`** — `id`, `name`, `description`, `storage_path`, `created_at` (admin-uploaded forms/docs).

**Storage:**

- Bucket `client-uploads`: RLS per `user_id` for clients; admin via service role.
- Bucket `portal-downloads`: read for authenticated clients; admin write.

**RLS:** Profiles read own row; client_documents by user_id for clients, full access for admin; contact_submissions insert from API, read by admin/service role. Expose schema in PostgREST; grant USAGE to authenticated, service_role.

---

## 5. SEO, tracking, themes

- **SEO:** Metadata from `site.config.ts` (or defaults). `NEXT_PUBLIC_SITE_URL` for canonical. Per-page `generateMetadata` where useful.
- **Tracking:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional); GA4 in layout. Replaceable per client via env.
- **Themes:** Light/dark via CSS variables; toggle in header/footer; preference in localStorage.

---

## 6. Vercel (liquid-financial-demo)

**Project does not exist yet.** Do the following:

1. **Create project:** In Vercel dashboard, create a new project named **`liquid-financial-demo`**.
2. **Connect repo:** Import from GitHub (this repo); Vercel will detect Next.js and set build/output.
3. **Env vars:** Set in Vercel project settings (see §7). Add for Production and Preview if needed.
4. **Domains:** Assign a Vercel URL (e.g. `liquid-financial-demo.vercel.app`) or custom domain when ready.

No other Vercel-specific config required for a standard Next.js App Router app.

---

## 7. Supabase connection

**Supabase project:** Shared FIT Automate project (see `.agent/platforms/supabase.yaml`). This app uses the same project; it does not create a new Supabase project.

**You need to do:**

1. **Schema:** Create schema `fit-accounting-demo` and run migrations (tables + RLS + storage buckets) in that project.
2. **Auth redirect URLs:** In Supabase Dashboard → Auth → URL Configuration → Redirect URLs, add:
   - Production: `https://liquid-financial-demo.vercel.app/login` (or final domain)
   - Preview: `https://*.vercel.app/login` if you use preview deployments
   - Local: `http://localhost:3000/login` (or your dev port)
   - Also add these to `.agent/platforms/supabase.yaml` under `auth_redirect_urls`.
3. **Expose schema:** Ensure `fit-accounting-demo` is in `pgrst.db_schemas` for the project (and in `schemas` in `supabase.yaml`).
4. **Env in Vercel (and local):** Set:
   - `NEXT_PUBLIC_SUPABASE_URL` = project URL (no path)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = service role key (server-only; for admin and RLS bypass where needed)
   - Optional: `SUPABASE_DB_SCHEMA=fit-accounting-demo` if your client defaults to it

**Summary:** Supabase is “connected” once (a) the schema and policies exist in the existing project, (b) redirect URLs include this app’s URLs, and (c) the app’s env vars point at that project. No separate “connect” step in Vercel for Supabase; connection is via env vars.

---

## 8. Demo content (Liquid Financial)

- **Firm:** Liquid Financial  
- **Principal:** Stanley Jansen  
- **Address:** 911 Highway 7, North York, ON M3K 000  
- **Phone:** 905-789-9876  
- **Headshot:** To be added at path specified in config (e.g. `public/images/principal.jpg`).  
- **Testimonials:** 6–8 carousel items; generic author titles (e.g. “Business owner”); no made-up names or fake specifics.

---

*Design approved. Implementation plan: `docs/plans/YYYY-MM-DD-fit-accounting-implementation.md`.*
