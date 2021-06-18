import * as Yup from 'yup';

import PhoneHelper from 'helpers/PhoneHelper';
import CodeHelper from 'helpers/CodeHelper';

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
    return this.matches(PhoneHelper.DISPLAY_REGEXP, message);
  }
);

/**
 * Сообщение об ошибке формата кода подтверждения.
 */
const DEFAULT_CODE_MESSAGE =
  '${path} must be a verification code in format "000 000"';

/**
 * Добавляем схему валидации кода подтверждения.
 */
Yup.addMethod(
  Yup.string,
  'code',
  function (message: string = DEFAULT_CODE_MESSAGE) {
    return this.matches(CodeHelper.DISPLAY_REGEXP, message);
  }
);
