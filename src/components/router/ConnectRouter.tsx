import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import useStore from 'hooks/useStore';

/**
 * Интегрирует `next/router` в хранилище моделей приложения. Следует подключать
 * его в дерево _внутри_ провайдера хранилища моделей - иначе не взлетит.
 */
const RouterProvider: FC = () => {
  const router = useRouter();
  const store = useStore();

  store.router.updateRouter(router);

  const { pathname } = router;

  useEffect(() => {
    store.router.updatePathname(pathname);
  }, [store, pathname]);

  return null;
};

export default RouterProvider;
