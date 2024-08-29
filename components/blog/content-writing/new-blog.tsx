'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createBlog } from '@/actions/blog/blog.action';
import CoverImageUploader from '@/components/blog/content-writing/CoverImageUploader';
import NovelEditorWrapper from '@/components/blog/content-writing/NovelEditorWrapper';
import TagSelector from '@/components/blog/content-writing/TagSelector';
import TitleInput from '@/components/blog/content-writing/TitleInput';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { readFileAsBase64 } from '@/lib/utils';
import { useContent } from '@/zustand/use-content';
import { useCoverImage } from '@/zustand/use-cover-image';

const NewBlog = ({
  initialTags,
}: {
  initialTags: { value: string; label: string }[];
}) => {
  const router = useRouter();
  const { file, onReset } = useCoverImage();
  const [isPending, startTransition] = useTransition();
  const { title, content, tags } = useContent();

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
          localStorage.removeItem('novel-content');
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
        <CoverImageUploader />
        <TitleInput isPending={isPending} />
        <TagSelector initialTags={initialTags} />
        <NovelEditorWrapper editable />
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
