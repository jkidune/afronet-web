// src/lib/wordpress.ts
// All WordPress REST API fetch functions for afronet.bio
// Uses Next.js fetch with ISR revalidation — no client-side fetching needed.
import type { WPPost, WPProgramme, WPTestimonial, WPPage } from '@/types/wordpress';

const WP_BASE = process.env.NEXT_PUBLIC_WP_API_URL || 'https://afronet.bio/wp-json/wp/v2';

// ── Revalidation times (seconds) ─────────────────────────────────────────────
const REVALIDATE_LIST = 300;   // 5 min  — collection pages
const REVALIDATE_POST = 600;   // 10 min — individual post/project pages
const REVALIDATE_HERO = 300;   // 5 min  — hero news banner

// ── Generic fetch helper ──────────────────────────────────────────────────────
async function wpFetch<T>(endpoint: string, revalidate = REVALIDATE_LIST): Promise<T> {
  const url = `${WP_BASE}${endpoint}`;
  const res = await fetch(url, {
    next: { revalidate },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`WordPress fetch failed: ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// POSTS (Blog / News)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all published posts for the blog collection page.
 * Uses ?_embed=true so featured images, authors, and categories come in one request.
 */
export async function getAllPosts(perPage = 12): Promise<WPPost[]> {
  return wpFetch<WPPost[]>(
    `/posts?_embed=true&per_page=${perPage}&status=publish&orderby=date&order=desc`,
    REVALIDATE_LIST,
  );
}

/**
 * Fetch a single post by slug for the blog [slug] page.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `/posts?_embed=true&slug=${encodeURIComponent(slug)}&status=publish`,
    REVALIDATE_POST,
  );
  return posts[0] ?? null;
}

/**
 * Fetch the 3 most recent posts — used for homepage blog section and hero news banner.
 */
export async function getLatestPosts(count = 3): Promise<WPPost[]> {
  return wpFetch<WPPost[]>(
    `/posts?_embed=true&per_page=${count}&status=publish&orderby=date&order=desc`,
    REVALIDATE_HERO,
  );
}

/**
 * Fetch posts related to a given post (same category, excluding current post).
 * Used for the "Related Blogs" section on the individual post page.
 */
export async function getRelatedPosts(currentPostId: number, categoryIds: number[], count = 2): Promise<WPPost[]> {
  if (categoryIds.length === 0) return getLatestPosts(count);
  const posts = await wpFetch<WPPost[]>(
    `/posts?_embed=true&per_page=${count + 1}&categories=${categoryIds.join(',')}&status=publish&orderby=date&order=desc`,
    REVALIDATE_LIST,
  );
  return posts.filter((p) => p.id !== currentPostId).slice(0, count);
}

/**
 * Generate static params for all blog posts — used in generateStaticParams().
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await wpFetch<Pick<WPPost, 'slug'>[]>(
    `/posts?per_page=100&status=publish&_fields=slug`,
    REVALIDATE_LIST,
  );
  return posts.map((p) => ({ slug: p.slug }));
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRAMMES (Custom Post Type)
// ═══════════════════════════════════════════════════════════════════════════════
// ⚠️  Replace 'programme' below with the actual CPT REST API slug from your WP.
//    Check: https://afronet.bio/wp-json/wp/v2/ to see all registered routes.
//    Common: 'programme', 'programmes', 'projects', 'project'

const CPT_SLUG = 'programme'; // ← adjust this if different

/**
 * Fetch all programmes for the programme collection page.
 */
export async function getAllProgrammes(): Promise<WPProgramme[]> {
  return wpFetch<WPProgramme[]>(
    `/${CPT_SLUG}?_embed=true&per_page=20&status=publish&orderby=date&order=desc`,
    REVALIDATE_LIST,
  );
}

/**
 * Fetch a single programme by slug for the programme [slug] page.
 */
export async function getProgrammeBySlug(slug: string): Promise<WPProgramme | null> {
  const items = await wpFetch<WPProgramme[]>(
    `/${CPT_SLUG}?_embed=true&slug=${encodeURIComponent(slug)}&status=publish`,
    REVALIDATE_POST,
  );
  return items[0] ?? null;
}

/**
 * Generate static params for all programme pages.
 */
export async function getAllProgrammeSlugs(): Promise<{ slug: string }[]> {
  const items = await wpFetch<Pick<WPProgramme, 'slug'>[]>(
    `/${CPT_SLUG}?per_page=50&status=publish&_fields=slug`,
    REVALIDATE_LIST,
  );
  return items.map((p) => ({ slug: p.slug }));
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS (Custom Post Type)
// ═══════════════════════════════════════════════════════════════════════════════

const TESTIMONIAL_SLUG = 'testimonial';

/** Fetch all published testimonials — used for homepage testimonial carousel. */
export async function getTestimonials(count = 10): Promise<WPTestimonial[]> {
  return wpFetch<WPTestimonial[]>(
    `/${TESTIMONIAL_SLUG}?_embed=true&per_page=${count}&status=publish&orderby=date&order=asc`,
    REVALIDATE_LIST,
  );
}
/**
 * Fetch a single WordPress page by slug.
 * Useful for About, Support Us, etc.
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>(
    `/pages?_embed=true&slug=${encodeURIComponent(slug)}&status=publish`,
    REVALIDATE_POST,
  );
  return pages[0] ?? null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORIES & TAGS
// ═══════════════════════════════════════════════════════════════════════════════

export interface WPTaxTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/** Fetch all categories (for blog filter pills). */
export async function getCategories(): Promise<WPTaxTerm[]> {
  return wpFetch<WPTaxTerm[]>(`/categories?per_page=50&orderby=count&order=desc`, REVALIDATE_LIST);
}

/** Fetch all tags (for blog sidebar). */
export async function getTags(): Promise<WPTaxTerm[]> {
  return wpFetch<WPTaxTerm[]>(`/tags?per_page=50&orderby=count&order=desc`, REVALIDATE_LIST);
}
