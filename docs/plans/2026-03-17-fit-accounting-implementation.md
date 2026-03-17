# Liquid Financial (FIT Web Pro Demo) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a production-ready demo: public marketing site (hero, about, services, testimonials, contact), client portal (upload/download), and Stanley admin view, with replaceable content via `content/site.config.ts`, Supabase Auth + RLS, and Vercel deploy.

**Architecture:** Next.js App Router; single `site.config.ts` for all client-swappable content; Supabase (shared project) schema `fit_accounting_demo` for profiles, contact_submissions, client_documents, portal_downloads; Storage for uploads and downloads; middleware for role-based route protection.

**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, Supabase (Auth, Postgres, Storage), Vercel. Reference: `docs/DESIGN.md`, `.cursor/skills/supabase/SKILL.md`, `.agent/platforms/supabase.yaml`.

---

## Phase 1: Project scaffold and content config

### Task 1.1: Create Next.js app with Tailwind and TypeScript

**Files:**
- Create: project root (new Next.js app)

**Step 1:** Scaffold Next.js (App Router), TypeScript, Tailwind, ESLint, `src/` dir, no Turbopack if it causes issues.

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
```

**Step 2:** Confirm `tailwind.config.ts` and `src/app/globals.css` exist. Run `npm run build`. Expected: build succeeds.

**Step 3:** Commit.

```bash
git add .
git commit -m "chore: scaffold Next.js App Router with Tailwind and TypeScript"
```

---

### Task 1.2: Add shadcn/ui

**Files:**
- Modify: `package.json`, `components.json`, `src/app/globals.css`
- Create: `src/components/ui/*` (as added by CLI)

**Step 1:** Init shadcn (defaults, New York style).

```bash
npx shadcn@latest init
```

**Step 2:** Add components used in the plan: `button`, `card`, `input`, `label`, `textarea`, `dropdown-menu`, `navigation-menu`, `separator`, `tabs`, `form` (for contact). Add as needed in later tasks; for this task add: `button`, `card`, `input`, `label`, `textarea`.

```bash
npx shadcn@latest add button card input label textarea
```

**Step 3:** Commit.

```bash
git add .
git commit -m "chore: add shadcn/ui and base components"
```

---

### Task 1.3: Add content config type and Liquid Financial demo data

**Files:**
- Create: `src/content/site.config.ts`
- Create: `src/content/types.ts` (optional; can inline in config)

**Step 1:** Define TypeScript types for `firm`, `principal`, `contact`, `services[]`, `testimonials[]`, `social`, `seo` per `docs/DESIGN.md` §1.

**Step 2:** Create `site.config.ts` exporting one object: Liquid Financial, Stanley Jansen, 911 Highway 7 North York ON M3K 000, 905-789-9876, 6–8 testimonials (generic author titles), all seven services from DESIGN. Use `headshotPath: "/images/principal.jpg"`. Include placeholder `social` and `seo` keys.

**Step 3:** Export a typed `siteConfig` and ensure `src/app` can import from `@/content/site.config` (set path in `tsconfig.json` if needed).

**Step 4:** Commit.

```bash
git add src/content/
git commit -m "feat: add site.config.ts types and Liquid Financial demo content"
```

---

## Phase 2: Theme and layout

### Task 2.1: Theme provider and CSS variables (light/dark)

**Files:**
- Create: `src/components/theme-provider.tsx` (or use next-themes)
- Modify: `src/app/globals.css` (CSS variables for muted sky blue, slate, accent)
- Modify: `src/app/layout.tsx` (wrap with ThemeProvider)

**Step 1:** Install `next-themes`. Add provider that wraps children and respects `localStorage` + system preference.

**Step 2:** In `globals.css`, define variables for background (muted sky), text (slate), accent (e.g. teal or soft gold), for both `.light` and `.dark` (or `[data-theme="dark"]`). Use Tailwind theme extension if desired.

**Step 3:** Wrap root layout with `ThemeProvider`. Set `defaultTheme="system"`, `enableSystem`, `attribute="class"`.

**Step 4:** Commit.

```bash
git add src/components/theme-provider.tsx src/app/globals.css src/app/layout.tsx package.json
git commit -m "feat: add light/dark theme with muted sky and slate palette"
```

---

### Task 2.2: Header and footer components

**Files:**
- Create: `src/components/header.tsx`
- Create: `src/components/footer.tsx`

**Step 1:** Header: firm name from config (link to `/`), nav links (Home, About, Services, Testimonials, Contact), Login link, theme toggle. Use shadcn where appropriate (e.g. NavigationMenu, Button). Responsive: mobile menu if needed.

**Step 2:** Footer: repeat key nav links, contact snippet (address line, phone), social links from config (if present), copyright. Theme toggle can be in header only.

**Step 3:** Use `siteConfig` from `@/content/site.config` for firm name and contact.

**Step 4:** Commit.

```bash
git add src/components/header.tsx src/components/footer.tsx
git commit -m "feat: add header and footer with nav and theme toggle"
```

---

### Task 2.3: Root layout with header/footer and metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1:** Add Header above `{children}`, Footer below. Read `siteConfig.seo` (or firm name) for default `title` and `description` in metadata.

**Step 2:** Commit.

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with header, footer, and SEO metadata from config"
```

---

## Phase 3: Public marketing pages

### Task 3.1: Home page and hero section

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/hero.tsx`

**Step 1:** Hero: centered layout; headline = firm name + tagline from config; short subline; primary CTA "Get in touch" → `/contact`; secondary "Client login" → `/login`. Optional: principal headshot via `principal.headshotPath`. Style with muted sky background, slate text, accent for buttons. No shimmer. Use Tailwind + CSS variables from Task 2.1.

**Step 2:** Home page: render Hero; optionally a short "Why choose us" or services teaser (2–3 lines from config). No extra images; icons/SVG only besides headshot.

**Step 3:** Commit.

```bash
git add src/app/page.tsx src/components/hero.tsx
git commit -m "feat: home page with hero (config-driven, muted sky/slate)"
```

---

### Task 3.2: About page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1:** About: principal name, title, headshot (from `principal.headshotPath`), bio from config. Optional: 3–4 "Why work with us" bullets (in config or hardcoded). Single column; no extra images.

**Step 2:** Commit.

```bash
git add src/app/about/page.tsx
git commit -m "feat: about page with principal and bio from config"
```

---

### Task 3.3: Services page

**Files:**
- Create: `src/app/services/page.tsx`

**Step 1:** List or grid of services from `siteConfig.services`. Each: icon (SVG), title, description. CTA to contact at bottom.

**Step 2:** Commit.

```bash
git add src/app/services/page.tsx
git commit -m "feat: services page from site.config"
```

---

### Task 3.4: Testimonials carousel

**Files:**
- Create: `src/components/testimonials-carousel.tsx`
- Create: `src/app/testimonials/page.tsx` (and/or use on home)

**Step 1:** Carousel: 6–8 items from `siteConfig.testimonials`. Quote, author name, author title. Prev/next buttons; optional auto-rotate. Accessible (focus, optional pause). Use shadcn or a minimal custom carousel (no heavy lib required).

**Step 2:** Testimonials page: render carousel. Optionally also render a shortened carousel on home (per DESIGN).

**Step 3:** Commit.

```bash
git add src/components/testimonials-carousel.tsx src/app/testimonials/page.tsx
git commit -m "feat: testimonials carousel and page"
```

---

### Task 3.5: Contact page and form API

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`

**Step 1:** Contact page: display address, phone, email from config (with icons). Form: name, email, subject, message. Submit to `/api/contact`. Success/error state. Social links from config.

**Step 2:** API route: parse JSON body; validate; insert into Supabase table `contact_submissions` (schema `fit_accounting_demo`). Use service role client. Return 200 or 4xx. Do not send email in this task (store only).

**Step 3:** Ensure env has Supabase URL and service role key. Create `contact_submissions` table in Supabase in Phase 4; this task can be implemented and tested after schema exists.

**Step 4:** Commit.

```bash
git add src/app/contact/page.tsx src/app/api/contact/route.ts
git commit -m "feat: contact page and form API (Supabase store)"
```

---

## Phase 4: Supabase schema, storage, and client

### Task 4.1: Create schema and tables in Supabase

**Files:**
- Create: `supabase/migrations/YYYYMMDD_fit_accounting_demo_schema.sql` (or run in Dashboard SQL)

**Step 1:** In the shared FIT Automate Supabase project, create schema `fit_accounting_demo` (use snake_case: `fit_accounting_demo`). Create tables: `profiles` (id, user_id uuid references auth.users, role text, full_name, email, created_at); `contact_submissions` (id, created_at, name, email, subject, message); `client_documents` (id, user_id, filename, storage_path, uploaded_at, status); `portal_downloads` (id, name, description, storage_path, created_at). Add RLS policies: profiles — user can read own row; contact_submissions — allow insert from anon or authenticated (or from API only via service role); client_documents — client read/insert own, admin read/update all (implement admin via service role in app or role-based policy); portal_downloads — authenticated read, service_role write. Grant USAGE on schema to authenticated, service_role. Expose schema in PostgREST (pgrst.db_schemas).

**Step 2:** Document in DESIGN or README that schema must be created in Supabase; add redirect URLs for this app to Dashboard and to `.agent/platforms/supabase.yaml` (already added for liquid-financial-demo).

**Step 3:** Commit migration file (or document "run SQL in Dashboard" if no local Supabase CLI).

```bash
git add supabase/migrations/
git commit -m "feat(supabase): migration for fit_accounting_demo schema and RLS"
```

---

### Task 4.2: Storage buckets and RLS

**Files:**
- Create: `supabase/migrations/YYYYMMDD_storage_buckets.sql` or document in DESIGN

**Step 1:** Create bucket `client-uploads`: private; RLS so that authenticated users can insert/select only objects under path `{user_id}/*` for their own user_id; service_role can read all. Create bucket `portal-downloads`: private; authenticated read; service_role insert/update/delete.

**Step 2:** Commit or document.

```bash
git add supabase/migrations/
git commit -m "feat(supabase): storage buckets client-uploads and portal-downloads with RLS"
```

---

### Task 4.3: Supabase client utilities and env

**Files:**
- Create: `src/lib/supabase/client.ts` (browser client)
- Create: `src/lib/supabase/server.ts` (server client; use service role for admin/API)
- Create: `.env.local.example` with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_DB_SCHEMA=fit_accounting_demo

**Step 1:** Browser client: createClient(url, anonKey), schema from env. Server client: createClient(url, serviceRoleKey) for API routes and server components that need to bypass RLS or act as admin. Use schema option where supported (Supabase JS client schema for PostgREST).

**Step 2:** Normalize Supabase URL (trim, no path) per `.cursor/skills/supabase/SKILL.md`. Add to both client creation paths.

**Step 3:** Commit.

```bash
git add src/lib/supabase/ .env.local.example
git commit -m "feat: Supabase client utils and env example"
```

---

## Phase 5: Auth and role-based access

### Task 5.1: Login page and redirect by role

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/lib/auth/role.ts` (or similar: get role from profiles by user_id)

**Step 1:** Login page: email + password form; call Supabase Auth signInWithPassword. On success, fetch role from `fit_accounting_demo.profiles` by auth.uid(); redirect to `/admin` if role is admin, else `/portal`. If no profile row, redirect to `/portal` and optionally create profile as client (next task).

**Step 2:** Server helper: given access_token or session, return user and role from profiles. Use in middleware or layout.

**Step 3:** Commit.

```bash
git add src/app/login/page.tsx src/lib/auth/
git commit -m "feat: login page and role-based redirect"
```

---

### Task 5.2: Create profile on first login and seed admin

**Files:**
- Modify: `src/app/login/page.tsx` or auth flow; Create: `src/app/api/auth/callback/route.ts` or server action
- Document: how to insert Stanley's admin profile (user_id from Supabase Auth after first sign-up)

**Step 1:** After login, if no row in `profiles` for this user_id, insert one with role `client` (and full_name, email from auth user). Admin must be set manually in DB: one row with role `admin` for Stanley's user_id.

**Step 2:** Document in README or DESIGN: "To set admin: insert into fit_accounting_demo.profiles (user_id, role, full_name) values (<stanley_auth_uid>, 'admin', 'Stanley Jansen');"

**Step 3:** Commit.

```bash
git add src/app/login/page.tsx src/lib/auth/ docs/
git commit -m "feat: create client profile on first login; document admin seed"
```

---

### Task 5.3: Middleware to protect /portal and /admin

**Files:**
- Create: `src/middleware.ts`

**Step 1:** For routes under `/portal` and `/admin`: require authenticated session (Supabase auth cookie or getSession). If not authenticated, redirect to `/login`. For `/admin`, require role admin (read from profiles in middleware or via API); if not admin, redirect to `/portal` or home.

**Step 2:** Allow public routes: `/`, `/about`, `/services`, `/testimonials`, `/contact`, `/login`, and static assets.

**Step 3:** Commit.

```bash
git add src/middleware.ts
git commit -m "feat: middleware protect portal and admin by auth and role"
```

---

## Phase 6: Client portal

### Task 6.1: Portal layout and upload UI

**Files:**
- Create: `src/app/portal/layout.tsx`
- Create: `src/app/portal/page.tsx`
- Create: `src/app/api/portal/upload/route.ts`

**Step 1:** Portal layout: simple sidebar or tabs: "Upload", "Downloads", "Your submissions". Authenticated only (middleware). Use role from server component.

**Step 2:** Upload: file input or dropzone; on submit, upload file to Storage bucket `client-uploads` under path `{user_id}/{filename}`; insert row in `client_documents` (user_id, filename, storage_path, status 'received').

**Step 3:** API route: accept multipart/form-data or base64; verify JWT; upload to Storage; insert into client_documents. Return 200 or error.

**Step 4:** Commit.

```bash
git add src/app/portal/ src/app/api/portal/
git commit -m "feat: portal layout and document upload"
```

---

### Task 6.2: Portal downloads and submissions list

**Files:**
- Modify: `src/app/portal/page.tsx` or add `src/app/portal/downloads/page.tsx`, `src/app/portal/submissions/page.tsx`

**Step 1:** Downloads: list rows from `portal_downloads`; each row: name, description, link to download (signed URL or public URL from Storage). Show in portal UI.

**Step 2:** Your submissions: list `client_documents` for current user; show filename, uploaded_at, status. No edit/delete required for MVP.

**Step 3:** Commit.

```bash
git add src/app/portal/
git commit -m "feat: portal downloads list and your submissions"
```

---

## Phase 7: Admin

### Task 7.1: Admin layout and clients list

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/api/admin/clients/route.ts` (or server component data)

**Step 1:** Admin layout: nav to "Clients" (list) and optionally "Downloads" (manage portal_downloads). Only role admin; middleware already enforced.

**Step 2:** Clients list: list all users that have role client (from profiles) or list distinct user_id from client_documents; show name, email, link to per-client view. Use service role to read profiles.

**Step 3:** Commit.

```bash
git add src/app/admin/ src/app/api/admin/
git commit -m "feat: admin layout and clients list"
```

---

### Task 7.2: Admin per-client documents and mark reviewed

**Files:**
- Create: `src/app/admin/clients/[userId]/page.tsx`
- Create: `src/app/api/admin/documents/route.ts` (PATCH to update status)

**Step 1:** Per-client page: list client_documents for that user_id; columns: filename, uploaded_at, status. Actions: "Download" (signed URL from Storage), "Mark as reviewed" (set status to 'under_review' or 'complete').

**Step 2:** API route PATCH: accept document id and status; verify admin; update client_documents. Return 200.

**Step 3:** Commit.

```bash
git add src/app/admin/clients/ src/app/api/admin/
git commit -m "feat: admin per-client documents, download and mark reviewed"
```

---

### Task 7.3: Admin upload portal downloads (forms)

**Files:**
- Create: `src/app/admin/downloads/page.tsx`
- Create: `src/app/api/admin/portal-downloads/route.ts`

**Step 1:** Admin page: list existing portal_downloads; form to add new: name, description, file. Upload file to `portal-downloads` bucket; insert into portal_downloads.

**Step 2:** API route: accept multipart; verify admin; upload to Storage; insert portal_downloads. Return 200.

**Step 3:** Commit.

```bash
git add src/app/admin/downloads/ src/app/api/admin/
git commit -m "feat: admin upload portal downloads (forms)"
```

---

## Phase 8: SEO, tracking, and deploy

### Task 8.1: SEO metadata from config

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/about/page.tsx`, etc.

**Step 1:** Root layout: set metadata from `siteConfig.seo` (defaultTitle, defaultDescription) or firm name. Set `metadataBase` from `NEXT_PUBLIC_SITE_URL` if set.

**Step 2:** Per-page: add `generateMetadata` where useful (About, Services, Contact) with title and description derived from config.

**Step 3:** Commit.

```bash
git add src/app/
git commit -m "feat: SEO metadata from site.config and env"
```

---

### Task 8.2: Optional GA4 and Vercel env

**Files:**
- Modify: `src/app/layout.tsx` (add GA script when NEXT_PUBLIC_GA_MEASUREMENT_ID is set)
- Create or update: `docs/DESIGN.md` or README with Vercel checklist

**Step 1:** If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, inject GA4 script in layout (use next/script). No custom events required for MVP.

**Step 2:** Document in README or DESIGN: Create Vercel project named `liquid-financial-demo`; connect repo; set env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL, optional NEXT_PUBLIC_GA_MEASUREMENT_ID. Add Supabase redirect URLs for production and preview domains.

**Step 3:** Commit.

```bash
git add src/app/layout.tsx docs/ README.md
git commit -m "chore: GA4 optional and Vercel env documentation"
```

---

## Execution handoff

Plan complete and saved to `docs/plans/2026-03-17-fit-accounting-implementation.md`.

**Two execution options:**

1. **Subagent-driven (this session)** — Dispatch a fresh subagent per task; review between tasks; fast iteration. Use superpowers:subagent-driven-development.

2. **Parallel session (separate)** — Open a new session in this repo (or worktree); use superpowers:executing-plans for batch execution with checkpoints.

Which approach do you prefer?
