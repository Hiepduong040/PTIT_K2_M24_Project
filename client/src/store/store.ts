
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authSlice';
import communityReducer from '../store/reducers/communitySlice';
import postReducer from '../store/reducers/postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    community: communityReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
