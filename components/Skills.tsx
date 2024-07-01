'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from '@/components/Section-heading';
import { useSectionInView } from '@/hooks/useSectionInView';
import { skillsData } from '@/lib/data';

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
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
          <motion.li
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="borderBlack rounded-xl bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80"
            key={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
