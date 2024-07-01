'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-gray-900/65 dark:bg-white/10"
    >
      {pending && (
        <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
      )}
      Submit
      <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
    </button>
  );
};

export default SubmitButton;
