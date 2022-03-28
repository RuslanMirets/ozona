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

export const increaseQuantity = (payload: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    return dispatch({ type: CartActionTypes.INCREMENT, payload });
  };
};

export const decreaseQuantity = (payload: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    return dispatch({ type: CartActionTypes.DECREMENT, payload });
  };
};

export const deleteItem = (cartData: IProduct[], id: number) => {
  return async (dispatch: Dispatch<CartAction | NotifyAction>) => {
    try {
      const newData = cartData.filter((item) => item.id !== id);
      dispatch({ type: CartActionTypes.ADD_TO_CART, payload: newData });
    } catch (error) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: 'Ошибка при удалении товара из корзины' },
      });
    }
  };
};

export const deleteItems = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    return dispatch({ type: CartActionTypes.ADD_TO_CART, payload: [] });
  };
};
