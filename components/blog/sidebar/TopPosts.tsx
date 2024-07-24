import React from 'react';

import { Separator } from '@/components/ui/separator';

const TopPosts = () => {
  return (
    <div className="mb-4 rounded-md bg-gray-100 p-4 shadow-md dark:bg-[#171717]">
      <h2 className="text-xl font-bold">Top Posts</h2>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <a
          href="/blog/nextjs-tailwindcss"
          className="rounded-md px-3 py-2 font-semibold underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
        >
          maze generation using backgracking
        </a>
        <a
          href="/blog/react-typescript"
          className="rounded-md px-3 py-2 underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
        >
          bfs tree traversal
        </a>
        <a
          href="/blog/nextjs-typescript"
          className="rounded-md px-3 py-2 underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
        >
          dfs tree traversal
        </a>
        <a
          href="/blog/nextjs-typescript"
          className="rounded-md px-3 py-2 underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
        >
          dfs tree traversal
        </a>
        <a
          href="/blog/nextjs-typescript"
          className="rounded-md px-3 py-2 underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
        >
          dfs tree traversal
        </a>
      </div>
    </div>
  );
};

export default TopPosts;
