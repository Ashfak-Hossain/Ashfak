import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Ellipsis, Eye, Heart, MessageSquare } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  tags: {
    id: number;
    name: string;
  }[];
  reactions: number;
  views: number;
  comments: Array<object>;
  readTime: number;
  coverImage: string;
  createdAt: Date;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  content,
  tags,
  reactions,
  views,
  readTime,
  comments,
  coverImage,
  createdAt,
}) => {
  return (
    <div className="flex flex-col rounded-md border border-gray-300/80 bg-white p-4 shadow-md dark:border-[#151515] dark:bg-[#171717] dark:shadow-sm">
      <div className="flex flex-col sm:flex-row">
        <div className="mb-2 flex-1 sm:mb-0 sm:mr-4">
          <span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {createdAt.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </span>
          <Link href={`/blog/${id}`}>
            <h2 className="my-2 line-clamp-2 py-1 text-2xl font-extrabold">
              {title}
            </h2>
          </Link>
          <p className="line-clamp-2 text-sm tracking-wide">{content}</p>
        </div>

        <div className="w-full flex-none sm:w-1/4">
          <Image
            src={coverImage}
            alt="Cover Image"
            aria-label="Cover Image"
            width={800}
            height={600}
            className="h-auto w-full rounded-md"
          />
        </div>
      </div>

      <div>
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="mr-2 mt-3 inline-block rounded-md bg-neutral-200 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-row justify-between py-2">
        <div className="flex flex-row text-xs text-neutral-600 dark:text-neutral-400 sm:space-x-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <span className="flex items-center gap-1">
              <Heart size={22} fill="#EF5A6F" strokeWidth={0} />
              <span>{reactions}</span>
            </span>
            {comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare size={22} fill="grey" strokeWidth={0} />
                <span>{comments.length}</span>
              </span>
            )}
            <span>{readTime} min read</span>
            <span className="flex items-center gap-1">
              <Eye size={18} />
              {views}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4 text-xs text-neutral-600 dark:text-neutral-400">
          <Ellipsis />
          <Bookmark size={22} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
