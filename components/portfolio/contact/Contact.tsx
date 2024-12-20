'use client';

import React from 'react';
import { motion } from 'framer-motion';

import ContactForm from '@/components/portfolio/contact/Contact-form';
import { BackgroundBeams } from '@/components/portfolio/ui/background-beams';
import { Heading } from '@/components/portfolio/ui/Heading';
import { Paragraph } from '@/components/portfolio/ui/Paragraph';
import { useSectionInView } from '@/hooks/useSectionInView';

const Contact = () => {
  const { ref } = useSectionInView('Contact');

  return (
    <section
      className="relative flex scroll-mt-28 justify-center text-center"
      id="contact"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-20 w-[min(100%,45rem)] sm:mb-28"
      >
        <Heading as="h2" className="mb-10 lg:text-3xl">
          Contact Me
        </Heading>

        <Paragraph className="-mt-6 text-center font-normal text-gray-700 dark:text-white/80">
          Please contact me directly at{' '}
          <a
            className="underline"
            href="mailto:evan1234.ek@gmail.com"
            target="_blank"
          >
            evan1234.ek@gmail.com
          </a>{' '}
          or through the form
        </Paragraph>

        <ContactForm />
      </motion.div>
      <BackgroundBeams className="-z-10" />
    </section>
  );
};

export default Contact;
