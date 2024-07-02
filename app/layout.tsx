import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/components/Providers';

import '@/app/globals.css';

const font = Inter({ subsets: ['latin'] });

const data = {
  title: 'Ashfak Hossain - Software Engineer',
  description:
    'Personal website of Ashfak Hossain, a software engineer. I write about software engineering, programming, and technology and share my thoughts on various topics.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
