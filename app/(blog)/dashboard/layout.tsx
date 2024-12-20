import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Footer from '@/components/blog/footer/Footer';
import Navbar from '@/components/blog/navbar/Navbar';
import LeftSideBar from '@/components/blog/sidebar/LeftSideBar';
import { CurrentRole } from '@/lib/auth';

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await CurrentRole();

  if (role !== 'ADMIN') {
    redirect('/blog');
  }

  return (
    <main>
      <Navbar />
      <section className="m-auto flex max-w-[1380px] px-3">
        <LeftSideBar />
        <div className="flex min-h-screen flex-1 flex-col px-4">{children}</div>
      </section>
      <Footer />
    </main>
  );
}
