'use server';

import { revalidatePath } from 'next/cache';

import { CreateQuestionParams } from '@/actions/blog/shared.types';
import { db } from '@/lib/db';

export const createBlog = async ({
  coverImage,
  title,
  content,
  pathname,
}: CreateQuestionParams) => {
  try {
    const newBlog = await db.blog.create({
      data: {
        coverImage,
        title,
        content,
      },
    });
    revalidatePath(pathname);
    return newBlog;
  } catch (error) {
    console.log('An error occurred while creating the blog post:', error);
  }
};
