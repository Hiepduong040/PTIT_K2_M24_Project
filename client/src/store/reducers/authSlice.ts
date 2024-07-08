import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loadingUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoadingUser: (state, action) => {
      state.loadingUser = action.payload;
    },
  },
});

export const { setUser, setLoadingUser } = authSlice.actions;

export default authSlice.reducer;
