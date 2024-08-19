'use server';

import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const likePost = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        likedBlogs: {
          connect: { slug },
        },
      },
    });

    const data = await db.blog.update({
      where: { slug },
      data: {
        likedBy: {
          connect: { id: user.id },
        },
        likes: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/blogs`);
    return { likeCount: data.likes };
  } catch (error) {
    console.error('Failed to like post', error);
  }
};

export const unlikePost = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        likedBlogs: {
          disconnect: { slug },
        },
      },
    });

    const data = await db.blog.update({
      where: { slug },
      data: {
        likedBy: {
          disconnect: { id: user.id },
        },
        likes: {
          decrement: 1,
        },
      },
    });

    revalidatePath(`/blogs`);
    return { likeCount: data.likes };
  } catch (error) {
    console.error('Failed to unlike post', error);
  }
};
