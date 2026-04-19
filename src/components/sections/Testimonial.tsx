// src/components/sections/Testimonial.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  image: string;
  alt: string;
  theme: 'dark' | 'yellow' | 'light';
}

interface Props {
  testimonials: TestimonialItem[];
}

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] as [number, number, number, number] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Testimonial({ testimonials }: Props) {
  return (
    <section id="testimonials" className="relative w-full py-16 md:py-24 lg:py-[120px] bg-[#FFFFFF] overflow-hidden">

      {/* Header */}
      <div className="w-full max-w-[1312px] mx-auto px-6 flex flex-col relative z-10 mb-10 lg:mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-start w-full gap-6"
        >
          <div className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
            <span className="text-[18px] leading-[1.2] text-[#000000]" style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}>
              Testimonial
            </span>
          </div>
          <h2 className="text-[#000000] text-[32px] md:text-[44px] leading-[1.1] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
            What our partners say
          </h2>
        </motion.div>
      </div>

      {/* Carousel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:pl-[calc((100vw-1312px)/2+24px)] md:pr-[calc((100vw-1312px)/2+24px)] pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {testimonials.map((test, index) => {
          const isDark   = test.theme === 'dark';
          const isYellow = test.theme === 'yellow';

          const bgClass        = isDark ? 'bg-[#05351B]' : isYellow ? 'bg-[#FFD900]' : 'bg-[#F3EDE4]';
          const textClass      = isDark ? 'text-[#FFFFFF]' : 'text-[#000000]';
          const nameClass      = isDark ? 'text-[#FFD900]' : 'text-[#05351B]';
          const quoteMarkColor = isDark ? 'text-[#FFD900]' : 'text-[#05351B]';
          const titleClass     = isDark ? 'text-[#FFFFFF]/70' : 'text-[#000000]/70';

          return (
            <motion.div
              key={index}
              variants={fadeUp}
              className={`flex-shrink-0 w-[85vw] md:w-[480px] lg:w-[520px] snap-center md:snap-start flex flex-col justify-between p-6 md:p-8 rounded-[8px] ${bgClass}`}
            >
              <div className="flex flex-col gap-4 mb-10">
                <div className={`mt-2 ${quoteMarkColor} opacity-50`}>
                  <Quote size={40} fill="currentColor" stroke="none" />
                </div>
                <p className={`text-[16px] md:text-[18px] leading-[1.5] m-0 ${textClass}`} style={{ fontFamily: 'var(--font-display)' }}>
                  {test.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={test.image} alt={test.alt} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[16px] font-medium ${nameClass}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {test.name}
                  </span>
                  <span className={`text-[14px] ${titleClass}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {test.title}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-1 md:w-6" />
      </motion.div>

    </section>
  );
}
