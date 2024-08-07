import React from 'react';

import { getBlogs } from '@/actions/blog/blog.action';

const page = async () => {
  const blogs = await getBlogs();
  console.log(blogs);

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <div className="flex gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md bg-gray-200 px-2 py-1 dark:bg-gray-600"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
