'use server';

import { db } from '@/lib/db';

export const getAllTags = async () => {
  return await db.tags.findMany({
    select: {
      label: true,
      value: true,
    },
  });
};
