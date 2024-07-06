import React from 'react';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

const CalSans = localFont({
  src: [{ path: '../fonts/CalSans-SemiBold.woff2' }],
  display: 'swap',
});

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
