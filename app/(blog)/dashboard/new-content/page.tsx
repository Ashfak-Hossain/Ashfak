'use client';

import React from 'react';

import NewContentForm from '@/components/blog/form/new-content-form';

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
