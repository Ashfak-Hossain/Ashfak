import { unSavePost, bookmarkPost } from '@/actions/blog/interaction.action';
import { create } from 'zustand';

type BookmarkStore = {
  hasBookmarked: boolean;
  bookmarkCount: number;
  initializeBookmark: (isBookmarked: boolean, bookmarkCount: number) => void;
  toggleBookmark: (slug: string) => Promise<void>;
};

export const useBookmark = create<BookmarkStore>((set, get) => ({
  hasBookmarked: false,
  bookmarkCount: 0,
  initializeBookmark: (isBookmarked, bookmarkCount) => {
    set({
      hasBookmarked: isBookmarked ? true : false,
      bookmarkCount,
    });
  },
  toggleBookmark: async (slug: string) => {
    try {
      const hasBookmarked = get().hasBookmarked;
      const response = await (hasBookmarked ? unSavePost : bookmarkPost)({
        slug,
      });

      set((state) => ({
        hasBookmarked: !state.hasBookmarked,
        likeCount:
          response?.bookmarkCount ||
          (hasBookmarked ? state.bookmarkCount - 1 : state.bookmarkCount + 1),
      }));
    } catch (error) {
      console.error('Failed to toggle like', error);
    }
  },
}));
