import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email().max(255),
  message: z
    .string()
    .min(1, {
      message: 'Message cannot be empty',
    })
    .max(5000, {
      message: 'Message cannot be longer than 5000 characters',
    }),
});
