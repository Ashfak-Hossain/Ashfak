'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { ImageIcon, Undo2Icon } from 'lucide-react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/zustand/use-cover-image';

const CoverImageUploader = () => {
  const { file, onOpen, onReset } = useCoverImage();

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

  return (
    <div className="flex flex-col gap-y-3">
      {memoizedImage}
      <div className="flex space-x-3 py-2">
        <Button onClick={onOpen} className="p-2">
          <ImageIcon className="mr-2 size-4" />
          Select Cover
        </Button>
        {file && (
          <Button onClick={onReset} className="p-2">
            <Undo2Icon className="mr-2 size-4" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoverImageUploader;
