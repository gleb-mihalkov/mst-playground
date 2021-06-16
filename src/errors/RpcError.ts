import CustomError from './CustomError';

/**
 * Представляет ошибку, возвращаемую RPC API.
 */
export default class RpcError extends CustomError {
  /**
   * Генерирует сообщение об ошибке на основе её кода и описания,
   * предоставленного сервером.
   * @param code Код ошибки.
   * @param description Описание.
   * @param method Метод RPC, вернувший ошибку.
   */
  public static getMessage(code: number, description: string, method: string) {
    let message = `${method} [${code}]`;

    if (description) {
      message += ` ${description}`;
    }

    return message;
  }

  /**
   * Описание ошибки RPC, предоставленное сервером.
   */
  public readonly description: string;

  /**
   * Код ошибки, предоставленный сервером.
   */
  public readonly code: number;

  /**
   * Дополнительные параметры ошибки, которые предоставил сервер наряду
   * с её кодом и описанием.
   */
  public readonly payload: Record<string, any>;

  /**
   * Конечная точка API, вернувшая ошибку.
   */
  public readonly endpoint: string;

  /**
   * Метод RPC, при вызове которого произошла данная ошибка.
   */
  public readonly method: string;

  /**
   * Параметры, с которыми вызывался метод.
   */
  public readonly params: Record<string, any>;

  /**
   * Дополнительные заголовки, передававшиеся в запросе.
   */
  public readonly headers: Record<string, any>;

  /**
   * Создаёт экземпляр ошибки, которую вернул RPC API в ответ на запрос
   * с указанными параметрами.
   * @param endpoint Конечная точка API, вернувшая ошибку.
   * @param method Метод RPC, который пыталось вызвать приложение.
   * @param params Параметры, с которыми происходил вызов метода.
   * @param headers Коллекция дополнительных заголовков запроса к API.
   * @param code Код ошибки RPC, предоставленный сервером.
   * @param description Описание ошибки RPC, предоставленное сервером.
   * @param payload Дополнительные параметры ошибки, которые предоставил сервер
   * наряду с её кодом и описанием.
   */
  public constructor(
    endpoint: string,
    method: string,
    params: Record<string, any>,
    headers: Record<string, any>,
    code: number,
    description: string,
    payload: Record<string, any> = {}
  ) {
    const message = RpcError.getMessage(code, description, method);
    super('RpcError', message);

    this.endpoint = endpoint;
    this.headers = headers;
    this.method = method;
    this.params = params;

    this.description = description;
    this.payload = payload;
    this.code = code;
  }
}
