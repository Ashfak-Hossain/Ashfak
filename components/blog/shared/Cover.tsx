import React, { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { ImageIcon, Undo2Icon, UploadCloudIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateBlogCover } from '@/actions/blog/blog.action';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn, readFileAsBase64 } from '@/lib/utils';
import {
  openCoverImageModal,
  resetCoverImage,
} from '@/redux/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface CoverProps {
  slug: string;
  imageUrl: string;
  imageName: string;
}

const Cover: React.FC<CoverProps> = ({ imageUrl, imageName, slug }) => {
  const dispatch = useAppDispatch();
  const coverImage = useAppSelector((state) => state.posts.coverImage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (coverImage.file) {
      setSelectedImage(coverImage.file);
    }
  }, [coverImage.file]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    dispatch(resetCoverImage());
  };

  const handleUpload = async () => {
    startTransition(async () => {
      try {
        const base64CoverImage = await readFileAsBase64(selectedImage!);
        const { success, error } = await updateBlogCover({
          slug,
          base64CoverImage,
          coverImageName: imageName,
          coverImageType: selectedImage!.type,
        });
        if (success) {
          toast.success('Cover image updated successfully');
        } else {
          toast.error(error);
        }
      } catch (error) {
        toast.error(
          'Something went wrong in the server. Please try again later'
        );
      }
    });
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
          disabled={isPending}
          onClick={() => dispatch(openCoverImageModal())}
          className="p-2"
        >
          <ImageIcon className="mr-2 size-4" />
          Change Cover
        </Button>
        {selectedImage && (
          <Button
            disabled={isPending}
            onClick={handleRemoveImage}
            className="p-2"
          >
            <Undo2Icon className="mr-2 size-4" />
            Remove
          </Button>
        )}
        <Button
          disabled={isPending || !selectedImage}
          onClick={handleUpload}
          className={cn('p-2', !selectedImage && 'hidden')}
        >
          {isPending ? (
            <Spinner size="small" className="mr-1 text-black" />
          ) : (
            <UploadCloudIcon className="mr-2 size-4" />
          )}

          {isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default Cover;
