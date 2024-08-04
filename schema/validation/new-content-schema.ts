import { z } from 'zod';

export const newContentSchema = z.object({
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
  title: z.string(),
  content: z.string(),
});

export type NewContent = z.infer<typeof newContentSchema>;
