/**
 * Предоставляет методы для работы с номерами телефонов.
 */
export default class PhoneHelper {
  /**
   * Маска для поля ввода телефона.
   */
  public static MASK = '+7 000 000-00-00';

  /**
   * Регулярное выражение для разбора телефона в человекочитаемом формате.
   */
  public static DISPLAY_REGEXP = /^\+\d{1}\s\d{3}\s\d{3}-\d{2}-\d{2}$/;

  /**
   * Проверяет, является ли строка номером телефона в человекочитаемом формате.
   * @param value Строка.
   */
  public static validateDisplay(value: string) {
    return this.DISPLAY_REGEXP.test(value);
  }

  /**
   * Преобразует номер телефона из человекочитаемого в системный формат.
   * @param value Запись номера в человекочитаемом формате.
   */
  public static parseDisplay(value: string) {
    if (!this.validateDisplay(value)) {
      throw new Error(
        `Expect value to be a phone number in format ${this.MASK}`
      );
    }

    return value.replace(/\D/g, '');
  }
}
