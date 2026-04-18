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
            ease: [0.34, 0.14, 0.13, 0.91],
            delay: i * 0.11,
        },
    }),
};

// ── Arrow Icon (→ Right) ──────────────────────────────────────────────────────
function ArrowRight({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                d="M14.43 5.93L20.5 12L14.43 18.07M3.5 12H20.33"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Impact() {
    return (
        <section id="impact" className="relative w-full flex flex-col items-center py-16 md:py-24 px-6 bg-[#ffffff] overflow-hidden">

            {/* Background Vector */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[833px] h-[987px] bg-[#d9d9d9]/20 pointer-events-none z-0 rounded-full blur-3xl" />

            <div className="w-full max-w-[1312px] flex flex-col gap-8 md:gap-10 relative z-10">

                {/* ── Title Wrapper ────────────────────────────────────────── */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 w-full">

                    {/* Title Box */}
                    <div className="flex flex-col items-start gap-6 w-full max-w-[441px]">

                        {/* Premium Outlined Serif Pill */}
                        <motion.div
                            custom={0}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full"
                        >
                            <span
                                className="text-[20px] leading-[1.2] text-[#000000]"
                                style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                            >
                                Our Impact
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[#000000] text-[36px] leading-[46px] m-0"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Our continental impact at a glance
                        </motion.h2>
                    </div>

                    {/* Description Box */}
                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[#434343] text-[18px] leading-[24px] lg:text-right w-full lg:max-w-[620px] m-0"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                    >
                        AfrONet works strategically to transform organic agriculture across Africa. We collaborate with partners to create meaningful change.
                    </motion.p>
                </div>

                {/* ── Bento Container Grid ─────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] w-full lg:h-[594px]">

                    {/* 1. Pilot Countries (Left) */}
                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-[#F3EDE4] rounded-[4px] p-[20px] flex flex-col justify-between relative min-h-[350px] lg:min-h-0 h-full"
                    >
                        <div className="flex justify-between items-start w-full">
                            <h3 className="font-medium text-[24px] leading-[18px] text-[#000000] m-0" style={{ fontFamily: 'var(--font-display)' }}>Pilot countries</h3>
                            <div className="w-[15px] h-[15px] bg-[#124C47] rounded-[2px]" />
                        </div>
                        <div className="flex flex-col items-end text-right mt-auto gap-[8px]">
                            <span className="text-[96px] leading-[100px] text-[#000000]" style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}>3</span>
                            <p className="text-[18px] leading-[24px] text-[#2B2B2B] max-w-[200px] m-0" style={{ fontFamily: 'var(--font-display)' }}>Countries engaged in organic network development</p>
                        </div>
                    </motion.div>

                    {/* 2. Centre Image (Farmers Reached) */}
                    <motion.div
                        custom={4}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative bg-[#05351B] rounded-[4px] overflow-hidden flex flex-col justify-between p-[20px] min-h-[450px] lg:min-h-0 h-full group"
                    >
                        <Image
                            src="/images/impact-farmers-bg.jpg"
                            alt="Farmers reached impact"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            style={{ filter: 'blur(2px)' }}
                        />
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

                        <div className="relative z-20 flex justify-end w-full">
                            {/* Deco squares */}
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-[15px] h-[15px] bg-[#FFEED7] rounded-[2px]" />
                                ))}
                            </div>
                        </div>

                        <div className="relative z-20 flex flex-col mt-auto gap-[12px]">
                            <div>
                                <span className="text-[96px] leading-[100px] text-[#ffffff] block" style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}>2m+</span>
                                <p className="text-[18px] leading-[24px] text-[#FFD900] m-0" style={{ fontFamily: 'var(--font-display)' }}>Farmers reached through<br />projects & partners</p>
                            </div>

                            {/* CTA Button */}
                            <Link href="/contact" className="inline-flex items-center bg-[#FFD900] rounded-[38px] py-[4px] pl-[16px] pr-[4px] gap-[16px] self-start hover:bg-[#FFEED7] transition-colors group/btn" style={{ textDecoration: 'none' }}>
                                <span className="font-bold text-[18px] leading-[18px] text-[#05351B]" style={{ fontFamily: 'var(--font-display)' }}>Be a partner</span>
                                <div className="w-[44px] h-[44px] bg-[#05351B] rounded-[49px] flex items-center justify-center text-[#FFD900] group-hover/btn:scale-105 transition-transform">
                                    <ArrowRight size={20} />
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* 3. Right Column (Stacked Boxes) */}
                    <div className="flex flex-col gap-[10px] h-full min-h-[500px] lg:min-h-0">

                        {/* Top: Roundtables */}
                        <motion.div
                            custom={5}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-[#F3EDE4] rounded-[4px] p-[20px] flex flex-col justify-between relative h-full lg:h-[292px]"
                        >
                            <div className="flex justify-between items-start w-full">
                                <h3 className="font-medium text-[24px] leading-[28px] text-[#2B2B2B] m-0" style={{ fontFamily: 'var(--font-display)' }}>Roundtables</h3>
                                <div className="flex gap-[5px] shrink-0">
                                    <div className="w-[15px] h-[15px] bg-[#05351B] rounded-[2px]" />
                                    <div className="w-[15px] h-[15px] bg-[#05351B] rounded-[2px]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end text-right mt-auto gap-[8px]">
                                <span className="text-[96px] leading-[100px] text-[#05351B]" style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}>20+</span>
                                <p className="text-[18px] leading-[24px] text-[#2B2B2B] m-0" style={{ fontFamily: 'var(--font-display)' }}>Policy discussions and strategic meetings</p>
                            </div>
                        </motion.div>

                        {/* Bottom: Funded by */}
                        <motion.div
                            custom={6}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-[#05351B] rounded-[4px] p-[20px] flex flex-col justify-between relative h-full lg:h-[292px]"
                        >
                            <div className="flex justify-between items-start w-full">
                                <h3 className="font-medium text-[24px] leading-[28px] text-[#ffffff] m-0" style={{ fontFamily: 'var(--font-display)' }}>Funded by</h3>
                                <div className="w-[15px] h-[15px] bg-[#FFD900] rounded-[2px] shrink-0" />
                            </div>
                            <div className="flex flex-col items-end text-right mt-auto gap-[8px]">
                                <span className="text-[96px] leading-[100px] text-[#FFD900]" style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}>AFD</span>
                                <p className="text-[18px] leading-[24px] text-[#ffffff] m-0" style={{ fontFamily: 'var(--font-display)' }}>Supported by Agence Française<br className="hidden xl:block" /> de Développement</p>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}