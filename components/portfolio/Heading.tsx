import React from 'react';

import { CalSans } from '@/fonts';
import { cn } from '@/lib/utils';

export const Heading = ({
  className,
  children,
  as: Tag = 'h1',
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  return (
    <Tag
      className={cn(
        CalSans.className,
        'text-lg md:text-xl lg:text-4xl font-semibold capitalize',
        className
      )}
    >
      {children}
    </Tag>
  );
};
