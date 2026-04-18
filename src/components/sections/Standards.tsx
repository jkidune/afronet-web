'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] },
    },
};

// ── Arrow Icon (↗ Top-Right matching Hero) ───────────────────────────────────
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
export default function Standards() {
    return (
        <section id="standards" className="relative w-full py-16 md:py-24 px-6 bg-[#FFFFFF] overflow-visible">
            <div className="w-full max-w-[1312px] mx-auto flex flex-col relative z-10">

                {/* ── Section Pill ─────────────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex flex-col items-start w-full mb-10 lg:mb-12"
                >
                    {/* Premium Outlined Serif Pill */}
                    <div className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span
                            className="text-[18px] leading-[1.2] text-[#000000]"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Standards
                        </span>
                    </div>
                </motion.div>

                {/* ── Sticky Stacking Cards Container ──────────────────────── */}
                <div className="relative w-full pb-[10vh]">

                    {/* ── CARD 1: Participatory Guarantee Systems ───────────── */}
                    <div className="relative lg:sticky top-[100px] lg:top-[120px] w-full flex flex-col lg:flex-row h-auto lg:h-[480px] xl:h-[520px] bg-[#F3EDE4] rounded-[8px] overflow-hidden shadow-xl shadow-black/5 mb-6 lg:mb-[150px] z-[1]">

                        {/* Left Content */}
                        <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 lg:p-[32px] xl:p-[40px]">
                            <div className="flex flex-col gap-[16px] max-w-[420px]">
                                <h3 className="text-[28px] md:text-[32px] leading-[1.2] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Organic standards and policy framework
                                </h3>
                                <p className="text-[16px] leading-[1.5] text-[#434343] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                                    Driving continental organic agriculture standards and policy development
                                </p>
                            </div>
                            <div className="flex flex-col gap-[8px] mt-12 lg:mt-0 max-w-[320px]">
                                <span className="text-[13px] tracking-wider font-medium text-[#05351B]" style={{ fontFamily: 'var(--font-display)' }}>SYSTEMS</span>
                                <h4 className="text-[24px] md:text-[28px] leading-[1.3] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Participatory guarantee systems
                                </h4>
                            </div>
                        </div>

                        {/* Right Image & CTA */}
                        <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full flex flex-col justify-end p-6 lg:p-[32px] xl:p-[40px]">
                            <Image src="/images/standards-1.jpg" alt="Participatory Guarantee Systems" fill className="object-cover z-0" />
                            <div className="absolute inset-0 bg-black/30 z-10" />
                            <div className="relative z-20 flex flex-col gap-[20px]">
                                <p className="text-[16px] leading-[1.4] text-[#FFFFFF] m-0 max-w-[320px]" style={{ fontFamily: 'var(--font-display)' }}>
                                    Community-based organic certification approach
                                </p>
                                <Link href="/programme#pgs" className="inline-flex items-center bg-[#05351B] rounded-full p-1 pl-5 gap-4 hover:bg-[#111111] transition-colors group/btn self-start" style={{ textDecoration: 'none' }}>
                                    <span className="font-medium text-[0.9rem] text-[#FFD900] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>Learn more</span>
                                    <div className="w-[36px] h-[36px] bg-[#FFD900] rounded-full flex items-center justify-center text-[#05351B] group-hover/btn:scale-105 transition-transform"><ArrowNE size={13} /></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── CARD 2: East African Organic Standards ───────────── */}
                    <div className="relative lg:sticky top-[100px] lg:top-[120px] w-full flex flex-col lg:flex-row h-auto lg:h-[480px] xl:h-[520px] bg-[#05351B] rounded-[8px] overflow-hidden shadow-2xl shadow-black/20 mb-6 lg:mb-[150px] z-[2]">

                        {/* Left Content */}
                        <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 lg:p-[32px] xl:p-[40px]">
                            <div className="flex flex-col gap-[16px] max-w-[420px]">
                                <h3 className="text-[28px] md:text-[32px] leading-[1.2] text-[#FFD900] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Organic standards and policy framework
                                </h3>
                                <p className="text-[16px] leading-[1.5] text-[#ecdfd0] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                                    Driving continental organic agriculture standards and policy development
                                </p>
                            </div>
                            <div className="flex flex-col gap-[8px] mt-12 lg:mt-0 max-w-[320px]">
                                <span className="text-[13px] tracking-wider font-medium text-[#FFFFFF]" style={{ fontFamily: 'var(--font-display)' }}>STANDARDS</span>
                                <h4 className="text-[24px] md:text-[28px] leading-[1.3] text-[#D9D9D9] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    East African Organic Standards
                                </h4>
                            </div>
                        </div>

                        {/* Right Image & CTA */}
                        <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full flex flex-col justify-end p-6 lg:p-[32px] xl:p-[40px]">
                            <Image src="/images/standards-2.jpg" alt="East African Organic Standards" fill className="object-cover z-0" />
                            <div className="absolute inset-0 bg-black/30 z-10" />
                            <div className="relative z-20 flex flex-col gap-[20px]">
                                <p className="text-[16px] leading-[1.4] text-[#FFFFFF] m-0 max-w-[320px]" style={{ fontFamily: 'var(--font-display)' }}>
                                    Harmonizing organic production guidelines
                                </p>
                                <Link href="/programme#eaops" className="inline-flex items-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/btn self-start" style={{ textDecoration: 'none' }}>
                                    <span className="font-medium text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>Learn more</span>
                                    <div className="w-[36px] h-[36px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/btn:scale-105 transition-transform"><ArrowNE size={13} /></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── CARD 3: Organic Agriculture Policy Briefs ────────── */}
                    <div className="relative lg:sticky top-[100px] lg:top-[120px] w-full flex flex-col lg:flex-row h-auto lg:h-[480px] xl:h-[520px] bg-[#F3EDE4] rounded-[8px] overflow-hidden shadow-2xl shadow-black/10 z-[3]">

                        {/* Left Content */}
                        <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 lg:p-[32px] xl:p-[40px]">
                            <div className="flex flex-col gap-[16px] max-w-[420px]">
                                <h3 className="text-[28px] md:text-[32px] leading-[1.2] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Organic standards and policy framework
                                </h3>
                                <p className="text-[16px] leading-[1.5] text-[#434343] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                                    Driving continental organic agriculture standards and policy development
                                </p>
                            </div>
                            <div className="flex flex-col gap-[8px] mt-12 lg:mt-0 max-w-[320px]">
                                <span className="text-[13px] tracking-wider font-medium text-[#05351B]" style={{ fontFamily: 'var(--font-display)' }}>POLICY</span>
                                <h4 className="text-[24px] md:text-[28px] leading-[1.3] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Organic agriculture policy briefs
                                </h4>
                            </div>
                        </div>

                        {/* Right Image & CTA */}
                        <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full flex flex-col justify-end p-6 lg:p-[32px] xl:p-[40px]">
                            <Image src="/images/standards-3.jpg" alt="Organic agriculture policy briefs" fill className="object-cover z-0" />
                            <div className="absolute inset-0 bg-black/30 z-10" />
                            <div className="relative z-20 flex flex-col gap-[20px]">
                                <p className="text-[16px] leading-[1.4] text-[#FFFFFF] m-0 max-w-[320px]" style={{ fontFamily: 'var(--font-display)' }}>
                                    Evidence-based policy recommendations
                                </p>
                                <Link href="/programme#policy" className="inline-flex items-center bg-[#05351B] rounded-full p-1 pl-5 gap-4 hover:bg-[#111111] transition-colors group/btn self-start" style={{ textDecoration: 'none' }}>
                                    <span className="font-medium text-[0.9rem] text-[#FFD900] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>Read more</span>
                                    <div className="w-[36px] h-[36px] bg-[#FFD900] rounded-full flex items-center justify-center text-[#05351B] group-hover/btn:scale-105 transition-transform"><ArrowNE size={13} /></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}