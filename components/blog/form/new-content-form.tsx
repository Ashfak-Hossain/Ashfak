'use-client';

import React, { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { createBlog } from '@/actions/blog/blog.action';
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import {
  NewContent,
  newContentSchema,
} from '@/schema/validation/new-content-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { title } from 'process';
const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});

const NewContentForm: React.FC = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  const [editorContent, setEditorContent] = useState('');
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewContent>({
    resolver: zodResolver(newContentSchema),
    mode: 'onBlur',
    defaultValues: {
      coverImage: new File([''], 'filename'),
      title: '',
      content: '',
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue('coverImage', acceptedFiles[0]);
        form.clearErrors('coverImage');
      } catch (error) {
        setPreview(null);
        form.resetField('coverImage');
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  });

  const onSubmit = (values: NewContent) => {
    setError('');
    startTransition(() => {
      createBlog({
        coverImage: values.coverImage.name,
        title: values.title,
        content: editorContent,
      })
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
        })
        .catch(() => {
          setError('Something went wrong!');
        });
    });
    toast({
      variant: error ? 'destructive' : 'default',
      title: error ? 'Error' : 'Success',
      description: error ? error : 'Blog created successfully',
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="coverImage"
          disabled={isPending}
          render={() => (
            <FormItem>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="cursor-pointer overflow-hidden rounded-base object-cover"
                >
                  <div className="relative flex max-h-[450px] items-center justify-center">
                    {preview && (
                      <Image
                        src={preview as string}
                        alt="Uploaded image"
                        width={1070}
                        height={420}
                      />
                    )}
                    <ImagePlus
                      className={`size-40 ${preview ? 'hidden' : 'block'}`}
                    />
                    {preview && (
                      <Button
                        className="absolute right-4 top-4"
                        disabled={isPending}
                      >
                        Change Image
                      </Button>
                    )}
                  </div>
                  <Input {...getInputProps()} type="file" />
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isPending}
          name="title"
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
        <FormField
          control={form.control}
          disabled={isPending}
          name="content"
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
          {isPending && (
            <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewContentForm;