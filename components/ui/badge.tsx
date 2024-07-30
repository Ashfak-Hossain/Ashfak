import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-base border-2 border-border px-2.5 py-0.5 text-xs font-base text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-darkBorder',
  {
    variants: {
      variant: {
        default: 'bg-main',
        neutral: 'bg-white dark:bg-darkBg dark:text-darkText',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
