import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { authSlice } from '../store/slices/auth';
import { wrapper } from '../store/store';
import { getAPI } from '../utils/FetchData';
import { parseCookies } from 'nookies';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  try {
    const { ozonaToken } = parseCookies(ctx);
    const response = await getAPI('user/profile', ozonaToken);
    store.dispatch(authSlice.actions.login(response.data));
  } catch (error: any) {
    console.log('Не авторизован');
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(App);
