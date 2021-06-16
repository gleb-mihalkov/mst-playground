import { FC } from 'react';

import MaterialUiProvider from './MaterialUiProvider';
import StoreProvider from './StoreProvider';

/**
 * Корневой компонент. Здесь происходит инициализация всех глобальных сущностей
 * приложения (таких как Material UI, mobx-state-tree и так далее).
 */
const App: FC = ({ children }) => (
  <MaterialUiProvider>
    <StoreProvider>{children}</StoreProvider>
  </MaterialUiProvider>
);

export default App;
