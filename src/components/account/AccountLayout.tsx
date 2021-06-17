import { observer } from 'mobx-react';
import { FC } from 'react';

import useStore from 'hooks/useStore';
import Replace from 'components/router/Replace';
import Route from 'consts/Route';

/**
 * Отображает обрамление страницы в приватной части сайта (шапка, подвал,
 * контейнер содержимого). Также проверяет, может ли текущий пользователь
 * находится в приватном разделе.
 */
const AccountLayout: FC = ({ children }) => {
  const store = useStore();

  if (!store.auth.isAuthorized) {
    return <Replace to={Route.LOGIN} />;
  }

  return <>{children}</>;
};

export default observer(AccountLayout);
