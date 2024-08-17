'use server';

import { revalidatePath } from 'next/cache';

import { checkAdmin } from '@/actions/utils.action';
import { db } from '@/lib/db';
import { BlogStatus, Priority } from '@prisma/client';

export const updateBlogPriority = async (slug: string, priority: string) => {
  // check if user is admin
  checkAdmin();

  try {
    const blog = await db.blog.findUnique({ where: { slug } });

    if (!blog) {
      return { error: 404, message: 'Blog not found' };
    }

    await db.blog.update({
      where: { slug },
      data: {
        priority: priority as Priority,
      },
    });

    revalidatePath('/');
    return { success: 200, message: 'Blog priority updated' };
  } catch (error) {
    return { error: 500, message: 'Failed to update blog priority' };
  }
};

export const updateBlogStatus = async (slug: string, status: string) => {
  // check if user is admin
  checkAdmin();

  try {
    const blog = await db.blog.findUnique({ where: { slug } });

    if (!blog) {
      return { error: 404, message: 'Blog not found' };
    }

    await db.blog.update({
      where: { slug },
      data: {
        status: status as BlogStatus,
      },
    });

    revalidatePath('/');
    return { success: 200, message: 'Blog status updated' };
  } catch (error) {
    return { error: 500, message: 'Failed to update blog status' };
  }
};
