import React from 'react';

import { Container } from '@/components/Container';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import SectionDivider from '@/components/Section-divider';
import Skills from '@/components/Skills';
import { TracingBeam } from '@/components/ui/tracing-beam';

const page = () => {
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

export default page;
