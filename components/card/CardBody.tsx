'use client';

import React from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { CardBodyProps } from '@/types/portfolio/card';

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  return (
    <div
      className={cn(
        isLargeScreen
          ? '[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]'
          : '',
        'bg-[#f3f4f6] dark:bg-gray-900',
        className
      )}
    >
      {children}
    </div>
  );
};
