import { userReducer } from './slices/user';
import { orderReducer } from './slices/order';
import { cartReducer } from './slices/cart';
import { productReducer } from './slices/product';
import { alertReducer } from './slices/alert';
import { authReducer } from './slices/auth';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      alert: alertReducer,
      product: productReducer,
      cart: cartReducer,
      order: orderReducer,
      user: userReducer,
    },
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
