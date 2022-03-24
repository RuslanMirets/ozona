import { ProductActionTypes } from './../../types/product';
import { Dispatch } from 'react';
import { ProductAction } from '../../types/product';
import { getAPI } from '../../utils/fetchData';

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await getAPI('product');
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
