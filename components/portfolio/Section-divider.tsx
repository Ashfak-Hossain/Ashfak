'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.125,
        }}
        className="my-24 hidden h-16 w-1 rounded-full bg-gray-200 dark:bg-gray-200/20 sm:block"
      ></motion.div>
    </div>
  );
};

export default SectionDivider;
