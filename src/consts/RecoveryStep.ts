/**
 * Шаг сценария восстановления пароля.
 */
enum RecoveryStep {
  /**
   * Первый шаг - ввод телефона.
   */
  PHONE = 'phone',

  /**
   * Второй шаг - ввод кода подтверждения.
   */
  CODE = 'code',

  /**
   * Третий шаг - ввод нового пароля.
   */
  PASSWORD = 'password',
}

export default RecoveryStep;
