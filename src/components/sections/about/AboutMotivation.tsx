'use client';

import { useRef, useState, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
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

// ─── Scroll stages ────────────────────────────────────────────────────────────
const FADE_START = 0.30;   // UI begins fading out / video begins fading in
const FADE_END   = 0.52;   // UI fully gone / video fully opaque
const VID_START  = 0.40;   // video starts scaling up

// ─── Word ─────────────────────────────────────────────────────────────────────
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

// ─── ScrubbingText ────────────────────────────────────────────────────────────
function ScrubbingText({ text }: { text: string }) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ['start 85%', 'end 50%'],
    });
    const words = text.split(' ');
    return (
        <p
            ref={textRef}
            className="text-[17px] sm:text-[18px] lg:text-[22px] leading-[1.7] text-[#000000] m-0 font-normal flex flex-wrap"
            style={{ fontFamily: 'var(--font-body)' }}
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} word={word} scrollProgress={scrollYProgress} start={start} end={end} />
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
            ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
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

    // Mouse parallax — smooth spring-lerp following cursor
    const rawMouseX = useMotionValue(0);
    const smoothMouseX = useSpring(rawMouseX, { stiffness: 55, damping: 20 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            // Normalise to -1 … +1
            rawMouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [rawMouseX]);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    // ── UI (text + stat cards) fades out ─────────────────────────────────────
    const uiOpacity = useTransform(scrollYProgress, [FADE_START, FADE_END], [1, 0]);

    // ── Video: card at natural size (1) → fills the screen (~6×) ─────────────
    const videoScale = useTransform(scrollYProgress, [VID_START, 1.0], [1, 6]);

    // ── Video: drifts up as it scales so it stays visually centred on screen ──
    const videoTranslateY = useTransform(scrollYProgress, [VID_START, 1.0], ['0vh', '-10vh']);

    // ── Video: subtle mouse-driven X drift ────────────────────────────────────
    const videoTranslateX = useTransform(smoothMouseX, [-1, 1], ['-1.5%', '1.5%']);

    // ── Border radius: card → full-bleed ─────────────────────────────────────
    const videoBorderRadius = useTransform(scrollYProgress, [VID_START, VID_START + 0.25], [14, 0]);

    return (
        // On mobile: normal flow section (no sticky, no 250vh)
        // On desktop: 250vh track with sticky pin
        <section
            ref={trackRef}
            className="relative w-full bg-[#FFFFFF] lg:h-[250vh]"
        >
            {/* lg: sticky + clipped; mobile: relative + auto height */}
            <div className="relative lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">

                {/* ── Layout ── */}
                {/* Mobile: normal flow with padding. Desktop: absolute centered. */}
                <div className="lg:absolute lg:inset-0 flex lg:items-center">
                    <div className="w-full max-w-[1312px] mx-auto px-4 sm:px-5 lg:px-10 py-12 sm:py-16 lg:py-16 flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-16">

                        {/* Left: pill + heading — fades out on desktop only */}
                        <motion.div
                            style={{ opacity: uiOpacity }}
                            className="w-full lg:w-[300px] flex-shrink-0 flex flex-col items-start gap-2 sm:gap-3 lg:gap-5"
                        >
                            <div className="flex items-center px-4 py-[5px] border border-black/20 rounded-full">
                                <span
                                    className="text-[15px] text-[#000000] leading-snug"
                                    style={{ fontFamily: 'var(--font-editorial)' }}
                                >
                                    AfrONet
                                </span>
                            </div>
                            <h2
                                className="text-[32px] sm:text-[36px] lg:text-[50px] leading-[1.05] text-[#000000] m-0 font-normal"
                                style={{ fontFamily: 'var(--font-editorial)' }}
                            >
                                Our<br />motivation
                            </h2>
                        </motion.div>

                        {/* Right: text + bento grid */}
                        <div className="flex-1 flex flex-col gap-3 sm:gap-5 lg:gap-10">
                            <motion.div style={{ opacity: uiOpacity }}>
                                <ScrubbingText text={MOTIVATION_TEXT} />
                            </motion.div>

                            {/* 2-col bento: 3 stat cards + video as 4th item */}
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

                                {/* Video card — mobile: plain card, no animation */}
                                <div className="col-span-2 lg:hidden h-[160px] sm:h-[200px] rounded-[14px] overflow-hidden bg-[#111] relative">
                                    <video
                                        src="/videos/farming-video.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>

                                {/* Video card — desktop: premium scale animation */}
                                <div className="hidden lg:block lg:col-span-1 relative lg:h-[220px]">
                                    <motion.div
                                        style={{ x: videoTranslateX }}
                                        className="absolute inset-0"
                                    >
                                        <motion.div
                                            className="absolute inset-0 overflow-hidden bg-[#111] shadow-xl will-change-transform"
                                            style={{
                                                scale: videoScale,
                                                y: videoTranslateY,
                                                borderRadius: videoBorderRadius,
                                                transformOrigin: '50% 50%',
                                            }}
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
