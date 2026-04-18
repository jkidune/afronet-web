# AfrONet — Project Intelligence File
> **afronet.bio** — African Organic Network  
> Last updated: April 18, 2026  
> Maintained by: Joseph Masonda (Barons Digital)

---

## 🏢 About the Organisation

**Full name:** African Organic Network (AfrONet)  
**Domain:** afronet.bio  
**Type:** Regional NGO / Continental umbrella organisation  
**Founded:** 2012, Lusaka, Zambia  
**Headquarters:** Dar es Salaam, Tanzania  
**Contact:** info@afronet.bio | +255 712 344 989 | P.O. Box 31168, Dar es Salaam  

**Mission:** Unite and represent organic agriculture stakeholders across Africa through policy dialogue, capacity building, knowledge sharing, and trade facilitation.

**Vision:** "A united and vibrant African Organic Agriculture"

---

## 🗺️ Sitemap

### Headless Build (Next.js — current state)

```
afronet.bio/ (Next.js App Router)
├── / (src/app/page.tsx)
│   └── Hero section — "Making Africa an Organic Food Basket" ✅ built
│
├── /about (src/app/about/page.tsx) — empty, needs content
├── /news (src/app/news/page.tsx) — empty, needs content
├── /programme (src/app/programme/page.tsx) — empty, needs content
├── /support-us (src/app/support-us/page.tsx) — empty, needs content
├── /contact (src/app/contact/page.tsx) — empty, needs content
└── /design-test — scratch page for component testing
```

### WordPress (Legacy — cms.afronet.bio)

```
afronet.bio/
├── Home (/)
│   ├── Hero — "Growing Organic Across Africa"
│   ├── Continental impact stats (3+ pilot countries, 50+ policy meetings)
│   ├── Partner logos (NOGAMU, KOAN, EOA, TOAM)
│   ├── Programme pillars
│   │   ├── 01 Markets & Partnerships
│   │   ├── 02 Knowledge & Resources
│   │   ├── 03 Standards & Policy
│   │   └── 04 Capacity & Networks
│   ├── IIABA introduction section
│   ├── Vision statement
│   ├── Knowledge sections
│   │   ├── Policy Documents
│   │   ├── AfrONet Research
│   │   └── Science and Transparency
│   ├── Voices from our network (testimonials)
│   └── Latest from the field (blog cards)
│
├── About (/about/)
│   ├── Hero — "Making Africa an Organic Food Basket"
│   ├── 01 What we do
│   ├── 02 Our Mission
│   └── [INCOMPLETE — missing team, governance, history]
│
├── News & Events (/blogs/)
│   └── Blog listing
│       ├── /articles/uganda-is-ready-to-go-places/
│       ├── /articles/iiaba-project-breaking-ground/
│       └── /articles/statement-to-the-eu-parliament/
│
├── Programme → ⚠️ anchor link (#164) on homepage — NOT a standalone page
│
├── Support Us (/support-us/)
│   ├── Hero — "Donate to AfrONet – Support Organic in Africa"
│   └── "Why your support matters?" section
│   └── [INCOMPLETE — no donation mechanism/payment integration]
│
├── Contact (/contact/)
│   ├── Hero — "Reach out to us!"
│   ├── Contact form (name, email)
│   └── Contact details
│
└── Terms & Conditions (footer link — page not yet confirmed live)
```

### Missing / Planned Pages (Next.js build)
- [ ] `/programme/` — dedicated Programme page (currently just an anchor)
- [ ] `/members/` — Member/Partner directory
- [ ] `/resources/` — Resource & document library
- [ ] `/team/` — Team and governance/board section
- [ ] `/impact/` — Impact report page
- [ ] Social media links (none currently on site)
- [ ] Newsletter/mailing list signup

---

## 🎨 Style Guide

### Brand Colors

| Role | Hex | Usage |
|---|---|---|
| Primary Dark Green | `#1a3a1a` / `#2d5a27` | Header bg, nav bar, hero overlays |
| Accent Yellow/Gold | `#F5D83C` / `#FFEE58` | Hero display text, CTA buttons, icon accents |
| Cream/Off-white | `#FFFAED` / `#FBFAF3` | Footer bg, card surfaces |
| Body Text | `#111111` | Main text on white backgrounds |
| Muted Text | `#777777` | Secondary/descriptive paragraph text |
| White | `#FFFFFF` | Page backgrounds, text on dark sections |
| Link/Accent Green | `#2d6a4f` | Author names, inline accents, active states |

### Typography

| Role | Typeface | Notes |
|---|---|---|
| Body / UI | Manrope (sans-serif) | Navigation, UI text, body paragraphs |
| Display / Hero | Instrument Sans | Large display text ("ACROSS AFRICA") |
| Editorial / Decorative | Instrument Serif | Italic hero titles, testimonials |
| Section Headings | Archivo | Programme cards, impact numbers |
| Fallback | System UI stack | Some paragraph contexts |

