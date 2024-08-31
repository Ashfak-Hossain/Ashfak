'use server';

import { revalidatePath } from 'next/cache';

import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const likePost = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        likedBlogs: {
          connect: { slug },
        },
      },
    });

    const data = await db.blog.update({
      where: { slug },
      data: {
        likedBy: {
          connect: { id: user.id },
        },
        likes: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/blogs`);
    return { likeCount: data.likes };
  } catch (error) {
    console.error('Failed to like post', error);
  }
};

export const unlikePost = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        likedBlogs: {
          disconnect: { slug },
        },
      },
    });

    const data = await db.blog.update({
      where: { slug },
      data: {
        likedBy: {
          disconnect: { id: user.id },
        },
        likes: {
          decrement: 1,
        },
      },
    });

    revalidatePath(`/blogs`);
    return { likeCount: data.likes };
  } catch (error) {
    console.error('Failed to unlike post', error);
  }
};

export const toggleZap = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    const blog = await db.blog.findUnique({
      where: { slug },
      include: { likedBy: true },
    });

    if (!blog) {
      return { error: 'Blog not found' };
    }

    // Check if the user has liked the blog
    const hasLiked = blog.likedBy.some((user) => user.id === user.id);

    // If the user has liked the blog, remove the like
    if (hasLiked) {
      await db.user.update({
        where: { id: user.id },
        data: {
          likedBlogs: {
            disconnect: { slug },
          },
        },
      });

      // Decrement the like count
      const data = await db.blog.update({
        where: { slug },
        data: {
          likedBy: {
            disconnect: { id: user.id },
          },
          likes: {
            decrement: 1,
          },
        },
      });

      revalidatePath(`/blog`);
      return { success: 'Like removed!' };
    } else {
      // If the user has not liked the blog, add the like
      await db.user.update({
        where: { id: user.id },
        data: {
          likedBlogs: {
            connect: { slug },
          },
        },
      });

      // Increment the like count
      const data = await db.blog.update({
        where: { slug },
        data: {
          likedBy: {
            connect: { id: user.id },
          },
          likes: {
            increment: 1,
          },
        },
      });

      revalidatePath(`/blog`);
      return { success: 'Like added!' };
    }
  } catch (error) {
    console.error('Failed to toggle like', error);
  }
};

export const toggleBookmark = async ({ slug }: { slug: string }) => {
  const user = await CurrentUser();
  if (!user) {
    return;
  }

  try {
    const blog = await db.blog.findUnique({
      where: { slug },
      include: { bookmarkedBy: true },
    });

    if (!blog) {
      return { error: 'Blog not found' };
    }

    // Check if the user has bookmarked the blog
    const hasBookmarked = blog.bookmarkedBy.some((user) => user.id === user.id);

    // If the user has bookmarked the blog, remove the bookmark
    if (hasBookmarked) {
      await db.user.update({
        where: { id: user.id },
        data: {
          bookmarkedBlogs: {
            disconnect: { slug },
          },
        },
      });

      // Decrement the bookmark count
      const data = await db.blog.update({
        where: { slug },
        data: {
          bookmarkedBy: {
            disconnect: { id: user.id },
          },
          bookmarks: {
            decrement: 1,
          },
        },
      });

      revalidatePath(`/blog`);
      return { success: 'Bookmark removed! ' };
    } else {
      // If the user has not bookmarked the blog, add the bookmark
      await db.user.update({
        where: { id: user.id },
        data: {
          bookmarkedBlogs: {
            connect: { slug },
          },
        },
      });

      // Increment the bookmark count
      const data = await db.blog.update({
        where: { slug },
        data: {
          bookmarkedBy: {
            connect: { id: user.id },
          },
          bookmarks: {
            increment: 1,
          },
        },
      });

      revalidatePath(`/blog`);
      return { success: 'Bookmark added!' };
    }
  } catch (error) {
    console.error('Failed to toggle bookmark', error);
  }
};
