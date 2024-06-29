import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';

import '@/app/globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashfak | Software Engineer',
  description:
    'Personal website of Ashfak Hossain, a software engineer. I write about software engineering, programming, and technology and share my thoughts on various topics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} relative h-[5000px] bg-gray-50 text-gray-950`}
      >
        <div className="absolute -top-24 right-44 -z-10 size-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-[68.75rem]"></div>
        <div className="absolute -top-4 left-[-35rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:-left-60 2xl:-left-20"></div>
        <Header />
        {children}
      </body>
    </html>
  );
}
