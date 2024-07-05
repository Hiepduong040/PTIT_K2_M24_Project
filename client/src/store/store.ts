// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authModalReducer } from './reducers/authModalSlice';

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});


export default store;

