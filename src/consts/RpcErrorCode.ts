/**
 * Код ошибки, возвращаемый RPC API.
 */
enum RpcErrorCode {
  /**
   * На сервер были отправлены неверные логин или пароль.
   */
  BAD_AUTH_CREDENTIALS = -32000,

  /**
   * Был превышен лимит запросов кода подтверждения для смены пароля.
   */
  RECOVERY_CODE_REQUESTS_LIMIT_EXCEEDED = -32001,
}

export default RpcErrorCode;
