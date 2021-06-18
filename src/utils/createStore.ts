import { connectReduxDevtools } from 'mst-middlewares';

import RootModel from 'models/RootModel';

/**
 * Создаёт экземпляр хранилища моделей.
 */
export default function createStore() {
  const store = RootModel.create();

  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined') {
      connectReduxDevtools(require('remotedev'), store, {
        logChildActions: true,
        logArgsNearName: false,
        logIdempotentActionSteps: false,
      });
    }
  }

  return store;
}
