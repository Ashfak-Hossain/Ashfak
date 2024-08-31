'use client';

import { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';

import BookmarkButton from '@/components/blog/interactionPanel/bookmark-button';
import CommentButton from '@/components/blog/interactionPanel/comment-button';
import InteractionOption from '@/components/blog/interactionPanel/interaction-option';
import ZapButton from '@/components/blog/interactionPanel/zap-button';
import { hydrateBookmark } from '@/redux/features/bookmarks/bookmarksSlice';
import { hydrateZap } from '@/redux/features/zaps/zapsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

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

  return (
    <div className="sticky top-0 mx-4 flex h-full flex-col gap-8 rounded-xl px-2 py-20 text-sm">
      <div className="flex flex-col items-center gap-2">
        <ZapButton zaped={zaped} slug={slug} />
        <span>{totalZaps}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <CommentButton />
        <span>{totalCommentsCount}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BookmarkButton bookmarked={bookmarked} slug={slug} />
        <span>{totalBookmarks}</span>
      </div>

      <div className="flex justify-center">
        <InteractionOption slug={slug} />
      </div>
    </div>
  );
};

export default InteractionPanel;
