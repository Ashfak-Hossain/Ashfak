import React from 'react';
import { Ban } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-darkBg p-3 text-sm text-destructive">
      <Ban className="size-4" />
      <p>{message}</p>
    </div>
  );
};
