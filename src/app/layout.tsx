/**
 * @file RootLayout — App Router root layout.
 * Injects global CSS, metadata, and React Query provider.
 */
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: { default: 'Malta Gold CMS', template: '%s | Malta Gold CMS' },
  description: 'Luxury property management — Malta',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  openGraph: { type: 'website', locale: 'en_MT' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#C8A96A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
