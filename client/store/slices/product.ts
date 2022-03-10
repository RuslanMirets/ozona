import { IProduct } from './../../interfaces/product';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProducts(state, action) {
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
