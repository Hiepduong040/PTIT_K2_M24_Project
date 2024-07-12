import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './reducers/authModalSlice';
import authReducer from './reducers/authSlice';  
import communityReducer from './reducers/communitySlice';

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    user: authReducer,
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
