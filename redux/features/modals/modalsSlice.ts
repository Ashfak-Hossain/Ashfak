import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  loginModal: {
    isOpen: boolean;
  };
  deleteBlogModal: {
    isOpen: boolean;
    slug: string;
  };
}

const initialState: ModalState = {
  loginModal: {
    isOpen: false,
  },
  deleteBlogModal: {
    isOpen: false,
    slug: '',
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal.isOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModal.isOpen = false;
    },
    setSlug: (state, action: PayloadAction<string>) => {
      state.deleteBlogModal.slug = action.payload;
    },
    openDeleteBlogModal: (state) => {
      state.deleteBlogModal.isOpen = true;
    },
    closeDeleteBlogModal: (state) => {
      state.deleteBlogModal.isOpen = false;
    },
  },
});

export default modalsSlice.reducer;

export const {
  openLoginModal,
  closeLoginModal,
  setSlug,
  openDeleteBlogModal,
  closeDeleteBlogModal,
} = modalsSlice.actions;
