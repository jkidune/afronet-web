'use client';

import { motion } from 'framer-motion';

// ── Icons ────────────────────────────────────────────────────────────────────
function ArrowNE({ size = 13 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function MapPinIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    );
}

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: any = {
    hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.34, 0.14, 0.13, 0.91] } },
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FFFFFF] pt-[120px] pb-24 lg:pt-[160px] lg:pb-[120px] px-6">
            <div className="w-full max-w-[1312px] mx-auto flex flex-col gap-16 lg:gap-20">

                {/* ── Page Header ────────────────────────────────────────────── */}
                <motion.div
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="flex flex-col items-center text-center gap-6 max-w-[720px] mx-auto"
                >
                    {/* Premium Outlined Serif Pill */}
                    <motion.div variants={fadeUp} className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                        <span className="text-[18px] leading-[1.2] text-[#000000]" style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}>
                            Contact us
                        </span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-[40px] md:text-[56px] leading-[1.1] text-[#000000] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                        Connect with our team
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] leading-[1.5] text-[#434343] m-0 font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                        Whether you are looking to partner, need support with organic certification, or just want to learn more, our team in Dar es Salaam is here to help.
                    </motion.p>
                </motion.div>

                {/* ── Main Layout: Split Form & Info ─────────────────────────── */}
                <motion.div
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full"
                >

                    {/* ── Left Column: Contact Form ── */}
                    <motion.div variants={fadeUp} className="w-full lg:w-3/5 flex flex-col">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                            {/* Name Row */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-[15px] text-[#141414] font-medium" style={{ fontFamily: 'var(--font-display)' }}>First Name</label>
                                    <input type="text" placeholder="Jane" className="w-full h-[52px] px-4 bg-[#F5F5F5] border border-transparent focus:border-[#0B8C47] focus:bg-white rounded-[8px] outline-none transition-colors text-[16px] text-[#141414] placeholder:text-[#141414]/40 font-normal" style={{ fontFamily: 'var(--font-display)' }} />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-[15px] text-[#141414] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full h-[52px] px-4 bg-[#F5F5F5] border border-transparent focus:border-[#0B8C47] focus:bg-white rounded-[8px] outline-none transition-colors text-[16px] text-[#141414] placeholder:text-[#141414]/40 font-normal" style={{ fontFamily: 'var(--font-display)' }} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-[15px] text-[#141414] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Email Address</label>
                                <input type="email" placeholder="jane@example.com" className="w-full h-[52px] px-4 bg-[#F5F5F5] border border-transparent focus:border-[#0B8C47] focus:bg-white rounded-[8px] outline-none transition-colors text-[16px] text-[#141414] placeholder:text-[#141414]/40 font-normal" style={{ fontFamily: 'var(--font-display)' }} />
                            </div>

                            {/* Inquiry Type (Radio Buttons) */}
                            <div className="flex flex-col gap-3 w-full mt-2">
                                <label className="text-[15px] text-[#141414] font-medium" style={{ fontFamily: 'var(--font-display)' }}>How can we help?</label>
                                <div className="flex flex-wrap gap-4">
                                    {['Partnership', 'Membership', 'Media/Press', 'General Inquiry'].map((topic, i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                            <div className="w-5 h-5 rounded-full border border-[#141414]/30 group-hover:border-[#0B8C47] flex items-center justify-center transition-colors">
                                                <input type="radio" name="topic" value={topic} className="opacity-0 absolute w-0 h-0 peer" defaultChecked={i === 0} />
                                                <div className="w-3 h-3 rounded-full bg-[#0B8C47] opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[15px] text-[#434343] group-hover:text-[#141414] transition-colors font-normal" style={{ fontFamily: 'var(--font-display)' }}>{topic}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2 w-full mt-2">
                                <label className="text-[15px] text-[#141414] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Message</label>
                                <textarea rows={5} placeholder="Tell us about your project or inquiry..." className="w-full p-4 bg-[#F5F5F5] border border-transparent focus:border-[#0B8C47] focus:bg-white rounded-[8px] outline-none transition-colors text-[16px] text-[#141414] placeholder:text-[#141414]/40 resize-y font-normal" style={{ fontFamily: 'var(--font-display)' }} />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4">
                                <button type="submit" className="inline-flex items-center justify-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/btn h-[44px]">
                                    <span className="font-normal text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                        Send Message
                                    </span>
                                    <div className="w-[36px] h-[36px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/btn:scale-105 transition-transform">
                                        <ArrowNE size={13} />
                                    </div>
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* ── Right Column: Contact Info Cards ── */}
                    <motion.div variants={fadeUp} className="w-full lg:w-2/5 flex flex-col gap-6">

                        {/* Office Card with Interactive Map */}
                        <div className="flex flex-col bg-[#F3EDE4] rounded-[8px] overflow-hidden p-6 lg:p-8">
                            <div className="relative w-full aspect-[2/1] bg-black/5 rounded-[4px] mb-6 overflow-hidden flex items-center justify-center">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.235014476279!2d39.15970397470154!3d-6.741161793255111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f002666ef51%3A0xbe1a169df6cf0242!2sGoba%20simba%20oil.!5e0!3m2!1sen!2stz!4v1776550780386!5m2!1sen!2stz"
                                    className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0 text-[#05351B]">
                                    <MapPinIcon />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[20px] text-[#000000] font-normal m-0" style={{ fontFamily: 'var(--font-editorial)' }}>Visit our office</h3>
                                    <p className="text-[16px] text-[#434343] leading-[1.5] m-0 font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                        African Organic Network<br />
                                        P. O. Box 31168<br />
                                        Dar es Salaam, Tanzania
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email Card */}
                        <a href="mailto:info@afronet.bio" className="flex items-start gap-4 bg-[#F5F5F5] hover:bg-[#F3EDE4] transition-colors rounded-[8px] p-6 lg:p-8 group" style={{ textDecoration: 'none' }}>
                            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0 text-[#05351B] group-hover:scale-110 transition-transform">
                                <EmailIcon />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[20px] text-[#000000] font-normal m-0" style={{ fontFamily: 'var(--font-editorial)' }}>Email us</h3>
                                <p className="text-[16px] text-[#434343] m-0 font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                    info@afronet.bio
                                </p>
                            </div>
                        </a>

                        {/* Phone Card */}
                        <a href="tel:+255712344989" className="flex items-start gap-4 bg-[#F5F5F5] hover:bg-[#F3EDE4] transition-colors rounded-[8px] p-6 lg:p-8 group" style={{ textDecoration: 'none' }}>
                            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0 text-[#05351B] group-hover:scale-110 transition-transform">
                                <PhoneIcon />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[20px] text-[#000000] font-normal m-0" style={{ fontFamily: 'var(--font-editorial)' }}>Call us</h3>
                                <p className="text-[16px] text-[#434343] m-0 font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                    +255 712 344 989
                                </p>
                            </div>
                        </a>

                    </motion.div>

                </motion.div>
            </div>
        </main>
    );
}