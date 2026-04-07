/**
 * @file Public rendered page — /[slug]
 * Renders Puck page data as static HTML using <Render />.
 */
import { notFound } from 'next/navigation';
import { Render } from '@measured/puck';
import config from '@/puck.config';
import { createServerClient } from '@/lib/supabase';
import type { PuckData } from '@/types';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR — revalidate every 60s

async function getPage(slug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.title,
    description: page.description ?? undefined,
  };
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <Render
      config={config}
      data={page.puck_data as PuckData}
    />
  );
}
