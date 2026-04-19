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

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
export default function Programme() {
    return (
        <section id="programme" className="relative w-full py-16 md:py-24 lg:py-[120px] px-6 bg-[#F3EDE4] overflow-hidden">
            <div className="w-full max-w-[1312px] mx-auto flex flex-col gap-8 md:gap-12 relative z-10">

                {/* ── Section Pill ─────────────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={0}
                    className="flex flex-col items-start w-full"
                >
                    {/* Premium Outlined Serif Pill */}
                    <div className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span
                            className="text-[20px] leading-[1.2] text-[#000000]"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Our Programme
                        </span>
                    </div>
                </motion.div>

                {/* ── Asymmetrical Grid Layout ─────────────────────────────── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col lg:flex-row gap-[32px] lg:gap-[40px] xl:gap-[56px] w-full"
                >

                    {/* LEFT COLUMN (Heading + Tall Image) */}
                    <div className="flex flex-col w-full lg:w-1/2 gap-[32px]">

                        {/* Heading */}
                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            className="text-[#000000] text-[32px] md:text-[38px] leading-[1.21] m-0 max-w-[538px]"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Introducing Integrated African Agricultural Business Alliance
                        </motion.h2>

                        {/* Tall Image */}
                        <motion.div
                            custom={2}
                            variants={fadeUp}
                            className="relative w-full aspect-[2/3] lg:aspect-[652/978] rounded-[4px] overflow-hidden"
                        >
                            <Image
                                src="/images/programme-tall.jpg"
                                alt="Integrated African Agricultural Business Alliance"
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN (Landscape Image + Content + Buttons) */}
                    <div className="flex flex-col w-full lg:w-1/2 gap-[40px] lg:gap-[56px]">

                        {/* Landscape Image */}
                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            className="relative w-full aspect-[3/2] lg:aspect-[627/418] rounded-[4px] overflow-hidden"
                        >
                            <Image
                                src="/images/programme-landscape.jpg"
                                alt="IIABA Programme Activities"
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-[28px]">
                            <motion.p
                                custom={4}
                                variants={fadeUp}
                                className="text-[#434343] text-[18px] leading-[1.33] max-w-[620px] m-0"
                                style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                            >
                                IIABA drives sustainable agricultural transformation by connecting markets, ensuring quality assurance, and influencing public policy across Africa.
                            </motion.p>

                            {/* Sub-items Row */}
                            <motion.div custom={5} variants={fadeUp} className="flex flex-col sm:flex-row gap-[16px] w-full">
                                {/* Sub-item 1 */}
                                <div className="flex flex-col gap-[12px] flex-1">
                                    <h3 className="text-[24px] leading-[1.4] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}>
                                        Market Access
                                    </h3>
                                    <p className="text-[16px] leading-[1.5] text-[#000000] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                                        Connecting local organic producers directly with premium continental and global buyers.
                                    </p>
                                </div>
                                {/* Sub-item 2 */}
                                <div className="flex flex-col gap-[12px] flex-1">
                                    <h3 className="text-[24px] leading-[1.4] text-[#000000] m-0" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}>
                                        Quality Assurance
                                    </h3>
                                    <p className="text-[16px] leading-[1.5] text-[#000000] m-0" style={{ fontFamily: 'var(--font-display)' }}>
                                        Implementing robust, peer-reviewed standards ensuring trust across the supply chain.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* CTA Buttons Row */}
                        <motion.div custom={6} variants={fadeUp} className="flex flex-wrap gap-[16px] md:gap-[20px] mt-2">

                            {/* Button 1: Yellow Background */}
                            <Link href="/programme/iiaba-initiative-institutional-innovations-for-organic-agriculture" className="inline-flex items-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/btn1" style={{ textDecoration: 'none' }}>
                                <span className="font-medium text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                    Learn more
                                </span>
                                <div className="w-[36px] h-[36px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/btn1:scale-105 transition-transform">
                                    <ArrowNE size={13} />
                                </div>
                            </Link>

                            {/* Button 2: Dark Green Background */}
                            <Link href="/programme" className="inline-flex items-center bg-[#05351B] rounded-full p-1 pl-5 gap-4 hover:bg-[#111111] transition-colors group/btn2" style={{ textDecoration: 'none' }}>
                                <span className="font-medium text-[0.9rem] text-[#FFD900] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                    View all projects
                                </span>
                                <div className="w-[36px] h-[36px] bg-[#FFD900] rounded-full flex items-center justify-center text-[#05351B] group-hover/btn2:scale-105 transition-transform">
                                    <ArrowNE size={13} />
                                </div>
                            </Link>

                        </motion.div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}