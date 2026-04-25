'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

// ── Config ────────────────────────────────────────────────────────────────────
const SLIDE_DURATION = 6000; // ms per slide

const slides = [
    {
        src: '/images/slider images/slider-1.jpg',
        alt: 'African woman harvesting vegetables in a field',
    },
    {
        src: '/images/slider images/slider-2.jpg',
        alt: 'Organic farmers working across East Africa',
    },
    {
        src: '/images/slider images/slider-3.jpg',
        alt: 'Sustainable agroecology practices across Africa',
    },
];

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number],
            delay: i * 0.11,
        },
    }),
};

// ── Arrow icon ────────────────────────────────────────────────────────────────
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
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent(prev => (prev + 1) % slides.length), []);
    const goTo = useCallback((i: number) => setCurrent(i), []);

    // Auto-advance
    useEffect(() => {
        const t = setTimeout(next, SLIDE_DURATION);
        return () => clearTimeout(t);
    }, [current, next]);

    return (
        <section
            id="hero"
            className="relative w-full h-svh min-h-[560px] overflow-hidden bg-[#05351B]"
        >
            {/* ── Slide backgrounds ─────────────────────────────────────── */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    {/* Ken Burns — subtle zoom-in over the slide duration */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.0 }}
                        animate={{ scale: 1.07 }}
                        transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: 'linear' }}
                    >
                        <Image
                            src={slides[current].src}
                            alt={slides[current].alt}
                            fill
                            priority={current === 0}
                            className="object-cover object-center"
                        />
                    </motion.div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Bottom gradient for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ── Slide counter (desktop top-right) ─────────────────────── */}
            <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="absolute top-[88px] right-6 md:right-10 lg:right-12 z-10 hidden lg:flex items-center gap-[6px]"
            >
                <span
                    className="text-white font-semibold tabular-nums"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.04em' }}
                >
                    {String(current + 1).padStart(2, '0')}
                </span>
                <span className="text-white/35 text-[0.72rem]">/</span>
                <span
                    className="text-white/50 tabular-nums"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.04em' }}
                >
                    {String(slides.length).padStart(2, '0')}
                </span>
            </motion.div>

            {/* ── Content block — anchored to bottom ────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-10 lg:px-12 pb-6 md:pb-8 lg:pb-10">
                <div className="max-w-[1320px] mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10">

                        {/* ── Left ──────────────────────────────────────── */}
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

                            {/* Heading */}
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
                                    fontSize: 'clamp(1.9rem, 5.5svh, 3.8rem)',
                                }}
                            >
                                <span className="block">Making Africa an</span>
                                <span className="block">Organic Food Basket</span>
                            </motion.h1>

                            {/* Subtitle */}
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

                            {/* CTA + progress indicators */}
                            <motion.div
                                custom={3}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col gap-5"
                            >
                                <Link href="/programme" className="hero-cta has-slide">
                                    <span
                                        className="slide-wrap font-medium text-[0.9rem] whitespace-nowrap"
                                        style={{ fontFamily: 'var(--font-display)', color: 'inherit' }}
                                    >
                                        <span className="slide-out">See Our Programmes</span>
                                        <span className="slide-in">See Our Programmes</span>
                                    </span>
                                    <span className="hero-cta-icon">
                                        <span className="slide-icon-out"><ArrowNE size={12} /></span>
                                        <span className="slide-icon-in"><ArrowNE size={12} /></span>
                                    </span>
                                </Link>

                                {/* Slide progress bars */}
                                <div className="flex items-center gap-[6px]">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            aria-label={`Go to slide ${i + 1}`}
                                            className="relative h-[3px] rounded-full overflow-hidden border-0 p-0 cursor-pointer"
                                            style={{
                                                width: i === current ? '52px' : '20px',
                                                background: 'rgba(255,255,255,0.28)',
                                                transition: 'width 0.35s ease',
                                            }}
                                        >
                                            {i === current && (
                                                <span
                                                    key={`progress-${current}`}
                                                    className="absolute inset-y-0 left-0 w-full bg-white rounded-full"
                                                    style={{
                                                        transformOrigin: 'left center',
                                                        animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right: News panel (desktop only) ──────────── */}
                        <motion.div
                            custom={4}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="hidden lg:block shrink-0 w-[270px]"
                        >
                            <div className="news-panel">
                                <div className="news-panel-header">
                                    <div className="flex items-center gap-2">
                                        <span className="news-dot" />
                                        <span
                                            className="font-semibold tracking-[0.15em] text-white uppercase"
                                            style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem' }}
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

                                <div className="h-px bg-white/15" />

                                <div className="news-panel-body">
                                    <Link href="/news" className="news-item group" style={{ textDecoration: 'none' }}>
                                        <p
                                            className="leading-snug text-white/90 group-hover:text-white transition-colors"
                                            style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', maxWidth: 'none' }}
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
