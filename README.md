
This file provides guidance when working with code in this repository.

## What this project is

The Afronet (African Organic Network, afronet.bio) marketing website — a static HTML site built on top of the "Grdeen" Bootstrap template (originally a gardening/landscaping template — hence leftover class names like `grdeen-btn`, `.icon-pin`). It is served locally via XAMPP/Apache from `c:\xampp\htdocs\AFRONET`, so the dev workflow is: edit HTML/CSS/JS directly, then view at `http://localhost/AFRONET/`. There is no build step, bundler, or test suite — every page is hand-authored static markup. A `package.json`/`wrangler.jsonc` pair exists solely so `wrangler deploy` can push this directory to Cloudflare Workers as static assets (see "Deployment" below) — running `npm install` only pulls in `wrangler` itself, nothing feeds into the site's HTML/CSS/JS.

This directory is **not a git repository**. Treat file changes as directly live; there is no commit/diff safety net.

`afronet-web-OLD/` is a separate Next.js + WordPress-headless rebuild of this same site. Despite the folder name, **it is the codebase currently live in production at afronet.bio** (confirmed via response headers: `Server: cloudflare`, `x-opennext: 1` — deployed via OpenNext to a Cloudflare Worker named `afronet-web`), backed by a live WordPress instance at `cms.afronet.bio` (Hostinger). This static site (the AFRONET root) is the intended *replacement* for it, not a live sibling — until the migration/cutover happens, treat afronet-web-OLD as "what's actually live," and leave it alone unless explicitly asked to work in it.

## Deployment

`wrangler.jsonc` at the repo root deploys this directory to Cloudflare Workers as static assets (`assets.directory: "."`, no build step, no worker script) under the Worker name `afronet-web` — deliberately matching the name of the Worker currently serving live traffic at afronet.bio, so the existing custom-domain binding has the best chance of carrying over without a manual DNS/domain change. `.assetsignore` excludes non-site content (`afronet-web-OLD/`, `.remember/`, docs, the deploy config files themselves) from being uploaded as public assets. Nothing in this repo runs `wrangler deploy` automatically — that's a deliberate, manual, production-affecting action for whoever holds the Cloudflare account to trigger.

## Architecture

**No templating — every page is a fully self-contained HTML file.** There are 20 real pages: `index.html`, `6aoc.html` (event landing page), `about.html`, `team.html` (dedicated team page, nested under About in the nav as "Our Team"), `contact.html`, `programme.html` + 4 detail pages (`programme-app.html`, `programme-aoc.html`, `programme-eoa-i.html`, `programme-iiaba.html`), `impact.html` (Projects/Impact page — case studies + testimonials), `news.html` + 4 detail pages (`news-6th-aoc.html`, `news-uganda-pilot.html`, `news-iiaba-institutional-growth.html`, `news-eu-trade-equivalency.html`), `faq.html` (nested under News in the nav — index.html only, currently), `members.html` (partner/member directory, nested under About in the nav as "Our Members"), `support-us.html`, and `404.html`. (Earlier leftover Grdeen demo pages — `login.html`, `services.html`, `blog*.html`, `project*.html`, `service-d-*.html`, `prices.html` — have been deleted; don't recreate them without reason. `team.html` and `faq.html` were also deleted early in the site's rebuild as fake-content leftovers, then later rebuilt from scratch with real content — they are current, real pages now, not leftovers.) The header/topbar, nav, mobile-nav, search popup, and footer markup is duplicated verbatim across all 20 pages. **When changing shared chrome (nav links, footer, social links, logo, contact info), you must edit every page individually** — grep for the section (e.g. `topbar-one__info__item`, `footer-widget__newsletter`, `main-menu__list`) to find all files that need the same change. One exception to keep in mind: `index.html`'s nav uniquely nests FAQ under a "News" dropdown — every other page keeps FAQ as its own standalone top-level nav item, per an explicit user decision to scope that nesting change to the homepage only.

Directory layout:
- `assets/css/` — `grdeen.css` (compiled template styles) plus RTL/dark/custom variants (`grdeen-rtl.css`, `grdeen-dark.css`, `grdeen-custom-rtl.css`). Only `grdeen.css` is linked from the pages currently.
- `assets/js/grdeen.js` — the single custom JS file (page interactions on top of the vendor libs).
- `assets/vendors/` — third-party libraries vendored in full (Bootstrap 5, jQuery, Owl Carousel, jQuery Validate, WOW.js, Isotope, Jarallax, Tiny Slider, FontAwesome, etc.). Don't "npm install" these — they're committed as static files and referenced via relative `<script>`/`<link>` tags.
- `assets/images/` — all site imagery, including `favicons/`.

Each page's `<head>` loads vendor CSS then `assets/css/grdeen.css` last; each page's closing body loads vendor JS (jQuery first) then `assets/js/grdeen.js` last. Keep that order when adding new pages or includes.

## Known gotchas

- The contact form (`contact.html`) and the partner-inquiry form (`index.html`, `#afronet-partner-form`) both submit via `fetch()` to WordPress's Contact Form 7 REST endpoint on `cms.afronet.bio` (CF7 form ID 403), with hidden `_wpcf7*` meta fields included since the REST API needs what CF7's own JS would normally inject on a native WP page render. The newsletter signup form (`.cf7-newsletter-form`, `data-cf7-id="413"`, handled in `assets/js/grdeen.js`) is wired the same way to CF7 form 413. Both were verified working via live curl test submissions (`"status":"mail_sent"`) — this is real, working mail delivery, not a placeholder.
- Content has been rewritten to match the real AfrONet organic-agriculture identity (sourced from the live afronet.bio + its WordPress API) rather than the template's original gardening/landscaping or an earlier "biotechnology"-framed rebrand — if you find copy that still reads as gardening or biotech-focused, it's a leftover, not intentional.
- Several pages use placeholder content pending real material from the user: `team.html` and the "Meet the team" section on `about.html` use the placeholder name "Mgate Daud" on every card with real, web-verified role titles but inline-SVG silhouette placeholder photos (real names/photos to come later); `members.html` lists only real, confirmed partner orgs but has no logos yet.
- Fonts are loaded from Google Fonts via `<link>` in each page's `<head>` (DM Sans, Inter, Work Sans) — not self-hosted.
