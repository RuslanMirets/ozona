import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';
import { HYDRATE } from 'next-redux-wrapper';

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // return {
      //   ...state,
      //   ...action.payload.auth.data,
      // };
      state.userData = action.payload.auth.userData;
    },
  },
});

export const authReduer = authSlice.reducer;
