'use client';

import { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Bookmark, MessageSquare, Zap } from 'lucide-react';

// import LoginModal from '@/components/shared/modals/login-modal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import { useBookmark } from '@/zustand/use-bookmark';
import { useLike } from '@/zustand/use-like';
import { useLoginModal } from '@/zustand/use-login';

import InteractionOption from './interaction-option';

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
    <div className="sticky top-0 mx-4 flex h-full flex-col gap-8 rounded-xl px-2 py-20 text-sm">
      <div className="flex flex-col items-center gap-2">
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

      <div className="flex flex-col items-center gap-2">
        <MessageSquare
          size={30}
          strokeWidth={1.5}
          className="cursor-pointer hover:scale-110 hover:text-yellow-600 hover:transition"
        />
        <span>20</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Bookmark
          size={30}
          strokeWidth={hasBookmarked ? 0 : 1.5}
          fill={hasBookmarked ? '#4d80e6' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !hasBookmarked ? 'hover:text-mainAccent' : ''
          )}
          onClick={() => handleClick({ type: 'bookmark', slug })}
        />
        <span>{totalBookmarks}</span>
      </div>

      <InteractionOption slug={slug} />
    </div>
  );
};

export default InteractionPanel;
