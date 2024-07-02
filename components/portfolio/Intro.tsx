'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useSectionInView } from '@/hooks/useSectionInView';

import IntroLinks from './Intro-Links';

const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 scroll-mt-[100rem] text-center sm:mb-0"
    >
      {/* image */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
        >
          <Image
            alt="Ashfak Hossain protrait"
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="192"
            height="192"
            quality="95"
            priority
            className="size-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
          />
        </motion.div>
      </div>

      {/* text */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 mt-4 max-w-[50rem] px-4 text-2xl font-medium !leading-normal sm:text-3xl"
      >
        <span className="font-bold">Hello, I'm Ashfak Hossain.</span> Leveraging
        my <span className="font-bold">competitive programming</span>{' '}
        background, I craft sophisticated{' '}
        <span className="font-bold">full-stack</span> solutions.
      </motion.h1>

      {/* Buttons */}
      <IntroLinks />
    </section>
  );
};

export default Intro;
