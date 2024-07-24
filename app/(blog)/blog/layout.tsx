import React from 'react';
import { Metadata } from 'next';

import Footer from '@/components/blog/footer/Footer';
import Navbar from '@/components/blog/navbar/Navbar';
import LeftSideBar from '@/components/blog/sidebar/LeftSideBar';
import RightSideBar from '@/components/blog/sidebar/RightSideBar';

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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black">
      <Navbar />
      <div>
        <LeftSideBar />
        <section>
          <div>{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Footer />
    </main>
  );
}
