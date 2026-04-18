# AfrONet — Headless Rebuild Project Plan
> **afronet.bio** — Next.js + Headless WordPress  
> Version: 1.0 | Created: April 17, 2026  
> Developer: Joseph Masonda (Barons Digital)

---

## Project Overview

Rebuild afronet.bio as a headless WordPress + Next.js application. WordPress stays on Hostinger as the CMS backend. A new Next.js 15 frontend is built locally and deployed to Vercel. The two communicate via the WordPress REST API (and optionally WPGraphQL).

**Goal:** Preserve all existing content management workflows for the AfrONet team while delivering a modern, fast, animated frontend built with Next.js 15, Tailwind CSS v4, and Framer Motion.

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                       │
│                                                           │
│   afronet.bio  ──────────────►  Next.js App (Vercel)     │
│   (user visits)                       │                  │
│                                       │ REST API / GraphQL│
│   cms.afronet.bio ◄───────────────────┘                  │
│   (WordPress on Hostinger)                               │
│   /wp-admin — content team manages here                  │
└──────────────────────────────────────────────────────────┘
```

**DNS Setup (Hostinger domain settings):**
- `afronet.bio` → Point to Vercel (A record / CNAME)
- `cms.afronet.bio` → Point to Hostinger (existing WordPress)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| CMS / Backend | WordPress (Hostinger) via REST API |
| API Layer | WordPress REST API (primary) + WPGraphQL (optional) |
| Frontend Hosting | Vercel (free Hobby plan) |
| Backend Hosting | Hostinger (existing — no change) |
| Version Control | GitHub |
| Package Manager | npm |

---

## Phase Breakdown

### PHASE 0 — Environment Setup (Day 1)
> Get your machine and WordPress ready before writing a single line of frontend code.

**0.1 WordPress Backend Preparation (on Hostinger)**
- [ ] Log into `afronet.bio/wp-admin`
- [ ] Go to **Settings → Permalinks** → set to "Post name" (required for REST API)
- [ ] Install plugin: **WPGraphQL** (free, from WP plugin directory)
- [ ] Install plugin: **Headless Mode** (disables frontend, avoids duplicate indexing)
- [ ] Install plugin: **WP CORS** or add CORS headers manually via `functions.php`
- [ ] Test REST API works: visit `afronet.bio/wp-json/wp/v2/posts` in browser
- [ ] Set up subdomain: `cms.afronet.bio` pointing to Hostinger in DNS settings
- [ ] Note down your WordPress URL — you'll use it as `NEXT_PUBLIC_WP_API_URL`

**0.2 Local Dev Machine**
- [ ] Node.js 20+ installed (`node -v` to check)
- [ ] Git installed and GitHub account ready
- [ ] VS Code with extensions: ESLint, Prettier, Tailwind CSS IntelliSense, GitLens
- [ ] Create GitHub repo: `afronet-web`

---

### PHASE 1 — Project Scaffold (Day 1–2)
> Bootstrap the Next.js app with all tooling configured.

**1.1 Create the App**
```bash
npx create-next-app@latest afronet-web \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd afronet-web
```

**1.2 Install Core Dependencies**
```bash
# Animation
npm install framer-motion

# Icons
npm install lucide-react

# GraphQL (optional — for WPGraphQL later)
npm install graphql-request graphql

# Utilities
npm install clsx tailwind-merge
```

**1.3 Environment Variables**
Create `.env.local` in project root:
```env
NEXT_PUBLIC_WP_API_URL=https://afronet.bio/wp-json/wp/v2
NEXT_PUBLIC_WP_GRAPHQL_URL=https://afronet.bio/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**1.4 Project Folder Structure**
```
afronet-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx
│   │   ├── news/page.tsx
│   │   ├── news/[slug]/page.tsx
│   │   ├── programme/page.tsx
│   │   ├── support-us/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── layout/             # Header, Footer, Nav
│   │   ├── ui/                 # Button, Card, Badge, etc.
│   │   ├── sections/           # Hero, Stats, Partners, etc.
│   │   └── blog/               # PostCard, PostList, etc.
│   ├── lib/
│   │   ├── wordpress.ts        # All WP API fetch functions
│   │   └── utils.ts            # clsx, formatDate, etc.
│   ├── types/
│   │   └── wordpress.ts        # TypeScript types for WP data
│   └── styles/
│       └── globals.css         # Tailwind + CSS variables
├── public/
│   └── images/
├── CLAUDE.md                   # ← Project intelligence file
├── STYLE.md                    # ← Design system reference
└── .env.local
```

