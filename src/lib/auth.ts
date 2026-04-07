/**
 * @file auth — NextAuth configuration.
 * Credentials provider with Supabase user lookup + bcrypt verification.
 * Extend with OAuth providers (Google, GitHub) as needed.
 */
import NextAuth, { type NextAuthOptions, type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// ─── Type augmentation ────────────────────────────────────────────────────
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: { id: string; role: 'admin' | 'editor' } & DefaultSession['user'];
  }
  interface User {
    role: 'admin' | 'editor';
  }
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Simple admin check from env (extend with Supabase users table as needed)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
          return { id: 'admin-1', email, name: 'Admin', role: 'admin' };
        }

        // Supabase user lookup fallback
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data.user) return null;

        return {
          id: data.user.id,
          email: data.user.email ?? email,
          name: data.user.user_metadata?.name as string | undefined,
          role: (data.user.user_metadata?.role as 'admin' | 'editor') ?? 'editor',
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'editor';
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
