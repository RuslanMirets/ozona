import { orderSlice } from './../slices/order';
import { IOrder } from './../../interfaces/order';
import { postAPI } from './../../utils/fetchData';
import { alertSlice } from './../slices/alert';
import { AppDispatch } from '..';
import { parseCookies } from 'nookies';

export const createOrder = (dto: IOrder) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    const response = await postAPI('order', dto, ozonaToken);
    dispatch(orderSlice.actions.createOrder(response.data));
    dispatch(alertSlice.actions.success('Заказ успешно создан'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
