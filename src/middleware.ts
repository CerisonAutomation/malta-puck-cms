/**
 * @file middleware — Protects /puck editor routes via NextAuth session.
 * All /puck/* routes require authenticated session.
 */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: ['/puck/:path*', '/api/ai/:path*'],
};
