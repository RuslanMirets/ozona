import { IProduct } from './product';

export interface IOrder {
  id?: number;
  address: string;
  phone: string;
  cart: IProduct[];
}

export interface OrderState {
  orderData: IOrder[];
}

export enum OrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
}

interface CreateOrderAction {
  type: OrderActionTypes.CREATE_ORDER;
  payload: IOrder[];
}

export type OrderAction = CreateOrderAction;
