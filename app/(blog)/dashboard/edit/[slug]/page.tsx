import React from 'react';

import { getBlogBySlug } from '@/actions/blog/blog.action';
import EditBlog from '@/components/blog/content-writing/edit-blog';

const page = async ({ params }: { params: { slug: string } }) => {
  const blog = await getBlogBySlug(params.slug);

  if ('error' in blog) {
    return <div>Blog not found</div>;
  }

  const data = {
    slug: blog.slug,
    title: blog.title,
    tags: blog.tags,
    content: blog.content as string,
    coverImage: blog.coverImage,
    coverImageName: blog.coverImageName,
  };

  return <EditBlog blogData={data} />;
};

export default page;
