/**
 * @file Login page — credentials sign-in.
 * Forwards to /puck/home after success.
 */
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid input');
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      ...parsed.data,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    router.push('/puck/home');
  }

  return (
    <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pm-bg)', fontFamily: 'var(--pm-font)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--pm-bg-3)', borderRadius: 16, border: '1px solid var(--pm-border)', padding: '40px 36px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: 36 }}>🏅</span>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--pm-text)', marginTop: 12 }}>Malta Gold CMS</h1>
          <p style={{ fontSize: 14, color: 'var(--pm-text-muted)', marginTop: 6 }}>Sign in to manage your pages</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="email" style={{ fontSize: 13, fontWeight: 600, color: 'var(--pm-text-muted)', letterSpacing: '0.05em' }}>EMAIL</label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              style={{ background: 'var(--pm-bg-2)', border: '1px solid var(--pm-border)', borderRadius: 8, padding: '12px 16px', color: 'var(--pm-text)', fontSize: 15, outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="password" style={{ fontSize: 13, fontWeight: 600, color: 'var(--pm-text-muted)', letterSpacing: '0.05em' }}>PASSWORD</label>
            <input
              id="password" name="password" type="password" required autoComplete="current-password"
              style={{ background: 'var(--pm-bg-2)', border: '1px solid var(--pm-border)', borderRadius: 8, padding: '12px 16px', color: 'var(--pm-text)', fontSize: 15, outline: 'none' }}
            />
          </div>
          {error && (
            <div role="alert" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 8, padding: '14px', background: loading ? 'var(--pm-bg-2)' : 'var(--pm-accent)', color: loading ? 'var(--pm-text-muted)' : 'var(--pm-accent-fg)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
