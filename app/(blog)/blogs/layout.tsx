import React from 'react';
import { Metadata } from 'next';

import Footer from '@/components/blog/footer/Footer';
import Navbar from '@/components/blog/navbar/Navbar';
import Search from '@/components/blog/search/Search';
import LeftSideBar from '@/components/blog/sidebar/LeftSideBar';
import RightSideBar from '@/components/blog/sidebar/RightSideBar';
import { CurrentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';

const data = {
  title: 'Ashfak Hossain | Blog',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
  url: '/blog',
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

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await CurrentUser();

  return (
    <main>
      <Navbar />
      <div
        className={cn('m-auto flex max-w-[1380px] px-3', !user ? 'pt-20' : '')}
      >
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:border-l lg:border-none">
          <Search className="mb-6 w-full md:hidden" />
          <div>{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Footer />
    </main>
  );
}
