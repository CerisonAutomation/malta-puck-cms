/**
 * @file Puck editor route — /puck/[slug]
 * Loads existing page data from Supabase and renders the full Puck editor.
 * Protected by middleware (requires NextAuth session).
 */
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PuckEditorClient from '@/components/PuckEditorClient';
import { createServerClient } from '@/lib/supabase';
import type { PuckData } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

async function getPuckData(slug: string): Promise<PuckData | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('pages')
      .select('puck_data')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return (data?.puck_data as PuckData) ?? null;
  } catch {
    return null;
  }
}

export default async function PuckEditorPage({ params }: PageProps) {
  const { slug } = await params;
  const puckData = await getPuckData(slug);

  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', background: 'var(--pm-bg)', color: 'var(--pm-text-muted)', fontFamily: 'var(--pm-font)' }}>Loading editor…</div>}>
      <PuckEditorClient slug={slug} initialData={puckData} />
    </Suspense>
  );
}
