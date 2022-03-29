import { OrderAction, OrderState, OrderActionTypes } from './../../types/order';

const initialState: OrderState = {
  orderData: null,
  orders: [],
  detailOrder: null,
};

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return { ...state, orderData: action.payload };
    case OrderActionTypes.GET_USER_ORDERS:
      return { ...state, orders: action.payload };
    case OrderActionTypes.GET_DETAIL_ORDER:
      return { ...state, detailOrder: action.payload };
    case OrderActionTypes.GET_ORDERS:
      return { ...state, orders: action.payload };
    case OrderActionTypes.DELIVERED_ORDER:
      return { ...state, detailOrder: { ...state.detailOrder, delivered: action.payload } };
    default:
      return state;
  }
};
