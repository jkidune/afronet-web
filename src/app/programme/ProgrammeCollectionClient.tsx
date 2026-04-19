// src/app/programme/ProgrammeCollectionClient.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Programme {
  title: string;
  excerpt: string;
  category: string;
  timeline: string;
  image: string;
  alt: string;
  href: string;
  slug: string;
}

interface Props {
  programmes: Programme[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91], delay: i * 0.11 },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function ArrowNE({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export default function ProgrammeCollectionClient({ programmes }: Props) {
  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full pt-[120px] lg:pt-[160px] pb-24">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center mb-24">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center gap-6 w-full">

          <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-5 py-1.5 border border-[#000000]/20 rounded-full">
            <span className="text-[14px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-display)' }}>Our Programmes</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] text-[#000000] m-0 font-normal tracking-tight max-w-[900px]"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            Driving institutional change across Africa
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] leading-[1.6] text-[#434343] m-0 font-normal max-w-[650px] mt-2 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AfrONet's programmes build the institutional foundations for a thriving organic sector — from policy and markets to certification and capacity.
          </motion.p>

        </motion.div>
      </section>

      {/* ── Programme Cards ───────────────────────────────────────────────── */}
      <section className="w-full max-w-[1312px] mx-auto px-6">
        {programmes.length === 0 ? (
          <div className="text-center py-24 text-[#777] text-[18px]" style={{ fontFamily: 'var(--font-display)' }}>
            No programmes published yet.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full"
          >
            {programmes.map((programme, index) => (
              <motion.div key={programme.slug} custom={index % 2} variants={fadeUp} className="group flex flex-col w-full h-full">
                <Link href={programme.href} className="flex flex-col w-full h-full" style={{ textDecoration: 'none' }}>

                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-6 bg-[#E0E0E0]">
                    <Image
                      src={programme.image}
                      alt={programme.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-[13px] font-medium text-[#05351B]" style={{ fontFamily: 'var(--font-display)' }}>
                        {programme.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 gap-3">
                    {programme.timeline && (
                      <span className="text-[13px] text-[#777777] uppercase tracking-widest font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                        {programme.timeline}
                      </span>
                    )}

                    <h3
                      className="text-[28px] lg:text-[32px] leading-[1.2] text-[#000000] group-hover:text-[#0B8C47] transition-colors font-normal"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {programme.title}
                    </h3>

                    {programme.excerpt && (
                      <p className="text-[16px] leading-[1.6] text-[#434343] line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                        {programme.excerpt}
                      </p>
                    )}

                    <div className="mt-4 inline-flex items-center gap-2 font-medium text-[16px] text-[#05351B] group-hover:text-[#0B8C47] transition-colors">
                      <span style={{ fontFamily: 'var(--font-display)' }}>View programme</span>
                      <ArrowNE size={16} />
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

    </main>
  );
}
