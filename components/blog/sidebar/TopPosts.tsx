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
    <div className="mb-4 rounded-md bg-gray-100 p-4 shadow-md dark:bg-[#171717]">
      <h2 className="text-xl font-bold">Top Posts</h2>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        {topPosts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            className="my-1 line-clamp-2 rounded-md px-3 py-1 underline-offset-4 hover:underline dark:hover:text-[#A5B4FB]"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
