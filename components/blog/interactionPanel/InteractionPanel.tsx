'use client';

import { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Bookmark, MessageSquare, Zap } from 'lucide-react';
import { toast } from 'sonner';

import { toggleBookmark, toggleZap } from '@/actions/blog/interaction.action';
import InteractionOption from '@/components/blog/interactionPanel/interaction-option';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import {
  hydrateBookmark,
  toggleStoreBookmark,
} from '@/redux/features/bookmarks/bookmarksSlice';
import { hydrateZap, toggleStoreZap } from '@/redux/features/zaps/zapsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useLoginModal } from '@/zustand/use-login';

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
  totalBookmarks: totalBookmarksProps,
}) => {
  const user = useCurrentUser();
  const params = useParams();
  const slug = params.slug as string;

  const dispatch = useAppDispatch();
  const { totalCommentsCount } = useAppSelector(
    (state: RootState) => state.comments
  );

  const { totalBookmarks, bookmarked } = useAppSelector(
    (state: RootState) => state.bookmarks
  );

  const { zaped, totalZaps } = useAppSelector((state: RootState) => state.zaps);

  const { onOpen } = useLoginModal();

  useEffect(() => {
    dispatch(
      hydrateBookmark({
        bookmarked: isBookmarked,
        totalBookmarks: totalBookmarksProps,
      })
    );
  }, [dispatch, isBookmarked, totalBookmarks, totalBookmarksProps]);

  useEffect(() => {
    dispatch(hydrateZap({ zaped: isLiked, totalZaps: likeCount }));
  }, [dispatch, zaped, totalZaps, isLiked, likeCount]);

  const handleClick = async ({
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

    try {
      if (type === 'like') {
        await toggleZap({ slug });
        dispatch(toggleStoreZap());
      } else {
        await toggleBookmark({ slug });
        dispatch(toggleStoreBookmark());
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later');
    }
  };

  return (
    <div className="sticky top-0 mx-4 flex h-full flex-col gap-8 rounded-xl px-2 py-20 text-sm">
      <div className="flex flex-col items-center gap-2">
        <Zap
          size={30}
          strokeWidth={zaped ? 0 : 1.5}
          fill={zaped ? '#f43f5e' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !zaped ? 'hover:text-rose-500' : ''
          )}
          onClick={() => handleClick({ type: 'like', slug })}
        />
        <span>{totalZaps}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <MessageSquare
          size={30}
          strokeWidth={1.5}
          className="cursor-pointer hover:scale-110 hover:text-yellow-600 hover:transition"
        />
        <span>{totalCommentsCount}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Bookmark
          size={30}
          strokeWidth={bookmarked ? 0 : 1.5}
          fill={bookmarked ? '#4d80e6' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !bookmarked ? 'hover:text-mainAccent' : ''
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
