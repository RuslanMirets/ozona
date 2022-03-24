import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import { reducer, RootState } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// create a makeStore function
const makeStore = (context: Context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
