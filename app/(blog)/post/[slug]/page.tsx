import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarIcon, Telescope } from 'lucide-react';

import { getBlogBySlug } from '@/actions/blog/blog.action';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import dynamic from 'next/dynamic';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import { formatDate } from '@/lib/utils';
import InteractionPanel from '@/components/blog/sidebar/InteractionPanel';
import { CurrentUser } from '@/lib/auth';
import Comments from '@/components/blog/comment/comments';
import { getCommentsByBlogId } from '@/actions/blog/comment.action';

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
    ssr: false,
    loading: () => <EditorSkeleton />,
  });

  const user = await CurrentUser();

  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return notFound();
  }

  const comments = await getCommentsByBlogId(blog.id);

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

        <div className="rounded-base border-2 flex-1 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
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
              <div className="flex text-sm items-center gap-2">
                <Telescope size={18} />
                {views} views
              </div>
            </div>

            <div className="py-5">
              <h1 className="text-6xl font-bold">{title}</h1>
            </div>

            <div className="mb-10 flex space-x-2">
              {tags.map((tag) => (
                <Badge variant="neutral" key={tag.id}>{`#${tag.label}`}</Badge>
              ))}
            </div>
          </div>

          {/* <article>
            <Editor initialContent={content as string} editable={false} />
          </article> */}
        </div>
      </div>

      <Suspense fallback={<div>Loading</div>}>
        <Comments slug={slug} comments={comments} />
      </Suspense>
    </section>
  );
};

export default page;
