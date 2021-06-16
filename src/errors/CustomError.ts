/**
 * Базовый класс для всех пользовательский ошибок.
 */
export default class CustomError extends Error {
  /**
   * Создает экземпляр ошибки с указанным текстом и служебным именем.
   *
   * @param name Служебное имя исключения (RuntimeError, FormatError и тому
   * подобное).
   * @param message Текст сообщения об ошибке.
   */
  public constructor(name: string, message: string) {
    super(message);
    this.name = name;

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    const proto = new.target.prototype;

    if (Object.setPrototypeOf != null) {
      Object.setPrototypeOf(this, proto);
    } else {
      // @ts-ignore
      this.__proto__ = proto;
    }

    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
