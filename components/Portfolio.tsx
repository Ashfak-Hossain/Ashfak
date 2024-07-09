'use client';

import React from 'react';

import About from '@/components/About';
import Contact from '@/components/Contact';
import { Container } from '@/components/Container';
import Experience from '@/components/Experience/Experience';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import SectionDivider from '@/components/Section-divider';
import Skills from '@/components/Skills';
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
