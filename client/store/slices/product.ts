import { IProduct } from './../../models/product';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.products = action.payload.product.products;
    },
  },
});

export const productReducer = productSlice.reducer;
