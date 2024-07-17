'use client';

import React from 'react';

import { Container } from '@/components/Container';
import Experience from '@/components/Experience/Experience';
import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
import Intro from '@/components/portfolio/Intro';
import Projects from '@/components/portfolio/Projects';
import SectionDivider from '@/components/portfolio/Section-divider';
import Skills from '@/components/portfolio/Skills';
import TracingBeam from '@/components/ui/TracingBeam';
import useMediaQuery from '@/hooks/useMediaQuery';

export const Portfolio = () => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  const content = (
    <Container>
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </Container>
  );

  if (isLargeScreen) {
    return <TracingBeam>{content}</TracingBeam>;
  }

  return content;
};
