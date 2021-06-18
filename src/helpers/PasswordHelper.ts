import PasswordStrength from 'consts/PasswordStrength';

/**
 * Содержит методы для работы с паролями.
 */
export default class PasswordHelper {
  /**
   * Возвращает `true` если пароль содержит как минимум одну букву.
   * @param password Пароль.
   */
  private static hasOneLetter(password: string) {
    return /[a-zA-Zа-яА-ЯёЁ]/.test(password);
  }

  /**
   * Возвращает `true`, если пароль содержит как минимум одну цифру.
   * @param password Пароль.
   */
  private static hasOneDigit(password: string) {
    return /\d/.test(password);
  }

  /**
   * Возвращает `true`, если пароль имеет приемлемую длину.
   * @param password Пароль.
   */
  private static hasAcceptableLength(password: string) {
    return password.length >= 6;
  }

  /**
   * Проверяет указанный пароль на сложность и возвращает коллекцию пройденых
   * и не пройденных проверок в виде "критерий сложности" - "true / false".
   * @param password Пароль.
   */
  public static checkStrength(
    password: string
  ): Record<PasswordStrength, boolean> {
    return {
      [PasswordStrength.ONE_LETTER]: this.hasOneLetter(password),
      [PasswordStrength.ONE_DIGIT]: this.hasOneDigit(password),
      [PasswordStrength.LENGTH]: this.hasAcceptableLength(password),
    };
  }
}
