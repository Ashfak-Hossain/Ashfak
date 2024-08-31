import { JSONContent } from 'novel';

import { Tag } from '@/types/blog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostState {
  title: string;
  content: string;
  tags: Tag[];
  initialContent: JSONContent | null;
  coverImage: {
    url?: string;
    file?: File;
    isOpen: boolean;
  };
}

const initialState: PostState = {
  title: '',
  content: '',
  tags: [],
  initialContent: null,
  coverImage: {
    url: '',
    file: undefined,
    isOpen: false,
  },
};

const postsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    hydrateContent: (state, action: PayloadAction<JSONContent>) => {
      state.initialContent = action.payload;
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    resetAll: (state) => {
      state.title = '';
      state.content = '';
      state.tags = [];
      state.initialContent = null;
    },
    setCoverImageUrl: (state, action: PayloadAction<string>) => {
      state.coverImage.url = action.payload;
    },
    setCoverImageFile: (state, action: PayloadAction<File | undefined>) => {
      state.coverImage.file = action.payload;
    },
    openCoverImageModal: (state) => {
      state.coverImage.isOpen = true;
    },
    closeCoverImageModal: (state) => {
      state.coverImage.isOpen = false;
    },
    resetCoverImage: (state) => {
      state.coverImage.file = undefined;
      state.coverImage.url = '';
    },
  },
});

export const {
  setTitle,
  setContent,
  hydrateContent,
  setTags,
  resetAll,
  setCoverImageUrl,
  setCoverImageFile,
  openCoverImageModal,
  closeCoverImageModal,
  resetCoverImage,
} = postsSlice.actions;

export default postsSlice.reducer;
