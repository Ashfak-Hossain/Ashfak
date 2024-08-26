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
    return { error: 'Failed to create comment' };
  }
};

/**
 *
 * @param blogId The id of the blog to get comments for
 * @returns The comments for the blog
 * @description This function fetches the comments for a blog and nests them based on their parentId to create a tree structure of comments
 */
// export const getCommentsByBlogId = async (
//   blogId: string
// ): Promise<CommentModel[]> => {
//   const comments = await db.comment.findMany({
//     where: { blogId },
//     include: {
//       user: true,
//       commentLikes: true,
//     },
//     orderBy: { createdAt: 'desc' },
//   });

//   const commentMap: Record<string, CommentModel> = {};

//   // Initialize the comments with empty children arrays and actual commentLikes
//   const structuredComments = comments.map((comment) => {
//     const commentModel: CommentModel = {
//       ...comment,
//       children: [],
//       commentLikes: comment.commentLikes.map((like) => ({
//         userId: like.userId,
//         commentId: like.commentId,
//       })),
//     };
//     commentMap[comment.id] = commentModel;
//     return commentModel;
//   });

//   // Nest the comments based on their parentId
//   structuredComments.forEach((comment) => {
//     if (comment.parentId) {
//       const parentComment = commentMap[comment.parentId];
//       if (parentComment) {
//         parentComment.children.push(comment);
//       } else {
//         console.warn(`Parent comment with id ${comment.parentId} not found.`);
//       }
//     }
//   });

//   // Return only the top-level comments
//   return structuredComments.filter((comment) => !comment.parentId);
// };

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

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const user = await CurrentUser();
  if (!user) return { error: 'User not found' };

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment) return { error: 'Comment not found' };

    if (comment.userId !== user.id) {
      return { error: 'Unauthorized' };
    }

    await deleteCommentAndChildren(commentId);

    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete comment' };
  }
};

const deleteCommentAndChildren = async (commentId: string) => {
  // Find all child comments
  const childComments = await db.comment.findMany({
    where: { parentId: commentId },
    select: { id: true },
  });

  // Recursively delete each child comment and its children
  for (const childComment of childComments) {
    await deleteCommentAndChildren(childComment.id);
  }

  // Delete all likes associated with the comment
  await db.commentLike.deleteMany({
    where: { commentId },
  });

  // Finally, delete the comment itself
  await db.comment.delete({
    where: { id: commentId },
  });
};

export const togglecommentLike = async ({
  commentId,
}: {
  commentId: string;
}) => {
  const user = await CurrentUser();
  if (!user) return { error: 'User not found' };

  try {
    // Check if the like already exists
    const existingLike = await db.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: user.id!,
          commentId: commentId,
        },
      },
    });

    if (existingLike) {
      // If the like exists, delete it (unlike)
      await db.commentLike.delete({
        where: {
          userId_commentId: {
            userId: user.id!,
            commentId: commentId,
          },
        },
      });
    } else {
      // If the like doesn't exist, create it (like)
      await db.commentLike.create({
        data: {
          userId: user.id!,
          commentId: commentId,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error toggling like:', error);
    return { error: 'Failed to toggle like' };
  }
};
