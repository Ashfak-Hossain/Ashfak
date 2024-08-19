import { likePost, unlikePost } from '@/actions/blog/interaction.action';
import { create } from 'zustand';

type LikeStore = {
  hasLiked: boolean;
  likeCount: number;
  initialize: (isLiked: boolean, likeCount: number) => void;
  toggleLike: (slug: string) => Promise<void>;
};

export const useLike = create<LikeStore>((set, get) => ({
  hasLiked: false,
  likeCount: 0,
  initialize: (isLiked, likeCount) => {
    set({
      hasLiked: isLiked ? true : false,
      likeCount,
    });
  },
  toggleLike: async (slug: string) => {
    try {
      const hasLiked = get().hasLiked;
      const response = await (hasLiked ? unlikePost : likePost)({ slug });

      set((state) => ({
        hasLiked: !state.hasLiked,
        likeCount:
          response?.likeCount ||
          (hasLiked ? state.likeCount - 1 : state.likeCount + 1),
      }));
    } catch (error) {
      console.error('Failed to toggle like', error);
    }
  },
}));
