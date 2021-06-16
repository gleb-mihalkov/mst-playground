import NextApp from 'next/app';

import App from 'components/app/App';

/**
 * Точка входа приложения.
 */
export default class Root extends NextApp {
  /**
   * @inheritdoc
   */
  public componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  /**
   * @inheritdoc
   */
  public render() {
    const { Component, pageProps, router } = this.props;

    return (
      <App pathname={router.pathname}>
        <Component {...pageProps} />
      </App>
    );
  }
}
