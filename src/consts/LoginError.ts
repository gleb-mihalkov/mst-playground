/**
 * Ошибка, которая может возникнуть во время сценария входа в систему.
 */
enum LoginError {
  /**
   * Были введены неверные логин или пароль.
   */
  BAD_CREDENTIALS = 'bad_credentials',

  /**
   * Был введён неверный код подтверждения входа.
   */
  BAD_CODE = 'bad_code',

  /**
   * Превышено максимальное количество попыток запросить код подтверждения
   * входа.
   */
  REQUESTS_LIMIT_EXCEEDED = 'requests_limit_exceeded',

  /**
   * Превышено максимальное количество попыток ввести код подтверждения входа.
   */
  CONFIRMATIONS_LIMIT_EXCEEDED = 'confirmations_limit_exceeded',
}

export default LoginError;
