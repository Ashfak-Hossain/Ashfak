'use client';

import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';

const Search = () => {
  return (
    <div className="hidden w-full max-w-[600px] rounded-md border-[1.5px] border-gray-600 bg-gray-100 dark:bg-black md:block">
      <div className="flex grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/_static/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search..."
          value=""
          onChange={() => {}}
          className="no-focus border-none bg-gray-100 tracking-wider shadow-none outline-none dark:bg-black"
        />
      </div>
    </div>
  );
};

export default Search;
