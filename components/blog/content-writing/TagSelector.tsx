'use client';

import React from 'react';
import { toast } from 'sonner';

import MultipleSelector from '@/components/ui/multi-select';
import { setTags } from '@/redux/features/posts/postsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Tag } from '@/types/blog';

const TagSelector = ({ initialTags }: { initialTags: Tag[] }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <MultipleSelector
        maxSelected={3}
        onMaxSelected={(maxLimit) => {
          toast.error(`You have reached max selected: ${maxLimit}`);
        }}
        onChange={(tags) => dispatch(setTags(tags))}
        creatable
        defaultOptions={initialTags}
        placeholder="Select Tags (Max 3)"
        emptyIndicator={
          <p className="text-center text-base leading-10 text-gray-600 dark:text-gray-400">
            No tags found
          </p>
        }
      />
    </div>
  );
};

export default TagSelector;
