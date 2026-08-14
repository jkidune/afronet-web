'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// ── Content ──────────────────────────────────────────────────────────────────
const faqs = [
    {
        question: 'What is AfrONet and what do you do?',
        answer: 'AfrONet is the African Organic Network, a continental umbrella organization founded in 2012. We unite and represent organic agriculture stakeholders across Africa through policy dialogue, capacity building, knowledge sharing, and trade facilitation.'
    },
    {
        question: 'How can my organization become a member?',
        answer: 'We welcome partnerships with National Organic Agriculture Movements (NOAMs), research institutions, and agricultural cooperatives. Please visit our Contact page to reach out for membership criteria and applications.'
    },
    {
        question: 'Where does AfrONet operate?',
        answer: 'While our headquarters is located in Dar es Salaam, Tanzania, we are a pan-African organization. We currently engage with pilot countries and partner networks across East, West, and Southern Africa.'
    },
    {
        question: 'How is AfrONet funded?',
        answer: 'AfrONet is supported by institutional and corporate partnerships, including organizations like the Agence Française de Développement (AFD), as well as member contributions and specific project grants.'
    },
    {
        question: 'Can I access your policy briefs and research?',
        answer: 'Yes, our mission is to translate evidence into field-use tools. All our research, policy briefs, and toolkits are open-access and can be found in our Knowledge & Resources library.'
    }
];

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

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── FAQ Item Component ────────────────────────────────────────────────────────
function FaqItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-[#000000]/10 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full py-6 flex justify-between items-center text-left group gap-6 focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3
                    className="text-[20px] md:text-[22px] font-medium text-[#000000] group-hover:text-[#0B8C47] transition-colors duration-300 m-0"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {question}
                </h3>

                {/* Animated Plus/Minus Icon */}
                <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center text-[#000000] group-hover:text-[#0B8C47] transition-colors duration-300">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                    <motion.div
                        animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number] }}
                    >
                        <p
                            className="pb-8 text-[16px] md:text-[18px] leading-[1.5] text-[#434343] m-0 max-w-[800px]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Faq({ bgClass = 'bg-[#FFFFFF]' }: { bgClass?: string }) {
    // Track which accordion is open. Null means all are closed.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className={`relative w-full py-16 md:py-24 lg:py-[120px] px-6 ${bgClass} overflow-hidden`}>
            <div className="w-full max-w-[1312px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-[100px] xl:gap-[160px] relative z-10">

                {/* ── Left Column: Intro ───────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="flex flex-col items-start gap-6 w-full lg:max-w-[441px] lg:sticky lg:top-[120px] h-fit"
                >
                    {/* Premium Outlined Serif Pill */}
                    <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span
                            className="text-[18px] leading-[1.2] text-[#000000]"
                            style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                        >
                            FAQ
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={fadeUp}
                        className="text-[#000000] text-[32px] md:text-[40px] leading-[1.1] m-0"
                        style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                    >
                        Frequently asked questions
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={fadeUp}
                        className="text-[#434343] text-[18px] md:text-[20px] leading-[1.4] m-0"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                    >
                        Find answers to common questions about AfrONet, our programmes, and how you can get involved.
                    </motion.p>
                </motion.div>

                {/* ── Right Column: Accordion ──────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="flex flex-col w-full flex-1"
                >
                    <div className="border-t border-[#000000]/10">
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}