import React from 'react';

import PopularTopics from '@/components/blog/sidebar/PopularTopics';
import TopPosts from '@/components/blog/sidebar/TopPosts';

const RightSideBar = () => {
  return (
    <section className="hidden max-w-72 lg:block">
      <TopPosts />
      <PopularTopics />
    </section>
  );
};

export default RightSideBar;
