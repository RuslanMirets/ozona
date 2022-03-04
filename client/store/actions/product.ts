import { alertSlice } from './../slices/alert';
import { IProduct } from './../../models/product';
import { postAPI } from './../../utils/FetchData';
import { getAPI } from '../../utils/FetchData';
import { productSlice } from '../slices/product';
import { AppDispatch } from '../store';

export const getProducts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI('product');
    dispatch(productSlice.actions.getProducts(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const createProduct =
  (payload: { name: string; price: number; images: string[] }) => async (dispatch: AppDispatch) => {
    try {
      const response = await postAPI('product', payload);
      dispatch(productSlice.actions.createProduct(response.data));
      dispatch(alertSlice.actions.success('Товар добавлен'));
    } catch (error: any) {
      dispatch(alertSlice.actions.errors(error.response.data.message));
    }
  };
