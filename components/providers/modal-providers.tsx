'use client';

import { useEffect, useState } from 'react';

import { CoverImageModal } from '@/components/shared/modals/cover-image-modal';
import DeleteBlogModal from '@/components/shared/modals/delete-blog-modal';
import LoginModal from '@/components/shared/modals/login-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DeleteBlogModal />
      <LoginModal />
      <CoverImageModal />
    </>
  );
};
