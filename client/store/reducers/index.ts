import { productReducer } from './product';
import { notifyReducer } from './notify';
import { userReducer } from './user';
import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  user: userReducer,
  notify: notifyReducer,
  product: productReducer,
});

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
