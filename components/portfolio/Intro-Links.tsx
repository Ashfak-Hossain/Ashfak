import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

import { useActiveSectionContext } from '@/hooks/useActiveSectionContext';
import { socialInfo } from '@/lib/socialInfo';

const IntroLinks = () => {
  const { setTimeOfLastClick, setActiveSection } = useActiveSectionContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row"
    >
      {/* contact button */}
      <Link
        onClick={() => {
          setActiveSection('Contact');
          setTimeOfLastClick(Date.now());
        }}
        href="#contact"
        className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
      >
        Contact me here
        <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
      </Link>

      {/* cv button */}
      <a
        aria-label="Download CV"
        href="/CV.pdf"
        download
        className="borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10"
      >
        Download CV{' '}
        <HiDownload className="opacity-60 transition group-hover:translate-y-1" />
      </a>

      {/* linkedin button */}
      <a
        aria-label="LinkedIn profile"
        href={socialInfo.linkedin.url}
        target="_blank"
        rel="noreferrer noopener"
        className=" borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-[1.15]  hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
      >
        <BsLinkedin />
      </a>

      {/* github button */}
      <a
        aria-label="GitHub profile"
        href={socialInfo.github.url}
        target="_blank"
        rel="noreferrer noopener"
        className=" borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
      >
        <FaGithubSquare />
      </a>
    </motion.div>
  );
};

export default IntroLinks;
