import { IUser } from './../../interfaces/user';
import { IProduct } from './../../interfaces/product';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
  userData: IUser | null;
}

const initialState: ProductState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetPassword(state, action) {
      state.userData = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
