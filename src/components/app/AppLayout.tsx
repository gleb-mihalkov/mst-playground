import { FC, PropsWithChildren } from 'react';

import RouterHelper from 'helpers/RouterHelper';
import Route from 'consts/Route';
import AccountLayout from 'components/account/AccountLayout';
import LoginLayout from 'components/login/LoginLayout';

/**
 * Свойства компонента.
 */
type Props = PropsWithChildren<{
  /**
   * Путь из адреса текущей страницы.
   */
  pathname: string;
}>;

/**
 * Обрамление страниц сайта по умолчанию.
 */
const DefaultLayout: FC = ({ children }) => <>{children}</>;

/**
 * Возвращает компонент обёртки для страниц в зависимости от адреса.
 * @param pathname Путь в адресе страницы.
 */
const getComponent = (pathname: string) => {
  if (RouterHelper.testPathname(Route.ACCOUNT, pathname)) {
    return AccountLayout;
  }

  if (RouterHelper.testPathname(Route.LOGIN, pathname)) {
    return LoginLayout;
  }

  return DefaultLayout;
};

/**
 * Добавляет текущей странице обрамление (шапку, подвал, контейнер содержимого
 * и прочее) в зависимости от её адреса.
 */
const AppLayout: FC<Props> = ({ pathname, children }) => {
  const Component = getComponent(pathname);
  return <Component>{children}</Component>;
};

export default AppLayout;
