// src/app/contact/ContactClient.tsx
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const inputClass = `
  w-full h-[52px] bg-white border border-[#D9D9D9] hover:border-[#05351B]
  focus:border-[#05351B] focus:ring-2 focus:ring-[#05351B]/10
  rounded-[8px] px-4 text-[16px] text-[#111111] placeholder:text-[#999999]
  outline-none transition-all font-normal
`.trim();

const labelClass = 'flex flex-col gap-2 text-[14px] font-medium text-[#111111] uppercase tracking-wider';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactClient() {
    const [form, setForm] = useState({
        name: '', email: '', organisation: '', country: '', subject: '', message: '',
    });
    const [status, setStatus] = useState<Status>('idle');
    const [feedback, setFeedback] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setFeedback('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setFeedback('Your message has been sent. We will get back to you soon.');
                setForm({ name: '', email: '', organisation: '', country: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setFeedback(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setFeedback('Network error. Please check your connection and try again.');
        }
    };

    return (
        <section className="w-full py-16 md:py-24 bg-[#F3EDE4]">
            <div className="w-full max-w-[720px] mx-auto px-6">
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="flex flex-col gap-6"
                >
                    {/* Row 1 — Name + Email */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.label variants={fadeUp} className={`${labelClass} flex-1`}>
                            Full Name *
                            <input
                                type="text" name="name" value={form.name} onChange={handleChange}
                                placeholder="e.g. Amina Yusuf" required className={inputClass}
                            />
                        </motion.label>
                        <motion.label variants={fadeUp} className={`${labelClass} flex-1`}>
                            Email Address *
                            <input
                                type="email" name="email" value={form.email} onChange={handleChange}
                                placeholder="e.g. amina@toam.org" required className={inputClass}
                            />
                        </motion.label>
                    </div>

                    {/* Row 2 — Organisation + Country */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.label variants={fadeUp} className={`${labelClass} flex-1`}>
                            Organisation
                            <input
                                type="text" name="organisation" value={form.organisation} onChange={handleChange}
                                placeholder="e.g. NOGAMU, KOAN..." className={inputClass}
                            />
                        </motion.label>
                        <motion.label variants={fadeUp} className={`${labelClass} flex-1`}>
                            Country
                            <input
                                type="text" name="country" value={form.country} onChange={handleChange}
                                placeholder="e.g. Tanzania" className={inputClass}
                            />
                        </motion.label>
                    </div>

                    {/* Row 3 — Subject */}
                    <motion.label variants={fadeUp} className={labelClass}>
                        Subject *
                        <input
                            type="text" name="subject" value={form.subject} onChange={handleChange}
                            placeholder="e.g. Partnership Inquiry" required className={inputClass}
                        />
                    </motion.label>

                    {/* Row 4 — Message */}
                    <motion.label variants={fadeUp} className={labelClass}>
                        Message *
                        <textarea
                            name="message" value={form.message} onChange={handleChange}
                            placeholder="Tell us how we can help..." required rows={6}
                            className={`${inputClass} h-auto resize-none py-4`}
                        />
                    </motion.label>

                    {/* Feedback */}
                    {feedback && (
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className={`text-[15px] px-4 py-3 rounded-[8px] ${status === 'success'
                                    ? 'bg-[#05351B]/10 text-[#05351B]'
                                    : 'bg-red-50 text-red-700'
                                }`}
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {feedback}
                        </motion.p>
                    )}

                    {/* Submit */}
                    <motion.div variants={fadeUp}>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="inline-flex items-center justify-between bg-[#05351B] disabled:opacity-60 disabled:cursor-not-allowed rounded-full p-1 pl-6 gap-6 hover:bg-[#0B5C30] transition-colors group/btn h-[52px]"
                        >
                            <span className="text-[15px] text-white font-normal whitespace-nowrap" style={{ fontFamily: 'var(--font-display)' }}>
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </span>
                            <div className="w-[44px] h-[44px] bg-[#FFD900] rounded-full flex items-center justify-center text-[#05351B] group-hover/btn:scale-105 transition-transform">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </section>
    );
}
