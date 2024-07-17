'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/theme-provider';
import ModeToggle from '@/components/Theme-switch';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { ProvidersProps } from '@/types/portfolio/data';

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ActiveSectionContextProvider>
          {children}
          <Toaster position="top-right" />
          <ModeToggle />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
