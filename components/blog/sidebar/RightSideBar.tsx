import React from 'react';

import PopularTopics from '@/components/blog/sidebar/PopularTopics';
import TopPosts from '@/components/blog/sidebar/TopPosts';

const RightSideBar = () => {
  return (
    <section className="hidden lg:block lg:max-w-60 xl:max-w-72">
      <TopPosts />
      <PopularTopics />
    </section>
  );
};

export default RightSideBar;
