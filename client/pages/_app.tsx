import '../styles/globals.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { NextThunkDispatch, wrapper } from '../store';
import { getProfile } from '../store/actions-creators/user';
import { useAppSelector } from '../hooks/useAppSelector';

function App({ Component, pageProps }: AppProps) {
  const { cartData } = useAppSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem('__next__cart__ozona', JSON.stringify(cartData));
  }, [cartData]);

  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx }) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(getProfile(ctx));

  return { pageProps: {} };
});

export default wrapper.withRedux(App);
