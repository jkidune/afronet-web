'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
    {
        name: 'BvAT',
        logo: '/logos/partners logos/BvAT_Logo-removebg-preview.png',
    },
    {
        name: 'IIABA',
        logo: '/logos/partners logos/IIABA_Logo_4_new_new-removebg-preview.png',
    },
    {
        name: 'INOFO',
        logo: '/logos/partners logos/INOFO LOGO.png',
    },
    {
        name: 'AFD France',
        logo: '/logos/partners logos/Logo_France_AFD_HD_RVB_ENG _Final 2.png',
    },
    {
        name: 'SDC',
        logo: '/logos/partners logos/SDC_HD_LogoTransparent 5.png',
    },
    {
        name: 'IFOAM Organics International',
        logo: '/logos/partners logos/ifoam-organics-international-vector-logo.png',
    },
];

export default function Partners() {
    return (
        <section id="partners" className="relative w-full py-12 md:py-16 bg-[#FBFAF3] overflow-hidden">

            {/* Pill & subtitle — centered */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 mb-10 md:mb-14 px-5"
            >
                <div className="flex flex-row justify-center items-center px-[16px] py-[6px] border border-[#000000]/20 rounded-full">
                    <span
                        className="text-[18px] md:text-[20px] leading-[1.2] text-[#000000]"
                        style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'normal', fontWeight: 400 }}
                    >
                        Our Partners
                    </span>
                </div>
                <p
                    className="text-[#777777] text-[18px] leading-[1.4] text-center m-0 max-w-[520px]"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Supported by international organisations driving sustainable agriculture across Africa
                </p>
            </motion.div>

            {/* Ticker strip */}
            <div className="relative w-full overflow-hidden">
                {/* Edge fade — left */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-r from-[#FBFAF3] to-transparent pointer-events-none" />
                {/* Edge fade — right */}
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-l from-[#FBFAF3] to-transparent pointer-events-none" />

                <div className="ticker-track">
                    {/* Duplicate for seamless loop */}
                    {[...partners, ...partners].map((partner, i) => (
                        <div key={i} className="ticker-item">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={180}
                                height={64}
                                className="partner-logo"
                            />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
