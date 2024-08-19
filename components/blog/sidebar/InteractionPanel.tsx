'use client';

import { useLike } from '@/hooks/zustand/use-like';
import { cn } from '@/lib/utils';
import { Bookmark, Ellipsis, MessageSquare, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';

interface InteractionPanelProps {
  isLiked: boolean;
  likeCount: number;
}

const InteractionPanel: FC<InteractionPanelProps> = ({
  isLiked,
  likeCount,
}) => {
  const params = useParams();
  const slug = params.slug as string;
  const {
    hasLiked,
    toggleLike,
    initialize,
    likeCount: storeLikeCount,
  } = useLike();

  useEffect(() => {
    initialize(isLiked, likeCount);
  }, [isLiked, likeCount, initialize]);

  return (
    <div className="flex flex-col gap-8 pt-20 px-6 text-sm">
      <div className="flex items-center gap-2 flex-col">
        <Zap
          size={30}
          strokeWidth={hasLiked ? 0 : 1.5}
          fill={hasLiked ? '#f43f5e' : 'none'}
          className={cn(
            'hover:scale-110 hover:transition cursor-pointer',
            !hasLiked ? 'hover:text-rose-500' : ''
          )}
          onClick={() => toggleLike(slug)}
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
          strokeWidth={1.5}
          className="hover:scale-110 hover:transition cursor-pointer hover:text-indigo-600"
        />
        <span>20</span>
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
