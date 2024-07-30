'use client';

import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Search = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'rounded-md border-border border-dashed border-2 dark:border-darkBorder bg-bg dark:bg-darkBg',
        className
      )}
    >
      <div className="flex w-full flex-1 items-center gap-1 rounded-xl px-4 py-1">
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
            placeholder="What are you looking for..."
            value=""
            onChange={() => {}}
            className="no-focus w-full border-none bg-bg text-base tracking-wider text-text shadow-none outline-none dark:bg-darkBg"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
