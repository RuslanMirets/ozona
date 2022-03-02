import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { profile } from '../store/actions/user';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx }) => {
  await store.dispatch(profile(ctx));
  return { pageProps: {} };
});

export default wrapper.withRedux(App);
