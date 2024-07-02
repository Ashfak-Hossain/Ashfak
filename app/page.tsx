import React from 'react';

import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
import Experience from '@/components/portfolio/Experience';
import Intro from '@/components/portfolio/Intro';
import Projects from '@/components/portfolio/Projects';
import SectionDivider from '@/components/portfolio/Section-divider';
import Skills from '@/components/portfolio/Skills';
import { TracingBeam } from '@/components/ui/tracing-beam';

const page = () => {
  return (
    <TracingBeam className="p-6">
      <main className="flex flex-col items-center px-4">
        <Intro />
        <SectionDivider />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </TracingBeam>
  );
};

export default page;
