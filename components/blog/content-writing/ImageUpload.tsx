'use-client';

import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { NewContent } from '@/schema/validation/content-schema';

interface ImageUploadProps {
  preview: string | ArrayBuffer | null;
  setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  isPending: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  preview,
  setPreview,
  isPending,
}) => {
  const { setValue, clearErrors } = useFormContext<NewContent>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(acceptedFiles[0]);
      setValue('coverImage', acceptedFiles[0]);
      clearErrors('coverImage');
    },
    [clearErrors, setPreview, setValue]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  });

  return (
    <FormItem>
      <FormControl>
        <div
          {...getRootProps()}
          className="cursor-pointer overflow-hidden rounded-base object-cover"
        >
          <div className="relative flex max-h-[450px] items-center justify-center">
            {preview ? (
              <Image
                src={preview as string}
                alt="Uploaded image"
                width={1070}
                height={420}
              />
            ) : (
              <ImagePlus className="size-40" />
            )}
            {preview && (
              <Button className="absolute right-4 top-4" disabled={isPending}>
                Change Image
              </Button>
            )}
          </div>
          <Input {...getInputProps()} type="file" />
        </div>
      </FormControl>
      <FormMessage>
        {fileRejections.length > 0 && (
          <p>Image must be less than 1MB and of type png, jpg, or jpeg</p>
        )}
      </FormMessage>
    </FormItem>
  );
};

export default ImageUpload;
