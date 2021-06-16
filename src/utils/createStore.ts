import RootModel from 'models/RootModel';

/**
 * Создаёт экземпляр хранилища моделей.
 */
export default function createStore() {
  const store = RootModel.create();

  const keys = Object.keys(store);
  const { length } = keys;

  for (let i = 0; i < length; i += 1) {
    const key = keys[i] as keyof typeof store;

    if (Object.prototype.hasOwnProperty.call(store, key)) {
      const model = store[key];

      if (model && typeof model.beforeMount === 'function') {
        model.beforeMount();
      }
    }
  }

  return store;
}
