'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { RegisterForm } from '@/components/auth/register-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface SignUpButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const SignUpButton = ({
  children,
  mode = 'redirect',
  asChild,
}: SignUpButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/register');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
