'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

import {
  getSignedCloudfrontUrl,
  invalidateCloudfront,
  replaceFileToS3,
  uploadFileToS3,
} from '@/actions/aws';
import {
  CreateBlogParams,
  UpdateBlogCoverParams,
} from '@/actions/blog/shared.types';
import { checkAdmin } from '@/actions/utils.action';
import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { BlogStatus } from '@prisma/client';

const BLOG_COVER_IMAGE_PATH = 'blog_cover_image';

const ERROR_MESSAGES = {
  TITLE_AVAILABLE: 'Title already available. Please change the title.',
  CREATE_FAILED: 'Failed to create',
  UPDATE_FAILED: 'Failed to update',
};

export const createBlog = async ({
  base64CoverImage,
  coverImageName,
  coverImageType,
  title,
  content,
  tags,
}: CreateBlogParams) => {
  // Check if the user is an admin
  checkAdmin();

  const slug = slugify(title, { lower: true });

  const existingSlug = await db.blog.findUnique({ where: { slug } });

  if (existingSlug) {
    return { error: ERROR_MESSAGES.TITLE_AVAILABLE };
  }

  const coverImageNameUrl = await uploadFileToS3(
    base64CoverImage,
    coverImageName,
    coverImageType,
    BLOG_COVER_IMAGE_PATH
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
    revalidatePath('/dashboard/blogs');
    return { success: 201, message: 'Blog created successfully' };
  } catch (error) {
    return { error: 500, message: 'Stupid! Anything Wrong in the server!' };
  }
};

export const getAllPublishedBlogs = async ({
  skip = 0,
  take = 5,
  sort = 'latest',
  savedBlogs = false,
}: {
  skip?: number;
  take?: number;
  sort?: string;
  savedBlogs?: boolean;
}) => {
  const user = await CurrentUser();

  const orderBy =
    sort === 'popular'
      ? { views: 'desc' as const }
      : { createdAt: 'desc' as const };

  const where = savedBlogs
    ? {
        status: BlogStatus.published,
        bookmarkedBy: {
          some: {
            id: user?.id,
          },
        },
      }
    : {
        status: BlogStatus.published,
      };

  const blogs = await db.blog.findMany({
    skip,
    take,
    where,
    include: {
      tags: {
        select: {
          id: true,
          label: true,
        },
      },
      comments: true,
      likedBy: {
        select: {
          id: true,
        },
      },
    },
    orderBy,
  });

  const totalBlogs = await db.blog.count({
    where: { status: 'published' },
  });

  const blogsWithImages = await Promise.all(
    blogs.map(async (blog) => {
      const signedCoverImageUrl = await getSignedCloudfrontUrl(
        blog.coverImageName,
        'blog_cover_image'
      );

      return {
        ...blog,
        totalComments: blog.comments.length,
        coverImage: signedCoverImageUrl,
      };
    })
  );

  return {
    data: blogsWithImages,
    metadata: {
      hasNextPage: skip + take < totalBlogs,
      totalPages: Math.ceil(totalBlogs / take),
    },
  };
};

export const incrementBlogView = async (slug: string) => {
  await db.blog.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};

export const updateBlogContent = async (slug: string, content: string) => {
  // Check if the user is an admin
  checkAdmin();

  try {
    await db.blog.update({
      where: { slug },
      data: {
        content,
      },
    });

    return { success: 'Blog updated successfully' };
  } catch (error) {
    return { error: 'Failed to update blog!' };
  }
};

export const updateBlogCover = async ({
  slug,
  base64CoverImage,
  coverImageName,
  coverImageType,
}: UpdateBlogCoverParams) => {
  // Check if the user is an admin
  checkAdmin();

  try {
    // Replace the existing image with the new image in S3 and get the updated image name back from S3 bucket
    const UpdatedImageName = await replaceFileToS3(
      coverImageName,
      base64CoverImage,
      coverImageType,
      BLOG_COVER_IMAGE_PATH
    );

    // Invalidate Cloudfront cache for the updated image path to reflect the changes immediately
    invalidateCloudfront(`/${BLOG_COVER_IMAGE_PATH}/${UpdatedImageName}`);

    await db.blog.update({
      where: { slug },
      data: {
        coverImageName: UpdatedImageName,
      },
    });

    revalidatePath(`/dashboard/edit/${slug}`);
    return { success: 'Image upadted successfully' };
  } catch (error) {
    return { error: ERROR_MESSAGES.UPDATE_FAILED };
  }
};

export const getBlogsForDashboardTable = async () => {
  // Check if the user is an admin
  checkAdmin();

  try {
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
      },
    });
    return blogs;
  } catch (error) {}
};
