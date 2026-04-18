'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// ── Content ──────────────────────────────────────────────────────────────────
const testimonials = [
    {
        quote: "AfrONet has been instrumental in aligning our national policies with the broader African organic agenda. Their evidence-based frameworks gave us exactly what we needed to approach policymakers with confidence.",
        name: "Dr. Sarah Ochieng",
        title: "Director, KOAN",
        image: "/images/test-1.jpg",
        theme: "dark" // Dark Green
    },
    {
        quote: "The IIABA project completely changed the trajectory for our local cooperatives. By connecting our producers directly to premium markets, we've seen a massive increase in community resilience and income.",
        name: "Musa Ibrahim",
        title: "Representative, NOGAMU",
        image: "/images/test-2.jpg",
        theme: "yellow" // Brand Yellow
    },
    {
        quote: "Through the participatory guarantee systems championed by AfrONet, we have established a layer of trust that previously didn't exist in our regional supply chains. It's a game changer for smallholders.",
        name: "Amina Yusuf",
        title: "Policy Lead, TOAM",
        image: "/images/test-3.jpg",
        theme: "light" // Beige/Cream
    }
];

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

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Testimonial() {
    return (
        <section id="testimonials" className="relative w-full py-16 md:py-24 lg:py-[120px] bg-[#FFFFFF] overflow-hidden">

            {/* ── Header Area ───────────────────────────────────────────────── */}
            <div className="w-full max-w-[1312px] mx-auto px-6 flex flex-col relative z-10 mb-10 lg:mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="flex flex-col items-start w-full gap-6"
                >
                    {/* Premium Outlined Serif Pill */}
                    <div className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span
                            className="text-[18px] leading-[1.2] text-[#000000]"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            Testimonial
                        </span>
                    </div>

                    <h2
                        className="text-[#000000] text-[32px] md:text-[44px] leading-[1.1] m-0 font-normal"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        What our partners say
                    </h2>
                </motion.div>
            </div>

            {/* ── Scroll Snapping Carousel ──────────────────────────────────── */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:pl-[calc((100vw-1312px)/2+24px)] md:pr-[calc((100vw-1312px)/2+24px)] pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {testimonials.map((test, index) => {
                    // Theme mapping logic
                    const isDark = test.theme === 'dark';
                    const isYellow = test.theme === 'yellow';

                    const bgClass = isDark ? 'bg-[#05351B]' : isYellow ? 'bg-[#FFD900]' : 'bg-[#F3EDE4]';
                    const textClass = isDark ? 'text-[#FFFFFF]' : 'text-[#000000]';
                    const nameClass = isDark ? 'text-[#FFD900]' : 'text-[#05351B]';
                    const quoteMarkColor = isDark ? 'text-[#FFD900]' : 'text-[#05351B]';
                    const titleClass = isDark ? 'text-[#FFFFFF]/70' : 'text-[#000000]/70';

                    return (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            // Reduced card widths and padding for better proportions
                            className={`flex-shrink-0 w-[85vw] md:w-[480px] lg:w-[520px] snap-center md:snap-start flex flex-col justify-between p-6 md:p-8 rounded-[8px] ${bgClass}`}
                        >
                            <div className="flex flex-col gap-4 mb-10">
                                {/* Scaled down Giant Quote Mark */}
                                <span
                                    className={`text-[60px] md:text-[80px] leading-[0.5] mt-4 ${quoteMarkColor}`}
                                    style={{ fontFamily: 'var(--font-editorial)' }}
                                >
                                    “
                                </span>

                                {/* 18px Quote Text */}
                                <p
                                    className={`text-[16px] md:text-[18px] leading-[1.5] m-0 ${textClass}`}
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {test.quote}
                                </p>
                            </div>

                            {/* Author Block */}
                            <div className="flex items-center gap-4 mt-auto">
                                {/* Scaled down image */}
                                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src={test.image}
                                        alt={test.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    {/* Adjusted font weight to medium for better balance */}
                                    <span
                                        className={`text-[16px] font-medium ${nameClass}`}
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {test.name}
                                    </span>
                                    <span
                                        className={`text-[14px] ${titleClass}`}
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {test.title}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Spacer block to ensure the last card can be scrolled fully into view */}
                <div className="flex-shrink-0 w-1 md:w-6"></div>
            </motion.div>

        </section>
    );
}