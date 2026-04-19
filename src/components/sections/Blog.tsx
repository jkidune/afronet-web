// src/components/sections/Blog.tsx
// Homepage "Latest from the field" section — receives posts as props from page.tsx
'use client';

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
}

interface Props {
    articles: Article[];
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: (i: number) => ({
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91], delay: i * 0.11 },
    }),
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function ArrowNE({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Blog({ articles }: Props) {
    return (
        <section id="news" className="relative w-full py-16 md:py-24 lg:py-[120px] px-6 bg-[#FFFFFF] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[833px] h-[987px] bg-[#d9d9d9]/20 pointer-events-none z-0 rounded-full blur-3xl" />

            <div className="w-full max-w-[1312px] mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 w-full"
                >
                    <div className="flex flex-col items-start gap-6 w-full lg:max-w-[538px]">
                        <motion.div custom={0} variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                            <span className="text-[18px] leading-[1.2] text-[#000000]" style={{ fontFamily: 'var(--font-editorial)' }}>Our Stories</span>
                        </motion.div>
                        <motion.h2 custom={1} variants={fadeUp} className="text-[#000000] text-[32px] md:text-[44px] leading-[1.1] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                            Latest from the field
                        </motion.h2>
                    </div>
                    <motion.p custom={2} variants={fadeUp} className="text-[#434343] text-[18px] leading-[1.4] lg:text-right w-full lg:max-w-[620px] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                        AfrONet works strategically to transform organic agriculture across Africa. We collaborate with partners to create meaningful change.
                    </motion.p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial="hidden" whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full"
                >
                    {articles.map((article, index) => (
                        <motion.div key={index} custom={index + 3} variants={fadeUp} className="group flex flex-col w-full h-full">
                            <Link href={article.href} className="flex flex-col w-full h-full" style={{ textDecoration: 'none' }}>

                                <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-6 bg-[#F5F5F5]">
                                    <Image src={article.image} alt={article.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {article.tags.slice(0, 2).map((tag, i) => (
                                                <div key={i} className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-full">
                                                    <span className="text-[13px] font-medium text-[#434343]" style={{ fontFamily: 'var(--font-display)' }}>{tag}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[14px] text-[#777777]">•</span>
                                        <span className="text-[13px] text-[#777777]" style={{ fontFamily: 'var(--font-display)' }}>{article.date}</span>
                                    </div>

                                    <h3 className="text-[24px] lg:text-[28px] leading-[1.2] text-[#000000] group-hover:text-[#0B8C47] transition-colors mb-3 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                                        {article.title}
                                    </h3>

                                    <p className="text-[16px] leading-[1.5] text-[#434343] mb-6 line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                                        {article.excerpt}
                                    </p>

                                    <div className="mt-auto inline-flex items-center gap-2 font-medium text-[16px] text-[#05351B] group-hover:text-[#0B8C47] transition-colors">
                                        <span style={{ fontFamily: 'var(--font-display)' }}>Read more</span>
                                        <ArrowNE size={16} />
                                    </div>
                                </div>

                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View all link */}
                <div className="flex justify-center">
                    <Link href="/news" className="px-8 py-3 rounded-full border border-[#000000]/20 text-[16px] text-[#000000] hover:bg-[#05351B] hover:text-white hover:border-[#05351B] transition-all duration-300" style={{ fontFamily: 'var(--font-display)' }}>
                        View all articles
                    </Link>
                </div>

            </div>
        </section>
    );
}