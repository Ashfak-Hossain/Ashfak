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

const Page = () => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  if (!isLargeScreen) {
    return (
      <React.Fragment>
        <Container>
          <Intro />
          <SectionDivider />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TracingBeam>
        <Container>
          <Intro />
          <SectionDivider />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </Container>
      </TracingBeam>
    </React.Fragment>
  );
};

export default Page;
