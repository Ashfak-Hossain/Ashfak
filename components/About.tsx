'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from '@/components/Section-heading';

const About = () => {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>

      <p className="mb-3">
        I'm a competitive programmer currently studying{' '}
        <span className="font-medium">Computer Science</span> at the{' '}
        <span className="font-medium">
          American International University-Bangladesh (AIUB).
        </span>{' '}
        I like C++ and have a strong passion for algorithms, solving complex
        problems, and participating in coding competitions. In my free time, I
        enjoy developing applications as a hobby, always eager to learn and
        apply new technologies.
      </p>
    </motion.section>
  );
};

export default About;
