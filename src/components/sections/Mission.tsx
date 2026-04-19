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
        transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number] },
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
export default function Mission() {
    return (
        <section className="relative w-full h-[400px] flex flex-col justify-center items-center px-6 overflow-hidden">

            {/* Background Image Layer with Blur & Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/mission-bg.jpg"
                    alt="African organic agriculture landscape"
                    fill
                    className="object-cover scale-105"
                    style={{ filter: 'blur(2px)' }}
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            {/* Content Container */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="relative z-20 flex flex-col items-center justify-center text-center gap-[28px] w-full max-w-[642px] mx-auto"
            >
                {/* Text Wrapper - Strictly Centered */}
                <div className="flex flex-col items-center justify-center text-center gap-[20px] w-full">
                    <h2
                        className="text-[#FFFFFF] text-[32px] md:text-[39px] leading-[1.1] m-0 font-normal text-center"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        A united and vibrant African Organic Agriculture
                    </h2>

                    <p
                        className="text-[#FFFFFF] text-[18px] md:text-[20px] leading-[1.4] m-0 font-normal text-center"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        We aim to catalyze a distinctive Organic Agriculture sector. To transform smallholder farming into ecologically sustainable, socially and culturally inclusive, economically viable, efficient, and competitive systems.
                    </p>
                </div>

                {/* Refined CTA Button - Strictly Centered */}
                <Link href="/about" className="inline-flex items-center justify-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/btn mx-auto mt-2" style={{ textDecoration: 'none' }}>
                    <span className="font-medium text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                        About us
                    </span>
                    <div className="w-[36px] h-[36px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/btn:scale-105 transition-transform">
                        <ArrowNE size={13} />
                    </div>
                </Link>

            </motion.div>
        </section>
    );
}