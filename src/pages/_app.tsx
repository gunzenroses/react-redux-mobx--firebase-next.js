import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { wrapper } from 'redux/store';

import nextI18NextConfig from '../../next-i18next.config.js';
import '../scss/main.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(appWithTranslation(App, nextI18NextConfig));
