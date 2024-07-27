import React from 'react';
import { Resend } from 'resend';

import ContactFormEmail from '@/email/contact-form-email';
import { ResetPasswordEmail } from '@/email/password-reset-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

/**
 * Send an email to the site owner when a user submits the contact form.
 * @param name The name of the person who submitted the form.
 * @param email The email of the person who submitted the form.
 * @param message The message of the person who submitted the form.
 * @returns A promise that resolves when the email is sent.
 */
export const sendMeAnEmail = async (
  name: string,
  email: string,
  message: string
) => {
  await resend.emails.send({
    from: email,
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

/**
 *
 * @param email  The email address to send the password reset email to.
 * @param token  The password reset token to include in the email.
 * @returns     A promise that resolves when the email has been sent.
 */
export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string | null
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    // from: 'evan1234.ek@gmail.com',
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    react: React.createElement(ResetPasswordEmail, {
      resetLink,
      name,
    }),
  });
};
