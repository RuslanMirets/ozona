import { IProduct } from './product';

export interface CartState {
  cartData: IProduct[];
}

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

interface AddToCartAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: IProduct[];
}
interface IncrementAction {
  type: CartActionTypes.INCREMENT;
  payload: string;
}
interface DecrementAction {
  type: CartActionTypes.DECREMENT;
  payload: string;
}

export type CartAction = AddToCartAction | IncrementAction | DecrementAction;
