import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { isAuth } from '../store/actions/auth';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

function App({ Component, pageProps }: AppProps) {
  const { cartData } = useAppSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('__next__cart__ozona', JSON.stringify(cartData));
  }, [cartData]);

  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx }) => {
  await store.dispatch(isAuth(ctx));
  return { pageProps: {} };
});

export default wrapper.withRedux(App);
