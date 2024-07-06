'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { LinkPreview } from '@/components/ui/link-preview';
import { useSectionInView } from '@/hooks/useSectionInView';

const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <section className="flex justify-center">
      <motion.div
        ref={ref}
        className="mb-24 max-w-[45rem] scroll-mt-28  text-center leading-8 sm:mb-32"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        id="about"
      >
        <Heading as="h2" className="mb-6 lg:text-3xl">
          About Me
        </Heading>

        <Paragraph className="font-medium">
          I'm a competitive programmer currently studying{' '}
          <span className="font-bold">Computer Science</span> at the{' '}
          <LinkPreview url="https://www.aiub.edu/" className="font-bold">
            American International University-Bangladesh (AIUB).
          </LinkPreview>
          I like C++ and web3 and have a strong passion for algorithms, solving
          complex problems, and participating in coding competitions. In my free
          time, I enjoy developing applications as a hobby, always eager to
          learn and apply new technologies.
        </Paragraph>
      </motion.div>
    </section>
  );
};

export default About;
