'use server';

import slugify from 'slugify';

import { CreateQuestionParams } from '@/actions/blog/shared.types';
import { db } from '@/lib/db';

export const createBlog = async ({
  coverImage,
  title,
  content,
}: CreateQuestionParams) => {
  const slug = slugify(title, { lower: true });

  const isSlugAlreadyAvailable = await db.blog.findUnique({
    where: {
      slug,
    },
  });

  if (isSlugAlreadyAvailable) {
    return { error: 'Title already Available. Change title' };
  }

  try {
    await db.blog.create({
      data: {
        coverImage,
        title,
        content,
        slug,
      },
    });
  } catch (error) {
    return { error: 'Failed to create blog' };
  }
};
