import React from 'react';

import PopularTopics from '@/components/blog/sidebar/PopularTopics';
import TopPosts from '@/components/blog/sidebar/TopPosts';

const RightSideBar = () => {
  return (
    <section className="min-w-80">
      <TopPosts />
      <PopularTopics />
    </section>
  );
};

export default RightSideBar;
