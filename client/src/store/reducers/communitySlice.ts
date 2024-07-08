import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCommunity: null,
  loading: false,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCurrentCommunity: (state, action) => {
      state.currentCommunity = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentCommunity, setLoading } = communitySlice.actions;

export default communitySlice.reducer;
