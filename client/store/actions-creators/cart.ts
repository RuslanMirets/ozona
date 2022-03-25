import { NotifyAction, NotifyActionTypes } from './../../types/notify';

import { Dispatch } from 'react';
import { CartAction, CartActionTypes } from '../../types/cart';
import { IProduct } from '../../types/product';

export const addToCart = (product: IProduct, cart: IProduct[]) => {
  return async (dispatch: Dispatch<CartAction | NotifyAction>) => {
    try {
      if (product.inStock === 0)
        return dispatch({
          type: NotifyActionTypes.NOTIFY,
          payload: { errors: 'Товара нет в наличии' },
        });

      const check = cart.every((item: any) => {
        return item.id !== product.id;
      });

      if (!check) {
        dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: '' } });
        dispatch({
          type: NotifyActionTypes.NOTIFY,
          payload: { errors: 'Товар уже добавлен в корзину' },
        });
      } else {
        dispatch({
          type: CartActionTypes.ADD_TO_CART,
          payload: [...cart, { ...product, quantity: 1 }],
        });

        localStorage.setItem('__next__cart__ozona', JSON.stringify(cart));

        dispatch({ type: NotifyActionTypes.NOTIFY, payload: { errors: '' } });
        dispatch({
          type: NotifyActionTypes.NOTIFY,
          payload: { success: 'Товар добавлен в корзину' },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
