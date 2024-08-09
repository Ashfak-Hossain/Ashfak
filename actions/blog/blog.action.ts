'use server';

import slugify from 'slugify';

import {
  getSignedCloudfrontUrl,
  uploadFileToS3,
} from '@/actions/awsS3/uploadToS3';
import { CreateBlogParams } from '@/actions/blog/shared.types';
import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

const ERROR_MESSAGES = {
  TITLE_AVAILABLE: 'Title already available. Please change the title.',
  CREATE_FAILED: 'Failed to create blog.',
};

export const createBlog = async ({
  base64CoverImage,
  coverImageName,
  coverImageType,
  title,
  content,
  tags,
}: CreateBlogParams) => {
  const user = await CurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const slug = slugify(title, { lower: true });

  const existingSlug = await db.blog.findUnique({ where: { slug } });

  if (existingSlug) {
    return { error: ERROR_MESSAGES.TITLE_AVAILABLE };
  }

  const coverImageNameUrl = await uploadFileToS3(
    base64CoverImage,
    coverImageName,
    coverImageType,
    'blog_cover_image'
  );

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
        coverImageName: coverImageNameUrl,
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

export const getAllBlogs = async () => {
  const blogs = await db.blog.findMany({
    include: {
      tags: true,
    },
  });

  return blogs.length > 0 ? blogs : { error: 'No blogs found' };
};

export const getBlogBySlug = async (slug: string) => {
  const blog = await db.blog.findUnique({
    where: { slug },
    include: {
      tags: true,
    },
  });

  if (!blog) {
    return { error: 'Blog not found' };
  }

  const signedCoverImageUrl = await getSignedCloudfrontUrl(
    blog.coverImageName,
    'blog_cover_image'
  );

  return {
    ...blog,
    coverImage: signedCoverImageUrl,
  };
};
