import { FC, PropsWithChildren } from 'react';
import AppLayout from './AppLayout';

import AppMaterialUiProvider from './AppMaterialUiProvider';
import AppStoreProvider from './AppStoreProvider';

/**
 * Свойства компонента.
 */
type Props = PropsWithChildren<{
  /**
   * Путь в адресе текущей страницы.
   */
  pathname: string;
}>;

/**
 * Корневой компонент. Здесь происходит инициализация всех глобальных сущностей
 * приложения (таких как Material UI, mobx-state-tree и так далее).
 */
const App: FC<Props> = ({ children, pathname }) => (
  <AppMaterialUiProvider>
    <AppStoreProvider>
      <AppLayout pathname={pathname}>{children}</AppLayout>
    </AppStoreProvider>
  </AppMaterialUiProvider>
);

export default App;
