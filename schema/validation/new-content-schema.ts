import { z } from 'zod';

export const newContentSchema = z.object({
  coverImage: z
    // Rest of validations done via react dropzone
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
  title: z.string(),
  draft: z.boolean().default(true),
  content: z.string(),
});
