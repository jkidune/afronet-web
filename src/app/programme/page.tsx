// src/app/programme/page.tsx
import { getAllProgrammes } from '@/lib/wordpress';
import { getFeaturedImageUrl, getFeaturedImageAlt, stripHtml } from '@/types/wordpress';
import ProgrammeCollectionClient from './ProgrammeCollectionClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Programmes — AfrONet',
    description: 'Explore AfrONet programmes driving institutional innovation in organic agriculture across Africa.',
};

export default async function ProgrammePage() {
    const raw = await getAllProgrammes();

    const programmes = raw.map((p) => ({
        title: stripHtml(p.title.rendered),
        excerpt: p.acf?.overview ? p.acf.overview.split('\n')[0].slice(0, 180) + '…' : '',
        category: p.acf?.programme_category || 'Programme',
        timeline: p.acf?.timeline || '',
        image: getFeaturedImageUrl(p),
        alt: getFeaturedImageAlt(p) || stripHtml(p.title.rendered),
        href: `/programme/${p.slug}`,
        slug: p.slug,
    }));

    return <ProgrammeCollectionClient programmes={programmes} />;
}