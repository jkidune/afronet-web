'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// ── Image Ticker Data ────────────────────────────────────────────────────────
const tickerImages = [
    { src: "/images/about-ticker-1.jpg", alt: "AfrONet Field Work" },
    { src: "/images/about-ticker-2.jpg", alt: "Organic Farming Cooperative" },
    { src: "/images/about-ticker-3.jpg", alt: "Policy Meeting" },
    { src: "/images/about-ticker-4.jpg", alt: "Community Harvesting" },
    { src: "/images/about-ticker-5.jpg", alt: "Agricultural Training" },
];

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: any = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number] }
    },
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutHero() {
    return (
        <section className="relative w-full pt-[120px] lg:pt-[160px] pb-16 md:pb-24 overflow-hidden bg-[#FFFFFF]">

            {/* ── Top Text Content ────────────────────────────────────────── */}
            <div className="w-full max-w-[1312px] mx-auto px-6 mb-16 lg:mb-24 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center text-center gap-6 max-w-[800px] mx-auto"
                >
                    {/* Premium Outlined Serif Pill */}
                    <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span className="text-[18px] leading-[1.2] text-[#000000]" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}>
                            AfrONet
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-[#000000] m-0 font-normal text-center"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        Catalyzing Africa's Organic Agriculture
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-[18px] md:text-[20px] leading-[1.5] text-[#434343] m-0 font-normal max-w-[650px] text-center"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        We are the continental umbrella organization uniting stakeholders to transform smallholder farming into ecologically sustainable, socially inclusive, and economically viable systems.
                    </motion.p>
                </motion.div>
            </div>

            {/* ── Infinite Image Ticker ───────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="w-full flex overflow-hidden whitespace-nowrap relative z-0"
            >
                {/* To create a seamless infinite scroll, we duplicate the content.
                    Both divs move left by 100% of their own width, then snap back. 
                */}

                {/* Ticker Block 1 */}
                <motion.div
                    className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                >
                    {tickerImages.map((img, index) => (
                        <div key={`ticker-1-${index}`} className="relative w-[280px] md:w-[400px] lg:w-[480px] aspect-[4/3] rounded-[8px] overflow-hidden shrink-0 bg-[#F5F5F5]">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Ticker Block 2 (Exact Duplicate) */}
                <motion.div
                    className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                >
                    {tickerImages.map((img, index) => (
                        <div key={`ticker-2-${index}`} className="relative w-[280px] md:w-[400px] lg:w-[480px] aspect-[4/3] rounded-[8px] overflow-hidden shrink-0 bg-[#F5F5F5]">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>

            </motion.div>

        </section>
    );
}