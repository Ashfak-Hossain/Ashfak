'use client';

import React from 'react';

import About from '@/components/portfolio/About/About';
import Contact from '@/components/portfolio/Contact/Contact';
import Experience from '@/components/portfolio/Experience/Experience';
import Intro from '@/components/portfolio/Intro/Intro';
import IntroBackGround from '@/components/portfolio/Intro/IntroBackGround';
import SectionDivider from '@/components/portfolio/Intro/Section-divider';
import NavBar from '@/components/portfolio/Navbar/NavBar';
import Projects from '@/components/portfolio/Projects/Projects';
import Footer from '@/components/portfolio/Shared/Footer';
import Skills from '@/components/portfolio/Skills/Skills';
import TracingBeam from '@/components/ui/TracingBeam';
import useMediaQuery from '@/hooks/useMediaQuery';

export const Portfolio = () => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  const content = (
    <section className="mx-auto w-full max-w-5xl px-4 md:px-10">
      <IntroBackGround />
      <NavBar />
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </section>
  );

  if (isLargeScreen) {
    return <TracingBeam>{content}</TracingBeam>;
  }

  return content;
};
