import { z } from 'zod';
import { newContentSchema } from './content-schema';

/**
 * Comment schema
 */
export const commentSchema = z.object({
  message: z.string().min(1),
});
