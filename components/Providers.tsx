import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/portfolio/Footer';
import Header from '@/components/portfolio/Header';
import IntroBackGround from '@/components/portfolio/IntroBackGround';
import ModeToggle from '@/components/portfolio/Theme-switch';
import { ThemeProvider } from '@/components/theme-provider';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { ProvidersProps } from '@/types/data';

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <IntroBackGround />
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <Footer />

          <Toaster position="top-right" />
          <ModeToggle />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
