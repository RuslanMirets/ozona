import { orderSlice } from './../slices/order';
import { IOrder } from './../../interfaces/order';
import { postAPI, getAPI, patchAPI } from './../../utils/fetchData';
import { alertSlice } from './../slices/alert';
import { AppDispatch } from '..';
import { parseCookies } from 'nookies';
import router from 'next/router';

export const createOrder = (dto: IOrder) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    const response = await postAPI('order', dto, ozonaToken);
    const newOrder = {
      ...response.data,
    };
    dispatch(orderSlice.actions.createOrder(newOrder));
    dispatch(alertSlice.actions.success('Заказ успешно создан'));
    router.push(`/order/${newOrder._id}`);
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const getUserOrders = (context: any) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies(context);
    const response = await getAPI('order/user', ozonaToken);
    dispatch(orderSlice.actions.getUserOrders(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const getDetailOrder = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI(`order/${id}`);
    dispatch(orderSlice.actions.getDetailOrder(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors('Не удалось загрузить детали заказа'));
  }
};

export const getOrders = (context: any) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies(context);
    const response = await getAPI('order', ozonaToken);
    dispatch(orderSlice.actions.getOrders(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors('Не удалось загрузить детали заказа'));
  }
};

export const deliveredOrder = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    const response = await patchAPI(`order/delivered/${id}`, null as any, ozonaToken);
    dispatch(orderSlice.actions.deliveredOrder(response.data));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
