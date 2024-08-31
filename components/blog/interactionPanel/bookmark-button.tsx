'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

import { toggleBookmark } from '@/actions/blog/interaction.action';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import { toggleStoreBookmark } from '@/redux/features/bookmarks/bookmarksSlice';
import { openLoginModal } from '@/redux/features/modals/modalsSlice';
import { useAppDispatch } from '@/redux/hooks';

interface BookmarkButtonProps {
  bookmarked: boolean;
  slug: string;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({ bookmarked, slug }) => {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<boolean>(bookmarked);

  const debounceToggleBookmark = useDebouncedCallback(async (slug: string) => {
    try {
      await toggleBookmark({ slug });
    } catch (error) {
      toast.error('Something went wrong');
      setState((prevState) => !prevState);
      dispatch(toggleStoreBookmark());
    }
  }, 500);

  const handleClick = async () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }

    setState((prevState) => !prevState);
    dispatch(toggleStoreBookmark());

    debounceToggleBookmark(slug);
  };

  return (
    <div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Bookmark
          size={30}
          strokeWidth={state ? 0 : 1.5}
          fill={state ? '#4d80e6' : 'none'}
          className={cn(
            'cursor-pointer',
            !bookmarked ? 'hover:text-mainAccent' : ''
          )}
          onClick={handleClick}
        />
      </motion.div>
    </div>
  );
};

export default BookmarkButton;
