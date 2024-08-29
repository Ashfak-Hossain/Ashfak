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
      return { error: 'Blog not found' };
    }

    await db.blog.update({
      where: { slug },
      data: {
        priority: priority as Priority,
      },
    });

    return { success: 'Good job! Priority updated successfully.' };
  } catch (error) {
    return { error: 'Failed to update blog priority' };
  }
};

export const updateBlogStatus = async (slug: string, status: string) => {
  // check if user is admin
  checkAdmin();

  try {
    const blog = await db.blog.findUnique({ where: { slug } });

    if (!blog) return { error: 'Blog not found' };

    await db.blog.update({
      where: { slug },
      data: {
        status: status as BlogStatus,
      },
    });

    return { success: 'Good job boy! You updated the status' };
  } catch (error) {
    return { error: 'Failed to update blog status' };
  }
};
