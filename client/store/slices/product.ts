import { IProduct } from './../../interfaces/product';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface ProductState {
  products: IProduct[];
  product: IProduct | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.products = action.payload;
    },
    fetchProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.product };
    },
  },
});

export const productReducer = productSlice.reducer;
