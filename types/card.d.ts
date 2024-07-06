import React from 'react';

export interface CardItemProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContainerProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export interface MouseEnterProviderProps {
  children: React.ReactNode;
}
