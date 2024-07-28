import React from 'react';
import { Metadata } from 'next';

import Footer from '@/components/blog/footer/Footer';
import Navbar from '@/components/blog/navbar/Navbar';
import LeftSideBar from '@/components/blog/sidebar/LeftSideBar';

const data = {
  title: 'Ashfak Hossain | Dashboard',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
  url: '/dashboard',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ashfak.me/blog'),
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F5F5F5] dark:bg-zinc-900">
      <Navbar />
      <div className="m-auto flex max-w-screen-2xl">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col border-l lg:border-none">
          <div>{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
