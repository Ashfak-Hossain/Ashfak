'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

import { Heading } from '@/components/Heading';
import { LinkPreview } from '@/components/ui/link-preview';
import { SparklesCore } from '@/components/ui/sparkles';
import { useSectionInView } from '@/hooks/useSectionInView';

const About = () => {
  const { theme } = useTheme();

  const { ref } = useSectionInView('About');

  return (
    <section className="flex justify-center">
      <motion.div
        ref={ref}
        className="mb-5 flex max-w-[45rem] scroll-mt-28 flex-col items-center text-center leading-8 sm:mb-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        id="about"
      >
        <div className="mb-3">
          <Heading as="h2" className="mb-6 lg:text-3xl">
            About Me
          </Heading>

          <div className="text-sm font-medium md:text-base lg:text-lg">
            I'm a competitive programmer currently studying{' '}
            <span className="font-bold">Computer Science</span> at the{' '}
            <LinkPreview url="https://www.aiub.edu/" className="font-bold">
              American International University-Bangladesh (AIUB).
            </LinkPreview>
            I like C++ and web3 and have a strong passion for algorithms,
            solving complex problems, and participating in coding competitions.
            In my free time, I enjoy developing applications as a hobby, always
            eager to learn and apply new technologies.
          </div>
        </div>

        <div className="relative hidden h-40 w-[40rem] md:block">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="size-full"
            particleColor={theme === 'light' ? '#000000' : '#FFFFFF'}
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 size-full bg-gray-50 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] dark:bg-gray-900"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
