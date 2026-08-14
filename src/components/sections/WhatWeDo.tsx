'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Content ──────────────────────────────────────────────────────────────────
const tags = [
    'Pan-African',
    'Collaborative',
    'Standards-Driven',
    'Evidence-Based',
    'Market-Linked'
];

const pillars = [
    {
        num: '01',
        title: 'Capacity & Networks',
        desc: 'Strengthen NOAMs and farmer organizations with governance support, training of trainers, and peer learning.',
        href: '/programme#capacity',
    },
    {
        num: '02',
        title: 'Standards & Policy',
        desc: 'Develop and roll out practical guidance aligned with EAOPS and national standards.',
        href: '/programme#standards',
    },
    {
        num: '03',
        title: 'Knowledge & Resources',
        desc: 'Create toolkits, briefings, and multilingual training materials for real-world use.',
        href: '/programme#knowledge',
    },
    {
        num: '04',
        title: 'Markets & Partnerships',
        desc: 'Build fair, traceable value chains that reward organic producers.',
        href: '/programme#markets',
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
            ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number],
            delay: i * 0.11,
        },
    }),
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Arrow Icon (↗ Top-Right) ─────────────────────────────────────────────────
function ArrowNE({ size = 20 }: { size?: number }) {
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
export default function WhatWeDo() {
    return (
        <section id="what-we-do" className="relative w-full py-16 md:py-24 px-5 md:px-10 lg:px-12 bg-[#ffffff] overflow-hidden">

            <div className="max-w-[1320px] mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">

                {/* ── Top Section: Heading & Description ────────────────────── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 w-full"
                >
                    {/* Left: Pill & Heading */}
                    <div className="flex flex-col items-start gap-6 w-full max-w-[441px]">

                        {/* Premium Outlined Serif Pill */}
                        <motion.div
                            custom={0}
                            variants={fadeUp}
                            className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full"
                        >
                            <span
                                className="text-[20px] leading-[1.2] text-[#000000]"
                                style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                            >
                                What We Do
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            className="text-[#000000] text-[32px] md:text-[40px] leading-[1.1] m-0"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Enabling Africa&apos;s Organic & Agroecology Transition
                        </motion.h2>
                    </div>

                    {/* Right: Tags & Description */}
                    <div className="flex flex-col items-start gap-6 w-full lg:max-w-[620px] pt-2">

                        {/* Tags Row */}
                        <motion.div custom={2} variants={fadeUp} className="flex flex-wrap gap-2 md:gap-3">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="px-[14px] py-[6px] border border-[#000000]/15 rounded-[4px] bg-transparent"
                                >
                                    <span
                                        className="text-[12px] md:text-[14px] font-medium text-[#434343] tracking-wide"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            custom={3}
                            variants={fadeUp}
                            className="text-[#434343] text-[18px] leading-[1.4] m-0"
                            style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Our mission is to strengthen Africa&apos;s organic ecosystem—connecting NOAMs, farmer organizations, policymakers, researchers, and markets. We support the development and adoption of trusted standards, build institutional capacity, and translate evidence into field-use tools.
                        </motion.p>
                    </div>
                </motion.div>

                {/* ── Cards Grid ────────────────────────────────────────────── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full"
                >
                    {pillars.map((pillar, index) => (
                        <Link key={index} href={pillar.href} style={{ textDecoration: 'none' }} className="has-slide">
                            <motion.div
                                custom={index + 4}
                                variants={fadeUp}
                                /* Default state: Light Grey bg. Hover state: Dark Green bg */
                                className="group relative flex flex-col justify-between p-6 lg:p-8 rounded-[4px] bg-[#F5F5F5] overflow-hidden transition-colors duration-500 hover:bg-[#05351B] min-h-[380px] lg:min-h-[420px] h-full"
                            >
                                {/* Background Image Overlay (Revealed on Hover) */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-700 pointer-events-none">
                                    <Image
                                        src="/images/card-hover-bg.jpg"
                                        alt="Background texture"
                                        fill
                                        className="object-cover grayscale"
                                    />
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 flex flex-col h-full">

                                    {/* Number (Mono font, small, muted -> yellow on hover) */}
                                    <span
                                        className="font-mono text-[13px] tracking-widest text-[#777777] group-hover:text-[#FFD900] transition-colors duration-500"
                                    >
                                        {pillar.num}
                                    </span>

                                    {/* Text Block */}
                                    <div className="mt-auto mb-8 lg:mb-12">
                                        <h3
                                            /* Title: Black -> White on hover */
                                            className="text-[24px] font-medium text-[#000000] group-hover:text-[#ffffff] transition-colors duration-500 leading-[1.2] mb-3"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {pillar.title}
                                        </h3>
                                        <p
                                            /* Description: Dark grey -> Light white on hover */
                                            className="text-[16px] text-[#434343] group-hover:text-[#ffffff]/90 transition-colors duration-500 leading-[1.4]"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    {/* Arrow Button (Transparent w/ dark border -> Yellow fill w/ dark icon on hover) */}
                                    <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center border border-[#000000]/20 text-[#000000] group-hover:border-[#FFD900] group-hover:bg-[#FFD900] group-hover:text-[#05351B] transition-all duration-500 relative overflow-hidden">
                                        <span className="slide-icon-out"><ArrowNE size={20} /></span>
                                        <span className="slide-icon-in"><ArrowNE size={20} /></span>
                                    </div>

                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
