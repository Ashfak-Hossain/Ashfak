'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useMouseEnter } from '@/hooks/useMouseEnter';
import { cn } from '@/lib/utils';
import { CardContainerProps } from '@/types/card';

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [, setIsMouseEntered] = useMouseEnter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.20 1'],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      style={{
        perspective: '1000px',
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      ref={ref}
      className={cn('flex items-center justify-center', containerClassName)}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'flex items-center justify-center relative transition-all duration-200 ease-linear',
          className
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
