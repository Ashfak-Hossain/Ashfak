import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkState {
  bookmarked: boolean;
  totalBookmarks: number;
}

const initialState: BookmarkState = {
  bookmarked: false,
  totalBookmarks: 0,
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    hydrateBookmark: (state, action: PayloadAction<BookmarkState>) => {
      state.bookmarked = action.payload.bookmarked;
      state.totalBookmarks = action.payload.totalBookmarks;
    },
    toggleStoreBookmark: (state) => {
      state.bookmarked = !state.bookmarked;
      state.totalBookmarks = state.bookmarked
        ? state.totalBookmarks - 1
        : state.totalBookmarks + 1;
    },
  },
});

export default bookmarksSlice.reducer;
export const { hydrateBookmark, toggleStoreBookmark } = bookmarksSlice.actions;
