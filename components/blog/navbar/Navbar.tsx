import React from 'react';
import Link from 'next/link';
import { BellIcon, CommandIcon } from 'lucide-react';

import { LoginButton } from '@/components/auth/login_button';
import { SignUpButton } from '@/components/auth/signup-button';
import UserButton from '@/components/blog/navbar/user-button';
import Search from '@/components/blog/search/Search';
import { Button } from '@/components/ui/button';
import { CurrentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';

const Navbar = async () => {
  const user = await CurrentUser();

  return (
    <nav
      className={cn(
        'z-50 mb-4 flex w-full inset-x-0 top-0 items-center border-b py-2 firefox:bg-opacity-90 border-gray-200 dark:border-gray-900 justify-between bg-white shadow-md dark:bg-[#171717] bg-opacity-30 backdrop-filter backdrop-blur-lg',
        !user ? 'fixed' : ''
      )}
    >
      <div className="m-auto flex w-full max-w-[1380px] px-3">
        <div className="flex flex-1 items-center gap-3">
          <Link href="/blog" className="flex items-center text-nowrap px-3">
            <CommandIcon height={32} width={32} aria-label="Icon" />
            <h2 className="ml-4 text-lg font-semibold">Ashfak's Note Book</h2>
          </Link>
          <Search className="ml-3 hidden w-2/5 md:block" />
        </div>

        <div className="ml-auto flex items-center gap-4">
          {user && (
            <BellIcon
              height={30}
              width={30}
              aria-label="Icon"
              className="cursor-pointer"
            />
          )}

          {user ? (
            <UserButton />
          ) : (
            <>
              <LoginButton asChild>
                <Button className="text-base font-medium">Log in</Button>
              </LoginButton>
              <SignUpButton asChild>
                <Button
                  variant="outline"
                  className="border border-gray-800 text-base font-medium"
                >
                  Create account
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
