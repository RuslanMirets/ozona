import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';

export interface AuthState {
  userData: IUser | null;
}

const initialState: AuthState = {
  userData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.userData = action.payload;
    },
  },
});

export const authReduer = authSlice.reducer;
