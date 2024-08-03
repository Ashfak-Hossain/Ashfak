import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-base border-2 border-border/15 px-2.5 py-0.5 text-xs font-base text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-darkBorder/50',
  {
    variants: {
      variant: {
        default: 'bg-main',
        neutral: 'bg-bg dark:bg-darkBg/40 dark:text-darkText',
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
