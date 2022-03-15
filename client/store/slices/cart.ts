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
    INCREMENT(state, action) {
      const { cartData } = state;
      const existingItem = cartData.find(({ _id }) => _id === action.payload);
      if (existingItem) {
        return {
          ...state,
          cartData: cartData.map((item) =>
            item._id === existingItem._id
              ? { ...existingItem, quantity: existingItem.quantity + 1 }
              : item,
          ),
        };
      }
      return { ...state, cartData: [...state.cartData, { ...action.payload, quantity: 1 }] };
    },
    DECREMENT: (state, action) => {
      const { cartData } = state;
      const existingItem = cartData.find(({ _id }) => _id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          cartData: cartData.map((item) =>
            item._id === existingItem._id
              ? { ...existingItem, quantity: existingItem.quantity - 1 }
              : item,
          ),
        };
      }
      return { ...state, cartData: cartData.filter((item) => item._id !== action.payload) };
    },
  },
});

export const { INCREMENT, DECREMENT } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
