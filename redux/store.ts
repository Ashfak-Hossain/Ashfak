import bookmarksReducer from '@/redux/features/bookmarks/bookmarksSlice';
import commentsReducer from '@/redux/features/comments/commentsSlice';
import zapsReducer from '@/redux/features/zaps/zapsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      comments: commentsReducer,
      bookmarks: bookmarksReducer,
      zaps: zapsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
