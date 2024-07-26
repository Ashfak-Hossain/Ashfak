'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import BottomGradient from '../ui/bottom-gradient';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        className="group/btn relative flex h-10 w-full items-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        size="lg"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="size-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          Google
        </span>
        <BottomGradient />
      </Button>
      <Button
        className=" group/btn relative flex h-10 w-full items-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        size="lg"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <Github className="size-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          GitHub
        </span>
        <BottomGradient />
      </Button>
    </div>
  );
};
