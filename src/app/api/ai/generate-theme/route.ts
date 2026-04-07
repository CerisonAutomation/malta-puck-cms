/**
 * @file /api/ai/generate-theme — AI Theme Creator using Vercel AI SDK.
 * Streams a JSON design token set from OpenAI based on a user prompt.
 * Rate-limited: 10 requests / 1 minute per IP.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const ThemeSchema = z.object({
  name: z.string(),
  description: z.string(),
  tokens: z.object({
    '--pm-bg': z.string(),
    '--pm-bg-2': z.string(),
    '--pm-bg-3': z.string(),
    '--pm-border': z.string(),
    '--pm-accent': z.string(),
    '--pm-accent-fg': z.string(),
    '--pm-text': z.string(),
    '--pm-text-muted': z.string(),
    '--pm-radius': z.string(),
    '--pm-font': z.string(),
  }),
  darkMode: z.boolean(),
  previewGradient: z.string(),
});

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req, { limit: 10, window: '1m' });
  if (!rl.success) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please wait.' }, {
      status: 429,
      headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
    });
  }

  const body = await req.json() as { prompt: string };
  const prompt = typeof body.prompt === 'string' ? body.prompt.slice(0, 500) : '';
  if (!prompt) return NextResponse.json({ success: false, error: 'Prompt required' }, { status: 400 });

  try {
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ThemeSchema,
      prompt: `You are an expert UI/UX designer. Generate a production-quality design token set for a luxury property management website based on this theme: "${prompt}".

Rules:
- All color values must be valid CSS (hex, rgb(), rgba(), hsl())
- --pm-bg, --pm-bg-2, --pm-bg-3 must be progressively lighter (dark themes) or darker (light themes) than each other, but all harmonious
- --pm-accent must be eye-catching and luxurious
- --pm-accent-fg must be legible on --pm-accent (high contrast)
- --pm-text must be legible on --pm-bg
- --pm-text-muted must be softer than --pm-text
- --pm-radius: use 8px-20px
- --pm-font: use system fonts or well-known Google Font stack
- previewGradient: CSS linear-gradient() using the theme colors
`,
    });

    return NextResponse.json({ success: true, data: object });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI generation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
