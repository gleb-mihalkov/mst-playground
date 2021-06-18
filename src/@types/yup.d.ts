import { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    /**
     * Проводит проверку, является ли данная строка телефонным номером.
     * @param message Пользовательское сообщение об ошибке.
     */
    phone(message?: string): StringSchema;

    /**
     * Проводит проверку, является ли данная строка кодом подтверждения из СМС.
     * @param message Пользовательское сообщение об ошибке.
     */
    code(message?: string): StringSchema;
  }
}
