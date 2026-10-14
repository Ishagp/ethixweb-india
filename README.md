# Ethixweb India - Digital Engineering & Web Architecture Platform

A full-stack, India-specific redesign of the **Ethixweb** web application, engineered for enterprise reliability, high conversion, and sub-second performance on modern Indian network conditions.

---

## 1. Project Overview

Ethixweb India is a bespoke web engineering showcase designed for a full-stack developer hiring assessment. The platform replaces typical agency page-builder templates with clean, modular software architecture built on the **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase PostgreSQL**.

### Core Objectives Achieved
- **Foundational Design System:** Clean white and off-white surfaces (`#ffffff`, `#f8fafc`), Ethixweb signature red accents (`#e11d48` / `rose-600`), charcoal typography (`slate-900` / `slate-700`), generous vertical rhythm, and subtle borders.
- **Accessible & Semantic Structure:** Built using HTML5 landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`), explicit ARIA attributes, keyboard focus states, and zero broken links.
- **Anti-Spam & Rate-Limited Backend:** Implements an anti-bot honeypot trap, $20\text{ KB}$ payload capping, in-memory IP rate limiting, and server-side RFC 5322 regex validation.
- **Protected Admin Console:** Real-time lead management dashboard with cookie-based Supabase Auth session checks (`@supabase/ssr`), metrics counters, status update controls, and Row Level Security (RLS) data isolation.

---

## 2. Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Native Server Components, streaming SSR, and file-based routing. |
| **Language** | TypeScript 5 | Strict end-to-end type safety for interfaces, API payloads, and components. |
| **Styling** | Tailwind CSS 4 | Utility-first, zero-runtime CSS with modern CSS theme design tokens. |
| **Library** | React 19 | Fast virtual DOM reconciliation and modern hooks. |
| **Database** | Supabase (PostgreSQL) | Managed relational SQL database with Row Level Security (RLS). |
| **Auth** | Supabase Auth (`@supabase/ssr`) | Secure HTTP-only cookie session handling with zero client secret exposure. |

---

## 3. Folder Structure

```text
ethixweb-india/
│
├── public/
│   └── images/                 # Optimized static assets & logos
│
├── scripts/
│   └── create-admin.mjs        # Secure CLI script for provisioning admin accounts
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Inter font, Navbar & Footer
│   │   ├── page.tsx            # Agency homepage combining modular sections
│   │   ├── globals.css         # Ethixweb design tokens & Tailwind imports
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx        # Outcome-driven capabilities overview
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx        # Engineering values & India-centric philosophy
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact info + client-side validated form
│   │   │
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Admin login interface
│   │   │   └── page.tsx        # Protected server-rendered admin dashboard
│   │   │
│   │   └── api/
│   │       └── leads/
│   │           ├── route.ts    # POST (public lead submit) & GET (protected admin)
│   │           └── [id]/
│   │               └── route.ts # PATCH (protected status update) & GET
│   │
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky, accessible responsive navbar with mobile drawer
│   │   ├── Footer.tsx          # Semantic footer with contact & headquarters details
│   │   ├── Hero.tsx            # Clear business value proposition & trust points
│   │   ├── Services.tsx        # 4-card capabilities breakdown with deliverable lists
│   │   ├── Process.tsx         # Structured 4-phase delivery methodology
│   │   ├── FeaturedWork.tsx    # Realistic case studies with concrete tech stacks
│   │   ├── WhyEthixweb.tsx     # Engineering-first principles & maintainability
│   │   ├── Industries.tsx      # Relevant Indian market sectors (FinTech, D2C, B2B)
│   │   ├── ContactCTA.tsx      # High-conversion bottom call-to-action
│   │   ├── ContactForm.tsx     # Client form with validation, honeypot & UI states
│   │   └── AdminDashboard.tsx  # Interactive leads table with filters, search & metrics
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Public client & service-role server client
│   │   ├── supabase-server.ts  # Cookie-based auth reader for server components & routes
│   │   ├── supabase-browser.ts # Client-side Supabase client for auth actions
│   │   └── rate-limit.ts       # In-memory sliding window IP rate limiter
│   │
│   └── types/
│       └── lead.ts             # TypeScript definitions for Lead and CreateLeadInput
│
├── supabase-schema.sql         # PostgreSQL table creation, indexes & RLS policies
├── .env.example                # Documented environment variables template
├── .env.local                  # Local environment file (ignored by Git)
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Full documentation
```

---

## 4. Local Setup Instructions

### Prerequisites
- **Node.js:** v18.17+ or v20+ (tested on Node v24.21.0)
- **Package Manager:** npm (v10+)
- **Git**

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd ethixweb-india
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env.local` file by copying the example:
   ```bash
   cp .env.example .env.local
   ```

