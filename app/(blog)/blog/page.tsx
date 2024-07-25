import React from 'react';
import { Metadata } from 'next';

import BlogCard from '@/components/blog/cards/BlogCard';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | Blog',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
};

const BlogPage = () => {
  const blogs = [
    {
      key: 1,
      _id: '234324',
      title:
        'Flipping the Matrix HackerRank Optimised Solution in C++, Java,Python with Explanation',
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quostenetur reiciendis totam quidem minus ea vero eligendi? Lorem ipsumdolor sit amet consectetur adipisicing elit. Deserunt eligendiincidunt exercitationem veritatis nemo eveniet et ratione, quos utfugiat nesciunt qui expedita inventore voluptatem eos error faceresoluta nobis vel a impedit hic fugit officia. Vitae velit quaedolore.',
      tags: [
        {
          _id: 1,
          name: 'C++',
        },
        {
          _id: 2,
          name: 'Java',
        },
        {
          _id: 3,
          name: 'Python',
        },
      ],
      reactions: 12,
      views: 100,
      comments: [
        {
          id: 1,
          text: 'Great blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 1,
            name: 'John Doe',
            avatar: '/_static/avatar.png',
          },
        },
        {
          id: 2,
          text: 'Nice blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 2,
            name: 'Jane Doe',
            avatar: '/_static/avatar.png',
          },
        },
      ],
      readTime: 5,
      coverImage: '/_static/meta-image.png',
      createdAt: new Date(),
    },
    {
      key: 1,
      _id: '234324',
      title:
        'Flipping the Matrix HackerRank Optimised Solution in C++, Java,Python with Explanation',
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quostenetur reiciendis totam quidem minus ea vero eligendi? Lorem ipsumdolor sit amet consectetur adipisicing elit. Deserunt eligendiincidunt exercitationem veritatis nemo eveniet et ratione, quos utfugiat nesciunt qui expedita inventore voluptatem eos error faceresoluta nobis vel a impedit hic fugit officia. Vitae velit quaedolore.',
      tags: [
        {
          _id: 1,
          name: 'C++',
        },
        {
          _id: 2,
          name: 'Java',
        },
        {
          _id: 3,
          name: 'Python',
        },
      ],
      reactions: 12,
      views: 100,
      comments: [
        {
          id: 1,
          text: 'Great blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 1,
            name: 'John Doe',
            avatar: '/_static/avatar.png',
          },
        },
        {
          id: 2,
          text: 'Nice blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 2,
            name: 'Jane Doe',
            avatar: '/_static/avatar.png',
          },
        },
      ],
      readTime: 5,
      coverImage: '/_static/meta-image.png',
      createdAt: new Date(),
    },
    {
      key: 1,
      _id: '234324',
      title:
        'Flipping the Matrix HackerRank Optimised Solution in C++, Java,Python with Explanation',
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quostenetur reiciendis totam quidem minus ea vero eligendi? Lorem ipsumdolor sit amet consectetur adipisicing elit. Deserunt eligendiincidunt exercitationem veritatis nemo eveniet et ratione, quos utfugiat nesciunt qui expedita inventore voluptatem eos error faceresoluta nobis vel a impedit hic fugit officia. Vitae velit quaedolore.',
      tags: [
        {
          _id: 1,
          name: 'C++',
        },
        {
          _id: 2,
          name: 'Java',
        },
        {
          _id: 3,
          name: 'Python',
        },
      ],
      reactions: 12,
      views: 100,
      comments: [
        {
          id: 1,
          text: 'Great blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 1,
            name: 'John Doe',
            avatar: '/_static/avatar.png',
          },
        },
        {
          id: 2,
          text: 'Nice blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 2,
            name: 'Jane Doe',
            avatar: '/_static/avatar.png',
          },
        },
      ],
      readTime: 5,
      coverImage: '/_static/meta-image.png',
      createdAt: new Date(),
    },
    {
      key: 1,
      _id: '234324',
      title:
        'Flipping the Matrix HackerRank Optimised Solution in C++, Java,Python with Explanation',
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quostenetur reiciendis totam quidem minus ea vero eligendi? Lorem ipsumdolor sit amet consectetur adipisicing elit. Deserunt eligendiincidunt exercitationem veritatis nemo eveniet et ratione, quos utfugiat nesciunt qui expedita inventore voluptatem eos error faceresoluta nobis vel a impedit hic fugit officia. Vitae velit quaedolore.',
      tags: [
        {
          _id: 1,
          name: 'C++',
        },
        {
          _id: 2,
          name: 'Java',
        },
        {
          _id: 3,
          name: 'Python',
        },
      ],
      reactions: 12,
      views: 100,
      comments: [
        {
          id: 1,
          text: 'Great blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 1,
            name: 'John Doe',
            avatar: '/_static/avatar.png',
          },
        },
        {
          id: 2,
          text: 'Nice blog post!',
          createdAt: '12th June 2021',
          user: {
            id: 2,
            name: 'Jane Doe',
            avatar: '/_static/avatar.png',
          },
        },
      ],
      readTime: 5,
      coverImage: '/_static/meta-image.png',
      createdAt: new Date(),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <>
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                content={blog.content}
                tags={blog.tags}
                reactions={blog.reactions}
                views={blog.views}
                comments={blog.comments}
                readTime={blog.readTime}
                coverImage={blog.coverImage}
                createdAt={blog.createdAt}
              />
              <Separator className="last:hidden dark:my-2" />
            </>
          ))
        ) : (
          <p className="text-center text-lg font-bold">No blogs found</p>
        )}
      </div>
    </>
  );
};

export default BlogPage;
