import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.feature';
import postReducer from './features/posts/post.feature';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
