'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownToLineIcon, MoveRightIcon } from 'lucide-react';

import { useActiveSectionContext } from '@/hooks/useActiveSectionContext';

const IntroButtons = () => {
  const { setTimeOfLastClick, setActiveSection } = useActiveSectionContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center justify-center gap-4 px-4 text-xs font-medium sm:flex-row sm:text-base"
    >
      {/* contact button */}
      <Link
        onClick={() => {
          setActiveSection('Contact');
          setTimeOfLastClick(Date.now());
        }}
        href="#contact"
        className="group flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
      >
        Let's Talk
        <MoveRightIcon className="opacity-70 transition group-hover:translate-x-1" />
      </Link>

      {/* cv button */}
      <a
        aria-label="Download CV"
        href="/CV.pdf"
        download
        className="group flex cursor-pointer items-center gap-1 rounded-full bg-white px-5 py-2 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10"
      >
        CV
        <ArrowDownToLineIcon className="size-4 opacity-60 transition group-hover:translate-y-1" />
      </a>
    </motion.div>
  );
};

export default IntroButtons;
