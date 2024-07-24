import React from 'react';
import Image from 'next/image';
import { Bookmark, Ellipsis, Heart, MessageSquare } from 'lucide-react';

const BlogCard = () => {
  return (
    <div className="flex flex-col rounded-md bg-neutral-100 p-4 dark:bg-[#171717] dark:shadow-sm">
      <div className="flex flex-col sm:flex-row">
        <div className="mb-2 flex-1 sm:mb-0 sm:mr-4">
          <span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              12th June 2021
            </p>
          </span>
          <h1 className="mb-1 py-2 text-xl font-extrabold">
            Flipping the Matrix HackerRank Optimised Solution in C++, Java,
            Python with Explanation
          </h1>
          <p className="line-clamp-2 text-sm tracking-wide">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
            tenetur reiciendis totam quidem minus ea vero eligendi? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Deserunt eligendi
            incidunt exercitationem veritatis nemo eveniet et ratione, quos ut
            fugiat nesciunt qui expedita inventore voluptatem eos error facere
            soluta nobis vel a impedit hic fugit officia. Vitae velit quae
            dolore.
          </p>
        </div>

        <div className="w-full flex-none sm:w-1/4">
          <Image
            src="/_static/meta-image.png"
            alt="Flipping the Matrix HackerRank Optimised Solution in C++, Java, Python with Explanation"
            width={800}
            height={600}
            className="h-auto w-full rounded-md"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-row justify-between">
        <div className="flex flex-row text-xs text-neutral-600 dark:text-neutral-400 sm:space-x-4">
          <div className="flex items-center space-x-8">
            <span className="flex items-center gap-1">
              <Heart size={22} fill="#EF5A6F" strokeWidth={0} />
              <span>12</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={22} fill="grey" strokeWidth={0} />
              <span>12</span>
            </span>
            <span className="ml-1">5 min read</span>
          </div>
        </div>
        <div className="mt-2 flex flex-row space-x-4 text-xs text-neutral-600 dark:text-neutral-400">
          <Ellipsis />
          <Bookmark size={22} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
