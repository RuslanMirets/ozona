import '../styles/globals.scss';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import { NextThunkDispatch, wrapper } from '../store';
import { getProfile } from '../store/actions-creators/user';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx }) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(getProfile(ctx));

  return { pageProps: {} };
});

export default wrapper.withRedux(App);
