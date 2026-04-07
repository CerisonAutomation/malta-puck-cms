/**
 * @file supabase — Singleton Supabase clients.
 * Browser client for client components, server client for RSC / route handlers.
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Browser-safe Supabase client (anon key). */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/** Server-side Supabase client (service role). Use only in Server Actions / Route Handlers. */
export function createServerClient(): ReturnType<typeof createClient<Database>> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set');
  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
