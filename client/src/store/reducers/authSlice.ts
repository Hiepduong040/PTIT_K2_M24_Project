import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/interfaces';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user')!) || null, // Khởi tạo từ localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Lưu trữ vào localStorage
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage khi logout
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
