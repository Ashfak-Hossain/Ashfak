'use client';

import React, { useEffect, useMemo, useTransition } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageIcon, Undo2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

import { createBlog } from '@/actions/blog/blog.action';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multi-select';
import { Spinner } from '@/components/ui/spinner';
import { useCoverImage } from '@/hooks/zustand/use-cover-image';
import { useNewContent } from '@/hooks/zustand/use-new-content';
import { readFileAsBase64 } from '@/lib/utils';

const saveToLocalStorage = async (content: string) => {
  localStorage.setItem('createEditorContent', content);
};

const loadFromStorage = async () => {
  const storageString = localStorage.getItem('createEditorContent');
  return storageString || undefined;
};

const NewBlog = ({
  initialTags,
}: {
  initialTags: { value: string; label: string }[];
}) => {
  const {
    title,
    content,
    initialContent,
    tags,
    setTitle,
    setInitialContent,
    setContent,
    setTags,
  } = useNewContent();
  const router = useRouter();
  const { file, onOpen, onReset } = useCoverImage();
  const [isPending, startTransition] = useTransition();

  const Editor = useMemo(
    () =>
      dynamic(() => import('@/components/blog/editor/Editor'), {
        ssr: false,
        loading: () => <EditorSkeleton />,
      }),
    []
  );

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, [setInitialContent]);

  const onChangeContent = useDebouncedCallback((content: string) => {
    setContent(content);
    saveToLocalStorage(content);
  }, 500);

  const memoizedImage = useMemo(() => {
    if (file) {
      return (
        <div className="mb-3 overflow-hidden rounded-lg">
          <AspectRatio ratio={1070 / 420}>
            <Image
              src={URL.createObjectURL(file)}
              alt="blog_cover_image"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>
      );
    }
    return null;
  }, [file]);

  const handleClick = async () => {
    if (!file) {
      toast.error('Please select a cover image');
      return;
    }

    try {
      startTransition(async () => {
        const base64CoverImage = await readFileAsBase64(file);

        const { success, message } = await createBlog({
          base64CoverImage,
          coverImageName: file.name,
          coverImageType: file.type,
          title,
          content,
          tags,
        });

        if (success) {
          toast.success('You did it! You wrote another great blog');
          router.push('/dashboard/blogs');
          onReset();
          localStorage.removeItem('createEditorContent');
        } else {
          toast.error(message);
        }
      });
    } catch (error) {
      toast.error('Something went wrong in the server. Please try again later');
    }
  };

  return (
    <div className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
      <div className="flex min-h-screen flex-col p-10">
        <div className="flex flex-col gap-y-3">
          {memoizedImage}
          <div className="flex space-x-3 py-2">
            <Button disabled={isPending} onClick={onOpen} className="p-2">
              <ImageIcon className="mr-2 size-4" />
              Select Cover
            </Button>
            {file && (
              <Button disabled={isPending} onClick={onReset} className="p-2">
                <Undo2Icon className="mr-2 size-4" />
                Remove
              </Button>
            )}
          </div>
        </div>
        <div className="py-5">
          <Input
            disabled={isPending}
            placeholder="Title"
            className="no-focus h-14 text-lg font-medium"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <MultipleSelector
            maxSelected={3}
            onMaxSelected={(maxLimit) => {
              toast.error(`You have reached max selected: ${maxLimit}`);
            }}
            onChange={(tags) => setTags(tags)}
            creatable
            defaultOptions={initialTags}
            placeholder="Select Tags (Max 3)"
            emptyIndicator={
              <p className="text-center text-base leading-10 text-gray-600 dark:text-gray-400">
                No tags found
              </p>
            }
          />
        </div>
        <div className="py-5">
          <Editor
            initialContent={initialContent}
            onChange={onChangeContent}
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
            {isPending ? 'yeah baby...' : 'Just do it!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
