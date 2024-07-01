'use client';

import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { sendEmail } from '@/actions/sendEmail';
import SectionHeading from '@/components/Section-heading';
import SubmitButton from '@/components/Submit-Button';
import { useSectionInView } from '@/hooks/useSectionInView';

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
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="-mt-6 text-gray-700 dark:text-white/80">
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

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { error } = await sendEmail(formData);
          error
            ? toast.error(error)
            : toast.success('Email sent successfully!');
        }}
      >
        <input
          className="borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white/100"
          type="email"
          name="senderEmail"
          required
          maxLength={500}
          placeholder="Your email"
        />

        <textarea
          required
          name="message"
          maxLength={5000}
          className="borderBlack my-3 h-52 rounded-lg p-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white/100"
          placeholder="Your message"
        />

        <SubmitButton />
      </form>
    </motion.section>
  );
};

export default Contact;
