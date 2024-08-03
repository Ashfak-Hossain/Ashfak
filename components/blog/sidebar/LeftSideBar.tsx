import React from 'react';
import Link from 'next/link';

import { sidebarLinks } from '@/constants/blog';
import { CurrentRole } from '@/lib/auth';

const LeftSideBar = async () => {
  const role = await CurrentRole();

  return (
    <section className="hidden min-h-screen sm:block">
      <div className="flex flex-col gap-4">
        {sidebarLinks.map((link) =>
          role === 'ADMIN' || !link.href?.startsWith('/dashboard') ? (
            <Link
              key={link.label}
              href={link.href}
              className="flex w-full items-center rounded-md p-3 text-base font-semibold text-text transition-transform duration-300 hover:scale-105 hover:bg-main dark:text-darkText dark:hover:text-text"
            >
              {link.icon && <link.icon size={20} className="mr-2" />}
              {link.label}
            </Link>
          ) : null
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;
