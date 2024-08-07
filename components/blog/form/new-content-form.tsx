'use-client';

import React, { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

import { createBlog } from '@/actions/blog/blog.action';
import { getAllTags } from '@/actions/blog/tags.action';
import EditorSkeleton from '@/components/blog/editor/editor-skeleton';
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import type { Option } from '@/components/ui/multi-select';
import MultipleSelector from '@/components/ui/multi-select';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import {
  NewContent,
  newContentSchema,
} from '@/schema/validation/new-content-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import ImageUpload from './ImageUpload';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

const NewContentForm: React.FC = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  const [editorContent, setEditorContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewContent>({
    resolver: zodResolver(newContentSchema),
    mode: 'onBlur',
    defaultValues: {
      coverImage: new File([''], 'filename'),
      title: '',
      content: '',
      tags: [],
    },
  });

  const showToast = (
    variant: 'destructive' | 'default',
    title: string,
    description: string
  ) => {
    toast({
      variant,
      title,
      description,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const onSubmit = (values: NewContent) => {
    startTransition(async () => {
      try {
        const data = await createBlog({
          coverImage: values.coverImage.name,
          title: values.title,
          content: editorContent,
          tags: values.tags,
        });

        if (data.success) {
          showToast('default', 'Success', 'Blog created successfully!');
        } else if (data?.error) {
          showToast('destructive', 'Error', data.error);
        }
      } catch {
        showToast('destructive', 'Error', 'Something went wrong!');
      }
    });
  };

  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery<Option[]>({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="coverImage"
          disabled={isPending}
          render={() => (
            <ImageUpload
              preview={preview}
              setPreview={setPreview}
              isPending={isPending}
            />
          )}
        />
        <FormField
          control={form.control}
          name="title"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  {...field}
                  placeholder="Title"
                  className="no-focus h-auto border-none bg-white text-5xl font-bold text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : (
          tags &&
          tags.length > 0 && (
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      maxSelected={3}
                      onMaxSelected={(maxLimit) => {
                        toast({
                          title: `You have reached max selected: ${maxLimit}`,
                        });
                      }}
                      creatable
                      defaultOptions={tags}
                      placeholder="Select Tags (Max 3)"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          {isError ? 'Something went wrong' : 'No tags found'}
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <FormField
          control={form.control}
          name="content"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  onChange={(content: string) => {
                    field.onChange(content);
                    setEditorContent(content);
                  }}
                  initialContent={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="flex h-auto items-center justify-center gap-x-2 rounded-lg px-8 py-3 text-xl"
        >
          {isPending && <Spinner size="small" className="text-black" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewContentForm;
