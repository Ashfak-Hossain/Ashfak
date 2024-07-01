'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

import { useActiveSectionContext } from '@/hooks/useActiveSectionContext';
import { useSectionInView } from '@/hooks/useSectionInView';

const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);
  const { setTimeOfLastClick, setActiveSection } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0"
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
            priority={true}
            className="size-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
          />
        </motion.div>
      </div>

      {/* text */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-normal sm:text-3xl"
      >
        <span className="font-bold">Hello, I'm Ashfak Hossain.</span> Leveraging
        my <span className="font-bold">competitive programming</span>{' '}
        background, I craft sophisticated{' '}
        <span className="font-bold">full-stack</span> solutions.
      </motion.h1>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row"
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
          href="/CV.pdf"
          download
          className="borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105"
        >
          Download CV{' '}
          <HiDownload className="opacity-60 transition group-hover:translate-y-1" />
        </a>

        {/* linkedin button */}
        <a
          href="https://www.linkedin.com/in/ashfak-hossain-evan-6b5605203/"
          target="_blank"
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700  transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105"
        >
          <BsLinkedin />
        </a>

        {/* github button */}
        <a
          href="https://github.com/Ashfak-Hossain"
          target="_blank"
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
};

export default Intro;
