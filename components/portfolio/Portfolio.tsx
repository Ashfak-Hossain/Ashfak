'use client';

import React from 'react';

import About from '@/components/portfolio/about/About';
import Contact from '@/components/portfolio/contact/Contact';
import Experience from '@/components/portfolio/experience/Experience';
import Intro from '@/components/portfolio/intro/Intro';
import IntroBackGround from '@/components/portfolio/intro/IntroBackGround';
import SectionDivider from '@/components/portfolio/intro/Section-divider';
import NavBar from '@/components/portfolio/navbar/NavBar';
import Projects from '@/components/portfolio/projects/Projects';
import Skills from '@/components/portfolio/skills/Skills';
import Footer from '@/components/portfolio/ui/Footer';
import TracingBeam from '@/components/portfolio/ui/TracingBeam';
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
