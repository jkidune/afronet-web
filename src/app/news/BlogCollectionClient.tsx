// src/app/news/BlogCollectionClient.tsx
// Client component for the blog collection page — owns filtering + animations.
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  image: string;
  alt: string;
  href: string;
  slug: string;
}

interface Props {
  articles: Article[];
  categories: string[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number], delay: i * 0.11 },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function ArrowNE({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export default function BlogCollectionClient({ articles, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.tags.includes(activeCategory));

  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full pt-[120px] lg:pt-[160px] pb-24">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center mb-24">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center gap-6 w-full">

          <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-5 py-1.5 border border-[#000000]/20 rounded-full">
            <span className="text-[14px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-display)' }}>Our Blog</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] text-[#000000] m-0 font-normal tracking-tight max-w-[900px]"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            Explore ideas and updates on the future of agriculture
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] leading-[1.6] text-[#434343] m-0 font-normal max-w-[650px] mt-2 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            From climate-smart practices to policy advocacy, our blog shares expert knowledge and real-world case studies from across Africa.
          </motion.p>

          {/* Category filter pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[15px] transition-all duration-300 font-medium ${
                  activeCategory === cat
                    ? 'bg-[#FFD900] text-[#111111] shadow-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#434343] hover:text-[#000000] hover:shadow-sm'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1312px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#777] text-[18px]" style={{ fontFamily: 'var(--font-display)' }}>
            No articles in this category yet.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full"
          >
            {filtered.map((article, index) => (
              <motion.div key={article.slug} custom={index % 3} variants={fadeUp} className="group flex flex-col w-full h-full">
                <Link href={article.href} className="flex flex-col w-full h-full" style={{ textDecoration: 'none' }}>

                  <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-6 bg-[#E0E0E0]">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex gap-2 flex-wrap">
                        {article.tags.slice(0, 2).map((tag, i) => (
                          <div key={i} className="px-[12px] py-[4px] bg-[#FFFFFF] rounded-full shadow-sm">
                            <span className="text-[13px] font-medium text-[#434343]" style={{ fontFamily: 'var(--font-display)' }}>{tag}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[14px] text-[#777777]">•</span>
                      <span className="text-[13px] text-[#777777] font-medium" style={{ fontFamily: 'var(--font-display)' }}>{article.date}</span>
                    </div>

                    <h3
                      className="text-[24px] lg:text-[28px] leading-[1.2] text-[#000000] group-hover:text-[#0B8C47] transition-colors mb-3 font-normal"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-[16px] leading-[1.6] text-[#434343] mb-6 line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {article.excerpt}
                    </p>

                    <div className="mt-auto inline-flex items-center gap-2 font-medium text-[16px] text-[#05351B] group-hover:text-[#0B8C47] transition-colors">
                      <span style={{ fontFamily: 'var(--font-display)' }}>Read article</span>
                      <ArrowNE size={16} />
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

    </main>
  );
}
