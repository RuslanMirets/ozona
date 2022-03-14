import { IProduct } from './../../interfaces/product';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cartData: IProduct[];
}

const initialState: CartState = {
  cartData:
    typeof window !== 'undefined' && localStorage.getItem('__next__cart__ozona')
      ? JSON.parse(localStorage.getItem('__next__cart__ozona') || '')
      : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartData = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
