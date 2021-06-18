/**
 * Предоставляет методы для работы с кодами подтверждения.
 */
export default class CodeHelper {
  /**
   * Маска для поля ввода кода.
   */
  public static MASK = '000 000';

  /**
   * Регулярное выражение для проверки строки в человекочитаемом формате.
   */
  public static DISPLAY_REGEXP = /^\d{3}\s\d{3}$/g;

  /**
   * Возвращает `true`, если строка является кодом подтверждения в
   * человекочитаемом формате.
   * @param value Строка.
   */
  public static validateDisplay(value: string) {
    return this.DISPLAY_REGEXP.test(value);
  }

  /**
   * Преобразует код подтверждения в человекочитаемом формате в системный
   * формат.
   * @param value Строка.
   */
  public static parseDisplay(value: string) {
    if (!this.validateDisplay(value)) {
      throw new Error(
        `Expect value to be a verification code in format ${this.MASK}`
      );
    }

    return value.replace(/\D/g, '');
  }
}
