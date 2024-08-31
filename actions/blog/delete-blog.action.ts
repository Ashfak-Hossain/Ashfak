'use server';

import { revalidatePath } from 'next/cache';

import { deleteFileFromS3 } from '@/actions/aws';
import { deleteComment } from '@/actions/blog/comment.action';
import {
  checkAdmin,
  extractImageNameFromUrl,
  extractImageUrlsFromContent,
} from '@/actions/utils.action';
import { db } from '@/lib/db';

const BLOG_COVER_IMAGE_PATH = 'blog_cover_image';
const BLOG_CONTENT_IMAGE_PATH = 'blog_body_files';

export const deleteBlogbySlug = async (slug: string) => {
  // Check if the user is an admin
  checkAdmin();

  const blog = await db.blog.findUnique({
    where: { slug },
    include: { likedBy: true, bookmarkedBy: true, comments: true },
  });

  if (!blog) {
    return { error: 'Invalid URL: Blog not found' };
  }

  try {
    // Start a transaction to ensure all operations succeed together
    await db.$transaction(
      async (prisma) => {
        // Delete the cover image from S3
        await deleteFileFromS3(blog.coverImageName, BLOG_COVER_IMAGE_PATH);

        // Extract and delete all images from the blog content
        const contentImageUrls = extractImageUrlsFromContent(
          blog.content as string
        );
        if (contentImageUrls.length > 0) {
          await Promise.all(
            contentImageUrls.map(async (url) => {
              const imageName = extractImageNameFromUrl(url);
              await deleteFileFromS3(imageName, BLOG_CONTENT_IMAGE_PATH);
            })
          );
        }

        // Delete parent comments
        if (blog.comments.length > 0) {
          const commentIds = blog.comments
            .filter((comment) => comment.parentId === null)
            .map((comment) => comment.id);
          await Promise.all(
            commentIds.map(async (commentId) => {
              await deleteComment({ commentId });
            })
          );
        }

        // Update users' likedBlogIds
        if (blog.likedBy.length > 0) {
          for (const user of blog.likedBy) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                likedBlogIds: {
                  set: user.likedBlogIds.filter((id) => id !== blog.id),
                },
              },
            });
          }
        }

        // Update users' bookmarkedBlogIds
        if (blog.bookmarkedBy.length > 0) {
          for (const user of blog.bookmarkedBy) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                bookmarkedBlogIds: {
                  set: user.bookmarkedBlogIds.filter((id) => id !== blog.id),
                },
              },
            });
          }
        }

        // Delete the blog itself
        await prisma.blog.delete({ where: { slug } });

        // Update tags to remove the deleted blog ID from their blogIds
        await Promise.all(
          blog.tagIds.map(async (tagId) => {
            const tag = await prisma.tags.findUnique({ where: { id: tagId } });
            if (tag) {
              const filteredBlogIds = tag.blogIds.filter(
                (id) => id !== blog.id
              );
              await prisma.tags.update({
                where: { id: tagId },
                data: { blogIds: filteredBlogIds },
              });
            }
          })
        );
      },
      {
        maxWait: 10000, // 10 seconds
        timeout: 10000, // 10 seconds
      }
    );

    // Revalidate the cache for the dashboard blogs path
    revalidatePath('/dashboard/blogs');
    revalidatePath('/blog');
    return {
      success: 'Blog deleted successfully.',
    };
  } catch (error) {
    return {
      error: 'An error occurred while deleting the blog. Please try again.',
    };
  }
};
