import { OrderAction, OrderState, OrderActionTypes } from './../../types/order';

const initialState: OrderState = {
  orderData: null,
  userOrders: [],
  detailOrder: null,
};

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return { ...state, orderData: action.payload };
    case OrderActionTypes.GET_USER_ORDERS:
      return { ...state, userOrders: action.payload };
    case OrderActionTypes.GET_DETAIL_ORDER:
      return { ...state, detailOrder: action.payload };
    default:
      return state;
  }
};
