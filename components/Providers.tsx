import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/portfolio/Footer';
import Header from '@/components/portfolio/Header';
import IntroBackGround from '@/components/portfolio/IntroBackGround';
import ThemeSwitch from '@/components/portfolio/Theme-switch';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import { ProvidersProps } from '@/types/data';

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <IntroBackGround />
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <Footer />

          <Toaster position="top-right" />
          <ThemeSwitch />
        </ActiveSectionContextProvider>
      </ThemeContextProvider>
    </React.Fragment>
  );
}
