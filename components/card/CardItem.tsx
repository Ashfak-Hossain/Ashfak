'use client';

import React, { useEffect, useRef } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { useMouseEnter } from '@/hooks/useMouseEnter';
import { cn } from '@/lib/utils';
import { CardItemProps } from '@/types/card';

export const CardItem: React.FC<CardItemProps> = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    const transform =
      isLargeScreen && isMouseEntered
        ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    ref.current.style.transform = transform;
  }, [
    isLargeScreen,
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
