import { OrderActionTypes } from './../../types/order';
import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { NotifyAction, NotifyActionTypes } from '../../types/notify';
import { IOrder, OrderAction } from '../../types/order';
import { getAPI, postAPI } from '../../utils/fetchData';
import router from 'next/router';

export const createOrder = (data: IOrder) => {
  return async (dispatch: Dispatch<OrderAction | NotifyAction>) => {
    try {
      const { ozonaToken } = parseCookies();
      const response = await postAPI('order', data, ozonaToken);
      const newOrder = {
        ...response.data,
      };
      dispatch({ type: OrderActionTypes.CREATE_ORDER, payload: newOrder });
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Заказ успешно создан' } });
      router.push(`/order/${newOrder._id}`);
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};

export const getUserOrders = (context: any) => {
  return async (dispatch: Dispatch<OrderAction | NotifyAction>) => {
    try {
      const { ozonaToken } = parseCookies(context);
      const response = await getAPI('order/user', ozonaToken);
      dispatch({ type: OrderActionTypes.GET_USER_ORDERS, payload: response.data });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};

export const getDetailOrder = (id: string) => {
  return async (dispatch: Dispatch<OrderAction | NotifyAction>) => {
    try {
      const response = await getAPI(`order/${id}`);
      dispatch({ type: OrderActionTypes.GET_DETAIL_ORDER, payload: response.data });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};
