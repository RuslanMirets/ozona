import { IProduct } from './../../models/product';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  products: IProduct[];
}

const initialState: AuthState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productReducer = productSlice.reducer;
