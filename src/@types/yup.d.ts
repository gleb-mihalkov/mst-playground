import { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    /**
     * Проводит проверку, является ли данная строка телефонным номером.
     * @param message Пользовательское сообщение об ошибке.
     */
    phone(message?: string): StringSchema;
  }
}
