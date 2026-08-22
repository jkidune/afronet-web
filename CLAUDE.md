# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

The Afronet (African Organic Network, afronet.bio) marketing website — a static HTML site. There is no build step, bundler, or test suite: every page is hand-authored static markup, edited directly and viewed via a local server (e.g. XAMPP/Apache, or `npm run dev`). A `package.json`/`wrangler.jsonc` pair exists solely so `wrangler deploy` can push this directory to Cloudflare Workers as static assets (see "Deployment" below) — `npm install` only pulls in `wrangler` itself, nothing feeds into the site's HTML/CSS/JS.

This directory is currently **not** a git repository (no `.git` present), despite `.gitignore`/`.assetsignore` entries that assume one. Don't assume git history or a remote exist — check before relying on either.

## Commands

- `npm install` — installs `wrangler` (the only dependency).
- `npm run dev` — runs `wrangler dev` to preview the static assets locally.
- `npm run deploy` — runs `wrangler deploy`, pushing this directory to Cloudflare Workers. This is a manual, production-affecting action — never run it unprompted.

There is no lint, build, or test command; there's nothing to compile or type-check.

## Deployment

`wrangler.jsonc` at the repo root deploys this directory to Cloudflare Workers as static assets (`assets.directory: "."`, no build step, no worker script) under the Worker name `afronet-web`. `.assetsignore` excludes non-site content (docs, `.remember/`, the deploy config files themselves) from being uploaded as public assets.

## Architecture

**No templating — every page is a fully self-contained HTML file.** There are 20 pages: `index.html`, `6aoc.html` (event landing page), `about.html`, `team.html` (dedicated team page, nested under About in the nav as "Our Team"), `contact.html`, `programme.html` + 4 detail pages (`programme-app.html`, `programme-aoc.html`, `programme-eoa-i.html`, `programme-iiaba.html`), `impact.html` (Projects/Impact page — case studies + testimonials), `news.html` + 4 detail pages (`news-6th-aoc.html`, `news-uganda-pilot.html`, `news-iiaba-institutional-growth.html`, `news-eu-trade-equivalency.html`), `faq.html` (nested under News in the nav — index.html only, currently), `members.html` (partner/member directory, nested under About in the nav as "Our Members"), `support-us.html`, and `404.html`.

The header/topbar, nav, mobile-nav, search popup, and footer markup is duplicated verbatim across all 20 pages. **When changing shared chrome (nav links, footer, social links, logo, contact info), you must edit every page individually** — grep for the section (e.g. `topbar-one__info__item`, `footer-widget__newsletter`, `main-menu__list`) to find all files that need the same change. One exception: `index.html`'s nav uniquely nests FAQ under a "News" dropdown — every other page keeps FAQ as its own standalone top-level nav item, per an explicit prior decision to scope that nesting change to the homepage only.

Directory layout:
- `assets/css/` — `grdeen.css` (compiled styles) plus RTL/dark/custom variants (`grdeen-rtl.css`, `grdeen-dark.css`, `grdeen-custom-rtl.css`). Only `grdeen.css` is linked from the pages currently.
- `assets/js/grdeen.js` — the single custom JS file (page interactions on top of the vendor libs).
- `assets/vendors/` — third-party libraries vendored in full (Bootstrap 5, jQuery, Owl Carousel, jQuery Validate, WOW.js, Isotope, Jarallax, Tiny Slider, FontAwesome, etc.). Don't `npm install` these — they're committed as static files and referenced via relative `<script>`/`<link>` tags.
- `assets/images/` — all site imagery, including `favicons/`.

Each page's `<head>` loads vendor CSS then `assets/css/grdeen.css` last; each page's closing body loads vendor JS (jQuery first) then `assets/js/grdeen.js` last. Keep that order when adding new pages or includes.

## Known gotchas

- The contact form (`contact.html`) and the partner-inquiry form (`index.html`, `#afronet-partner-form`) both submit via `fetch()` to WordPress's Contact Form 7 REST endpoint on `cms.afronet.bio` (CF7 form ID 403), with hidden `_wpcf7*` meta fields included since the REST API needs what CF7's own JS would normally inject on a native WP page render. The newsletter signup form (`.cf7-newsletter-form`, `data-cf7-id="413"`, handled in `assets/js/grdeen.js`) is wired the same way to CF7 form 413. This is real, working mail delivery, not a placeholder.
- Content has been rewritten to match the real AfrONet organic-agriculture identity (sourced from the live afronet.bio + its WordPress API). If you find copy that doesn't fit that identity, it's a leftover, not intentional.
- Several pages use placeholder content pending real material: `team.html` and the "Meet the team" section on `about.html` use the placeholder name "Mgate Daud" on every card with real, web-verified role titles but inline-SVG silhouette placeholder photos (real names/photos to come later); `members.html` lists only real, confirmed partner orgs but has no logos yet.
- Fonts are loaded from Google Fonts via `<link>` in each page's `<head>` (DM Sans, Inter, Work Sans) — not self-hosted.
