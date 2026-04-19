'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── AfrONet Values ───────────────────────────────────────────────────────────
const VALUES = [
    {
        title: 'Pan-African Unity',
        description:
            'We unite organic stakeholders across Africa, ensuring no country or community is left behind in the transition to sustainable food systems.',
    },
    {
        title: 'Evidence-Based Action',
        description:
            'Every programme we support is grounded in rigorous research, transparent science, and the lived knowledge of African farmers.',
    },
    {
        title: 'Inclusive Sustainability',
        description:
            'We centre smallholder farmers, women, and youth — those most capable of leading the continent\'s agroecological transformation.',
    },
    {
        title: 'Standards & Trust',
        description:
            'We steward EAOPS and national organic standards so producers, consumers, and markets can trust what "organic" truly means.',
    },
];

// ─── Badge Icon (dashed circle + checkmark, like reference) ──────────────────
function BadgeIcon() {
    return (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
            <circle
                cx="19" cy="19" r="16"
                stroke="#05351B"
                strokeWidth="1.4"
                strokeDasharray="3.5 2.5"
            />
            <path
                d="M13 19l4 4 8-9"
                stroke="#05351B"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Value Card ───────────────────────────────────────────────────────────────
function ValueCard({
    title,
    description,
    index,
    inView,
}: {
    title: string;
    description: string;
    index: number;
    inView: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4 p-6 lg:p-8 bg-[#FFFFFF] rounded-[14px] shadow-sm border border-black/[0.06]"
        >
            <BadgeIcon />
            <h3
                className="text-[17px] lg:text-[19px] text-[#111111] m-0 font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {title}
            </h3>
            <p
                className="text-[14px] lg:text-[15px] text-[#555555] m-0 leading-[1.7]"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {description}
            </p>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutValues() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-8% 0px' });

    return (
        <section className="w-full bg-[#F2F1ED] py-20 md:py-28 lg:py-36">
            <div
                ref={ref}
                className="w-full max-w-[1312px] mx-auto px-5 lg:px-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
            >

                {/* ── Left: Pill + Headline ─────────────────────────────────── */}
                <div className="w-full lg:w-[42%] flex-shrink-0 flex flex-col gap-5 lg:gap-7 lg:sticky lg:top-32">

                    {/* Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center w-fit px-4 py-[6px] border border-black/20 rounded-full"
                    >
                        <span
                            className="text-[14px] lg:text-[15px] text-[#000000] leading-snug"
                            style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                            Our Values
                        </span>
                    </motion.div>

                    {/* Headline — Instrument Serif */}
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[34px] md:text-[44px] lg:text-[52px] leading-[1.08] text-[#000000] m-0 font-normal"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        Values cultivating trust, grounded in purpose
                    </motion.h2>

                </div>

                {/* ── Right: 2×2 Values Grid ────────────────────────────────── */}
                <div className="w-full lg:w-[58%] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                    {VALUES.map((v, i) => (
                        <ValueCard
                            key={v.title}
                            title={v.title}
                            description={v.description}
                            index={i}
                            inView={inView}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