**1.5 Drop Reference Files**
- Copy `CLAUDE.md` and `STYLE.md` into the project root
- Add both to `.gitignore` if they contain sensitive info (they don't — safe to commit)

---

### PHASE 2 — Design System (Day 2–3)
> Implement the AfrONet style guide as CSS variables + Tailwind config before building any components.

**2.1 Global CSS Variables**
In `src/styles/globals.css`, implement the full token system from `STYLE.md`:
- Brand colors (forest green, accent yellow, cream, text levels)
- Fluid type scale using `clamp()`
- 4px spacing system
- Border radius tokens
- Shadow tokens
- Font family variables

**2.2 Tailwind Config**
Extend `tailwind.config.ts` to map CSS variables to Tailwind utilities:
```ts
// Map --color-primary → bg-primary, text-primary, etc.
// Map --font-display, --font-body → font-display, font-body
// Map --space-* → custom spacing
```

**2.3 Font Setup**
In `src/app/layout.tsx`, load all 4 brand fonts via `next/font/google`:
- Manrope (body/UI)
- Instrument Sans (display)
- Instrument Serif (editorial)
- Archivo (section headings)

**2.4 Build Design Proof Page**
Create a temporary `src/app/design-test/page.tsx` to visually validate:
- [ ] Color surfaces look distinct
- [ ] Font pairings work together
- [ ] Type scale is readable at all sizes
- [ ] Button variants look correct
- [ ] Dark and light modes work

---

### PHASE 3 — WordPress API Layer (Day 3–4)
> Build a clean data-fetching layer before touching any UI.

**3.1 TypeScript Types** (`src/types/wordpress.ts`)
Define interfaces for:
- `WPPost` (id, slug, title, content, excerpt, date, featuredImage, categories)
- `WPPage` (id, slug, title, content, featuredImage)
- `WPMedia` (id, url, alt, width, height)
- `WPCategory` (id, name, slug)

**3.2 API Functions** (`src/lib/wordpress.ts`)
```ts
// Pages
export async function getAllPosts(count?: number): Promise<WPPost[]>
export async function getPostBySlug(slug: string): Promise<WPPost>
export async function getAllPages(): Promise<WPPage[]>
export async function getPageBySlug(slug: string): Promise<WPPage>

// Media
export async function getFeaturedImage(mediaId: number): Promise<WPMedia>
```

**3.3 Test the API Layer**
- Verify posts fetch correctly from Hostinger
- Check CORS headers are set (if not, fix on WordPress side)
- Test with real slugs from existing 3 articles

---

### PHASE 4 — Core Layout Components (Day 4–5)
> Build the shell that wraps every page.

**4.1 Header / Navigation** (`src/components/layout/Header.tsx`)
- Logo (SVG — recreate the AfrONet mark)
- Nav links: Home, About, Programme, News & Events, Support Us, Contact
- Yellow pill "Contact Us" CTA button (top right)
- Mobile hamburger menu with Framer Motion slide-down panel
- Sticky on scroll with background fade transition

**4.2 Footer** (`src/components/layout/Footer.tsx`)
- Logo + brief tagline
- Navigation links (fix: add proper footer nav — missing on current site)
- Partner logos row
- Social media icons (placeholder for when links are added)
- Newsletter signup input
- Copyright + Terms link

**4.3 Root Layout** (`src/app/layout.tsx`)
- Load fonts
- Include Header + Footer
- SEO metadata defaults (title template, Open Graph defaults)
- Framer Motion `AnimatePresence` wrapper for page transitions

---

### PHASE 5 — Homepage (Day 5–7)
> The most complex page — build section by section.

Sections to build (in order):

| # | Section | Data source |
|---|---|---|
| 1 | Hero — "Growing Organic Across Africa" | Static / hardcoded |
| 2 | Impact stats (3+ countries, 50+ meetings) | Static |
| 3 | Partner logos strip (NOGAMU, KOAN, EOA, TOAM) | Static |
| 4 | Programme pillars (01–04) | Static / CMS page |
| 5 | IIABA introduction | Static / CMS page |
| 6 | Vision statement | Static |
| 7 | Knowledge sections | Static / CMS |
| 8 | Testimonials / Voices from network | Static |
| 9 | Latest from the field (blog cards) | WordPress REST API |

**Key improvements to make vs current site:**
- Fix: left-align all body text (no justified text)
- Fix: standardise partner logos to equal height + grayscale
- Fix: deduplicate blog card images (fetch real featured images from WP)
- Add: scroll-triggered Framer Motion entrance animations per section
- Add: back-to-top button

---

### PHASE 6 — Inner Pages (Day 7–10)

**6.1 About Page** (`/about`)
- Current sections: Hero, What We Do, Our Mission
- New additions: Team section, Governance/Board, Founding history

**6.2 Programme Page** (`/programme`) — NEW
- Create as proper standalone page (currently just homepage anchor)
- Detail all 4 pillars with full descriptions
- Link to relevant resources/downloads

**6.3 News & Events** (`/news`)
- Blog listing page — fetch all posts from WordPress REST API
- Post cards with real featured images
- Pagination or load-more

**6.4 Article Detail** (`/news/[slug]`)
- Dynamic route using `generateStaticParams` for ISR
- Render WordPress post content (sanitize HTML with `dangerouslySetInnerHTML` or a parser)
- Author, date, category metadata
- Related posts

**6.5 Support Us** (`/support-us`)
- Improve copy
- Add donation tiers (visual cards)
- Add placeholder for payment integration (Stripe / PayPal)

**6.6 Contact** (`/contact`)
- Fix broken hero placeholder element
- Contact form (use react-hook-form + send via WP Contact Form 7 REST API or Formspree)
- Contact details (email, phone, P.O. Box)
- Map embed (optional)

---

### PHASE 7 — SEO & Performance (Day 10–11)

- [ ] `generateMetadata()` for every page (dynamic from WordPress data)
- [ ] Open Graph images for all pages
- [ ] Structured data (JSON-LD) for organisation and articles
- [ ] `next/image` for all images (automatic WebP, lazy loading, size optimisation)
- [ ] Dynamic sitemap (`/sitemap.xml`) auto-generated from WordPress posts
- [ ] `robots.txt`
- [ ] On-demand ISR revalidation — WordPress webhook triggers Vercel rebuild on new post

---

### PHASE 8 — Deployment (Day 11–12)

**8.1 GitHub**
- Push all code to `afronet-web` GitHub repo
- Add `.env.local` to `.gitignore`
- Add environment variables to GitHub repo secrets

**8.2 Vercel Setup**
- Connect Vercel to GitHub repo (auto-deploys on push to `main`)
- Add environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_WP_API_URL`
  - `NEXT_PUBLIC_WP_GRAPHQL_URL`
  - `NEXT_PUBLIC_SITE_URL`

**8.3 DNS Cutover**
- In Hostinger DNS: add CNAME `afronet.bio → cname.vercel-dns.com`
- Set `cms.afronet.bio` → existing Hostinger IP
- Wait for DNS propagation (up to 24 hours)
- Test production site at `afronet.bio`
- Test CMS still works at `cms.afronet.bio/wp-admin`

**8.4 WordPress Post-Launch**
- Activate "Headless Mode" plugin (redirects WordPress frontend to headless site)
- Configure CORS to allow only `afronet.bio` origin
- Disable unused WordPress themes and plugins
- Set up Revalidation webhook: WordPress → Vercel on post publish

---

### PHASE 9 — Post-Launch (Week 3+)

- [ ] Add Members/Partners directory page
- [ ] Add Resource library page (Policy Documents, Research)
- [ ] Integrate payment gateway on Support Us page (Stripe)
- [ ] Add social media links when accounts are confirmed
- [ ] Connect newsletter signup to Mailchimp or ConvertKit
- [ ] Add Google Analytics / Plausible analytics
- [ ] Set up Google Search Console and submit sitemap

---

## Timeline Summary

| Phase | Work | Duration |
|---|---|---|
| 0 | Environment Setup | Day 1 |
| 1 | Project Scaffold | Day 1–2 |
| 2 | Design System | Day 2–3 |
| 3 | WordPress API Layer | Day 3–4 |
| 4 | Core Layout (Header/Footer) | Day 4–5 |
| 5 | Homepage | Day 5–7 |
| 6 | Inner Pages (5 pages) | Day 7–10 |
| 7 | SEO & Performance | Day 10–11 |
| 8 | Deployment & DNS | Day 11–12 |
| 9 | Post-Launch features | Week 3+ |

**Estimated MVP launch: ~12 working days from start**

---

## Quick Reference Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Key URLs

| Resource | URL |
|---|---|
| Local dev | http://localhost:3000 |
| WordPress admin | https://afronet.bio/wp-admin |
| WP REST API | https://afronet.bio/wp-json/wp/v2/ |
| WPGraphQL endpoint | https://afronet.bio/graphql |
| WPGraphQL IDE | https://afronet.bio/wp-admin/admin.php?page=graphiql-ide |
| Vercel dashboard | https://vercel.com/dashboard |

