import { getAllPublishedBlogs } from '@/actions/blog/blog.action';
import BlogCard from '@/components/blog/cards/BlogCard';
import PaginationControl from '@/components/blog/shared/pagination';
import { Separator } from '@/components/ui/separator';
import { getUserById } from '@/database/user';
import { CurrentUser } from '@/lib/auth';
import { BlogPageProps } from '@/types/blog';
import { FC, Fragment } from 'react';

const ReadingListPage: FC<BlogPageProps> = async ({ searchParams }) => {
  const user = await CurrentUser();
  const currentUser = await getUserById(user?.id ?? '');

  const page = searchParams['page'] ?? 1;
  const per_page = 10;

  const {
    data: blogs,
    metadata: { hasNextPage, totalPages },
  } = await getAllPublishedBlogs({
    skip: (Number(page) - 1) * per_page,
    take: per_page,
    savedBlogs: true,
  });

  const pageNumber = Number(searchParams?.page || 1);

  const liked = currentUser?.likedBlogIds.map((id) => id);
  const bookmarked = currentUser?.bookmarkedBlogIds.map((id) => id);

  return (
    <>
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
                // comments={blog.comments}
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

        {blogs.length > per_page && (
          <PaginationControl
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            page={pageNumber.toString()}
          />
        )}
      </div>
    </>
  );
};

export default ReadingListPage;
