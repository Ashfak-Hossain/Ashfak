import React from 'react';
import { Resend } from 'resend';

import ContactFormEmail from '@/email/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMeAnEmail = async (
  name: string,
  email: string,
  message: string
) => {
  await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: 'evan1234.ek@gmail.com',
    subject: 'Message from contact form',
    reply_to: email,
    react: React.createElement(ContactFormEmail, {
      name,
      message,
      senderEmail: email,
    }),
  });
};
