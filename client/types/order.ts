import { IProduct } from './product';
import { IUser } from './user';

export interface IOrder {
  id?: number;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  total: number;
  delivered?: boolean;
  user?: IUser[];
  cart: IProduct[];
}

export interface OrderState {
  orderData: IOrder | null;
  orders: IOrder[];
  detailOrder: IOrder | null;
}

export enum OrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  GET_USER_ORDERS = 'GET_USER_ORDERS',
  GET_DETAIL_ORDER = 'GET_DETAIL_ORDER',
  GET_ORDERS = 'GET_ORDERS',
  DELIVERED_ORDER = 'DELIVERED_ORDER',
}

interface CreateOrderAction {
  type: OrderActionTypes.CREATE_ORDER;
  payload: IOrder;
}
interface GetUserOrdersAction {
  type: OrderActionTypes.GET_USER_ORDERS;
  payload: IOrder[];
}
interface GetDetailOrderAction {
  type: OrderActionTypes.GET_DETAIL_ORDER;
  payload: IOrder;
}
interface GetOrdersAction {
  type: OrderActionTypes.GET_ORDERS;
  payload: IOrder[];
}
interface DeliveredOrderAction {
  type: OrderActionTypes.DELIVERED_ORDER;
  payload: any;
}

export type OrderAction =
  | CreateOrderAction
  | GetUserOrdersAction
  | GetDetailOrderAction
  | GetOrdersAction
  | DeliveredOrderAction;
