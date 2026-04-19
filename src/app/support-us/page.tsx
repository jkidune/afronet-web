'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Landmark, Smartphone, Handshake, Info } from 'lucide-react';

// ── Shared Animation Variants ────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(3px)' },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }
    })
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function SupportUsPage() {
    return (
        <main className="min-h-screen bg-[#FFFFFF] w-full flex flex-col">

            {/* ── 1. Immersive Hero Section ─────────────────────────────────── */}
            <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center px-6">
                
                {/* Background Image */}
                <Image
                    src="/images/donation.jpg"
                    alt="Supporting farmers and agroecology in Africa"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none" />

                {/* Hero Content */}
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer} 
                    className="relative z-10 w-full max-w-[900px] flex flex-col items-center text-center gap-6"
                >
                    <motion.div variants={fadeUp} className="px-5 py-2 border border-white/30 rounded-full bg-white/5 backdrop-blur-md">
                        <span className="text-[18px] text-white font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                            Support Us
                        </span>
                    </motion.div>

                    <motion.h1 
                        variants={fadeUp}
                        className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] text-[#FFFFFF] font-normal"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                        Donate to AfrONet
                    </motion.h1>

                    <motion.p 
                        variants={fadeUp}
                        className="text-[20px] md:text-[24px] leading-[1.5] text-white/90 font-normal max-w-[700px]"
                        style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}
                    >
                        Help scale organic & agroecology across Africa
                    </motion.p>
                </motion.div>
            </section>

            {/* ── 2. Why Your Support Matters (Pillars Grid) ───────────────── */}
            <section className="w-full bg-[#FFFAED] py-24 lg:py-[140px] px-6">
                <div className="w-full max-w-[1312px] mx-auto flex flex-col gap-16 lg:gap-24">
                    
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10">
                        <div className="flex flex-col gap-4 lg:max-w-[600px]">
                            <h2 className="text-[40px] md:text-[56px] leading-[1.1] text-[#000000] font-normal m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                                Why Your Support Matters
                            </h2>
                        </div>
                        <p className="text-[20px] md:text-[22px] leading-[1.6] text-[#434343] m-0 lg:max-w-[500px]" style={{ fontFamily: 'var(--font-display)' }}>
                            Your gift strengthens Africa’s organic ecosystem so farmers, NOAMs, policymakers, researchers, and market actors can put proven practices to work.
                        </p>
                    </div>

                    {/* Pillars Grid */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
                    >
                        {/* 1. Capacity */}
                        <motion.div variants={fadeUp} custom={0} className="bg-white p-8 lg:p-12 rounded-[16px] shadow-sm border border-black/5 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E5F3EC] flex items-center justify-center text-[#05351B] mb-2">
                                <span className="font-bold text-[18px]">01</span>
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>Capacity & Networks</h3>
                            <p className="text-[18px] text-[#434343] leading-[1.6]" style={{ fontFamily: 'var(--font-display)' }}>
                                Strengthen NOAMs and farmer organizations with governance support, training of trainers, and peer learning.
                            </p>
                        </motion.div>

                        {/* 2. Standards */}
                        <motion.div variants={fadeUp} custom={1} className="bg-white p-8 lg:p-12 rounded-[16px] shadow-sm border border-black/5 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E5F3EC] flex items-center justify-center text-[#05351B] mb-2">
                                <span className="font-bold text-[18px]">02</span>
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>Standards & Policy</h3>
                            <p className="text-[18px] text-[#434343] leading-[1.6]" style={{ fontFamily: 'var(--font-display)' }}>
                                Develop and roll out practical guidance aligned with EAOPS and national standards.
                            </p>
                        </motion.div>

                        {/* 3. Knowledge */}
                        <motion.div variants={fadeUp} custom={2} className="bg-white p-8 lg:p-12 rounded-[16px] shadow-sm border border-black/5 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E5F3EC] flex items-center justify-center text-[#05351B] mb-2">
                                <span className="font-bold text-[18px]">03</span>
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>Knowledge & Resources</h3>
                            <p className="text-[18px] text-[#434343] leading-[1.6]" style={{ fontFamily: 'var(--font-display)' }}>
                                Create toolkits, briefings, and multilingual training materials for real-world use.
                            </p>
                        </motion.div>

                        {/* 4. Markets */}
                        <motion.div variants={fadeUp} custom={3} className="bg-white p-8 lg:p-12 rounded-[16px] shadow-sm border border-black/5 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E5F3EC] flex items-center justify-center text-[#05351B] mb-2">
                                <span className="font-bold text-[18px]">04</span>
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>Markets & Partnerships</h3>
                            <p className="text-[18px] text-[#434343] leading-[1.6]" style={{ fontFamily: 'var(--font-display)' }}>
                                Build fair, traceable value chains that reward organic producers on a continental scale.
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* ── 3. Ways to Give (Cards) ───────────────────────────────────── */}
            <section className="w-full bg-[#F5F5F5] py-24 lg:py-[140px] px-6">
                <div className="w-full max-w-[1312px] mx-auto flex flex-col items-center gap-16">
                    
                    <div className="text-center flex flex-col gap-4">
                        <h2 className="text-[40px] md:text-[56px] leading-[1.1] text-[#000000] font-normal m-0" style={{ fontFamily: 'var(--font-editorial)' }}>
                            Ways to Give
                        </h2>
                        <p className="text-[18px] text-[#434343] max-w-[600px] mx-auto" style={{ fontFamily: 'var(--font-display)' }}>
                            We offer secure and transparent ways to transfer funds. All donations go directly towards executing our core programs across Africa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
                        
                        {/* Option 1: Mobile Money */}
                        <div className="bg-[#FFFFFF] rounded-[24px] p-8 lg:p-10 border border-[#000000]/10 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-full bg-[#FFD900]/20 flex items-center justify-center text-[#05351B]">
                                <Smartphone size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal leading-[1.2]" style={{ fontFamily: 'var(--font-editorial)' }}>Mobile Money</h3>
                            
                            <div className="flex flex-col gap-4 text-[#434343]" style={{ fontFamily: 'var(--font-display)' }}>
                                <p className="text-[16px] font-medium text-[#111111]">M-Pesa / Airtel Money / Tigo Pesa:</p>
                                
                                <div className="flex items-start gap-3 bg-[#F5F5F5] p-4 rounded-lg border border-black/5">
                                    <div className="w-5 h-5 mt-0.5 text-[#777] shrink-0"><Info size={18} /></div>
                                    <p className="text-[15px] leading-[1.5]">
                                        <strong>[Paybill / Business no.]</strong><br/>
                                        Account/Ref: <strong>Donation</strong>
                                    </p>
                                </div>
                                <p className="text-[14px] text-[#777] italic mt-2">
                                    If using mobile money, email <strong>donations@afronet.africa</strong> with your name and amount for a receipt.
                                </p>
                            </div>
                        </div>

                        {/* Option 2: Bank Transfer */}
                        <div className="bg-[#05351B] rounded-[24px] p-8 lg:p-10 border border-[#05351B] flex flex-col gap-6 shadow-lg transform lg:-translate-y-4">
                            <div className="w-14 h-14 rounded-full bg-[#FFFFFF]/10 border border-white/20 flex items-center justify-center text-[#FFD900]">
                                <Landmark size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[28px] text-[#FFFFFF] font-normal leading-[1.2]" style={{ fontFamily: 'var(--font-editorial)' }}>Bank Transfer</h3>
                            
                            <div className="flex flex-col gap-3 text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                                <div className="flex flex-col border-b border-white/10 pb-3">
                                    <span className="text-[13px] uppercase tracking-wider text-white/50">Account Name</span>
                                    <span className="text-[16px] text-white">[African Organic Network]</span>
                                </div>
                                <div className="flex flex-col border-b border-white/10 pb-3">
                                    <span className="text-[13px] uppercase tracking-wider text-white/50">Bank & Branch</span>
                                    <span className="text-[16px] text-white">[Bank name] • [City]</span>
                                </div>
                                <div className="flex flex-col border-b border-white/10 pb-3">
                                    <span className="text-[13px] uppercase tracking-wider text-white/50">Account / IBAN</span>
                                    <span className="text-[16px] text-white">[IBAN or Account Number]</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] uppercase tracking-wider text-white/50">SWIFT/BIC</span>
                                        <span className="text-[16px] text-white">[Code]</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[13px] uppercase tracking-wider text-white/50">Currency</span>
                                        <span className="text-[16px] text-white">[USD/EUR/TZS]</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Option 3: Corporate Partnerships */}
                        <div className="bg-[#FFFFFF] rounded-[24px] p-8 lg:p-10 border border-[#000000]/10 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#05351B]">
                                <Handshake size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[28px] text-[#000000] font-normal leading-[1.2]" style={{ fontFamily: 'var(--font-editorial)' }}>Institutional & Corporate</h3>
                            
                            <p className="text-[16px] text-[#434343] leading-[1.6]" style={{ fontFamily: 'var(--font-display)' }}>
                                Co-fund programs, sponsor continental convenings (e.g., the African Organic Conference), or support resource development and translation.
                            </p>

                            <div className="mt-auto pt-6">
                                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#FFD900] text-[#111111] font-medium hover:bg-[#E6C300] transition-colors w-full text-center" style={{ fontFamily: 'var(--font-display)' }}>
                                    Start a Partnership
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Notice Line */}
                    <div className="bg-[#FFFFFF] border border-[#FFD900] px-6 py-4 rounded-full flex items-center justify-center text-center shadow-sm -mt-4 z-10 w-full max-w-[800px] mx-auto">
                        <span className="text-[16px] font-medium text-[#111111]" style={{ fontFamily: 'var(--font-display)' }}>
                            ⭐ Important: Please include <strong>“Donation”</strong> in the payment reference for all transfers.
                        </span>
                    </div>

                </div>
            </section>

        </main>
    );
}
