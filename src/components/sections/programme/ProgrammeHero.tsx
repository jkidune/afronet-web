'use client';

import { motion } from 'framer-motion';

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ProgrammeHero() {
    return (
        <section className="relative w-full pt-[120px] lg:pt-[160px] pb-12 overflow-hidden bg-[#F5F5F5]">
            <div className="w-full max-w-[800px] mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-6">
                
                <motion.div
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="flex flex-col items-center text-center gap-6 w-full"
                >
                    {/* Pill */}
                    <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span className="text-[18px] leading-[1.2] text-[#000000]" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}>
                            Our Programme
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 
                        variants={fadeUp} 
                        className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-[#000000] m-0 font-normal" 
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        Innovative Services for Modern Agriculture
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p 
                        variants={fadeUp} 
                        className="text-[18px] md:text-[20px] leading-[1.5] text-[#434343] m-0 font-normal max-w-[700px]" 
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Our goal is simple: to empower growers, strengthen resilient supply chains, and rejuvenate the precious land we all depend on for a sustainable future.
                    </motion.p>
                </motion.div>

            </div>
        </section>
    );
}
