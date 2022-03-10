import { productSlice } from './../slices/product';
import { getAPI } from './../../utils/fetchData';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI('product');
    dispatch(productSlice.actions.fetchProducts(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors('Не удалось загрузить товары'));
  }
};
