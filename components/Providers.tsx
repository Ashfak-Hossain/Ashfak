'use client';

import React, { useState } from 'react';

import { ThemeProvider } from '@/components/shared/theme-provider';
import ModeToggle from '@/components/shared/Theme-switch';
import { Toaster } from '@/components/ui/toaster';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { ProvidersProps } from '@/types/portfolio/data';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ActiveSectionContextProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
            <ModeToggle />
            <Analytics />
            <SpeedInsights />
          </QueryClientProvider>
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
