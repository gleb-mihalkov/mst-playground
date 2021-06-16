import { AppProps } from 'next/app';

import App from 'components/app/App';

const Root = ({ Component, pageProps }: AppProps) => (
  <App>
    <Component {...pageProps} />
  </App>
);

export default Root;
