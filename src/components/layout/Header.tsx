'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'PROGRAMME', href: '/programme' },
    { name: 'ABOUT', href: '/about' },
    { name: 'NEWS & INSIGHTS', href: '/news' },
    { name: 'SUPPORT US', href: '/support-us' },
];

function ArrowNE({ size = 11 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`fixed left-0 right-0 z-50 flex justify-center px-4 md:px-6 transition-all duration-300 ${
                isScrolled ? 'top-3' : 'top-5'
            }`}
        >
            {/* ── Glass pill ─────────────────────────────────────────────── */}
            <div
                className={`w-full max-w-[1084px] h-[58px] rounded-[14px] flex items-center justify-between px-3 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/70 backdrop-blur-xl shadow-md shadow-black/10 border border-white/40'
                        : 'bg-white/45 backdrop-blur-md border border-white/20'
                }`}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="relative z-50 flex items-center shrink-0"
                    aria-label="AfrONet Home"
                    style={{ textDecoration: 'none' }}
                >
                    <Image
                        src="/logos/main logo.svg"
                        alt="AfrONet Logo"
                        width={137}
                        height={58}
                        className="w-[100px] md:w-[124px] h-auto"
                        priority
                    />
                </Link>

                {/* Desktop Nav — hidden class on nav works (no competing component class) */}
                <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            style={{ textDecoration: 'none' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Contact CTA — wrapper div handles responsive show/hide */}
                <div className="hidden lg:flex">
                <Link
                    href="/contact"
                    className="contact-btn group"
                    style={{ textDecoration: 'none' }}
                >
                    <span className="contact-btn-label">Contact Us</span>
                    <span className="contact-btn-icon group-hover:scale-105 group-hover:bg-white/20">
                        <ArrowNE size={11} />
                    </span>
                </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-black/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span
                        className={`block h-[2px] bg-[#1b2124] rounded-full transition-all duration-300 ${
                            isMobileMenuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'
                        }`}
                    />
                    <span
                        className={`block h-[2px] bg-[#1b2124] rounded-full transition-all duration-300 ${
                            isMobileMenuOpen ? 'opacity-0 w-5' : 'w-4'
                        }`}
                    />
                    <span
                        className={`block h-[2px] bg-[#1b2124] rounded-full transition-all duration-300 ${
                            isMobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'
                        }`}
                    />
                </button>
            </div>

            {/* ── Mobile overlay ─────────────────────────────────────────── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 bg-[#0c2b14] flex flex-col pt-28 px-6 pb-10 lg:hidden"
                    >
                        <nav
                            role="navigation"
                            aria-label="Mobile navigation"
                            className="flex flex-col gap-1 flex-1"
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 * i, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="mobile-nav-link group"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span>{link.name}</span>
                                        <ArrowNE size={14} />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28 }}
                        >
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mobile-contact-btn"
                                style={{ textDecoration: 'none' }}
                            >
                                Contact Us
                                <span className="mobile-contact-icon">
                                    <ArrowNE size={13} />
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
