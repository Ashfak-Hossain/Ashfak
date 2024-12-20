'use client';

import { FC, useTransition } from 'react';
import { toast } from 'sonner';

import { updateBlogContent } from '@/actions/blog/blog.action';
import NovelEditorWrapper from '@/components/blog/content-writing/NovelEditorWrapper';
import Cover from '@/components/blog/shared/Cover';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAppSelector } from '@/redux/hooks';
import { Tag } from '@/types/blog';

interface EditBlogProps {
  blogData: {
    slug: string;
    title: string;
    tags: Tag[];
    content: string;
    coverImage: string;
    coverImageName: string;
  };
}

const EditBlog: FC<EditBlogProps> = ({
  blogData: {
    title,
    content: initialContent,
    // tags: initialTags,
    slug,
    coverImage,
    coverImageName,
  },
}) => {
  const [isPending, startTransition] = useTransition();
  const content = useAppSelector((state) => state.posts.content);

  const handleClick = async () => {
    startTransition(async () => {
      const { success, error } = await updateBlogContent(slug, content);
      if (success) {
        toast.success('Blog updated successfully');
        localStorage.removeItem('novel-content');
        localStorage.removeItem('html-content');
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <div className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
      <div className="flex min-h-screen flex-col p-10">
        <Cover imageUrl={coverImage} imageName={coverImageName} slug={slug} />
        <div className="py-5">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>

        <NovelEditorWrapper editable initialContent={initialContent} />
        <div>
          <Button
            onClick={handleClick}
            className="flex h-auto items-center justify-center gap-x-2 rounded-lg px-3 py-2 text-xl"
            disabled={isPending}
          >
            {isPending && <Spinner size="small" className="text-black" />}
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
