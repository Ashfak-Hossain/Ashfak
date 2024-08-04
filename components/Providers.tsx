'use client';

import React from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import ModeToggle from '@/components/Theme-switch';
import { Toaster } from '@/components/ui/toaster';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { ProvidersProps } from '@/types/portfolio/data';

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ActiveSectionContextProvider>
          {children}
          <Toaster />
          <ModeToggle />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
