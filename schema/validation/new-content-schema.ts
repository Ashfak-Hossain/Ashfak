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
  title: z.string().min(1, 'Title is required'),
  tags: z.array(optionSchema).min(1, 'At least one tag is required'),
  content: z.string().min(1, 'Content is required'),
});

export type NewContent = z.infer<typeof newContentSchema>;
