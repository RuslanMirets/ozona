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
