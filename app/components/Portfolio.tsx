'use client';

import React from 'react';

import About from '@/app/components/about/About';
import Contact from '@/app/components/contact/Contact';
import Experience from '@/app/components/experience/Experience';
import Intro from '@/app/components/intro/Intro';
import IntroBackGround from '@/app/components/intro/IntroBackGround';
import SectionDivider from '@/app/components/intro/Section-divider';
import NavBar from '@/app/components/navbar/NavBar';
import Projects from '@/app/components/projects/Projects';
import Skills from '@/app/components/skills/Skills';
import Footer from '@/app/components/ui/Footer';
import TracingBeam from '@/app/components/ui/TracingBeam';
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
