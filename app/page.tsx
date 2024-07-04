import React from 'react';

import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
// import Experience from '@/components/portfolio/Experience';
import Intro from '@/components/portfolio/Intro';
import Projects from '@/components/portfolio/Projects';
import SectionDivider from '@/components/portfolio/Section-divider';
import Skills from '@/components/portfolio/Skills';
import { TracingBeam } from '@/components/ui/tracing-beam';

const page = () => {
  return (
    <React.Fragment>
      <TracingBeam className="">
        <main className="flex w-full flex-col items-center">
          <Intro />
          <SectionDivider />
          <About />
          <Projects />
          <Skills />
          {/* <Experience /> */}
          <Contact />
        </main>
      </TracingBeam>
    </React.Fragment>
  );
};

export default page;
