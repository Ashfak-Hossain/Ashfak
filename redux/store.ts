import bookmarksReducer from '@/redux/features/bookmarks/bookmarksSlice';
import commentsReducer from '@/redux/features/comments/commentsSlice';
import modalsReducer from '@/redux/features/modals/modalsSlice';
import postsReducer from '@/redux/features/posts/postsSlice';
import zapsReducer from '@/redux/features/zaps/zapsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      comments: commentsReducer,
      bookmarks: bookmarksReducer,
      zaps: zapsReducer,
      modals: modalsReducer,
      posts: postsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
