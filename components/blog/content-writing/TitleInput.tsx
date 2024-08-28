'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { useContent } from '@/zustand/use-content';

const TitleInput = ({ isPending }: { isPending: boolean }) => {
  const { title, setTitle } = useContent();

  return (
    <div className="py-5">
      <Input
        disabled={isPending}
        placeholder="Title"
        className="no-focus h-14 text-lg font-medium"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );
};

export default TitleInput;
