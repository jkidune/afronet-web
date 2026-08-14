// src/app/news/page.tsx
// Blog collection page — fetches all posts from WordPress.
import { getAllPosts, getCategories } from '@/lib/wordpress';
import {
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  formatWPDate,
  getCategoryNames,
  stripHtml,
} from '@/types/wordpress';
import BlogCollectionClient from './BlogCollectionClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News & Updates — AfrONet',
  description: 'Latest news, articles and updates from the African Organic Network.',
};

export default async function NewsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(20),
    getCategories(),
  ]);

  const articles = posts.map((post) => ({
    title:    stripHtml(post.title.rendered),
    excerpt:  stripHtml(post.excerpt.rendered),
    tags:     getCategoryNames(post),
    date:     formatWPDate(post.date),
    image:    getFeaturedImageUrl(post),
    alt:      getFeaturedImageAlt(post) || stripHtml(post.title.rendered),
    href:     `/news/${post.slug}`,
    slug:     post.slug,
  }));

  const categoryNames = ['All', ...categories.map((c) => c.name)];

  return <BlogCollectionClient articles={articles} categories={categoryNames} />;
}
