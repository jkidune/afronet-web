// src/app/news/[slug]/BlogPostClient.tsx
// Client component — owns all animations and interactivity.
// Receives pre-fetched data from the Server Component above as plain props.
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, Link as LinkIcon, Mail, Share2, Tags } from 'lucide-react';

const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
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
  heroImage: string;
  heroAlt: string;
}

interface RelatedArticle {
  title: string;
  category: string;
  date: string;
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
    <main className="min-h-screen bg-[#F7F7F3] w-full">

      {/* ── 1. Editorial Header ─────────────────────────────────────────── */}
      <section className="w-full px-5 md:px-6 pt-[120px] md:pt-[150px] pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full max-w-[980px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-12 items-end">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#5F665E]" style={{ fontFamily: 'var(--font-display)' }}>
                <Link href="/news" className="hover:text-[#05351B] transition-colors" style={{ textDecoration: 'none' }}>
                  News & Insights
                </Link>
                <span className="w-1 h-1 rounded-full bg-[#A8AEA4]" />
                <span>{article.category}</span>
              </div>

              <h1 className="text-[42px] md:text-[64px] lg:text-[76px] leading-[0.98] text-[#101510] m-0 font-normal max-w-[820px]" style={{ fontFamily: 'var(--font-editorial)' }}>
                {article.title}
              </h1>
            </div>

            <div className="lg:border-l lg:border-[#D5D8D1] lg:pl-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-[14px] text-[#5F665E]" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={15} strokeWidth={1.8} />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={15} strokeWidth={1.8} />
                  {article.readTime}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#394236]">
                <span className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] text-[#7A8177]" style={{ fontFamily: 'var(--font-display)' }}>
                  <Share2 size={14} strokeWidth={1.8} />
                  Share
                </span>
                <button onClick={() => shareOnTwitter(article.title)} aria-label="Share on X (Twitter)" className="w-9 h-9 rounded-full border border-[#D5D8D1] flex items-center justify-center hover:bg-[#05351B] hover:text-white hover:border-[#05351B] transition-colors text-[13px] font-semibold">
                  X
                </button>
                <button onClick={shareOnLinkedIn} aria-label="Share on LinkedIn" className="w-9 h-9 rounded-full border border-[#D5D8D1] flex items-center justify-center hover:bg-[#05351B] hover:text-white hover:border-[#05351B] transition-colors">
                  <IconLinkedIn />
                </button>
                <button onClick={() => shareByEmail(article.title)} aria-label="Share via Email" className="w-9 h-9 rounded-full border border-[#D5D8D1] flex items-center justify-center hover:bg-[#05351B] hover:text-white hover:border-[#05351B] transition-colors">
                  <Mail size={15} strokeWidth={1.8} />
                </button>
                <button onClick={copyLink} aria-label="Copy link" className="w-9 h-9 rounded-full border border-[#D5D8D1] flex items-center justify-center hover:bg-[#05351B] hover:text-white hover:border-[#05351B] transition-colors">
                  <LinkIcon size={15} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] md:aspect-[2.05/1] rounded-[18px] overflow-hidden bg-[#DDE4D7] mt-10 md:mt-12">
            <Image
              src={article.heroImage}
              alt={article.heroAlt}
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 40px), 980px"
              unoptimized
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ── 2. Article Body ─────────────────────────────────────────────── */}
      <section className="w-full max-w-[980px] mx-auto px-5 md:px-6 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          <aside className="lg:pt-2">
            <div className="lg:sticky lg:top-[130px] flex flex-col gap-8">
              {article.categories.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center gap-2 uppercase text-[12px] tracking-[0.14em] text-[#7A8177]" style={{ fontFamily: 'var(--font-display)' }}>
                    <Tags size={14} strokeWidth={1.8} />
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 border border-[#D5D8D1] rounded-full text-[13px] text-[#394236] bg-white/60"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <article
            className="max-w-[720px] text-[#111111] pb-12 border-b border-black/10 wp-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* ── 3. Related Blogs ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="w-full bg-[#F7F7F3] px-5 md:px-6 py-16 lg:py-24">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="w-fit px-3 py-1 rounded-full bg-[#FFD900] text-[12px] text-[#101510]" style={{ fontFamily: 'var(--font-display)' }}>
                Latest news
              </span>
              <h3 className="text-[34px] md:text-[46px] m-0 font-normal text-[#101510]" style={{ fontFamily: 'var(--font-editorial)' }}>
                Related blog and articles
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 w-full">
              {related.map((card, i) => (
                <Link href={card.href} key={i} className="group flex flex-col bg-white rounded-[14px] overflow-hidden border border-black/5 shadow-sm shadow-black/5 cursor-pointer" style={{ textDecoration: 'none' }}>
                  <div className="relative w-full aspect-[1.55/1] overflow-hidden bg-[#DDE4D7]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) calc(100vw - 40px), 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-5 p-5 min-h-[205px]">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#697166]" style={{ fontFamily: 'var(--font-display)' }}>
                      <CalendarDays size={14} strokeWidth={1.8} />
                      <span>{card.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#A8AEA4]" />
                      <span>{card.category}</span>
                    </div>
                    <h4 className="text-[21px] lg:text-[23px] leading-[1.18] text-[#101510] font-normal group-hover:text-[#0B8C47] transition-colors" style={{ fontFamily: 'var(--font-editorial)' }}>
                        {card.title}
                    </h4>
                    <div className="mt-auto flex items-center justify-between text-[#05351B]">
                      <span className="text-[14px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Read article</span>
                      <ArrowRight size={16} strokeWidth={1.8} />
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
