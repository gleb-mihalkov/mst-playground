/**
 * Критерий сложности пароля.
 */
enum PasswordStrength {
  /**
   * Пароль содержит одну букву.
   */
  ONE_LETTER = 'one_letter',

  /**
   * Пароль содержит одну цифру.
   */
  ONE_DIGIT = 'one_digit',

  /**
   * Пароль имеет нужную длину.
   */
  LENGTH = 'length',
}

export default PasswordStrength;
