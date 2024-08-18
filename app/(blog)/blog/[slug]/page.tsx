import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';

import { getBlogBySlug } from '@/actions/blog/blog.action';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import dynamic from 'next/dynamic';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import { formatDate } from '@/lib/utils';

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
    ssr: false,
    loading: () => <EditorSkeleton />,
  });

  const { title, coverImage, createdAt, tags, content } = blog;

  return (
    <section className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
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

        <div className="flex items-center space-x-2">
          <CalendarIcon size={18} />
          <p className="text-sm font-base">{formatDate(createdAt)}</p>
          <p className="text-sm font-base">
            by{' '}
            <span className="font-semibold italic text-mainAccent">
              <Link href="/">Ashfak Hossain</Link>
            </span>
          </p>
        </div>

        <div className="py-5">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>

        <div className="mb-10 flex space-x-2">
          {tags.map((tag) => (
            <Badge variant="neutral" key={tag.id}>{`#${tag.label}`}</Badge>
          ))}
        </div>
      </div>

      <article>
        <Editor initialContent={content as string} editable={false} />
      </article>
    </section>
  );
};

export default page;
