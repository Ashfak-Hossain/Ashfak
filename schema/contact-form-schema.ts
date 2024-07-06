import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name cannot be empty',
    })
    .max(50),
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
