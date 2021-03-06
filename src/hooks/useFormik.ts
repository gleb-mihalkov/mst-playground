import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import {
  useFormik as useFormikBase,
  FormikValues,
  FormikConfig,
  FormikHelpers,
  getIn,
} from 'formik';

/**
 * Конфигурация формы.
 */
type Config<TValues extends FormikValues> = Omit<
  FormikConfig<TValues>,
  'onSubmit'
> & {
  /**
   * Уникальное в рамках страницы имя формы.
   */
  name: string;

  /**
   * Указывает, что следует запустить повторную валидацию формы, если объект,
   * переданный в свойство `validationSchema`, изменился (то есть, если
   * поменялись правила валидации).
   *
   * Таким образом мы получаем возможность менять правила валидации на лету,
   * и форма будет реагировать на это.
   * @default false
   */
  validateOnSchemaChange?: boolean;

  /**
   * Обрабатывает успешную отправку формы.
   * @param values Значения полей формы.
   * @param helpers Коллекция вспомогательных методов и свойств Formik.
   */
  onSubmit?: (
    values: TValues,
    helpers: FormikHelpers<TValues>
  ) => void | Promise<any>;
};

/**
 * Обработчик отправки формы по умолчанию.
 */
const DEFAULT_ON_SUBMIT = () => {};

/**
 * Генерирует идентификатор в `camelCase`.
 * @param args Список частей идентификатора.
 */
function joinId(...args: string[]) {
  const { length } = args;
  let id: string = '';

  for (let i = 0; i < length; i += 1) {
    let value = args[i];

    if (value) {
      if (i > 0) {
        const head = value.charAt(0).toUpperCase();
        const tail = value.substr(1);
        value = `${head}${tail}`;
      }

      id += value;
    }
  }

  return id;
}

/**
 * Возвращает объект состояния формы. Фактически, данная функция служит обёрктой
 * над функцией `useFormik` из библиотекой `formik`, но немного расширяет её
 * поведение.
 *
 * Во-первых, в результат добавляются функции, которые возвращают свойства,
 * подключающие элементы React к состоянию формы. Используется это так:
 * `<form {...formik.bindForm()} />`.
 *
 * Во-вторых, добавлено дополнительное условие валидации
 * `validateOnSchemaChange`, при котором форма будет проверена повтроно, если
 * схема валидации, переданная в `validationSchema`, изменилась.
 *
 * В-третьих, параметр `onSubmit` стал необязательным.
 * @param config Конфигурация формы.
 */
export default function useFormik<TValues extends FormikValues>({
  validateOnSchemaChange = false,
  validationSchema,
  onSubmit = DEFAULT_ON_SUBMIT,
  name: formName,
  ...config
}: Config<TValues>) {
  const formik = useFormikBase({
    ...config,
    validationSchema,
    onSubmit,
  });

  const formId = joinId(formName, 'form');

  /**
   * Статус валидации формы. `'none'` означает, что процесс валидации формы ещё
   * ни разу не запускался. `'validating'` означает, что валидация идёт в
   * данный момент. И, наконец, `'validated'` говорит нам, что валидация формы
   * завершена.
   *
   * Используется для реализации условия `validateOnSchemaChange`.
   */
  const validationStatus = useRef<'none' | 'validating' | 'validated'>('none');
  const { isValidating } = formik;

  useEffect(() => {
    if (validationStatus.current === 'none') {
      validationStatus.current = isValidating ? 'validating' : 'none';
    } else {
      validationStatus.current = isValidating ? 'validating' : 'validated';
    }
  }, [isValidating]);

  /**
   * Важно: мы оборачиваем функцию валидации в формы в mutable ref для того,
   * чтобы последующие `useEffect` не запускались, если эта функция изменится.
   * При этом в `validateFormRef.current` всегда будет актуальная функция
   * валидации.
   */
  const validateFormRef = useRef<() => void>(formik.validateForm);
  validateFormRef.current = formik.validateForm;

  /**
   * Так же мы поступаем и с самим флагом `validateOnSchemaChange` - чтобы не
   * вводить следующий `useEffect` в заблуждение.
   */
  const validateOnSchemaChangeRef = useRef<boolean>(validateOnSchemaChange);
  validateOnSchemaChangeRef.current = validateOnSchemaChange;

  /**
   * И, наконец, реализация валидации по `validateOnSchemaChange`. Данный
   * эффект будет выполняться только если: раз - форма уже валидировалась
   * (и валидация не происходят прямо сейчас), два - флаг из настроек формы
   * взведён, и три - изменилось значение `validationSchema`.
   */
  useEffect(() => {
    if (
      validateOnSchemaChangeRef.current &&
      validationStatus.current === 'validated'
    ) {
      validateFormRef.current();
    }
  }, [validationSchema]);

  /**
   * Возвращает коллекцию свойств, которые подключают элемент формы в
   * контекст Formik.
   */
  function bindForm() {
    return {
      name: formName,
      id: formId,
      onSubmit: formik.handleSubmit,
      onReset: formik.handleReset,
      noValidate: true,
    };
  }

  /**
   * Возвращает коллекцию свойств, которые подключают кнопку отправки формы
   * в контекст Formik.
   */
  function bindSubmitButton() {
    const id = joinId(formName, 'submit', 'button');

    return {
      id,
      form: formId,
      type: 'submit' as 'submit',
    };
  }

  /**
   * Возвращает текст ошибки указанного поля ввода.
   * @param name Название поля ввода.
   */
  function errorOf(name: keyof TValues) {
    const touched = getIn(formik.touched, name as string);
    const error = getIn(formik.errors, name as string);

    const isErrorShowed = touched && error != null;
    const errorMessage = isErrorShowed ? error : undefined;

    return errorMessage;
  }

  /**
   * Возвращает текущее значение указанного поля ввода.
   * @param name Название поля ввода.
   */
  function valueOf(name: keyof TValues) {
    const value = getIn(formik.values, name as string);
    return value;
  }

  /**
   * Возвращает коллекцию свойств, которые подключают компонент `FormControl`
   * к состояню формы.
   * @param name Название поля ввода.
   */
  function bindFormControl(name: keyof TValues) {
    const error = errorOf(name) == null ? undefined : true;
    return { error };
  }

  /**
   * Возвращает коллекцию свойств, которые подключают компонент `InputLabel`
   * к состояню формы.
   * @param name Название поля ввода.
   */
  function bindInputLabel(name: keyof TValues) {
    const htmlFor = joinId(formName, name as string);
    return { htmlFor };
  }

  /**
   * Возвращает коллекцию свойств, которые подключают компонент `Input`
   * к состояню формы.
   * @param name Название поля ввода.
   */
  function bindInput(name: keyof TValues) {
    const id = joinId(formName, name as string);
    const value = valueOf(name);

    function onChange(data: any) {
      if (typeof data === 'object' && data.target != null) {
        formik.handleChange(data);
      } else {
        formik.setFieldValue(name as string, data);
      }
    }

    return {
      onChange,
      value,
      id,
      name: String(name),
      onBlur: formik.handleBlur,
    };
  }

  /**
   * Возвращает коллекцию свойств, которые подключают поле ввода `TextField`
   * в контекст Formik.
   * @param name Название поля ввода.
   */
  function bindTextField(name: keyof TValues) {
    const errorMessage = errorOf(name);

    return {
      ...bindInput(name),
      helperText: errorMessage,
      error: errorMessage != null,
    };
  }

  return {
    ...formik,
    bindSubmitButton,
    bindFormControl,
    bindInputLabel,
    bindTextField,
    bindInput,
    bindForm,
    errorOf,
    valueOf,
  };
}
