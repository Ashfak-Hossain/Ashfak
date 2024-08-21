'use client';

import LoginModal from '@/components/shared/modals/login-modal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useBookmark } from '@/hooks/zustand/use-bookmark';
import { useLike } from '@/hooks/zustand/use-like';
import { useLoginModal } from '@/hooks/zustand/use-login';
import { cn } from '@/lib/utils';
import { Bookmark, Ellipsis, MessageSquare, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';

interface InteractionPanelProps {
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
  totalBookmarks: number;
}

const InteractionPanel: FC<InteractionPanelProps> = ({
  isLiked,
  likeCount,
  isBookmarked,
  totalBookmarks,
}) => {
  const user = useCurrentUser();
  const params = useParams();
  const slug = params.slug as string;
  const {
    hasLiked,
    toggleLike,
    initializeLike,
    likeCount: storeLikeCount,
  } = useLike();

  const { hasBookmarked, toggleBookmark, initializeBookmark } = useBookmark();
  const { onOpen } = useLoginModal();

  useEffect(() => {
    initializeLike(isLiked, likeCount);
  }, [isLiked, likeCount, initializeLike]);

  useEffect(() => {
    initializeBookmark(isBookmarked, totalBookmarks);
  }, [isBookmarked, totalBookmarks, initializeBookmark]);

  const handleClick = ({
    type,
    slug,
  }: {
    type: 'like' | 'bookmark';
    slug: string;
  }) => {
    if (!user) {
      onOpen();
      return;
    }

    if (type === 'like') {
      toggleLike(slug);
    } else {
      toggleBookmark(slug);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-20 px-2 mx-4 text-sm sticky top-0 h-full rounded-xl">
      <div className="flex items-center gap-2 flex-col">
        <Zap
          size={30}
          strokeWidth={hasLiked ? 0 : 1.5}
          fill={hasLiked ? '#f43f5e' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !hasLiked ? 'hover:text-rose-500' : ''
          )}
          onClick={() => handleClick({ type: 'like', slug })}
        />
        <span>{storeLikeCount}</span>
      </div>

      <div className="flex items-center gap-2 flex-col">
        <MessageSquare
          size={30}
          strokeWidth={1.5}
          className="hover:scale-110 hover:transition cursor-pointer hover:text-yellow-600"
        />
        <span>20</span>
      </div>

      <div className="flex items-center gap-2 flex-col">
        <Bookmark
          size={30}
          strokeWidth={hasBookmarked ? 0 : 1.5}
          fill={hasBookmarked ? '#4d80e6' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !hasBookmarked ? 'hover:bg-mainAccent' : ''
          )}
          onClick={() => handleClick({ type: 'bookmark', slug })}
        />
        <span>{totalBookmarks}</span>
      </div>

      <div className="flex items-center gap-2 flex-col">
        <Ellipsis
          size={30}
          strokeWidth={1.5}
          className="hover:scale-110 hover:transition cursor-pointer hover:text-green-700"
        />
      </div>
    </div>
  );
};

export default InteractionPanel;
