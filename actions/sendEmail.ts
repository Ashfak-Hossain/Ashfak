'use server';

import { z } from 'zod';

import { sendMeAnEmail } from '@/lib/mail';
import { contactFormSchema } from '@/schema/contact-form-schema';

export const sendEmail = async (values: z.infer<typeof contactFormSchema>) => {
  const validatedValues = contactFormSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, email, message } = values;

  try {
    await sendMeAnEmail(name, email, message);
    return { success: 'Email sent successfully!' };
  } catch (error: unknown) {
    return { error: 'Failed to send email!' };
  }
};
