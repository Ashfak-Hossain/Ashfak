'use server';

import { getSignedCloudfrontUrl } from '@/actions/aws';
import { db } from '@/lib/db';
import { CommentModel } from '@/types/blog';
import {
  extractImageUrlsFromContent,
  isUrlExpired,
  extractImageNameFromUrl,
} from '@/actions/utils.action';

const BLOG_CONTENT_IMAGE_PATH = 'blog_body_files';
const BLOG_COVER_IMAGE_PATH = 'blog_cover_image';

export const getBlogBySlug = async (slug: string) => {
  const blog = await db.blog.findUnique({
    where: { slug },
    include: {
      tags: true,
      likedBy: {
        select: {
          id: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          commentLikes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  // Return false if the blog is not found
  if (!blog) return false;

  // Get the signed URL for the cover image
  const signedCoverImageUrl = await getSignedCloudfrontUrl(
    blog.coverImageName,
    BLOG_COVER_IMAGE_PATH
  );

  let updatedContent: string = blog.content as string;

  // Extract all image URLs from the content
  const imageUrls: string[] = extractImageUrlsFromContent(
    blog.content as string
  );

  // Check if any of the image URLs are expired
  if (Array.isArray(imageUrls) && imageUrls.length > 0) {
    for (const imageUrl of imageUrls) {
      if (isUrlExpired(imageUrl)) {
        // Extract the S3 key (image name) from the expired URL
        const imageName = extractImageNameFromUrl(imageUrl);

        // Get the new signed URL
        const newSignedUrl = await getSignedCloudfrontUrl(
          imageName,
          BLOG_CONTENT_IMAGE_PATH
        );

        // Replace the old URL with the new signed URL in the content
        updatedContent = updatedContent?.replace(imageUrl, newSignedUrl);
      }
    }
  }

  // Update the blog content in the database if any URLs were replaced
  if (updatedContent !== blog.content) {
    await db.blog.update({
      where: { id: blog.id },
      data: { content: updatedContent },
    });
  }

  // Create a map of comments with commentId as key
  const commentMap: Record<string, CommentModel> = {};

  // Initialize the comments with empty children arrays and actual commentLikes
  const structuredComments = blog.comments.map((comment) => {
    const commentModel: CommentModel = {
      ...comment,
      children: [],
      commentLikes: comment.commentLikes.map((like) => ({
        userId: like.userId,
        commentId: like.commentId,
      })),
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
      } else {
        console.warn(`Parent comment with id ${comment.parentId} not found.`);
      }
    }
  });

  // Return only the top-level comments
  const comments = structuredComments.filter((comment) => !comment.parentId);

  return {
    success: 200,
    ...blog,
    coverImage: signedCoverImageUrl,
    comments,
    totalCommentsCount: blog.comments.length,
  };
};
