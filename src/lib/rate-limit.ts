/**
 * @file rate-limit — Edge-compatible sliding-window rate limiter.
 * Zero dependencies. For multi-instance production, swap with @upstash/ratelimit.
 */
import type { NextRequest } from 'next/server';

interface RateLimitOptions {
  limit: number;
  window: '1m' | '5m' | '1h';
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

const windowMs: Record<RateLimitOptions['window'], number> = {
  '1m': 60_000,
  '5m': 300_000,
  '1h': 3_600_000,
};

const store = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(
  req: NextRequest,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const key = `${ip}:${req.nextUrl.pathname}`;
  const now = Date.now();
  const duration = windowMs[options.window];
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + duration });
    return { success: true, remaining: options.limit - 1, resetAt: now + duration };
  }

  if (existing.count >= options.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count++;
  return { success: true, remaining: options.limit - existing.count, resetAt: existing.resetAt };
}
