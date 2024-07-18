import React from 'react';
import { Metadata } from 'next';

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
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
