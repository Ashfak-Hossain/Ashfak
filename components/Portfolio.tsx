import React from 'react';

import About from '@/components/About';
import Contact from '@/components/Contact';
import { Container } from '@/components/Container';
import Experience from '@/components/Experience/Experience';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import SectionDivider from '@/components/Section-divider';
import Skills from '@/components/Skills';

export const Portfolio = () => {
  return (
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
};
