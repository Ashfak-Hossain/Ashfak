'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReward } from 'react-rewards';

import HeroImage from '@/components/HeroImage';
import HeroText from '@/components/HeroText';
import IntroButtons from '@/components/Intro-Buttons';
import { useSectionInView } from '@/hooks/useSectionInView';

const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);
  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <section
      ref={ref}
      id="home"
      className="mb-16 scroll-mt-[100rem] text-center sm:mb-0"
    >
      <div
        className="flex items-center justify-center"
        onClick={reward}
        aria-disabled={isAnimating}
      >
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

        <span
          id="rewardId"
          // style={{ width: 1, height: 1, background: 'red' }}
          className="absolute"
        />
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
