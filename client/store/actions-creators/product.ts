import { ProductActionTypes } from './../../types/product';
import { Dispatch } from 'react';
import { ProductAction } from '../../types/product';
import { getAPI } from '../../utils/fetchData';

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await getAPI('product');
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS, payload: response.data });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};

export const fetchProductDetail = (id: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await getAPI(`product/${id}`);
      dispatch({ type: ProductActionTypes.FETCH_PRODUCT_DETAIL, payload: response.data });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};
