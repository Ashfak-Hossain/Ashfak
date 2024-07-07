'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { MeteorProps, MeteorStyle } from '@/types/data';

export const Meteors: React.FC<MeteorProps> = ({ number = 20, className }) => {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);

  useEffect(() => {
    const generateRandomStyles = () => {
      const styles: MeteorStyle[] = [];
      for (let i = 0; i < number; i++) {
        styles.push({
          left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
          animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
          animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
        });
      }
      return styles;
    };

    setMeteorStyles(generateRandomStyles());
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={'meteor' + idx}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        ></span>
      ))}
    </>
  );
};
