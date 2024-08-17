import React from 'react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import Providers from '@/components/providers/Providers';
import { inter } from '@/fonts';

import '@/app/globals.css';

const data = {
  title: 'Ashfak Hossain - Software Engineer',
  description:
    'The personal website of Ashfak Hossain, a software engineer with an insatiable thirst for knowledge and a boundless eagerness to learn!',
  url: '/',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ashfak.me'),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: 'Ashfak Hossain',
    images: [
      {
        url: '/_static/meta-image.png',
        width: 800,
        height: 600,
        alt: 'Ashfak Hossain - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    creator: '@ashfak_hossain',
    images: ['/_static/meta-image.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
