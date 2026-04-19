// src/app/news/[slug]/BlogPostClient.tsx
// Client component — owns all animations and interactivity.
// Receives pre-fetched data from the Server Component above as plain props.
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ── Share Icons ───────────────────────────────────────────────────────────────
const IconTwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Article {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  categories: string[];
  date: string;
  readTime: string;
  author: { name: string; avatar: string };
  heroImage: string;
  heroAlt: string;
}

interface RelatedArticle {
  title: string;
  category: string;
  image: string;
  alt: string;
  href: string;
}

interface Props {
  article: Article;
  related: RelatedArticle[];
}

// ── Share helpers ─────────────────────────────────────────────────────────────
function shareOnTwitter(title: string) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnLinkedIn() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

function shareByEmail(title: string) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
}

function copyLink() {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BlogPostClient({ article, related }: Props) {
  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full">

      {/* ── 1. Immersive Hero ──────────────────────────────────────────── */}
      <section className="relative w-full h-[100vh] min-h-[600px] flex justify-center items-end pb-12 px-6">
        <Image
          src={article.heroImage}
          alt={article.heroAlt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1100px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-8 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="flex flex-col gap-4 flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/80 text-[13px] uppercase tracking-widest font-medium" style={{ fontFamily: 'var(--font-display)' }}>
              <Link href="/">Home</Link>
              <span>-</span>
              <Link href="/news">News</Link>
              <span>-</span>
              <span className="text-white">{article.category}</span>
            </div>

            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] text-white font-normal max-w-[800px]" style={{ fontFamily: 'var(--font-editorial)' }}>
              {article.title}
            </h1>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
            {/* Author chip */}
            <div className="flex items-center gap-3 bg-white/10 p-2 pr-6 rounded-full border border-white/20">
              {article.author.avatar ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white text-[16px]">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <span className="text-white text-[15px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/80 text-[14px]" style={{ fontFamily: 'var(--font-display)' }}>
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Split Body ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Sticky Sidebar */}
          <div className="w-full lg:w-[250px] shrink-0">
            <div className="sticky top-[140px] flex flex-col gap-10">

              {/* Categories as Tags */}
              {article.categories.length > 0 && (
                <div className="flex flex-col gap-4">
                  <span className="uppercase text-[12px] tracking-widest text-[#777] font-bold" style={{ fontFamily: 'var(--font-display)' }}>Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 border border-black/10 rounded-full text-[13px] hover:bg-[#05351B] hover:text-white transition-colors cursor-pointer"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="flex flex-col gap-4">
                <span className="uppercase text-[12px] tracking-widest text-[#777] font-bold" style={{ fontFamily: 'var(--font-display)' }}>Share Article</span>
                <div className="flex gap-3 text-[#434343]">
                  <button onClick={() => shareOnTwitter(article.title)} aria-label="Share on X (Twitter)" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#05351B] hover:text-white transition-colors">
                    <IconTwitterX />
                  </button>
                  <button onClick={shareOnLinkedIn} aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#05351B] hover:text-white transition-colors">
                    <IconLinkedIn />
                  </button>
                  <button onClick={() => shareByEmail(article.title)} aria-label="Share via Email" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#05351B] hover:text-white transition-colors">
                    <IconMail />
                  </button>
                  <button onClick={copyLink} aria-label="Copy link" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#05351B] hover:text-white transition-colors">
                    <IconLink />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Prose Content — WP HTML rendered here */}
          <article
            className="flex-1 max-w-[800px] flex flex-col gap-8 text-[#111111] pb-12 border-b border-black/10 wp-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* ── 3. Related Blogs ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="w-full max-w-[1200px] mx-auto px-6 pb-24 lg:pb-32">
          <div className="flex flex-col gap-10">
            <h3 className="text-[36px] md:text-[48px] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
              Our Related Blog
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {related.map((card, i) => (
                <Link href={card.href} key={i} className="group relative w-full h-[320px] lg:h-[400px] rounded-[16px] overflow-hidden bg-black block cursor-pointer">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="text-[14px] text-white/80 font-medium tracking-widest uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                      {card.category}
                    </span>
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[28px] lg:text-[32px] leading-[1.2] text-white font-normal transform transition-transform duration-500 ease-out group-hover:-translate-y-2" style={{ fontFamily: 'var(--font-editorial)' }}>
                        {card.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[#FFD900] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                        <span className="text-[15px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Read Article</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
