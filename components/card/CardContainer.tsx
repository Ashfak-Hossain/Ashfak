'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import useMediaQuery from '@/hooks/useMediaQuery';
import { useMouseEnter } from '@/hooks/useMouseEnter';
import { cn } from '@/lib/utils';
import { CardContainerProps } from '@/types/card';

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');
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
        perspective: isLargeScreen ? '1000px' : undefined,
        scale: isLargeScreen ? scaleProgress : undefined,
        opacity: isLargeScreen ? opacityProgress : undefined,
      }}
      ref={ref}
      className={cn('flex items-center justify-center', containerClassName)}
    >
      <div
        ref={containerRef}
        onMouseEnter={isLargeScreen ? handleMouseEnter : undefined}
        onMouseMove={isLargeScreen ? handleMouseMove : undefined}
        onMouseLeave={isLargeScreen ? handleMouseLeave : undefined}
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
