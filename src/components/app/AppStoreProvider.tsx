import { FC, useEffect, useMemo } from 'react';

import StoreContext from 'contexts/StoreContext';
import createStore from 'utils/createStore';
import emitAfterStoreMount from 'utils/emitAfterStoreMount';
import emitBeforeStoreUnmount from 'utils/emitBeforeStoreUnmount';

/**
 * Предоставляет контекст для хранилища моделей системы.
 */
const AppStoreProvider: FC = ({ children }) => {
  const value = useMemo(createStore, []);

  useEffect(() => {
    emitAfterStoreMount(value);

    return () => {
      emitBeforeStoreUnmount(value);
    };
  }, [value]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default AppStoreProvider;