### Type Scale (Approximate)

| Level | Size |
|---|---|
| Hero display | 80–120px (viewport-scaled) |
| Page title (h1) | 36–48px |
| Section heading (h2) | 28–36px |
| Card heading (h3) | 24–28px |
| Body | ~21px (clamp-based) |
| Caption / meta | 14–16px |

### Buttons & Components (implemented)

- **Hero CTA (`.hero-cta`):** White pill + dark circle arrow icon (`#1b2124`). Hover: lifts, shadow, icon turns green.
- **Nav Contact (`.contact-btn`):** Dark pill (`#1b2124`) + semi-transparent icon circle. Hover: darkens + lifts.
- **Nav links (`.nav-link`):** Plain text, letter-spaced, hover shows subtle background.
- **News panel (`.news-panel`):** Glassmorphism card — `rgba(255,255,255,0.1)` + `backdrop-filter: blur(14px)` + white border.
- **Mobile nav (`.mobile-nav-link`):** Full-width row with border-bottom, arrow icon on right.

### Layout Patterns

- Full-width hero images with tinted text overlays
- Alternating 2-column (50/50) image + text layouts
- 3–4 column card grids (blog posts, programme pillars)
- Heavy whitespace between sections

### Photography Style

Authentic field photography: close-ups of crops, African farmers at work, hands in soil. Dark-tinted overlays on hero sections for text legibility.

---

## ⚙️ Engineering Rules & Gotchas

### 🔴 CRITICAL — Tailwind v4 CSS Layer Cascade

**The single most important rule for this project.**

In `src/styles/globals.css`, all raw element selectors (`*`, `html`, `body`, `h1–h6`, `a`, `img`, etc.) **must** live inside `@layer base { }`. If they are written as unlayered CSS (outside any `@layer`), they beat every Tailwind utility class because unlayered CSS has higher cascade priority than `@layer utilities`.

This caused (and was fixed on 2026-04-18):
- `text-white` not working on `h1` → was overridden by `h1 { color: var(--color-text) }`
- `pb-10`, `px-5` etc. giving `0px` → overridden by `* { padding: 0 }`
- `hidden lg:flex` not hiding elements → overridden by `.contact-btn { display: inline-flex }` (component class was unlayered)

**Rules going forward:**
1. Element selectors → `@layer base { }`
2. Component classes (`.hero-cta`, `.nav-link`, etc.) → keep unlayered **but never set `display`** on them, so Tailwind's `hidden`/`flex` utilities can work.
3. When a component class MUST set `display`, wrap the element in a plain `<div className="hidden lg:flex">` (no component class on the wrapper) so Tailwind controls visibility on the wrapper.
4. For h1/h2 `color` and `font-family` in special contexts (e.g. white hero heading in Instrument Serif), use inline `style={{ color, fontFamily }}` — inline style beats everything.

### Hero Section Architecture

The hero (`src/components/sections/Hero.tsx`) uses:
- `h-svh min-h-[560px]` on the `<section>` — exact small-viewport height, never overflows.
- `absolute bottom-0 left-0 right-0` on the content wrapper — always anchors to the bottom.
- Heading font size: `clamp(1.9rem, 5.5svh, 3.8rem)` — scales with viewport **height** (`svh`) so it never overflows at any screen size.
- Framer Motion custom index (`custom={i}`) with `variants` for staggered entrance.
- News panel hidden on mobile (`hidden lg:block`) — shown only at lg+ breakpoints.

### Responsive Visibility Pattern

Because unlayered component classes can override Tailwind's `hidden` utility, use this pattern for show/hide on responsive layouts:

```jsx
// ✅ Correct — plain div handles visibility, no component class on wrapper
<div className="hidden lg:flex">
  <Link href="/contact" className="contact-btn">...</Link>
</div>

// ❌ Wrong — contact-btn { display: inline-flex } overrides hidden
<Link href="/contact" className="hidden lg:flex contact-btn">...</Link>
```

### globals.css Structure (do not break this order)

```
@import "tailwindcss"
@theme { ... }                    ← CSS variables only, no selectors
@layer base { element selectors } ← *, html, body, h1-h6, a, p, img...
                                    (unlayered custom component classes below)
.hero-cta { ... }
.nav-link { ... }
.contact-btn { ... }
.news-panel { ... }
...                               ← LAYOUT UTILITIES (.container etc.)
...                               ← COMPONENT STYLES (.btn, .card etc.)
```

---

## 🛠️ Known Issues & Improvements Backlog

