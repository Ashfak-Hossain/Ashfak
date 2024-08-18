/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Eye, Heart, MessageSquare } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { JsonValue } from '@prisma/client/runtime/library';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  slug: string;
  title: string;
  content: JsonValue;
  tags: {
    id: string;
    label: string;
  }[];
  reactions: number;
  views: number;
  // comments: Array<object>;
  coverImage: string;
  createdAt: Date;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  content,
  tags,
  reactions,
  views,
  // comments,
  coverImage,
  createdAt,
}) => {
  return (
    <div className="rounded-base border-2 border-border bg-white text-text shadow-light dark:border-darkBorder dark:bg-gray-600 dark:text-darkText dark:shadow-dark">
      <div className="flex flex-col p-4">
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 flex-1 sm:mb-0 sm:mr-4">
            <span>
              <p className="text-xs font-base">{formatDate(createdAt)} </p>
            </span>
            <Link href={`/blog/${slug}`}>
              <h2 className="my-2 line-clamp-2 py-1 text-2xl font-extrabold">
                {title}
              </h2>
            </Link>
            <p className="line-clamp-2 text-sm font-base tracking-wide">
              {JSON.stringify(content)}
            </p>
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
            <Badge key={tag.id} variant="neutral" className="mr-2 mt-3">
              #{tag.label}
            </Badge>
          ))}
        </div>

        <div className="mt-3 flex flex-row justify-between py-2 font-medium">
          <div className="flex flex-row text-xs sm:space-x-4">
            <div className="flex items-center space-x-4 md:space-x-8">
              <span className="flex items-center gap-1">
                <Heart size={22} fill="#EF5A6F" strokeWidth={0} />
                <span>{reactions}</span>
              </span>
              {/* {comments.length > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare size={22} fill="grey" strokeWidth={0} />
                  <span>{comments.length}</span>
                </span>
              )} */}
              <span className="flex items-center gap-1">
                <Eye size={18} />
                {views}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-4 text-xs">
            <Bookmark size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
