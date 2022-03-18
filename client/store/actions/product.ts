import { IProduct } from './../../interfaces/product';
import { productSlice } from './../slices/product';
import { getAPI } from './../../utils/fetchData';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';
import axios from 'axios';

export const fetchProducts = (context: any) => async (dispatch: AppDispatch) => {
  try {
    // const response = await getAPI('product');
    const response = await axios.get('http://localhost:5000/product', context);
    dispatch(productSlice.actions.fetchProducts(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors('Не удалось загрузить товары'));
  }
};

export const fetchProduct = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI(`product/${id}`);
    dispatch(productSlice.actions.fetchProduct(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors('Не удалось загрузить информацию о товаре'));
  }
};
