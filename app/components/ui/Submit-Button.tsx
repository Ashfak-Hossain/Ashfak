'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-gray-900/65 dark:bg-white/10"
    >
      {pending && (
        <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
      )}
      <Mail
        size={20}
        className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
      />
      Submit
    </Button>
  );
};

export default SubmitButton;
