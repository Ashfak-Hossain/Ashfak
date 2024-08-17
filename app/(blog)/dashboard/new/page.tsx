import React from 'react';

import { getAllTags } from '@/actions/blog/tags.action';
import NewBlog from '@/components/blog/content-writing/new-blog';

const page = async () => {
  const tags = await getAllTags();

  return <NewBlog initialTags={tags} />;
};

export default page;
