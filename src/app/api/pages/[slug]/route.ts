/**
 * @file /api/pages/[slug] — Save and fetch Puck page data.
 * GET: Fetch page. PUT: Upsert page (auth required).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createServerClient } from '@/lib/supabase';
import { z } from 'zod';

const SaveSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  puck_data: z.unknown(),
  published: z.boolean().optional(),
});

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const body: unknown = await req.json();
  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.errors[0]?.message }, { status: 400 });
  }

  const supabase = createServerClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('pages')
    .upsert({ slug, ...parsed.data, updated_at: now }, { onConflict: 'slug' })
    .select()
    .single();

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
