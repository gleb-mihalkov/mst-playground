import { FC, useMemo } from 'react';

import StoreContext from 'contexts/StoreContext';
import createStore from 'utils/createStore';

/**
 * Предоставляет контекст для хранилища моделей системы.
 */
const StoreProvider: FC = ({ children }) => {
  const value = useMemo(createStore, []);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
