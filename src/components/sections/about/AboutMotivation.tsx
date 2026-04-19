'use client';

import { useRef, useState, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useInView,
    animate,
    type MotionValue,
} from 'framer-motion';

// ─── Content ─────────────────────────────────────────────────────────────────
const MOTIVATION_TEXT =
    "Africa's farmers have the knowledge, the land, and the will. AfrONet exists to unite their voices, anchor organic standards in policy, and open the markets that make sustainable farming an economic reality — not just an ideal.";

const STATS = [
    { label: 'Years of experience', numericValue: 14, suffix: '', bg: 'bg-[#F3EDE4]', numColor: 'text-[#05351B]', labelColor: 'text-[#05351B]' },
    { label: 'Pilot Countries', numericValue: 3, suffix: '+', bg: 'bg-[#05351B]', numColor: 'text-[#FFD900]', labelColor: 'text-[#FFFFFFAA]' },
    { label: 'Policy Discussions', numericValue: 50, suffix: '+', bg: 'bg-[#EFEFEF]', numColor: 'text-[#111111]', labelColor: 'text-[#555555]' },
];

// ─── Scroll timeline for the 250 vh track ────────────────────────────────────
// 30% → 50%   Stage 2: entire UI fades out
// 45% → 100%  Stage 3: video scales from card → full screen
const FADE_START = 0.30;
const FADE_END = 0.50;
const VID_START = 0.45;

// ─── Word — single scrubbing word ────────────────────────────────────────────
function Word({
    word,
    scrollProgress,
    start,
    end,
}: {
    word: string;
    scrollProgress: MotionValue<number>;
    start: number;
    end: number;
}) {
    const opacity = useTransform(scrollProgress, [start, end], [0.14, 1]);
    return (
        <motion.span
            style={{ opacity, fontFamily: 'var(--font-body)' }}
            className="mr-[5px] sm:mr-[6px] lg:mr-[8px] inline-block"
        >
            {word}
        </motion.span>
    );
}

// ─── ScrubbingText — Driven by its own viewport intersection ─────────────────
function ScrubbingText({ text }: { text: string }) {
    const textRef = useRef<HTMLParagraphElement>(null);

    // This tracks the text as it enters the viewport, independent of the section pin
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ['start 85%', 'end 50%'],
    });

    const words = text.split(' ');

    return (
        <p
            ref={textRef}
            className="text-[16px] sm:text-[18px] lg:text-[22px] leading-[1.7] text-[#000000] m-0 font-normal flex flex-wrap"
            style={{ fontFamily: 'var(--font-body)' }}
        >
            {words.map((word, i) => {
                // Distribute the 0-1 progress evenly across all words
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word
                        key={i}
                        word={word}
                        scrollProgress={scrollYProgress}
                        start={start}
                        end={end}
                    />
                );
            })}
        </p>
    );
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
function AnimatedCounter({ to }: { to: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-5% 0px' });
    const count = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(count, to, {
            duration: 1.6,
            ease: [0.0, 0.0, 0.2, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return controls.stop;
    }, [inView, to, count]);

    return <span ref={ref}>{display}</span>;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ label, numericValue, suffix, bg, numColor, labelColor }: (typeof STATS)[0]) {
    return (
        <div className={`flex flex-col justify-between p-3 sm:p-5 lg:p-8 ${bg} rounded-[12px] lg:rounded-[14px] h-full w-full`}>
            <div className="flex items-start leading-none">
                <span
                    className={`text-[44px] sm:text-[52px] lg:text-[80px] leading-[0.95] ${numColor} font-normal`}
                    style={{ fontFamily: 'var(--font-editorial)' }}
                >
                    <AnimatedCounter to={numericValue} />
                </span>
                {suffix && (
                    <span
                        className={`text-[22px] sm:text-[26px] lg:text-[36px] ${numColor} font-normal mt-1`}
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
            <span
                className={`text-[11px] sm:text-[12px] lg:text-[13px] ${labelColor} leading-snug font-medium uppercase tracking-widest`}
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {label}
            </span>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutMotivation() {
    const trackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    // Stage 2: everything except video fades out
    const uiOpacity = useTransform(scrollYProgress, [FADE_START, FADE_END], [1, 0]);

    // Stage 3: video card scales from natural size → full screen
    const videoScale = useTransform(scrollYProgress, [VID_START, 1.0], [1, 6]);
    const videoBorderRadius = useTransform(scrollYProgress, [VID_START, VID_START + 0.28], [12, 0]);

    return (
        <section ref={trackRef} className="relative w-full bg-[#FFFFFF]" style={{ height: '250vh' }}>

            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full max-w-[1312px] mx-auto px-4 sm:px-5 lg:px-10 py-5 sm:py-7 lg:py-16 flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-16">

                        {/* ── Left column: pill + heading ── */}
                        <motion.div
                            style={{ opacity: uiOpacity }}
                            className="w-full lg:w-[300px] flex-shrink-0 flex flex-col items-start gap-2 sm:gap-3 lg:gap-5"
                        >
                            <div className="flex items-center px-3 sm:px-4 py-[4px] sm:py-[5px] border border-black/20 rounded-full">
                                <span
                                    className="text-[12px] sm:text-[13px] lg:text-[15px] text-[#000000] leading-snug"
                                    style={{ fontFamily: 'var(--font-editorial)' }}
                                >
                                    AfrONet
                                </span>
                            </div>
                            <h2
                                className="text-[24px] sm:text-[30px] lg:text-[50px] leading-[1.05] text-[#000000] m-0 font-normal"
                                style={{ fontFamily: 'var(--font-editorial)' }}
                            >
                                Our<br />motivation
                            </h2>
                        </motion.div>

                        {/* ── Right column ── */}
                        <div className="flex-1 flex flex-col gap-3 sm:gap-5 lg:gap-10">

                            {/* Scrubbing text now handles its own intersection observer natively */}
                            <motion.div style={{ opacity: uiOpacity }}>
                                <ScrubbingText text={MOTIVATION_TEXT} />
                            </motion.div>

                            {/* ── Bento grid ── */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full">

                                {STATS.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        style={{ opacity: uiOpacity }}
                                        className="h-[100px] sm:h-[130px] lg:h-[220px]"
                                    >
                                        <StatCard {...s} />
                                    </motion.div>
                                ))}

                                <div className="col-span-2 lg:col-span-1 relative h-[115px] sm:h-[150px] lg:h-[220px]">
                                    <motion.div
                                        style={{
                                            scale: videoScale,
                                            borderRadius: videoBorderRadius,
                                            transformOrigin: '50% 100%',
                                        }}
                                        className="absolute inset-0 overflow-hidden bg-[#111] shadow-lg"
                                    >
                                        <video
                                            src="/videos/farming-video.mp4"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}