'use client';

import * as React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disableAnimation?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disableAnimation, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + 'px' : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={disableAnimation ? undefined : handleMouseMove}
        onMouseEnter={disableAnimation ? undefined : () => setVisible(true)}
        onMouseLeave={disableAnimation ? undefined : () => setVisible(false)}
        className={cn(
          'group/input rounded-lg p-[2px] transition duration-300',
          disableAnimation && 'no-animation'
        )}
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none transition duration-400`,
            !disableAnimation &&
              'dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]',
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
