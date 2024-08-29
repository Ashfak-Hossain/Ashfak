'use client';

import React from 'react';

import { ModalProvider } from '@/components/providers/ModalProviders';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ModeToggle from '@/components/shared/Theme-switch';
import { Toaster } from '@/components/ui/sonner';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ActiveSectionContextProvider>
        {children}
        <Toaster richColors />
        <ModalProvider />
        <ModeToggle />
        <Analytics />
        <SpeedInsights />
      </ActiveSectionContextProvider>
    </ThemeProvider>
  );
}
