import { IProduct } from './../../models/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  products: IProduct[];
  product: IProduct | null;
}

const initialState: AuthState = {
  products: [],
  product: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    createProduct(state, action: PayloadAction<IProduct>) {
      state.product = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.products = action.payload.product.products;
    },
  },
});

export const productReducer = productSlice.reducer;
