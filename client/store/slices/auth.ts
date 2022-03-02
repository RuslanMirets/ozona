import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  userData: IUser | null;
  registerData: IUser | null;
}

const initialState: AuthState = {
  userData: null,
  registerData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.userData = action.payload;
    },
    register(state, action: PayloadAction<IUser>) {
      state.registerData = action.payload;
    },
    logout(state) {
      state.userData = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.userData = action.payload.auth.userData;
    },
  },
});

export const authReducer = authSlice.reducer;