### 🔴 Critical (Fix Before Launch)
- [ ] Duplicate image bug — homepage "Latest from the field" shows identical tomato photo for two different articles
- [ ] Placeholder/broken element on Contact hero — "Pi Ea" visible text (likely broken animation or placeholder)
- [ ] "UnderConstruction" plugin still active in WP admin — confirm it's not blocking public pages
- [ ] Support Us page has no donation button or payment integration

### 🟡 Structure & Navigation
- [ ] Create dedicated `/programme/` page — anchor link is confusing and hurts SEO
- [ ] Align News URL: rename `/blogs/` to `/news/` or update nav label to "Blog"
- [ ] Add footer navigation (About, Contact, Social links, Newsletter signup)
- [ ] Add Members/Partners directory page
- [ ] Add back-to-top button (homepage is very long)

### 🟡 Content Gaps
- [ ] About page: add Team section, governance/board info, founding history
- [ ] Expand blog — only 3 articles published
- [ ] Add "View Impact Report" link next to stats (3+ countries, 50+ meetings)
- [ ] Support Us: add donation tiers, payment gateway (Stripe, PayPal, or M-Pesa)
- [ ] Add social media links (LinkedIn, Twitter/X, Instagram, Facebook)
- [ ] Add newsletter/mailing list form

### 🟢 Design & UX Improvements
- [ ] Fix justified text → switch to left-aligned text across all pages
- [ ] Standardise partner logos to equal height and grayscale
- [ ] Simplify hero typography — reduce to 2 typefaces and 2 colors max
- [ ] Add scroll progress indicator or back-to-top button

### 🟢 SEO & Technical
- [ ] Fix page title meta tags (currently showing raw URL slugs)
- [ ] Add Open Graph / social share meta tags
- [ ] Add user-facing search functionality
- [ ] Submit sitemap to Google Search Console
- [ ] Add alt text to all images

---

## 🏗️ Tech Stack

### Current (WordPress)
- **CMS:** WordPress (Twenty Twenty-Five theme)
- **Hosting:** Hostinger (shared)
- **Plugins noted:** UnderConstruction (active), Contact Form

### Active (Headless Rebuild — in progress)
- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **CMS backend:** WordPress (Headless via REST API or WPGraphQL)
- **Frontend hosting:** Vercel (free Hobby plan)
- **Backend hosting:** Hostinger (WordPress stays here)
- **API pattern:** `cms.afronet.bio` → WordPress | `afronet.bio` → Next.js on Vercel

### Font Variables (CSS custom properties via Next.js `next/font/google`)

| CSS Variable | Font | Tailwind class |
|---|---|---|
| `--font-body` | Manrope | `font-body` |
| `--font-display` | Instrument Sans | `font-display` |
| `--font-editorial` | Instrument Serif | `font-editorial` |
| `--font-heading` | Archivo | `font-heading` |

### Asset Paths (public/)
- **Logo:** `/logos/main logo.svg` (note the space in filename — do not rename, Next.js Image handles it)
- **Hero background:** `/images/hero-bg.jpg`
- **Icons:** `/logos/Main icon.svg`, `/logos/White icon.svg`, `/logos/White logo.svg`

---

## 📋 Content Inventory

### Blog Articles (3 published)
1. **Uganda is Ready to Go Places** — `/articles/uganda-is-ready-to-go-places/`
2. **IIABA Project: Breaking Ground** — `/articles/iiaba-project-breaking-ground/`
3. **Statement to the EU Parliament** — `/articles/statement-to-the-eu-parliament/`

### Partners Displayed
- NOGAMU (National Organic Agricultural Movement of Uganda)
- KOAN (Kenya Organic Agriculture Network)
- EOA (Ecology Organic Agriculture)
- TOAM (Tanzania Organic Agriculture Movement)

### Key Projects / Programmes
- **IIABA** — mentioned prominently on homepage with its own intro section
- Markets & Partnerships
- Knowledge & Resources
- Standards & Policy
- Capacity & Networks

### Impact Stats (Homepage)
- 3+ Pilot Countries
- 50+ Policy Discussions/Meetings
- *(No date or source attribution — needs fixing)*

---

## 🔄 Changelog

| Date | Update | Author |
|---|---|---|
| 2026-04-17 | Initial audit completed. CLAUDE.md + STYLE.md created | Joseph / Barons Digital |
| 2026-04-18 | Hero section built matching Figma design (node 147-188). Fixed critical Tailwind v4 CSS layer cascade bug — moved all element selectors into `@layer base`. Hero uses `h-svh` + `absolute bottom-0` pattern. Heading uses `5.5svh` font scale. Nav, buttons, and news panel fully styled with hover effects. Mobile responsive layout complete. | Joseph / Claude |

