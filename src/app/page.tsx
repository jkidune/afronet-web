// src/app/page.tsx
import Hero from '@/components/sections/Hero';
import Impact from '@/components/sections/Impact';
import WhatWeDo from '@/components/sections/WhatWeDo';
import Programme from '@/components/sections/Programme';
import Standards from '@/components/sections/Standards';
import Mission from '@/components/sections/Mission';
import Faq from '@/components/sections/Faq';
import Testimonial from '@/components/sections/Testimonial';
import Blog from '@/components/sections/Blog';
import { getLatestPosts, getTestimonials } from "@/lib/wordpress";
import {
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  formatWPDate,
  getCategoryNames,
  stripHtml,
} from "@/types/wordpress";

// Make the function async so we can fetch data
export default async function Home() {
  const [rawPosts, rawTestimonials] = await Promise.all([
    getLatestPosts(3),
    getTestimonials(10),
  ]);

  const latestPosts = rawPosts.map((post) => ({
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    tags: getCategoryNames(post),
    date: formatWPDate(post.date),
    image: getFeaturedImageUrl(post),
    alt: getFeaturedImageAlt(post) || stripHtml(post.title.rendered),
    href: `/news/${post.slug}`,
  }));

  const testimonials = rawTestimonials.map((t) => ({
    quote: t.acf?.quote || '',
    name: t.acf?.person_name || stripHtml(t.title.rendered),
    title: t.acf?.person_title || '',
    image: getFeaturedImageUrl(t),
    alt: getFeaturedImageAlt(t) || t.acf?.person_name || stripHtml(t.title.rendered),
    theme: t.acf?.theme || 'light',
  }) as {
    quote: string;
    name: string;
    title: string;
    image: string;
    alt: string;
    theme: 'dark' | 'yellow' | 'light';
  });

  return (
    <main>
      <Hero />
      <Impact />
      <WhatWeDo />
      <Programme />
      <Standards />
      <Mission />
      <Faq />
      <Testimonial testimonials={testimonials} />
      <Blog articles={latestPosts} />
    </main>
  );
}