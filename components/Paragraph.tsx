import React from 'react';

import { montserrat } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base lg:text-lg font-semibold',
        montserrat.className,
        className
      )}
    >
      {children}
    </p>
  );
};
