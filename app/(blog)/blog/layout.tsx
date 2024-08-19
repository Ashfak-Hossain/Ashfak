import { ReactNode } from 'react';
import { Metadata } from 'next';

import Footer from '@/components/blog/footer/Footer';
import Navbar from '@/components/blog/navbar/Navbar';
import Search from '@/components/blog/search/Search';
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
  children: ReactNode;
}) {
  const user = await CurrentUser();

  return (
    <main>
      <Navbar />
      <div className={cn('m-auto flex max-w-6xl px-3', !user ? 'pt-20' : '')}>
        <section className="flex flex-col flex-1">
          <Search className="mb-6 w-full md:hidden" />
          <div>{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
