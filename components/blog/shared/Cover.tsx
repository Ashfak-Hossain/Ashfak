import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Undo2Icon, UploadCloudIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateBlogCover } from '@/actions/blog/blog.action';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn, readFileAsBase64 } from '@/lib/utils';
import { useCoverImage } from '@/zustand/use-cover-image';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface CoverProps {
  slug: string;
  imageUrl: string;
  imageName: string;
}

const Cover: React.FC<CoverProps> = ({ imageUrl, imageName, slug }) => {
  const coverImage = useCoverImage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (coverImage.file) {
      setSelectedImage(coverImage.file);
    }
  }, [coverImage.file]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    coverImage.onReset();
  };

  const handleUpload = async () => {
    setIsSubmitting(true);
    const base64CoverImage = await readFileAsBase64(selectedImage!);
    const result = await updateBlogCover({
      slug,
      base64CoverImage,
      coverImageName: imageName,
      coverImageType: selectedImage!.type,
    });
    if (result.success) {
      toast.success('Cover image updated successfully');
      setSelectedImage(null);
    }
    if (result.error) {
      toast.error(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mb-8 overflow-hidden rounded-lg">
      {imageUrl && !selectedImage && (
        <>
          <AspectRatio ratio={1070 / 420}>
            <Image
              src={imageUrl}
              alt="blog_cover_image"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </>
      )}
      {selectedImage && (
        <AspectRatio ratio={1070 / 420}>
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="blog_cover_image"
            fill
            className="object-cover"
          />
        </AspectRatio>
      )}
      <div className="flex space-x-3 py-2">
        <Button
          disabled={isSubmitting}
          onClick={coverImage.onOpen}
          className="p-2"
        >
          <ImageIcon className="mr-2 size-4" />
          Change Cover
        </Button>
        {selectedImage && (
          <Button
            disabled={isSubmitting}
            onClick={handleRemoveImage}
            className="p-2"
          >
            <Undo2Icon className="mr-2 size-4" />
            Remove
          </Button>
        )}
        <Button
          disabled={isSubmitting || !selectedImage}
          onClick={handleUpload}
          className={cn('p-2', !selectedImage && 'hidden')}
        >
          {isSubmitting ? (
            <Spinner size="small" className="mr-1 text-black" />
          ) : (
            <UploadCloudIcon className="mr-2 size-4" />
          )}

          {isSubmitting ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default Cover;
