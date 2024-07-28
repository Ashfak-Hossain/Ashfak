'use client';

import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Search = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'rounded-md border-[1.5px] border-gray-600 bg-gray-100 dark:bg-black',
        className
      )}
    >
      <div className="flex w-full flex-1 items-center gap-1 rounded-xl px-4">
        <Image
          src="/_static/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <div className="grow">
          <Input
            type="text"
            placeholder="Search..."
            value=""
            onChange={() => {}}
            disableAnimation={true}
            className="no-focus w-full bg-gray-100 tracking-wider shadow-none outline-none dark:bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
