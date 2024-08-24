'use server';

import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommentModel } from '@/types/blog';

export const createComment = async ({
  slug,
  message,
}: {
  slug: string;
  message: string;
}) => {
  const user = await CurrentUser();
  if (!user) {
    return { error: 'User not found' };
  }

  try {
    const blog = await db.blog.findUnique({ where: { slug } });
    if (!blog) {
      return { error: 'Blog not found' };
    }

    const comment = await db.comment.create({
      data: {
        message,
        userId: user.id!,
        blogId: blog.id,
        parentId: null,
      },
    });

    return {
      success: true,
      data: comment,
    };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { error: 'Failed to create comment' };
  }
};

/**
 *
 * @param blogId The id of the blog to get comments for
 * @returns The comments for the blog
 * @description This function fetches the comments for a blog and nests them based on their parentId to create a tree structure of comments
 */
export const getCommentsByBlogId = async (
  blogId: string
): Promise<CommentModel[]> => {
  const comments = await db.comment.findMany({
    where: { blogId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  const commentMap: Record<string, CommentModel> = {};

  // Initialize the comments with empty children arrays
  const structuredComments = comments.map((comment) => {
    const commentModel: CommentModel = {
      ...comment,
      children: [],
    };
    commentMap[comment.id] = commentModel;
    return commentModel;
  });

  // Nest the comments based on their parentId
  structuredComments.forEach((comment) => {
    if (comment.parentId) {
      const parentComment = commentMap[comment.parentId];
      if (parentComment) {
        parentComment.children.push(comment);
      }
      // else {
      //   // Handle the case where the parent comment is missing
      //   console.warn(`Parent comment with id ${comment.parentId} not found.`);
      // }
    }
  });

  // Return only the top-level comments
  return structuredComments.filter((comment) => !comment.parentId);
};

export const createReply = async ({
  slug,
  parentId,
  message,
}: {
  slug: string;
  parentId: string;
  message: string;
}) => {
  const user = await CurrentUser();
  if (!user) return { error: 'User not found' };

  try {
    const blog = await db.blog.findUnique({ where: { slug } });
    if (!blog) return { error: 'Blog not found' };

    const reply = await db.comment.create({
      data: {
        message,
        userId: user.id!,
        blogId: blog.id,
        parentId,
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });

    return { success: true, data: reply };
  } catch (error) {
    return { error: 'Failed to create reply' };
  }
};
