'use client';

import React, { useState } from 'react';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { FileInput, FileUploader } from '@/components/ui/file-uploader';
import { useCoverImage } from '@/zustand/use-cover-image';

interface CoverImageModalProps {
  onFileSelect?: (file: File) => void;
}

export const CoverImageModal: React.FC<CoverImageModalProps> = () => {
  const coverImage = useCoverImage();

  const [cover, setCover] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4, // 4MB max
    multiple: false,
  };

  const onClose = () => {
    setCover(null);
    coverImage.onClose();
  };

  const onValueChange = (img: File[] | null) => {
    const selectdImg = img ? img[0] : null;
    if (selectdImg) {
      coverImage.onReplace(selectdImg);
      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent aria-describedby="cover_image_selection">
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <FileUploader
          value={cover}
          onValueChange={onValueChange}
          dropzoneOptions={dropZoneConfig}
          className="relative rounded-lg p-2"
        >
          <FileInput className="outline-dashed outline-1 outline-black dark:outline-white">
            <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
              <FileSvgDraw />
            </div>
          </FileInput>
        </FileUploader>
      </DialogContent>
    </Dialog>
  );
};

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 size-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};
