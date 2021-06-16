/**
 * Ошибка, которая может возникнуть во время сценария входа в систему.
 */
enum LoginError {
  /**
   * Были введены неверные логин или пароль.
   */
  BAD_CREDENTIALS = 'bad_credentials',
}

export default LoginError;
