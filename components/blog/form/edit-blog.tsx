'use client';

import React from 'react';

import ContentForm from '@/components/blog/form/content-form';

const EditBlog = () => {
  return (
    <div className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
      <div className="flex min-h-screen flex-col p-10">
        <ContentForm />
      </div>
    </div>
  );
};

export default EditBlog;
