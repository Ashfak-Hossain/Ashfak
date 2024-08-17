import { create } from 'zustand';

type CoverImageStore = {
  url?: string;
  file?: File;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (file: File) => void;
  onReset: () => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
  url: '',
  file: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onReplace: (file) => set({ file }),
  onReset: () => set({ file: undefined }),
}));
