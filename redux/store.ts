import commentsReducer from '@/redux/features/comments/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      comments: commentsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
