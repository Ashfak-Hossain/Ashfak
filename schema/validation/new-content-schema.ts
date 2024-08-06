import { z } from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const newContentSchema = z.object({
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
  title: z.string(),
  tags: z.array(optionSchema).min(1),
  content: z.string(),
});

export type NewContent = z.infer<typeof newContentSchema>;
