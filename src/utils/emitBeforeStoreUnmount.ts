/**
 * Вызывает хук `beforeUnmount` у каждой модели из указанного хранилища.
 * @param store Хранилище моделей.
 */
export default function emitBeforeStoreUnmount(store: Record<string, any>) {
  const keys = Object.keys(store);
  const { length } = keys;

  for (let i = 0; i < length; i += 1) {
    const key = keys[i] as keyof typeof store;
    const node = store[key];

    if (typeof node === 'object') {
      emitBeforeStoreUnmount(node);

      if (typeof node.beforeUnmount === 'function') {
        node.beforeUnmount();
      }
    }
  }
}
