import { z } from 'zod';

export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;
