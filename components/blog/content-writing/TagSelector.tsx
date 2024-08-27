'use client';

import React from 'react';
import { toast } from 'sonner';

import MultipleSelector from '@/components/ui/multi-select';
import { useContent } from '@/hooks/zustand/use-content';

const TagSelector = ({
  initialTags,
}: {
  initialTags: { value: string; label: string }[];
}) => {
  const { setTags } = useContent();

  return (
    <div>
      <MultipleSelector
        maxSelected={3}
        onMaxSelected={(maxLimit) => {
          toast.error(`You have reached max selected: ${maxLimit}`);
        }}
        onChange={(tags) => setTags(tags)}
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
