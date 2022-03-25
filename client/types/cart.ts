import { IProduct } from './product';

export interface CartState {
  cartData: IProduct[];
}

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
}

interface AddToCartAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: IProduct[];
}

export type CartAction = AddToCartAction;
