'use-client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { newContentSchema } from '@/schema/validation/new-content-schema';
import { zodResolver } from '@hookform/resolvers/zod';
const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});

const NewContentForm: React.FC = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  const [editorContent, setEditorContent] = useState('');

  const form = useForm<z.infer<typeof newContentSchema>>({
    resolver: zodResolver(newContentSchema),
    mode: 'onBlur',
    defaultValues: {
      coverImage: new File([''], 'filename'),
      title: '',
      content: '',
      draft: true,
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

  const onSubmit = (values: z.infer<typeof newContentSchema>) => {
    console.log('values: ', { ...values, content: editorContent });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="coverImage"
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
                      <Button className="absolute right-4 top-4">
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
          disabled={form.formState.isSubmitting}
          className="h-auto rounded-lg px-8 py-3 text-xl"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewContentForm;
