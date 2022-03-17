import { IUser } from './../../interfaces/user';
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
  reducers: {},
});

export const userReducer = userSlice.reducer;
