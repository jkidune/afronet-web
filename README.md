# AfrONet Website

AfrONet's public website built with Next.js App Router and WordPress REST API content. The app is prepared for Cloudflare deployment through OpenNext.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Framer Motion for page and section animation
- WordPress REST API for posts, pages, programmes, testimonials, categories, and media
- OpenNext Cloudflare + Wrangler for Cloudflare Workers deployment

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run lint:

```bash
npm run lint
```

Build for Next.js:

```bash
npm run build
```

Build for Cloudflare/OpenNext:

```bash
npm run cf-build
```

Preview the Cloudflare build:

```bash
npm run preview
```

Deploy:

```bash
npm run deploy
```

## Environment

The Cloudflare defaults are defined in `wrangler.jsonc`:

- `NEXT_PUBLIC_SITE_URL=https://afronet.bio`
- `NEXT_PUBLIC_WP_API_URL=https://cms.afronet.bio/wp-json/wp/v2`

For local overrides, use `.env.local`.

## Content Model

WordPress fetch helpers live in `src/lib/wordpress.ts`.

Key routes:

- `/news` lists published WordPress posts.
- `/news/[slug]` renders a single post.
- `/programme` lists programme custom post type entries.
- `/programme/[slug]` renders a single programme.

The site expects embedded WordPress data through `_embed=true` for featured images, authors, and taxonomy terms. Image host allowlisting is configured in `next.config.ts`.

## Styling Notes

Global font variables are set in `src/app/layout.tsx`:

- `--font-body`
- `--font-display`
- `--font-editorial`
- `--font-heading`

WordPress-rendered article HTML is styled through `.wp-content` in `src/app/globals.css`. Keep article body typography changes there unless a page needs layout-only adjustments.

## Blog Detail Handover

The individual blog page was updated to match the client preference for a clear title-first editorial layout with the featured image visible below the title.

Changed files:

- `src/app/news/[slug]/BlogPostClient.tsx`
- `src/app/news/[slug]/page.tsx`

Current behavior:

- No full-screen image background or glass title banner.
- Breadcrumb/category appears above the title.
- Date, read time, and share controls sit in the right-side metadata area on desktop.
- Author details are intentionally hidden from the blog detail header.
- Featured image renders below the title in a large rounded frame.
- Featured image and avatar optimization were bypassed where needed because the Next image optimizer returned zero-size images for some CMS assets during testing.
- Article body still comes from WordPress HTML and uses existing `.wp-content` styling.
- Tags remain beside the body on desktop and stack naturally on mobile.
- Related articles use the blog page background color, not the footer background and not the previous blue section color.
- Related article category names are decoded with `stripHtml` so terms like `Policy & Trade` do not show as `Policy &amp; Trade`.

Validation completed for the blog detail update:

```bash
./node_modules/.bin/eslint 'src/app/news/[slug]/BlogPostClient.tsx' 'src/app/news/[slug]/page.tsx'
```

Note: if `.wrangler/tmp` generated deployment output exists locally, broad `npm run lint` may lint bundled worker output and report errors outside application source. Clear generated deployment output or add an ignore rule before relying on a full-project lint pass.

Manual browser check was done on:

```text
http://localhost:3000/news/6th-african-organic-conference-6th-aoc
```

Confirmed:

- No `Written by` label appears.
- Date and read time are visible.
- Hero image loads from the CMS and is visible.
- Related section background matches the blog page background.
- No horizontal overflow on mobile.

## Developer Notes

- The repository may contain unrelated local changes. Stage files intentionally rather than using broad `git add -A`.
- This project uses a newer Next.js version. Before making framework-level changes, read the relevant guide in `node_modules/next/dist/docs/`.
- Footer scroll/reveal behavior lives in `src/components/layout/Footer.tsx`; do not change it when working only on the blog page.
