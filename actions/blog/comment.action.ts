'use server';

import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

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
      data: {
        ...comment,
        children: [],
        commentLikes: [],
        user: {
          id: user?.id ?? '',
          name: user?.name ?? '',
          image: user?.image ?? '',
        },
      },
    };
  } catch (error) {
    return { error: 'Failed to create comment' };
  }
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

    return {
      data: {
        ...reply,
        children: [],
        commentLikes: [],
        user: {
          id: user?.id ?? '',
          name: user?.name ?? '',
          image: user?.image ?? '',
        },
      },
    };
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

    return { success: 'Comment deleted successfully' };
  } catch (error) {
    return { error: 'Failed to delete comment !' };
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
          commentId,
        },
      },
    });

    if (existingLike) {
      // If the like exists, delete it (unlike)
      await db.commentLike.delete({
        where: {
          userId_commentId: {
            userId: user.id!,
            commentId,
          },
        },
      });
    } else {
      // If the like doesn't exist, create it (like)
      await db.commentLike.create({
        data: {
          userId: user.id!,
          commentId,
        },
      });
    }

    return { success: 'Comment Deleted!' };
  } catch (error) {
    return { error: 'Failed to toggle like' };
  }
};
