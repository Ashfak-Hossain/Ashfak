import React from 'react';
import Link from 'next/link';

import { sidebarLinks } from '@/constants/blog';

const LeftSideBar = () => {
  return (
    <section className="mx-2 hidden min-h-screen sm:block">
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => (
          <Link
            href={link.href || '/blog'}
            key={link.label}
            className="rounded-md px-3 py-2 font-medium underline-offset-4 hover:bg-[#BBE1FA] hover:underline dark:hover:bg-[#242360]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