4. Populate your Supabase credentials in `.env.local` (see [Environment Variables](#5-environment-variables)).

5. Start the local development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Environment Variables

Store these variables in `.env.local`. **This file is excluded from Git to prevent secret leaks.**

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (Client & Server) | Your Supabase project URL (e.g. `https://xyzproject.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (Client & Server) | Public anon/publishable key. Safe for browser usage under RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-Only (Private)** | Privileged service key used exclusively in backend route handlers. Never prefixed with `NEXT_PUBLIC_`. |

---

## 6. Database Setup (Supabase PostgreSQL)

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor** &rarr; **New Query**.
3. Copy and run the script below (also available in [`supabase-schema.sql`](supabase-schema.sql)):

```sql
-- 1. Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(160) NOT NULL,
    service VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast sorting and status lookups
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Service role full access
CREATE POLICY "Service role full access on leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Authenticated admin access (view & update)
CREATE POLICY "Authenticated admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Strict client-side isolation
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon;
```

---

## 7. Admin Authentication Setup

The admin dashboard enforces server-side verification using `@supabase/ssr` cookies.

### Provisioning an Admin Account
Run the included administrative CLI tool:
```bash
node scripts/create-admin.mjs <admin_email> <admin_password>
```

*Example:*
```bash
node scripts/create-admin.mjs admin@ethixweb.in AdminSecurePass2026!
```

### Accessing the Dashboard
1. Go to `http://localhost:3000/admin/login`.
2. Sign in with the credentials created above.
3. You will be redirected to `http://localhost:3000/admin`.
4. To sign out, click **"Sign Out"** at the top right of the dashboard.

---

## 8. API Documentation

### `POST /api/leads`
Submit a new project inquiry from the contact form.
- **Access:** Public (protected by rate limiting & honeypot).
- **Rate Limit:** 5 requests per minute per IP.
- **Max Payload Size:** $20\text{ KB}$.
- **Request Body:**
  ```json
  {
    "name": "Rohan Sharma",
    "email": "rohan@company.in",
    "company": "FinFlow Technologies",
    "service": "Custom Full-Stack Web Application",
    "message": "We need a scalable financial portal with sub-second dashboard rendering.",
    "website_honeypot": ""
  }
  ```
- **Responses:**
  - `201 Created`: Lead created successfully.
  - `400 Bad Request`: Invalid JSON or malformed body.
  - `413 Payload Too Large`: Payload exceeds $20\text{ KB}$.
  - `422 Unprocessable Entity`: Field validation failed (returns specific field errors).
  - `429 Too Many Requests`: Rate limit exceeded.
  - `500 Internal Server Error`: Safe generic error returned to client; internal trace logged on server.

### `GET /api/leads`
Retrieve all inquiries for the admin dashboard.
- **Access:** Protected (requires authenticated admin session cookie).
- **Responses:**
  - `200 OK`: Array of lead objects ordered by `created_at DESC`.
  - `401 Unauthorized`: Returned when accessed without a valid admin session.

### `PATCH /api/leads/[id]`
Update lead status (`new`, `contacted`, `in_progress`, `closed`).
- **Access:** Protected (requires authenticated admin session cookie).
- **Request Body:**
  ```json
  {
    "status": "in_progress"
  }
  ```
- **Responses:**
  - `200 OK`: Lead status updated.
  - `401 Unauthorized`: Unauthenticated request.
  - `404 Not Found`: Lead ID does not exist.
  - `422 Unprocessable Entity`: Invalid status value.

---

## 9. India-Specific Design Rationale

1. **Optimized for Real Indian Network Conditions:**
   - Over 75% of Indian web users browse via mobile on variable 4G/5G connections. The site eliminates heavy runtime animation libraries (like Framer Motion) and bulky third-party tracking scripts in favor of lean CSS transitions and zero layout shift (`font-display: swap`).
2. **Contextual Market Sectors:**
   - The **Industries** section addresses core engines of the Indian digital economy: FinTech (digital payments, account aggregators), B2B Logistics (interstate dispatch), HealthTech (patient intake portals), and Tier-2/3 D2C Commerce.
3. **Bengaluru Tech Hub Grounding:**
   - The brand copy, address, and response windows are calibrated to Indian Standard Time (IST), presenting an authentic engineering presence in Bengaluru, Karnataka.
4. **Authoritative Typography & Color Balance:**
   - High-contrast charcoal text (`#0f172a`) on pure white and off-white prevents eye fatigue on mobile OLED screens, accented by Ethixweb Red (`#e11d48`) to establish strong focal points.

---

## 10. Improvements Over Generic Agency Websites

| Feature | Typical Agency Website | Ethixweb India Redesign |
| :--- | :--- | :--- |
| **Code Architecture** | WordPress / Elementor / Bloated templates | Clean Next.js App Router & TypeScript codebase |
| **Lead Security** | Emails sent via unauthenticated PHP mailers | Supabase PostgreSQL with Row Level Security (RLS) |
| **Spam Protection** | Annoying CAPTCHAs that increase bounce rates | Silent honeypot trap + in-memory sliding window IP rate limiting |
| **Admin Access** | Weak password setups or exposed endpoints | Cookie-based session verification with server-side redirection |
| **Content Authenticity** | Fabricated 5-star quotes and fake metrics | Honest engineering value propositions and concrete architectural case studies |
| **Bundle Efficiency** | Heavy JS bundles ($>1.5\text{ MB}$) | Lean, statically prerendered routes with minimal client hydration |

---

## 11. Deployment Instructions (Vercel)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New** &rarr; **Project**.
3. Import your Git repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **Deploy**. Vercel will automatically run `npm run build` and deploy the production build globally on its Edge network.

---

## 12. Known Limitations

1. **In-Memory Rate Limiting Scope:**
   - The current rate limiting uses an in-memory sliding window algorithm inside Node.js runtime memory. In multi-region serverless deployments with dynamic container scaling, a distributed Redis cache (such as Upstash Redis) would be recommended for global cluster synchronization.
2. **Dynamic Admin Page Prerendering:**
   - The `/admin` dashboard relies on runtime cookie session verification via `@supabase/ssr` (`cookies()`), meaning this specific page is dynamically server-rendered rather than statically generated at build time.
3. **Database Migration Pipeline:**
   - Database schema setup is managed via SQL migrations (`supabase-schema.sql`). Automatic continuous integration migrations via Supabase CLI are not yet wired into the deployment pipeline.

---

## 13. Final Manual Testing Checklist

Use this checklist to verify full system functionality before final submission:

### Navigation & Layout
- [ ] Open `http://localhost:3000/` &rarr; Verify Hero, Services, Process, Case Studies, Values, and Industries render cleanly.
- [ ] Test navigation links: Click `Services`, `About`, `Contact`, and `Ethixweb.` logo &rarr; Ensure smooth navigation with no page reloads.
- [ ] Test mobile responsiveness: Resize browser to mobile width ($<768\text{px}$) &rarr; Tap hamburger menu, verify all links render and close the drawer upon click.

### Public Contact Form & Validation
- [ ] Navigate to `/contact`.
- [ ] Click **"Submit Project Inquiry"** with empty fields &rarr; Verify error messages appear under all 5 required fields without sending a network request.
- [ ] Enter an invalid email (e.g. `rohan@invalid`) &rarr; Confirm email format error.
- [ ] Enter a message shorter than 15 characters &rarr; Confirm minimum length error.
- [ ] Enter valid details and submit &rarr; Verify button shows `"Submitting inquiry..."`, displays the green success banner, and resets the input fields.
- [ ] Verify database record: In Supabase Dashboard &rarr; **Table Editor** &rarr; `leads`, confirm the new row appears with `status: 'new'`.

### Security & Rate Limiting
- [ ] Submit 6 inquiries in rapid succession from the same IP &rarr; Confirm HTTP `429 Too Many Requests` is returned.
- [ ] Attempt to query `/api/leads` directly via cURL or PowerShell without an auth token &rarr; Confirm HTTP `401 Unauthorized`.

### Admin Console & Authentication
- [ ] Navigate to `http://localhost:3000/admin` in an incognito window &rarr; Verify immediate server-side redirection to `/admin/login`.
- [ ] Enter incorrect login credentials &rarr; Verify friendly error alert: `"Invalid email or password. Access is restricted to authorized administrators."`
- [ ] Sign in with `admin@ethixweb.in` and `AdminSecurePass2026!` &rarr; Confirm successful redirection to `/admin`.
- [ ] Test status updates: In the table, change a lead's status from `new` to `in_progress` &rarr; Confirm green toast notification and status badge change.
- [ ] Test search & filter: Type a client name into the search bar &rarr; Confirm real-time table filtering.
- [ ] Click **"Sign Out"** &rarr; Confirm session is cleared and user is redirected to `/admin/login`.
