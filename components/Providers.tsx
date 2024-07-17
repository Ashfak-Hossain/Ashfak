'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import IntroBackGround from '@/components/portfolio/IntroBackGround';
import NavBar from '@/components/portfolio/NavBar';
import { ThemeProvider } from '@/components/theme-provider';
import ModeToggle from '@/components/Theme-switch';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { ProvidersProps } from '@/types/portfolio/data';

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <IntroBackGround />
        <ActiveSectionContextProvider>
          <NavBar />
          {children}
          <Footer />
          <Toaster position="top-right" />
          <ModeToggle />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
