import React from 'react';
import Link from 'next/link';
import { BellIcon, CommandIcon, SearchIcon } from 'lucide-react';

import Search from '@/components/blog/search/Search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <nav className="z-50 mb-4 flex h-14 w-full items-center justify-between bg-gray-100 px-3 shadow-md dark:bg-[#171717] sm:px-8 md:px-12 lg:px-32">
      <div className="flex gap-4">
        <Link href="/blog" className="flex items-center gap-2 text-nowrap">
          <CommandIcon height={32} width={32} aria-label="Icon" />
          <h2 className="text-lg font-semibold">Ashfak's Note Book</h2>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Search />
        <SearchIcon
          height={30}
          width={30}
          aria-label="Search Icon"
          className="cursor-pointer text-slate-300 md:hidden"
        />
        <BellIcon
          height={30}
          width={30}
          aria-label="Icon"
          className="cursor-pointer"
        />
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
