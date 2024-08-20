'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

import {
  deleteFileFromS3,
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
import { db } from '@/lib/db';
import { CurrentUser } from '@/lib/auth';
import { BlogStatus } from '@prisma/client';

const ERROR_MESSAGES = {
  TITLE_AVAILABLE: 'Title already available. Please change the title.',
  CREATE_FAILED: 'Failed to create',
  UPDATE_FAILED: 'Failed to update',
};

const BLOG_COVER_IMAGE_PATH = 'blog_cover_image';

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
      likedBy: {
        select: {
          id: true,
        },
      },
    },
    orderBy,
  });

  const total_blogs = await db.blog.count({
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
        coverImage: signedCoverImageUrl,
      };
    })
  );

  return {
    data: blogsWithImages,
    metadata: {
      hasNextPage: skip + take < total_blogs,
      totalPages: Math.ceil(total_blogs / take),
    },
  };
};

export const deleteBlogbySlug = async (slug: string) => {
  // Check if the user is an admin
  checkAdmin();

  const blog = await db.blog.findUnique({ where: { slug } });

  if (!blog) {
    return { error: 'Invalid url' };
  }

  try {
    const response = await deleteFileFromS3(
      blog.coverImageName,
      BLOG_COVER_IMAGE_PATH
    );

    if (!response.success) {
      return {
        error: 500,
        message: 'Stupid! Anything Wrong in the S3 server!',
      };
    }

    await db.blog.delete({ where: { slug } });

    for (const tagId of blog.tagIds) {
      const tag = await db.tags.findUnique({ where: { id: tagId } });
      if (tag) {
        const filteredBlogIds = tag.blogIds.filter((id) => id !== blog.id);
        await db.tags.update({
          where: { id: tagId },
          data: { blogIds: filteredBlogIds },
        });
      }
    }
    // delete likes relation from user and blog

    revalidatePath('/dashboard/blogs');
    return {
      success: 200,
      message: 'Good job boy! You deleted the blog successfully.',
    };
  } catch (error) {
    return { error: 500, message: 'Stupid! Anything Wrong in the server!' };
  }
};

export const getBlogBySlug = async (slug: string) => {
  await db.blog.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const blog = await db.blog.findUnique({
    where: { slug },
    include: {
      tags: true,
      likedBy: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!blog) {
    return false;
  }

  const signedCoverImageUrl = await getSignedCloudfrontUrl(
    blog.coverImageName,
    'blog_cover_image'
  );

  return {
    success: 200,
    ...blog,
    coverImage: signedCoverImageUrl,
  };
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

    return { success: true };
  } catch (error) {
    return { error: ERROR_MESSAGES.UPDATE_FAILED };
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
    return { success: true };
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
  } catch (error) {
    return;
  }
};
