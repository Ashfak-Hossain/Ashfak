'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Heading } from '@/components/portfolio/ui/Heading';
import { Meteors } from '@/components/ui/meteors';
import { skillsData } from '@/constants';
import { useSectionInView } from '@/hooks/useSectionInView';

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.04 * index,
    },
  }),
};

const Skills = () => {
  const { ref } = useSectionInView('Skills');

  return (
    <section
      ref={ref}
      id="skills"
      className="mx-auto mb-28 max-w-[53rem] scroll-mt-28 sm:mb-40"
    >
      <div className="relative">
        <Heading as="h2" className="mb-6 text-center lg:text-3xl">
          Expertise
        </Heading>

        <ul className="flex flex-wrap justify-center gap-2 text-sm text-gray-800 sm:text-base">
          {skillsData.map((skill, index) => (
            <motion.li
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
              key={index}
              className="rounded-lg border border-black/10 bg-white p-2 dark:bg-white/10 dark:text-white/80 sm:p-3"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={8} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
