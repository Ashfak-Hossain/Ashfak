'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { CardBodyProps } from '@/types/card';

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        '[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] bg-[#f3f4f6] dark:bg-gray-900',
        className
      )}
    >
      {children}
    </div>
  );
};
