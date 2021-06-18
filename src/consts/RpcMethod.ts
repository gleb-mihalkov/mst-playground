/**
 * Метод RPC.
 */
enum RpcMethod {
  /**
   * Получает для пользователя токены авторизации.
   */
  AUTHORIZE = 'authorize',

  /**
   * Запрашивает код СМС с кодом подтверждения смены пароля.
   */
  REQUEST_RECOVERY_CODE = 'request_recovery_code',
}

export default RpcMethod;
