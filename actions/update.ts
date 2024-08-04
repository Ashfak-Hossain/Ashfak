// make a action that will update the data and add a new field and add unique slug values uwing slugify library

import { db } from '@/lib/db';

export const addSlug = async (slug: string) => {
  try {
    await db.blog.findMany({
      where: {
        slug,
      },
    });
  } catch (error) {
    console.log('An error occurred while creating the slug:', error);
  }
};
