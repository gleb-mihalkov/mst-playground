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
 * Генерирует идентификатор.
 * @param baseName Основное имя.
 * @param name Вспомогательная часть.
 */
function getId(baseName: string, name: string) {
  const firstLetter = name.substr(0, 1).toUpperCase();
  const restWord = name.substr(1);
  const nextName = `${firstLetter}${restWord}`;
  return `${baseName}${nextName}`;
}

/**
 * Возвращает объект состояния формы.
 * @param config Конфигурация формы.
 */
export default function useFormik<TValues extends FormikValues>({
  onSubmit = DEFAULT_ON_SUBMIT,
  name: formName,
  ...config
}: Config<TValues>) {
  const formik = useFormikBase({ ...config, onSubmit });
  const formId = getId(formName, 'form');

  return {
    ...formik,

    /**
     * Возвращает коллекцию свойств, которые подключают компонент формы
     * в контекст Formik.
     */
    bindForm() {
      return {
        onSubmit: formik.handleSubmit,
        onReset: formik.handleReset,
        noValidate: true,
        name: formName,
        id: formId,
        ['data-testid']: formId,
      };
    },

    /**
     * Возвращает коллекцию свойств, которые подключают компонент поля ввода
     * в контекст Formik.
     * @param name Название поля ввода.
     */
    bindInput(name: keyof TValues) {
      const id = getId(formName, name as string);

      const touched = getIn(formik.touched, name as string);
      const error = getIn(formik.errors, name as string);

      const hasVisibleError = touched && error != null;
      const errorMessage = hasVisibleError ? error : undefined;

      return {
        id,
        ['data-testid']: id,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        helperText: errorMessage,
        error: hasVisibleError,
        name: name,
      };
    },

    bindSubmitButton() {
      const id = getId(formName, 'submitButton');

      return {
        id,
        ['data-testid']: id,
        type: 'submit' as 'submit',
        form: formId,
      };
    },
  };
}
