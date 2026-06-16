// src/app/news/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/lib/wordpress';
import {
    getFeaturedImageUrl,
    getFeaturedImageAlt,
    formatWPDate,
    readingTime,
    getCategoryNames,
    stripHtml,
} from '@/types/wordpress';
import BlogPostClient from './BlogPostClient';

// Force live fetch — bypasses static generation issues during development
export const dynamic = 'force-dynamic';

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Not Found — AfrONet' };

    const description = stripHtml(post.excerpt.rendered).slice(0, 160);
    const image = getFeaturedImageUrl(post);

    return {
        title: `${stripHtml(post.title.rendered)} — AfrONet`,
        description,
        openGraph: {
            title: stripHtml(post.title.rendered),
            description,
            images: [{ url: image }],
        },
    };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const related = await getRelatedPosts(post.id, post.categories, 3);
    const categoryNames = getCategoryNames(post).map(stripHtml);

    const article = {
        title: stripHtml(post.title.rendered),
        content: post.content.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        category: categoryNames[0] || 'News',
        categories: categoryNames,
        date: formatWPDate(post.date),
        readTime: readingTime(post.content.rendered),
        heroImage: getFeaturedImageUrl(post),
        heroAlt: getFeaturedImageAlt(post) || stripHtml(post.title.rendered),
    };

    const relatedArticles = related.map((r) => ({
        title: stripHtml(r.title.rendered),
        category: getCategoryNames(r).map(stripHtml)[0] || 'News',
        date: formatWPDate(r.date),
        image: getFeaturedImageUrl(r),
        alt: getFeaturedImageAlt(r) || stripHtml(r.title.rendered),
        href: `/news/${r.slug}`,
    }));

    return <BlogPostClient article={article} related={relatedArticles} />;
}
