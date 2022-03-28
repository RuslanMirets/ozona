import { CartAction, CartActionTypes, CartState } from '../../types/cart';

const initialState: CartState = {
  cartData: [],
};

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return { ...state, cartData: action.payload };
    case CartActionTypes.INCREMENT:
      return {
        ...state,
        cartData: state.cartData.map((product) =>
          product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product,
        ),
      };
    case CartActionTypes.DECREMENT:
      return {
        ...state,
        cartData: state.cartData.map((product) =>
          product.id === action.payload
            ? {
                ...product,
                quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
              }
            : product,
        ),
      };
    default:
      return state;
  }
};
