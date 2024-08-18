import React from 'react';
import { Metadata } from 'next';

import { getAllBlogs } from '@/actions/blog/blog.action';
import BlogCard from '@/components/blog/cards/BlogCard';
import Filters from '@/components/blog/shared/Filters';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | Blog',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
};

const BlogPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <>
      <Filters />
      <div className="flex w-full flex-col gap-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <>
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                content={blog.content}
                tags={blog.tags}
                reactions={blog.likes}
                views={blog.views}
                // comments={blog.comments}
                coverImage={blog.coverImage}
                createdAt={blog.createdAt}
              />
              <Separator className="last:hidden dark:my-2" />
            </>
          ))
        ) : (
          <p className="text-center text-lg font-bold">No blogs found</p>
        )}
      </div>
    </>
  );
};

export default BlogPage;
