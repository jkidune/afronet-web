// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function ArrowNE({ size = 13 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>
    );
}

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const [footerState, setFooterState] = useState({ height: 'auto', isFixed: false });
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState<SubscribeStatus>('idle');
    const [subMessage, setSubMessage] = useState('');

    useEffect(() => {
        const handleResize = () => {
            if (!footerRef.current) return;
            const height = footerRef.current.getBoundingClientRect().height;
            const windowHeight = window.innerHeight;
            setFooterState({ height: `${height}px`, isFixed: height < windowHeight });
        };
        const resizeObserver = new ResizeObserver(handleResize);
        if (footerRef.current) resizeObserver.observe(footerRef.current);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => { resizeObserver.disconnect(); window.removeEventListener('resize', handleResize); };
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;
        setSubStatus('loading');
        setSubMessage('');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'newsletter' }),
            });
            const data = await res.json();
            if (data.success) {
                setSubStatus('success');
                setSubMessage("You're subscribed! Welcome to AfrONet updates.");
                setEmail('');
            } else {
                setSubStatus('error');
                setSubMessage(data.message || 'Could not subscribe. Please try again.');
            }
        } catch {
            setSubStatus('error');
            setSubMessage('Network error. Please try again.');
        }
    };

    return (
        <div
            className="relative w-full"
            style={{
                height: footerState.isFixed ? footerState.height : 'auto',
                clipPath: footerState.isFixed ? "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" : "none"
            }}
        >
            <div ref={footerRef} className={footerState.isFixed ? "fixed bottom-0 left-0 w-full" : "relative w-full"}>
                <footer className="w-full flex flex-col z-10 relative">

                    {/* ── Newsletter ─────────────────────────────────────────────────── */}
                    <div className="relative w-full py-12 md:py-16 bg-[#05351B] flex flex-col items-center justify-center px-6 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D9D9D9]/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-start lg:items-center w-full max-w-[1312px] gap-8">
                            <div className="flex flex-col gap-3 text-left lg:text-center max-w-[720px]">
                                <h2 className="text-[32px] md:text-[36px] text-[#FFFFFF] leading-[1.2] m-0 font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    Sign up for updates
                                </h2>
                                <p className="text-[16px] md:text-[18px] text-[#FFFFFF]/90 leading-[1.6] m-0 font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                    Subscribe to our newsletter to stay up to date with our latest news and projects.
                                </p>
                            </div>

                            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-start gap-4 w-full max-w-[800px]">
                                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address..."
                                        required
                                        disabled={subStatus === 'loading' || subStatus === 'success'}
                                        className="w-full h-[48px] bg-[#F0F2F1]/10 border border-white/20 focus:border-[#FFD900] focus:bg-[#F0F2F1]/20 rounded-full px-6 text-[16px] text-white placeholder:text-white/50 outline-none transition-all font-normal disabled:opacity-50"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={subStatus === 'loading' || subStatus === 'success'}
                                        className="w-full md:w-auto shrink-0 inline-flex items-center justify-between md:justify-center bg-[#FFD900] rounded-full p-1 pl-5 gap-4 hover:bg-[#e5c300] transition-colors group/btn h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <span className="font-normal text-[0.9rem] text-[#05351B] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                            {subStatus === 'loading' ? 'Subscribing...' : subStatus === 'success' ? 'Subscribed ✓' : 'Subscribe'}
                                        </span>
                                        <div className="w-[40px] h-[40px] bg-[#05351B] rounded-full flex items-center justify-center text-[#FFD900] group-hover/btn:scale-105 transition-transform">
                                            <ArrowNE size={13} />
                                        </div>
                                    </button>
                                </div>
                                {subMessage && (
                                    <p className={`text-[14px] w-full ${subStatus === 'success' ? 'text-[#FFD900]' : 'text-red-300'}`} style={{ fontFamily: 'var(--font-display)' }}>
                                        {subMessage}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* ── Main Footer ─────────────────────────────────────────────────── */}
                    <div className="w-full bg-[#F3EDE4] pt-12 md:pt-20 pb-8 px-6 flex flex-col items-center">
                        <div className="w-full max-w-[1312px] flex flex-col gap-12 lg:gap-16">

                            <div className="w-full flex">
                                <span className="text-[16vw] lg:text-[180px] leading-[0.9] tracking-[-0.03em] text-[#05351B] font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
                                    AfrONet
                                </span>
                            </div>

                            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">

                                {/* Contact & Socials */}
                                <div className="flex flex-col gap-8 md:gap-12">
                                    <a href="mailto:info@afronet.bio" className="text-[20px] font-normal text-[#141414] hover:text-[#0B8C47] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                                        info@afronet.bio
                                    </a>
                                    <div className="flex gap-4">
                                        <a href="#" aria-label="Instagram" className="text-[#141414] hover:text-[#0B8C47] transition-colors"><InstagramIcon /></a>
                                        <a href="#" aria-label="LinkedIn" className="text-[#141414] hover:text-[#0B8C47] transition-colors"><LinkedInIcon /></a>
                                    </div>
                                </div>

                                {/* Nav Links */}
                                <div className="flex flex-col gap-[10px]">
                                    {[
                                        { name: 'Home', href: '/' },
                                        { name: 'About', href: '/about' },
                                        { name: 'Programme', href: '/programme' },
                                        { name: 'News', href: '/news' },
                                        { name: 'Contact', href: '/contact' },
                                        { name: 'Support Us', href: '/support-us' },
                                    ].map((link, idx) => (
                                        <Link key={idx} href={link.href} className="flex items-center gap-[8px] group">
                                            <div className="w-[4px] h-[4px] bg-[#141414] rounded-full group-hover:bg-[#0B8C47] transition-colors" />
                                            <span className="text-[16px] text-[#141414] font-normal tracking-[-0.5px] group-hover:text-[#0B8C47] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                                                {link.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Address */}
                                <div className="flex flex-col gap-6 max-w-[260px]">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[14px] font-normal text-[#141414]/60 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Contact Us</span>
                                        <p className="text-[16px] text-[#141414] leading-[1.4] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                            African Organic Network (AfrONet)<br />P. O. Box 31168 Dar es Salaam, Tanzania
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[14px] font-normal text-[#141414]/60 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Phone Number</span>
                                        <p className="text-[16px] text-[#141414] font-normal" style={{ fontFamily: 'var(--font-display)' }}>+255 712 344 989</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex flex-col gap-2 max-w-[240px]">
                                    <span className="text-[14px] font-normal text-[#141414]/60 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Opening Hours</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[15px] text-[#141414] font-normal" style={{ fontFamily: 'var(--font-display)' }}>08:30 AM to 04:00 PM</p>
                                        <p className="text-[15px] text-[#141414] font-normal" style={{ fontFamily: 'var(--font-display)' }}>Monday to Friday</p>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom bar */}
                            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#949494] pt-6 opacity-70">
                                <span className="text-[14px] text-[#141414] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                                    © 2026 AfrONet. All Rights Reserved
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link href="/privacy" className="text-[14px] text-[#141414] font-normal hover:underline" style={{ fontFamily: 'var(--font-display)' }}>Privacy Policy</Link>
                                    <span className="text-[#141414] text-[14px]">|</span>
                                    <Link href="/terms" className="text-[14px] text-[#141414] font-normal hover:underline" style={{ fontFamily: 'var(--font-display)' }}>Terms & Conditions</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
