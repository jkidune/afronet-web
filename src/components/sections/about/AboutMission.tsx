'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutMission() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <section className="w-full bg-[#FAFAF7] py-20 md:py-28 lg:py-36">
            <div
                ref={ref}
                className="w-full max-w-[1312px] mx-auto px-5 lg:px-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
            >

                {/* ── Left: Image ───────────────────────────────────────────── */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={fadeUp}
                    className="w-full lg:w-[48%] flex-shrink-0"
                >
                    <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-[16px] overflow-hidden bg-[#E8E4DC]">
                        <Image
                            src="/images/about-ticker-3.jpg"
                            alt="AfrONet farmers working the land"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>

                {/* ── Right: Content ────────────────────────────────────────── */}
                <div className="w-full lg:w-[52%] flex flex-col gap-6 lg:gap-8">

                    {/* Pill */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="flex items-center w-fit px-4 py-[6px] border border-black/20 rounded-full"
                    >
                        <span
                            className="text-[14px] lg:text-[15px] text-[#000000] leading-snug"
                            style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                            Our Mission
                        </span>
                    </motion.div>

                    {/* Headline — Instrument Serif */}
                    <motion.h2
                        custom={2}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="text-[34px] md:text-[44px] lg:text-[54px] leading-[1.08] text-[#000000] m-0 font-normal"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        Our mission is to catalyse Africa&apos;s organic transformation
                    </motion.h2>

                    {/* Body paragraphs — Manrope */}
                    <motion.p
                        custom={3}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="text-[16px] lg:text-[18px] leading-[1.75] text-[#444444] m-0"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        To catalyse a distinctive Organic Agriculture sector that transforms
                        smallholder agriculture into ecologically sustainable, socially and
                        culturally inclusive, economically viable, efficient, and competitive
                        systems — advancing food security and sovereignty across the continent.
                    </motion.p>

                    <motion.p
                        custom={4}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        className="text-[16px] lg:text-[18px] leading-[1.75] text-[#444444] m-0"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        We connect farmers, NOAMs, policymakers, researchers, and market
                        actors — enabling income growth, equity, and a food system built
                        on trust, from African soil to the global table.
                    </motion.p>

                    <motion.div
                        custom={5}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                    >
                        <a
                            href="/AfrONet%20Profile.pdf"
                            download
                            className="inline-flex items-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/profile-btn self-start"
                            style={{ textDecoration: 'none' }}
                        >
                            <span className="relative h-[1.25em] overflow-hidden font-medium text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                <span className="block transition-transform duration-500 ease-out group-hover/profile-btn:-translate-y-full">
                                    Download AfrONet Profile
                                </span>
                                <span className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover/profile-btn:-translate-y-full">
                                    Download AfrONet Profile
                                </span>
                            </span>
                            <span className="w-[36px] h-[36px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/profile-btn:scale-105 transition-transform">
                                <Download size={14} strokeWidth={2.3} />
                            </span>
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
