/**
 * Предоставляет низкоуровневые методы для работы с localStorage.
 */
export default class StorageService {
  /**
   * Префкис, который будет добавляться ко всем ключам, которые содержатся
   * в хранилище.
   */
  private readonly prefix?: string;

  /**
   * Содержит экземпляр класса, опционально добавляющий указанный префикс для
   * всех ключей, с которыми он будет работать.
   * @param prefix Префикс.
   */
  public constructor(prefix?: string) {
    this.prefix = prefix;
  }

  /**
   * Возвращает реальный ключ в `localStorage`, полученный из указанного.
   * @param key Ключ.
   */
  public getRealKey(key: string) {
    return this.prefix == null ? key : `${this.prefix}_${key}`;
  }

  /**
   * Возвращает значение, сохранённое по указанному ключу. Если значения нет,
   * либо у текущего пользователя нет к нему доступа, будет возвращено
   * `undefined`.
   * @param key Ключ.
   */
  public get(key: string) {
    return typeof localStorage === 'undefined'
      ? undefined
      : localStorage.getItem(this.getRealKey(key)) ?? undefined;
  }

  /**
   * Сохраняет переданное значение по указанному ключу. Если вместо значения
   * передать `undefined`, то ключ будет удалён.
   * @param key Ключ.
   * @param value Новое значение.
   * @param config Конфигурация значения.
   */
  public set(key: string, value?: string) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const realKey = this.getRealKey(key);

    if (value == null) {
      localStorage.removeItem(realKey);
    } else {
      localStorage.setItem(realKey, value);
    }
  }

  /**
   * Удаляет значение по указанному ключу.
   * @param key Ключ.
   */
  public remove(key: string) {
    this.set(key, undefined);
  }
}
