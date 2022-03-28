import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import { reducer, RootState } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';

const makeStore = wrapMakeStore(() =>
  createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(
        nextReduxCookieMiddleware({
          subtrees: ['cart'],
        }),
        thunk,
      ),
    ),
  ),
);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
