import { create } from 'zustand';

type ContentStore = {
  title: string;
  content: string;
  tags: { value: string; label: string }[];
  initialContent: string | undefined;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setInitialContent: (content?: string) => void;
  setTags: (tags: { value: string; label: string }[]) => void;
  onResetAll: () => void;
};

export const useNewContent = create<ContentStore>((set) => {
  return {
    title: '',
    content: '',
    tags: [],
    initialContent: '',
    setTitle: (title) => set({ title }),
    setTags: (tags) => set({ tags }),
    setContent: (content) => set({ content }),
    setInitialContent: (initialContent) => set({ initialContent }),
    onResetAll: () => {
      set({ title: '', content: '', initialContent: '', tags: [] });
    },
  };
});
