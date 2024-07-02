'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from '@/components/portfolio/Section-heading';
import { useSectionInView } from '@/hooks/useSectionInView';

import ContactForm from './Contact-form';

const Contact = () => {
  const { ref } = useSectionInView('Contact');

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      id="contact"
      className="mb-20 w-[min(100%,38rem)] sm:mb-28"
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="-mt-6 text-center text-gray-700 dark:text-white/80 ">
        Please contact me directly at{' '}
        <a
          className="underline"
          href="mailto:evan1234.ek@gmail.com"
          target="_blank"
        >
          {' '}
          evan1234.ek@gmail.com{' '}
        </a>{' '}
        or through the form
      </p>

      <ContactForm />
    </motion.section>
  );
};

export default Contact;
