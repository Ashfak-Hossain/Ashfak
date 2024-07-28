import React from 'react';
import Link from 'next/link';

import { sidebarLinks } from '@/constants/blog';

const LeftSideBar = () => {
  return (
    <section className="hidden min-h-screen sm:block">
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => (
          <Link
            href={link.href || '/blog'}
            key={link.label}
            className="flex items-center rounded-md px-3 py-2 font-medium underline-offset-4 hover:bg-blue-200 hover:underline dark:hover:bg-blue-500"
          >
            {link.icon && <link.icon size={20} className="mr-2" />}
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
