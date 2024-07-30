import React from 'react';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

const TopPosts = () => {
  const topPosts = [
    {
      title:
        'maze generation usinge fke fej fjf kejf kwje fwje fjlor Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit magni dolores consequatur, placeat eveniet dicta rem beatae, suscipit nisi dolor temporibus consequuntur error aut quisquam odit repellendus earum aperiam repellat?',
      link: '/blog/nextjs-tailwindcss',
    },
    {
      title: 'bfs tree traversal',
      link: '/blog/react-typescript',
    },
    {
      title: 'dfs tree traversal',
      link: '/blog/nextjs-typescript',
    },
    {
      title: 'dfs tree traversal',
      link: '/blog/nextjs-typescript',
    },
    {
      title: 'dfs tree traversal',
      link: '/blog/nextjs-typescript',
    },
  ];

  return (
    <div className="mb-4 rounded-base border-2 border-border bg-white p-4 text-text shadow-light dark:border-darkBorder dark:bg-gray-600 dark:text-darkText dark:shadow-dark">
      <h2 className="text-xl font-bold">Top Posts</h2>
      <Separator className="my-3" />
      <div className="flex flex-col gap-2">
        {topPosts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            className="my-1 line-clamp-2 px-2 py-1 font-medium transition-transform duration-300 hover:scale-105 hover:text-main dark:hover:text-mainAccent"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
