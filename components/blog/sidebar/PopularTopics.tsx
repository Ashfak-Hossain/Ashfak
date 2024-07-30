import React from 'react';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

const PopularTopics = () => {
  return (
    <div className="mb-4 rounded-base border-2 border-border bg-white p-4 text-text shadow-light dark:border-darkBorder dark:bg-gray-600 dark:text-darkText dark:shadow-dark">
      <h2 className="text-xl font-bold">Popular Topics</h2>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <Link
          href="/blog/nextjs-tailwindcss"
          className="rounded-md px-3 py-2 font-semibold underline-offset-4 transition-transform duration-300 hover:scale-105 hover:bg-main hover:underline dark:hover:bg-main dark:hover:text-text"
        >
          #graph
        </Link>
        <Link
          href="/blog/react-typescript"
          className="rounded-md px-3 py-2 font-semibold underline-offset-4 transition-transform duration-300 hover:scale-105 hover:bg-main hover:underline dark:hover:bg-main dark:hover:text-text"
        >
          #dfs
        </Link>
        <Link
          href="/blog/nextjs-typescript"
          className="rounded-md px-3 py-2 font-semibold underline-offset-4 transition-transform duration-300 hover:scale-105 hover:bg-main hover:underline dark:hover:bg-main dark:hover:text-text"
        >
          #daynamicProgramming
        </Link>
      </div>
    </div>
  );
};

export default PopularTopics;
