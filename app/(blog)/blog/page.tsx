import React from 'react';
import { Metadata } from 'next';

import BlogCard from '@/components/blog/cards/BlogCard';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | Blog',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
};

const BlogPage = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <BlogCard />
        <Separator className="my-2" />
        <BlogCard />
        <Separator className="my-2" />
        <BlogCard />
      </div>
    </>
  );
};

export default BlogPage;
