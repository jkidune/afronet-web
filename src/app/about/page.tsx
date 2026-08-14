import AboutHero from '@/components/sections/about/AboutHero';
import AboutMotivation from '@/components/sections/about/AboutMotivation';
import AboutMission from '@/components/sections/about/AboutMission';
import AboutValues from '@/components/sections/about/AboutValues';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FFFFFF]">
            {/* 1. Hero */}
            <AboutHero />

            {/* 2. Motivation — pin + scrub + scale */}
            <AboutMotivation />

            {/* 3. Mission */}
            <AboutMission />

            {/* 4. Values */}
            <AboutValues />

            {/* Future sections */}
            {/* <AboutTeam /> */}
        </main>
    );
}