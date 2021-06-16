import BaseDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { Children } from 'react';

/**
 * Отображает компонент корневого документа.
 */
class Document extends BaseDocument {
  /**
   * @inheritdoc
   */
  public static getInitialProps = async (context: DocumentContext) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await BaseDocument.getInitialProps(context);

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  };

  /**
   * @inheritdoc
   */
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
