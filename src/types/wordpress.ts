// src/types/wordpress.ts

export interface WPImage {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      medium?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
      thumbnail?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
}

// ── Posts (Blog) ──────────────────────────────────────────────────────────────
export interface WPPost {
  id: number;
  slug: string;
  status: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string; protected: boolean };
  content: { rendered: string; protected: boolean };
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
    'author'?: WPAuthor[];
    'wp:term'?: WPCategory[][];
  };
  acf?: Record<string, unknown>;
}

// ── Programmes (Custom Post Type) ────────────────────────────────────────────
// Uses FLAT ACF fields (free ACF, no Repeater)
export interface WPProgramme {
  id: number;
  slug: string;
  status: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
  };
  acf?: {
    programme_category?: string;
    timeline?: string;
    pilot_countries?: string;
    key_partners?: string;
    budget?: string;
    overview?: string;
    // Flat objectives (free ACF — no Repeater)
    objective_1_title?: string;
    objective_1_desc?: string;
    objective_2_title?: string;
    objective_2_desc?: string;
    objective_3_title?: string;
    objective_3_desc?: string;
    // Flat stats (free ACF — no Repeater)
    stat_1_label?: string;
    stat_1_value?: string;
    stat_2_label?: string;
    stat_2_value?: string;
    stat_3_label?: string;
    stat_3_value?: string;
  };
}

// ── Testimonials (Custom Post Type) ──────────────────────────────────────────
export interface WPTestimonial {
  id: number;
  slug: string;
  status: string;
  date: string;
  title: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
  };
  acf?: {
    quote?: string;
    person_name?: string;
    person_title?: string;
    theme?: 'dark' | 'yellow' | 'light';
  };
}

// ── Pages ─────────────────────────────────────────────────────────────────────
export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  featured_media: number;
  acf?: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getFeaturedImageUrl(post: WPPost | WPProgramme | WPTestimonial | WPPage): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return '/images/fallback.jpg';
  return (
    media.media_details?.sizes?.large?.source_url ||
    media.media_details?.sizes?.medium?.source_url ||
    media.source_url
  );
}

export function getFeaturedImageAlt(post: WPPost | WPProgramme | WPTestimonial | WPPage): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '';
}

export function getFeaturedImageThumbnail(post: WPTestimonial): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return '/images/fallback.jpg';
  const sizes = media.media_details?.sizes;
  return (
    sizes?.thumbnail?.source_url ||
    sizes?.medium?.source_url ||
    media.source_url
  );
}

export function formatWPDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

export function readingTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.['author']?.[0]?.name || 'AfrONet';
}

export function getAuthorAvatar(post: WPPost): string {
  return post._embedded?.['author']?.[0]?.avatar_urls?.['96'] || '';
}

export function getCategoryNames(post: WPPost): string[] {
  const terms = post._embedded?.['wp:term']?.[0] || [];
  return terms.map((t) => t.name);
}