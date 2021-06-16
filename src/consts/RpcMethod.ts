/**
 * Метод RPC.
 */
enum RpcMethod {
  /**
   * Получает для пользователя токены авторизации.
   */
  AUTHORIZE = 'authorize',

  /**
   * Указывает серверу выслать код подтверждения входа в систему на телефон
   * пользователя.
   */
  REQUEST_AUTH_CODE = 'auth.requestCode',

  /**
   * Авторизует пользователя в системе.
   */
  CONFIRM_AUTH_CODE = 'auth.confirmCode',
}

export default RpcMethod;
