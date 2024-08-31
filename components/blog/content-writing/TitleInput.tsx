'use client';

import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { setTitle } from '@/redux/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const TitleInput = ({ isPending }: { isPending: boolean }) => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.posts.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
    debounceUpdates(e.target.value);
  };

  const debounceUpdates = useDebouncedCallback((title: string) => {
    localStorage.setItem('postTitle', title);
  }, 500);

  useEffect(() => {
    const storedTitle = localStorage.getItem('postTitle');
    if (storedTitle) {
      dispatch(setTitle(storedTitle));
    }
    if (isPending) {
      localStorage.removeItem('postTitle');
    }
  }, [dispatch, isPending]);

  return (
    <div className="py-5">
      <Input
        disabled={isPending}
        placeholder="Title"
        className="no-focus h-14 text-lg font-medium"
        onChange={handleChange}
        value={title}
      />
    </div>
  );
};

export default TitleInput;
