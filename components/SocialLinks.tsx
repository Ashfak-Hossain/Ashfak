'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

import { socialInfo } from '@/lib/socialInfo';

const SocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{
        type: 'spring',
        duration: 0.2,
        stiffness: 260,
        damping: 20,
      }}
      className="mb-5 ml-[20px]"
    >
      <a
        aria-label="LinkedIn profile"
        href={socialInfo.linkedin.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedinIcon
          size={30}
          className="mb-5 cursor-pointer transition hover:scale-[1.15] focus:scale-[1.15] active:scale-105"
        />
      </a>
      <a
        aria-label="GitHub profile"
        href={socialInfo.github.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubIcon
          size={30}
          className="cursor-pointer transition hover:scale-[1.15] focus:scale-[1.15] active:scale-105"
        />
      </a>
    </motion.div>
  );
};

export default SocialLinks;
