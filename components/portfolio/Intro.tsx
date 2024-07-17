'use client';

import React from 'react';
import { motion } from 'framer-motion';

import HeroImage from '@/components/HeroImage';
import HeroText from '@/components/HeroText';
import IntroButtons from '@/components/Intro-Buttons';
import { useSectionInView } from '@/hooks/useSectionInView';

const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-16 scroll-mt-[100rem] text-center sm:mb-0"
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
        >
          <HeroImage />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroText />
      </motion.div>

      <IntroButtons />
    </section>
  );
};

export default Intro;
