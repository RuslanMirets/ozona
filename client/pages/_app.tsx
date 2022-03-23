import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { Api } from '../utils/api';
import { login } from '../redux/slices/user';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  try {
    const userData = await Api(ctx).user.getProfile();
    store.dispatch(login(userData));
    if (ctx.asPath === '/login' || ctx.asPath === '/register') {
      ctx.res?.writeHead(302, {
        Location: '/403',
      });
      ctx.res?.end();
    }
  } catch (error: any) {
    console.log(error.response.data.message);
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(App);
