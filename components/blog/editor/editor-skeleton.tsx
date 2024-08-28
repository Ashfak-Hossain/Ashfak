import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const EditorSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 px-5">
      <Skeleton className="h-[250px] w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full px-2" />
        <Skeleton className="h-4 w-full px-2" />
      </div>
    </div>
  );
};

export default EditorSkeleton;
