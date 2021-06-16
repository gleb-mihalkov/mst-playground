/**
 * Код ошибки, возвращаемый RPC API.
 */
enum RpcErrorCode {
  /**
   * На сервер были отправлены неверные логин или пароль.
   */
  BAD_AUTH_CREDENTIALS = -32000,
}

export default RpcErrorCode;
