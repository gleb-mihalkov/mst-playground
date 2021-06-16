import { useContext } from 'react';

import StoreContext from 'contexts/StoreContext';

/**
 * Возвращает экземпляр хранилища моделей системы.
 */
export default function useStore() {
  return useContext(StoreContext);
}
