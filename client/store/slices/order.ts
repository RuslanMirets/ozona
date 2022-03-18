import { IOrder } from './../../interfaces/order';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface OrderState {
  orderData: IOrder | null;
  orders: IOrder[];
}

const initialState: OrderState = {
  orderData: null,
  orders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder(state, action) {
      state.orderData = action.payload;
    },
    getUserOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.orders = action.payload.order.orders;
    },
  },
});

export const orderReducer = orderSlice.reducer;
