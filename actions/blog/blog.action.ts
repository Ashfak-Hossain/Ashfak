'use server';

import slugify from 'slugify';

import { CreateBlogParams } from '@/actions/blog/shared.types';
import { db } from '@/lib/db';

const ERROR_MESSAGES = {
  TITLE_AVAILABLE: 'Title already available. Please change the title.',
  CREATE_FAILED: 'Failed to create blog.',
};

export const createBlog = async ({
  coverImage,
  title,
  content,
  tags,
}: CreateBlogParams) => {
  const slug = slugify(title, { lower: true });

  const existingSlug = await db.blog.findUnique({ where: { slug } });

  if (existingSlug) {
    return { error: ERROR_MESSAGES.TITLE_AVAILABLE };
  }

  const tagIds = await Promise.all(
    tags.map(async (tag) => {
      const existingTag = await db.tags.findUnique({
        where: { label: tag.label },
      });
      if (existingTag) {
        return existingTag.id;
      } else {
        const newTag = await db.tags.create({
          data: {
            ...tag,
            value: tag.label.toLowerCase(),
          },
        });
        return newTag.id;
      }
    })
  );

  try {
    await db.blog.create({
      data: {
        coverImage,
        title,
        content,
        slug,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    return { error: ERROR_MESSAGES.CREATE_FAILED };
  }
};

export const getBlogs = async () => {
  return await db.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  });
};
