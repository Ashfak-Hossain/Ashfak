import { FC, Fragment } from 'react';
import { Metadata } from 'next';

import { getAllPublishedBlogs } from '@/actions/blog/blog.action';
import BlogCard from '@/components/blog/cards/BlogCard';
import Sort from '@/components/blog/shared/Sort';
import { Separator } from '@/components/ui/separator';
import PaginationControl from '@/components/blog/shared/pagination';
import { BlogPageProps } from '@/types/blog';
import { CurrentUser } from '@/lib/auth';
import { getUserById } from '@/database/user';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | Blog',
  description:
    'I write about competitive programming, software engineering, and other computer science related topics.',
};

const BlogPage: FC<BlogPageProps> = async ({ searchParams }) => {
  const user = await CurrentUser();
  const currentUser = await getUserById(user?.id ?? '');

  const sort = searchParams['sort'] ?? '';
  const page = searchParams['page'] ?? 1;
  const per_page = 5;

  const {
    data: blogs,
    metadata: { hasNextPage, totalPages },
  } = await getAllPublishedBlogs({
    skip: (Number(page) - 1) * per_page,
    take: per_page,
    sort: sort.toString(),
  });
  const pageNumber = Number(searchParams?.page || 1);

  const liked = currentUser?.likedBlogIds.map((id) => id);
  const bookmarked = currentUser?.bookmarkedBlogIds.map((id) => id);

  return (
    <>
      <Sort activeSort={sort.toString()} />
      <div className="flex w-full flex-col gap-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Fragment key={blog.id}>
              <BlogCard
                slug={blog.slug}
                title={blog.title}
                tags={blog.tags}
                reactions={blog.likes}
                views={blog.views}
                comments={blog.totalComments}
                likedBy={!!liked?.includes(blog.id)}
                bookmarkedBy={!!bookmarked?.includes(blog.id)}
                coverImage={blog.coverImage}
                createdAt={blog.createdAt}
              />
              <Separator className="last:hidden dark:my-2" />
            </Fragment>
          ))
        ) : (
          <p className="text-center text-lg font-bold">No blogs found</p>
        )}

        <PaginationControl
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          page={pageNumber.toString()}
          currentSort={sort.toString()}
        />
      </div>
    </>
  );
};

export default BlogPage;
