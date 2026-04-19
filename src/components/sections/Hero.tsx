'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number],
            delay: i * 0.11,
        },
    }),
};

// ── Arrow icon (↗ top-right) ──────────────────────────────────────────────────
function ArrowNE({ size = 13 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
    return (
        <section
            id="hero"
            className="relative w-full h-svh min-h-[560px] overflow-hidden bg-[#05351B]"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="African woman harvesting vegetables in a field"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
                {/* Subtle bottom gradient for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* ── Content block — absolute bottom anchor ────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-10 lg:px-12 pb-6 md:pb-8 lg:pb-10">
                <div className="max-w-[1320px] mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10">

                        {/* ── Left ──────────────────────────────────── */}
                        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">

                            {/* Tag */}
                            <motion.div
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="flex items-center gap-2"
                            >
                                <span className="w-[6px] h-[6px] rounded-full bg-[#d4d4d4] shrink-0" />
                                <p
                                    className="font-medium tracking-[0.18em] text-[#d4d4d4] uppercase"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)',
                                    }}
                                >
                                    Agroecology · Empower · Growth · Organic
                                </p>
                            </motion.div>

                            {/* Heading + Subtitle */}
                            <div className="flex flex-col gap-3 md:gap-4">
                                {/* Inline styles override globals.css h1 { font-family; color; text-wrap } */}
                                <motion.h1
                                    custom={1}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        fontFamily: 'var(--font-editorial)',
                                        fontWeight: 400,
                                        fontStyle: 'normal',
                                        color: '#ffffff',
                                        lineHeight: 1.02,
                                        textWrap: 'nowrap' as const,
                                        /* Scales with viewport height so it always fits */
                                        fontSize: 'clamp(1.9rem, 5.5svh, 3.8rem)',
                                    }}
                                >
                                    <span className="block">Making Africa an</span>
                                    <span className="block">Organic Food Basket</span>
                                </motion.h1>

                                <motion.p
                                    custom={2}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="font-normal leading-relaxed text-[#ecdfd0]"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                                        maxWidth: '38ch',
                                    }}
                                >
                                    Uniting Africa to grow resilient, trusted organic food systems
                                </motion.p>
                            </div>

                            {/* CTA button */}
                            <motion.div
                                custom={3}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                            >
                                <Link href="/programme" className="hero-cta group">
                                    <span
                                        style={{ fontFamily: 'var(--font-display)', textDecoration: 'none' }}
                                        className="font-medium text-[0.9rem] text-black whitespace-nowrap"
                                    >
                                        See Our Programmes
                                    </span>
                                    <span className="hero-cta-icon group-hover:bg-[#2d5a27] group-hover:scale-105">
                                        <ArrowNE size={12} />
                                    </span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* ── Right: News panel (desktop only) ─────────── */}
                        <motion.div
                            custom={4}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="hidden lg:block shrink-0 w-[270px]"
                        >
                            <div className="news-panel">
                                {/* Panel header */}
                                <div className="news-panel-header">
                                    <div className="flex items-center gap-2">
                                        <span className="news-dot" />
                                        <span
                                            className="font-semibold tracking-[0.15em] text-white uppercase"
                                            style={{
                                                fontFamily: 'var(--font-display)',
                                                fontSize: '0.68rem',
                                            }}
                                        >
                                            News Updates
                                        </span>
                                    </div>
                                    <Link
                                        href="/news"
                                        aria-label="Go to all news"
                                        className="news-arrow-link"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <ArrowNE size={13} />
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/15" />

                                {/* News items */}
                                <div className="news-panel-body">
                                    <Link
                                        href="/news"
                                        className="news-item group"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <p
                                            className="leading-snug text-white/90 group-hover:text-white transition-colors"
                                            style={{
                                                fontFamily: 'var(--font-display)',
                                                fontSize: '0.82rem',
                                                maxWidth: 'none',
                                            }}
                                        >
                                            6th African Organic Conference, Lusaka, Zambia: 1st – 4th December, 2026
                                        </p>
                                        <span className="news-item-tag">Conference</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
