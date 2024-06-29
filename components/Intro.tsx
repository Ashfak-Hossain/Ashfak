'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare } from 'react-icons/fa';

const Intro = () => {
  return (
    <section className="mb-28 max-w-[50rem] text-center sm:mb-0">
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
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-3xl"
      >
        <span className="font-bold">Hello, I'm Ashfak Hossain.</span> Leveraging
        my <span className="font-bold">competitive programming</span>{' '}
        background, I craft sophisticated{' '}
        <span className="font-bold">full-stack</span> solutions.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
      >
        {/* contact button */}
        <Link
          href="#contact"
          className="group outline-none focus:scale-110 bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
        >
          Contact me here
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        {/* cv button */}
        <a
          href="/CV.pdf"
          download
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10"
        >
          Download CV{' '}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>

        {/* linkedin button */}
        <a
          href="https://www.linkedin.com/in/ashfak-hossain-evan-6b5605203/"
          target="_blank"
          className="bg-white p-4 flex text-gray-700 items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105  hover:text-gray-950 transition cursor-pointer border border-black/10"
        >
          <BsLinkedin />
        </a>

        {/* github button */}
        <a
          href="https://github.com/Ashfak-Hossain"
          target="_blank"
          className="bg-white text-[1.35rem] p-4 flex text-gray-700 items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-black/10"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
};

export default Intro;
