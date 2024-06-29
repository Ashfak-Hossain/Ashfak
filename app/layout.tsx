import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashfak Hossain',
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
      <body className={font.className}>{children}</body>
    </html>
  );
}
