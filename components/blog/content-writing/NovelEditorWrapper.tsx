'use client';

import React, { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';

import EditorSkeleton from '@/components/blog/editor/editor-skeleton';

interface NovelEditorWrapperProps {
  editable: boolean;
  initialContent?: string;
}

const NovelEditorWrapper = ({
  editable,
  initialContent,
}: NovelEditorWrapperProps) => {
  const NovelEditor = useMemo(
    () =>
      dynamic(() => import('@/components/blog/editor/Editor'), {
        ssr: false,
        loading: () => <EditorSkeleton />,
      }),
    []
  );

  return (
    <div className="py-5">
      <Suspense fallback={<EditorSkeleton />}>
        <NovelEditor editable={editable} initialContent={initialContent} />
      </Suspense>
    </div>
  );
};

export default NovelEditorWrapper;
