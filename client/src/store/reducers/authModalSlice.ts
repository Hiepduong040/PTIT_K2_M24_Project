
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthModalState {
  open: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

const initialState: AuthModalState = {
  open: false,
  view: 'login',
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<'login' | 'signup' | 'resetPassword'>) => {
      state.open = true;
      state.view = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setView: (state, action: PayloadAction<'login' | 'signup' | 'resetPassword'>) => {
      state.view = action.payload;
    },
  },
});

export const { openModal, closeModal, setView } = authModalSlice.actions;
export default authModalSlice.reducer;
