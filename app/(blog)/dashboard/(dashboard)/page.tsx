import React from 'react';

import { getAllBlogs } from '@/actions/blog/blog.action';

const page = async () => {
  const blogs = await getAllBlogs();

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          Tags:
          {blog.tags.map((tag) => (
            <span key={tag.id}>{tag.label}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
