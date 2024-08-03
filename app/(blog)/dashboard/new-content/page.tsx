'use client';

import React from 'react';

import NewContentForm from '@/components/blog/form/new-content-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | New Blog Post',
  description:
    'Create a new blog post in the blog system. Write a new blog post. Add tags to the blog post. Add categories to the blog post. Add content to the blog post.',
};

const NewContentPage = () => {
  return (
    <>
      <div className="rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
        <div className="flex min-h-screen flex-col p-10">
          <NewContentForm />
        </div>
      </div>
    </>
  );
};

export default NewContentPage;
