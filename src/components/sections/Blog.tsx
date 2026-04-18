'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Dummy Data (Ready for CMS Integration) ───────────────────────────────────
const articles = [
    {
        title: "Statement to the EU Parliament",
        excerpt: "AfrONet outlines strategic recommendations for harmonizing organic standards between African producers and European markets, ensuring fair trade and sustainable growth.",
        tags: ["News", "Press release"],
        date: "21 Feb 2026",
        image: "/images/blog-1.jpg",
        href: "/news/statement-to-eu-parliament"
    },
    {
        title: "Cotton sustainability in Africa at a crossroads",
        excerpt: "Exploring the challenges and opportunities in transitioning to organic cotton production across West and East Africa, and what it means for local cooperatives.",
        tags: ["Insights", "Agriculture"],
        date: "18 Feb 2026",
        image: "/images/blog-2.jpg",
        href: "/news/cotton-sustainability"
    },
    {
        title: "Uganda is ready to go places",
        excerpt: "How NOGAMU and local farming cooperatives are scaling participatory guarantee systems (PGS) to boost export readiness and empower smallholder farmers.",
        tags: ["News", "Case Study"],
        date: "10 Feb 2026",
        image: "/images/blog-3.jpg",
        href: "/news/uganda-ready-to-go"
    }
];

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.34, 0.14, 0.13, 0.91],
            delay: i * 0.11,
        },
    }),
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Arrow Icon (↗ Top-Right matching Hero) ───────────────────────────────────
function ArrowNE({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Blog() {
    return (
        <section id="news" className="relative w-full py-16 md:py-24 lg:py-[120px] px-6 bg-[#FFFFFF] overflow-hidden">

            {/* Subtle Background Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[833px] h-[987px] bg-[#d9d9d9]/20 pointer-events-none z-0 rounded-full blur-3xl" />

            <div className="w-full max-w-[1312px] mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">

                {/* ── Header ─────────────────────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 w-full"
                >
                    {/* Left: Pill & Heading */}
                    <div className="flex flex-col items-start gap-6 w-full lg:max-w-[538px]">
                        {/* Premium Outlined Serif Pill */}
                        <motion.div custom={0} variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                            <span
                                className="text-[18px] leading-[1.2] text-[#000000]"
                                style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                            >
                                Our Stories
                            </span>
                        </motion.div>

                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            className="text-[#000000] text-[32px] md:text-[44px] leading-[1.1] m-0 font-normal"
                            style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                            Latest from the field
                        </motion.h2>
                    </div>

                    {/* Right: Description */}
                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        className="text-[#434343] text-[18px] leading-[1.4] lg:text-right w-full lg:max-w-[620px] m-0"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                    >
                        AfrONet works strategically to transform organic agriculture across Africa. We collaborate with partners to create meaningful change.
                    </motion.p>
                </motion.div>

                {/* ── Blog Grid ──────────────────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full"
                >
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            custom={index + 3}
                            variants={fadeUp}
                            className="group flex flex-col w-full h-full"
                        >
                            <Link href={article.href} className="flex flex-col w-full h-full" style={{ textDecoration: 'none' }}>

                                {/* Image Container (Standard Landscape Ratio) */}
                                <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-6 bg-[#F5F5F5]">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content Area */}
                                <div className="flex flex-col flex-1">

                                    {/* Meta Row: Tags & Date */}
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <div className="flex gap-2">
                                            {article.tags.map((tag, i) => (
                                                <div
                                                    key={i}
                                                    className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-full"
                                                >
                                                    <span
                                                        className="text-[13px] font-medium text-[#434343]"
                                                        style={{ fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[14px] text-[#777777]">•</span>
                                        <span
                                            className="text-[13px] text-[#777777]"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {article.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-[24px] lg:text-[28px] leading-[1.2] text-[#000000] group-hover:text-[#0B8C47] transition-colors mb-3 font-normal"
                                        style={{ fontFamily: 'var(--font-editorial)' }}
                                    >
                                        {article.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p
                                        className="text-[16px] leading-[1.5] text-[#434343] mb-6 line-clamp-3"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {article.excerpt}
                                    </p>

                                    {/* Read More Link */}
                                    <div className="mt-auto inline-flex items-center gap-2 font-medium text-[16px] text-[#05351B] group-hover:text-[#0B8C47] transition-colors">
                                        <span style={{ fontFamily: 'var(--font-display)' }}>Read more</span>
                                        <ArrowNE size={16} />
                                    </div>

                                </div>

                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}