/**
 * Код ошибки, возвращаемый RPC API.
 */
enum RpcErrorCode {
  /**
   * На сервер были отправлены неверные логин или пароль.
   */
  BAD_AUTH_CREDENTIALS = -32000,

  /**
   * Был введён неверный код подтверждения входа в систему.
   */
  BAD_AUTH_CODE = -32003,

  /**
   * Превышено максимальное количество попыток запросить СМС с кодом
   * подтверждения входа в систему.
   */
  AUTH_REQUESTS_LIMIT_EXCEEDED = -32001,

  /**
   * Превышено максимальное количество попыток ввода кода подтверждения входа
   * в систему.
   */
  AUTH_CONFIRMATIONS_LIMIT_EXCEEDED = -32002,

  /**
   * Неизвестная ошибка, добавлена для тестирования.
   */
  UNKNOWN_ERROR = -32999,
}

export default RpcErrorCode;
