import * as Yup from 'yup';

/**
 * Здесь происходит расширение валидатора Yup. При добавлении новых валидаторов
 * ОБЯЗАТЕЛЬНО следует добавлять их типы в `@types/yup.d.ts`, иначе Typescript
 * их просто не увидит.
 */

/**
 * Сообщение об ошибке формата телефона по умолчанию.
 */
const DEFAULT_PHONE_MESSAGE =
  '${path} must be a phone number in format "+0 000 000-00-00"';

/**
 * Добавляем схему валидации телефонного номера.
 */
Yup.addMethod(
  Yup.string,
  'phone',
  function (message: string = DEFAULT_PHONE_MESSAGE) {
    return this.matches(/^\+\d{1}\s\d{3}\s\d{3}-\d{2}-\d{2}$/, message);
  }
);
