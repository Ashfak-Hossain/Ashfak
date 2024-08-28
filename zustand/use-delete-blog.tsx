import { create } from 'zustand';

type DeleteBlogStore = {
  isOpen: boolean;
  slug: string;
  setSlug: (slug: string) => void;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteBlogModal = create<DeleteBlogStore>((set) => ({
  isOpen: false,
  slug: '',
  setSlug: (slug: string) => set({ slug }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
