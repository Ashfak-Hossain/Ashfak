'use client';

import React, { createContext, useState } from 'react';

import { MouseEnterProviderProps } from '@/types/portfolio/card';

type MouseEnterContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const MouseEnterContext = createContext<
  MouseEnterContextType | undefined
>(undefined);

export const MouseEnterProvider: React.FC<MouseEnterProviderProps> = ({
  children,
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      {children}
    </MouseEnterContext.Provider>
  );
};
