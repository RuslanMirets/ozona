import { OrderActionTypes } from './../../types/order';
import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { NotifyAction, NotifyActionTypes } from '../../types/notify';
import { IOrder, OrderAction } from '../../types/order';
import { postAPI } from '../../utils/fetchData';

export const createOrder = (data: IOrder) => {
  return async (dispatch: Dispatch<OrderAction | NotifyAction>) => {
    try {
      const { ozonaToken } = parseCookies();
      const response = await postAPI('order', data, ozonaToken);
      dispatch({ type: OrderActionTypes.CREATE_ORDER, payload: response.data });
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Заказ успешно создан' } });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};
