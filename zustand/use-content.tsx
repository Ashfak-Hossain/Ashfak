import { JSONContent } from 'novel';
import { create } from 'zustand';

type ContentStore = {
  title: string;
  content: string;
  tags: { value: string; label: string }[];
  initialContent: JSONContent | null;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setInitialContent: (initialContent: JSONContent) => void;
  setTags: (tags: { value: string; label: string }[]) => void;
  onResetAll: () => void;
};

export const useContent = create<ContentStore>((set) => {
  return {
    title: '',
    content: '',
    tags: [],
    initialContent: null,
    setTitle: (title) => set({ title }),
    setTags: (tags) => set({ tags }),
    setContent: (content) => set({ content }),
    setInitialContent: (initialContent) => set({ initialContent }),
    onResetAll: () => {
      set({ title: '', content: '', initialContent: null, tags: [] });
    },
  };
});
