import { OrderAction, OrderState, OrderActionTypes } from './../../types/order';

const initialState: OrderState = {
  orderData: [],
};

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return { ...state, orderData: action.payload };
    default:
      return state;
  }
};
