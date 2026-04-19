'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Content (Ready to be replaced by WP GraphQL fetch) ───────────────
const projects = [
    {
        title: "IIABA Initiative",
        desc: "Fostering institutional innovations in markets, certification, and public policies across pilot countries.",
        pill: "Innovation",
        image: "/images/programme-iiaba.jpg", // Update with your actual image path
        slug: "iiaba-initiative"
    },
    {
        title: "EOA-I",
        desc: "Mainstreaming Ecological Organic Agriculture into national policies and programs across the continent.",
        pill: "Policy",
        image: "/images/programme-standards.jpg",
        slug: "eoa-initiative"
    },
    {
        title: "African Organic Conference",
        desc: "The premier continental platform uniting organic actors to share innovations and strengthen the sector.",
        pill: "Networking",
        image: "/images/programme-landscape.jpg",
        slug: "african-organic-conference"
    },
    {
        title: "Organic Cotton Sustainability",
        desc: "Advancing organic cotton production and integrating smallholders into sustainable textile supply chains.",
        pill: "Sustainability",
        image: "/images/programme-capacity.jpg",
        slug: "organic-cotton"
    },
    {
        title: "Journalists Go Organic",
        desc: "Capacity building for media professionals to advocate for organic agriculture and consumer health.",
        pill: "Advocacy",
        image: "/images/programme-tall.jpg",
        slug: "journalists-go-organic"
    },
    {
        title: "PGS Scaling",
        desc: "Empowering smallholder farmers and boosting market readiness through localized Participatory Guarantee Systems.",
        pill: "Certification",
        image: "/images/about-ticker-1.jpg",
        slug: "pgs-scaling"
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
function ArrowNE({ size = 16 }: { size?: number }) {
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
export default function ProgrammeCards() {
    return (
        <section className="relative w-full py-16 md:py-24 px-6 bg-[#F5F5F5]">
            <div className="w-full max-w-[1312px] mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                >
                    {projects.map((card, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={fadeUp}
                            className="group relative w-full h-[480px] lg:h-[560px] rounded-[16px] overflow-hidden bg-black isolation-auto"
                        >
                            {/* Dynamically link to the individual project page */}
                            <Link href={`/programme/${card.slug}`} className="absolute inset-0 z-20" aria-label={`Learn more about ${card.title}`} />

                            {/* Background Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">

                                <h3
                                    className="text-[28px] lg:text-[32px] leading-[1.2] text-white font-normal mb-2 transform transition-transform duration-500 ease-out group-hover:-translate-y-2"
                                    style={{ fontFamily: 'var(--font-editorial)' }}
                                >
                                    {card.title}
                                </h3>

                                <p
                                    className="text-[16px] leading-[1.4] text-white/80 font-normal mb-6 transform transition-transform duration-500 delay-75 ease-out group-hover:-translate-y-2 line-clamp-3"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {card.desc}
                                </p>

                                {/* Bottom Pill and Link Row */}
                                <div className="flex items-center justify-between border-t border-white/20 pt-4 relative z-30 transform transition-transform duration-500 delay-100 ease-out group-hover:-translate-y-2">

                                    {/* Serif Pill */}
                                    <span
                                        className="text-[18px] text-[#FFFFFF] font-normal"
                                        style={{ fontFamily: 'var(--font-editorial)' }}
                                    >
                                        {card.pill}
                                    </span>

                                    {/* Learn More link - Slides in from right on hover */}
                                    <div className="flex items-center gap-2 text-[#FFD900] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out delay-150">
                                        <span className="text-[15px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                                            Learn More
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-[#FFD900] text-[#05351B] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ArrowNE size={14} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}