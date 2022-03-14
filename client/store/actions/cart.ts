import { cartSlice } from './../slices/cart';
import { IProduct } from './../../interfaces/product';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';

export const addToCart = (product: IProduct, cart: IProduct[]) => async (dispatch: AppDispatch) => {
  try {
    if (product.inStock === 0) return dispatch(alertSlice.actions.errors('Товара нет в наличии'));

    const check = cart.every((item: any) => {
      return item._id !== product._id;
    });

    if (!check) {
      dispatch(alertSlice.actions.success(''));
      dispatch(alertSlice.actions.errors('Товар уже добавлен в корзину'));
    } else {
      dispatch(cartSlice.actions.addToCart([...cart, { ...product, quantity: 1 }]));

      localStorage.setItem('__next__cart__ozona', JSON.stringify(cart));

      dispatch(alertSlice.actions.errors(''));
      dispatch(alertSlice.actions.success('Товар добавлен в корзину'));
    }
  } catch (error) {
    dispatch(alertSlice.actions.errors('Ошибка при добавления товара в корзину'));
  }
};

export const decrease = (cartData: IProduct[], id: string) => async (dispatch: AppDispatch) => {
  const newData = [...cartData];
  newData.forEach((item) => {
    if (item._id === id) item.quantity! -= 1;
  });
  return dispatch(cartSlice.actions.addToCart(newData));
};

export const increase = (cartData: IProduct[], id: string) => async (dispatch: AppDispatch) => {
  const newData = [...cartData];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return dispatch(cartSlice.actions.addToCart(newData));
};
