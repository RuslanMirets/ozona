import { CartAction, CartActionTypes, CartState } from '../../types/cart';

const initialState: CartState = {
  // cartData:
  //   typeof window !== 'undefined' && localStorage.getItem('__next__cart__ozona')
  //     ? JSON.parse(localStorage.getItem('__next__cart__ozona') || '')
  //     : [],
  cartData: [],
};

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return { ...state, cartData: action.payload };
    default:
      return state;
  }
};
