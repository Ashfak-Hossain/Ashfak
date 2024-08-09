'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { getBlogBySlug } from '@/actions/blog/blog.action';

const SingleBlogPage = () => {
  const params = useParams();
  const [blogData, setBlogData] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const slug = params.slug as string;
      const data = await getBlogBySlug(slug);
      setBlogData(data);
    };

    fetchBlog();
  }, [params.slug]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blogData.title}</h1>
      <Image
        src={blogData.coverImage}
        alt={blogData.title}
        width={800}
        height={400}
      />
    </div>
  );
};

export default SingleBlogPage;
