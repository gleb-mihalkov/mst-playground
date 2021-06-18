/**
 * Вызывает у каждой модели хранилища хук `afterMount`.
 * @param store Хранилище моделей приложения.
 */
export default function emitAfterStoreMount(store: Record<string, any>) {
  const keys = Object.keys(store);
  const { length } = keys;

  for (let i = 0; i < length; i += 1) {
    const key = keys[i] as keyof typeof store;
    const node = store[key];

    if (typeof node === 'object') {
      emitAfterStoreMount(node);

      if (typeof node.afterMount === 'function') {
        node.afterMount();
      }
    }
  }
}
