// src/app/programme/[slug]/ProgrammeClient.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProgrammeData {
  title: string;
  category: string;
  timeline: string;
  pilotCountries: string;
  partners: string;
  budget: string;
  heroImage: string;
  heroAlt: string;
  overview: string[];
  objectives: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
}

// ── Stat background colors (cycling) ─────────────────────────────────────────
const statStyles = [
  { bg: 'bg-[#05351B]', valueColor: 'text-[#FFD900]', labelColor: 'text-white/70' },
  { bg: 'bg-[#F3EDE4]', valueColor: 'text-[#05351B]', labelColor: 'text-[#434343]' },
  { bg: 'bg-[#F5F5F5]', valueColor: 'text-[#000000]', labelColor: 'text-[#434343]' },
];

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
function ArrowLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProgrammeClient({ data }: { data: ProgrammeData }) {
  return (
    <main className="min-h-screen bg-[#FFFFFF] pt-[100px] lg:pt-[140px] pb-24">

      {/* ── 1. Header & Hero Image ────────────────────────────────────────── */}
      <section className="w-full max-w-[1312px] mx-auto px-6 flex flex-col gap-8">

        {/* Back + Category */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex items-center justify-between w-full">
          <Link href="/programme" className="flex items-center gap-3 text-[#434343] hover:text-[#05351B] transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#F5F5F5] group-hover:bg-[#F3EDE4] flex items-center justify-center transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[16px] font-medium uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Back to Programmes</span>
          </Link>
          <div className="px-4 py-1.5 border border-[#000000]/20 rounded-full">
            <span className="text-[14px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-display)' }}>{data.category}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] text-[#000000] font-normal max-w-[1000px]"
          style={{ fontFamily: 'var(--font-editorial)' }}
        >
          {data.title}
        </motion.h1>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[50vh] lg:h-[70vh] rounded-[16px] overflow-hidden mt-4"
        >
          <Image src={data.heroImage} alt={data.heroAlt} fill className="object-cover" priority />
        </motion.div>

        {/* Quick Facts Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row w-full border-b border-[#000000]/10 pb-8 mt-4 gap-8 md:gap-0"
        >
          {data.timeline && (
            <div className="flex-1 flex flex-col gap-2 border-l-2 border-[#05351B] pl-4">
              <span className="text-[13px] uppercase tracking-widest text-[#434343] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Timeline</span>
              <span className="text-[18px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>{data.timeline}</span>
            </div>
          )}
          {data.pilotCountries && (
            <div className="flex-1 flex flex-col gap-2 md:border-l border-[#000000]/10 md:pl-8">
              <span className="text-[13px] uppercase tracking-widest text-[#434343] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Pilot Countries</span>
              <span className="text-[18px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>{data.pilotCountries}</span>
            </div>
          )}
          {data.partners && (
            <div className="flex-1 flex flex-col gap-2 md:border-l border-[#000000]/10 md:pl-8">
              <span className="text-[13px] uppercase tracking-widest text-[#434343] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Key Partners</span>
              <span className="text-[18px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>{data.partners}</span>
            </div>
          )}
        </motion.div>

      </section>

      {/* ── 2. Overview ───────────────────────────────────────────────────── */}
      {data.overview.length > 0 && (
        <section className="w-full max-w-[1312px] mx-auto px-6 mt-20 lg:mt-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left sticky label */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-[120px] flex flex-col gap-6">
                <h2 className="text-[32px] md:text-[40px] text-[#000000] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                  Project Overview
                </h2>
                <div className="w-12 h-[1px] bg-[#05351B]" />
              </div>
            </div>
            {/* Right content */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              {data.overview.map((paragraph, idx) => (
                <p key={idx} className="text-[18px] md:text-[22px] leading-[1.6] text-[#434343] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Objectives & Stats Bento ───────────────────────────────────── */}
      {(data.objectives.length > 0 || data.stats.length > 0) && (
        <section className="w-full max-w-[1312px] mx-auto px-6 mt-24 lg:mt-32 flex flex-col gap-12">
          <h2 className="text-[32px] md:text-[40px] text-[#000000] m-0 font-normal text-center" style={{ fontFamily: 'var(--font-editorial)' }}>
            Impact &amp; Objectives
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

            {/* Objectives */}
            {data.objectives.length > 0 && (
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-4">
                {data.objectives.map((obj, i) => (
                  <div key={i} className="flex flex-col gap-3 p-8 bg-[#F5F5F5] rounded-[12px]">
                    <span className="text-[14px] text-[#05351B] font-medium uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
                      Objective 0{i + 1}
                    </span>
                    <h3 className="text-[24px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                      {obj.title}
                    </h3>
                    <p className="text-[16px] text-[#434343] leading-[1.5]" style={{ fontFamily: 'var(--font-display)' }}>
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Bento */}
            {data.stats.length > 0 && (
              <div className="col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {data.stats.map((stat, i) => {
                  const style = statStyles[i % statStyles.length];
                  return (
                    <div key={i} className={`flex flex-col justify-center items-center text-center p-8 rounded-[12px] min-h-[180px] ${style.bg}`}>
                      <span className={`text-[64px] md:text-[80px] leading-none font-normal ${style.valueColor}`} style={{ fontFamily: 'var(--font-editorial)' }}>
                        {stat.value}
                      </span>
                      <span className={`text-[14px] mt-4 uppercase tracking-widest font-medium ${style.labelColor}`} style={{ fontFamily: 'var(--font-display)' }}>
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </section>
      )}

    </main>
  );
}
