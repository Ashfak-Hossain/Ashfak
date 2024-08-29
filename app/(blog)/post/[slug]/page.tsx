import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarIcon, Telescope } from 'lucide-react';

import { getBlogBySlug } from '@/actions/blog/getBlog.action';
import Comments from '@/components/blog/comment/comments';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import InteractionPanel from '@/components/blog/interactionPanel/InteractionPanel';
import { Badge } from '@/components/ui/badge';
import { CurrentUser } from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

import { type Comment } from '@prisma/client';

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const NovelEditor = dynamic(() => import('@/components/blog/editor/editor'), {
    ssr: false,
    loading: () => <EditorSkeleton />,
  });

  const user = await CurrentUser();
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  const isUserLiked = blog.likedByIds?.find((id) => id === user?.id);
  const isUserBookmarked = blog.bookmarkedByIds?.find((id) => id === user?.id);

  const {
    title,
    coverImage,
    createdAt,
    tags,
    content,
    views,
    likes,
    bookmarks,
    comments,
    totalCommentsCount,
  } = blog;

  return (
    <section className="flex flex-col">
      <div className="flex">
        <InteractionPanel
          isLiked={!!isUserLiked}
          likeCount={likes}
          isBookmarked={!!isUserBookmarked}
          totalBookmarks={bookmarks}
        />

        <div className="flex-1 rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
          <div className="flex flex-col px-12 py-5">
            <div className="mb-8 overflow-hidden rounded-lg">
              <AspectRatio ratio={1070 / 420}>
                <Image
                  src={coverImage}
                  alt="blog_cover_image"
                  fill
                  priority
                  className="object-cover"
                />
              </AspectRatio>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} />
                <p className="text-sm font-base">{formatDate(createdAt)}</p>
                <p className="text-sm font-base">
                  by{' '}
                  <span className="font-semibold italic text-mainAccent">
                    <Link href="/">Ashfak Hossain</Link>
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Telescope size={18} />
                {views} views
              </div>
            </div>

            <div className="py-5">
              <h1 className="text-6xl font-bold">{title}</h1>
            </div>

            <div className="mb-7 flex space-x-2">
              {tags.map((tag) => (
                <Badge variant="neutral" key={tag.id}>{`#${tag.label}`}</Badge>
              ))}
            </div>
          </div>

          <article className="flex justify-center px-11 py-5">
            <NovelEditor initialContent={content as string} editable={false} />
          </article>
        </div>
      </div>

      <Suspense fallback={<div>Loading</div>}>
        <Comments
          slug={slug}
          comments={comments}
          totalCommentsCount={totalCommentsCount}
        />
      </Suspense>
    </section>
  );
};

export default page;
