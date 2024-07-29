'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  const providers: Array<'google' | 'github'> = ['google', 'github'];

  return (
    <div className="flex w-full items-center gap-x-2">
      {providers.map((provider) => (
        <Button
          key={provider}
          className="w-full"
          size="lg"
          onClick={() => onClick(provider)}
          variant="neutral"
        >
          {provider === 'google' ? (
            <FcGoogle className="size-4 text-base font-base text-text dark:text-darkText" />
          ) : (
            <Github className="size-4 text-neutral-800 dark:text-neutral-300" />
          )}
          <span className="ml-2 text-sm text-text dark:text-darkText">
            {provider === 'google' ? 'Google' : 'GitHub'}
          </span>
        </Button>
      ))}
    </div>
  );
};
