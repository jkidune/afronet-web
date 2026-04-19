// src/app/programme/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProgrammeBySlug } from '@/lib/wordpress';
import { getFeaturedImageUrl, getFeaturedImageAlt, stripHtml } from '@/types/wordpress';
import ProgrammeClient from './ProgrammeClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);
  if (!programme) return { title: 'Not Found — AfrONet' };

  const description = programme.acf?.overview
    ? programme.acf.overview.slice(0, 160)
    : `${stripHtml(programme.title.rendered)} — AfrONet Programme`;

  return {
    title: `${stripHtml(programme.title.rendered)} — AfrONet`,
    description,
    openGraph: {
      title: stripHtml(programme.title.rendered),
      description,
      images: [{ url: getFeaturedImageUrl(programme) }],
    },
  };
}

export default async function ProgrammeSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);
  if (!programme) notFound();

  const acf = programme.acf || {};

  // Shape flat ACF fields into structured data for the UI
  const data = {
    title:         stripHtml(programme.title.rendered),
    category:      acf.programme_category || 'Programme',
    timeline:      acf.timeline || '',
    pilotCountries: acf.pilot_countries || '',
    partners:      acf.key_partners || '',
    budget:        acf.budget || '',
    heroImage:     getFeaturedImageUrl(programme),
    heroAlt:       getFeaturedImageAlt(programme) || stripHtml(programme.title.rendered),
    // Overview: split on newlines so paragraphs render separately
    overview: acf.overview
      ? acf.overview.split('\n').map((p: string) => p.trim()).filter(Boolean)
      : [],
    // Objectives: built from flat fields, empty ones filtered out
    objectives: [
      { title: acf.objective_1_title || '', desc: acf.objective_1_desc || '' },
      { title: acf.objective_2_title || '', desc: acf.objective_2_desc || '' },
      { title: acf.objective_3_title || '', desc: acf.objective_3_desc || '' },
    ].filter((o) => o.title),
    // Stats: built from flat fields, empty ones filtered out
    stats: [
      { label: acf.stat_1_label || '', value: acf.stat_1_value || '' },
      { label: acf.stat_2_label || '', value: acf.stat_2_value || '' },
      { label: acf.stat_3_label || '', value: acf.stat_3_value || '' },
    ].filter((s) => s.label && s.value),
  };

  return <ProgrammeClient data={data} />;
}
