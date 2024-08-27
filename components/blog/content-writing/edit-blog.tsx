'use client';

import React, { useEffect, useMemo, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

import { updateBlogContent } from '@/actions/blog/blog.action';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import Cover from '@/components/blog/shared/Cover';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface EditBlogProps {
  blogData: {
    slug: string;
    title: string;
    tags: {
      label: string;
      value: string;
    }[];
    content: string;
    coverImage: string;
    coverImageName: string;
  };
}

const saveToLocalStorage = async (content: string) => {
  localStorage.setItem('editorContent', content);
};

const loadFromStorage = () => {
  const storageString = localStorage.getItem('editorContent');
  return storageString || undefined;
};

const EditBlog: React.FC<EditBlogProps> = ({
  blogData: {
    title,
    content,
    tags: initialTags,
    slug,
    coverImage,
    coverImageName,
  },
}) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import('@/components/blog/editor/Editor'), {
        ssr: false,
        loading: () => <EditorSkeleton />,
      }),
    []
  );
  const [isPending, startTransition] = useTransition();
  let [initialContent, setInitialContent] = useState<string | undefined>();
  const [post, setPost] = useState('');

  useEffect(() => {
    const content = loadFromStorage();
    setInitialContent(content);
  }, [setInitialContent]);

  initialContent = initialContent || content;

  const handleClick = async () => {
    startTransition(async () => {
      const result = await updateBlogContent(slug, post);
      if (result.success) {
        toast.success('Blog updated successfully');
      } else {
        toast.error('Failed to update blog');
      }
    });
    localStorage.removeItem('editorContent');
  };

  const onChange = useDebouncedCallback((content: string) => {
    setPost(content);
    saveToLocalStorage(content);
  }, 300);

  return (
    <div className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
      <div className="flex min-h-screen flex-col p-10">
        <Cover imageUrl={coverImage} imageName={coverImageName} slug={slug} />
        <div className="py-5">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>

        <div className="py-5">
          <Editor
            initialContent={initialContent}
            onChange={onChange}
            editable={!isPending}
          />
        </div>
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
