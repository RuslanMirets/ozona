import { NotifyState, NotifyAction, NotifyActionTypes } from './../../types/notify';

const initialState: NotifyState = {
  notify: null,
};

export const notifyReducer = (state = initialState, action: NotifyAction): NotifyState => {
  switch (action.type) {
    case NotifyActionTypes.NOTIFY:
      return { notify: action.payload };
    default:
      return state;
  }
};
