import { FC, ClipboardEvent, ComponentType } from 'react';
// @ts-ignore
import { IMaskMixin } from 'react-imask';

/**
 * Возвращает `true`, если перед указанной позицией в маске ввода есть
 * спец-символы (то есть, не экранированные '0', 'a' или '*').
 * @param mask Маска ввода.
 * @param index Позиция в строке.
 */
function isSpecialCharsBefore(mask: string, index: number) {
  const { length } = mask;

  for (let i = 0; i < length && i < index; i += 1) {
    const char = mask.charAt(i);

    if (char === '0' || char === '*' || char === 'a') {
      return true;
    }

    if (char === '\\') {
      i += 1;
    }
  }

  return false;
}

/**
 * Смещает позицию каретки ввода при вставке текста в поле ввода, использующее
 * маску.
 *
 * Допустим, мы ввели номер телефона с помощью маски '+7 000 000-00-00',
 * скопировали содержимое поля ввода, очистили поле, а затем вставили текст
 * из буфера обмена. Из коробки компонент не может понять, что '+7' здесь -
 * это часть маски. Поэтому будет вставлено '+7 7...'. Чтобы избежать этого,
 * функция помогает скорректировать позицию курсора перед вставкой текста.
 * @param element Элемент поля ввода.
 * @param mask Маска ввода.
 * @param text Вставляемый текст.
 */
function correctSelectionOnPaste(
  element: HTMLInputElement,
  mask: string,
  text: string
) {
  const { selectionStart, selectionEnd, value: inputValue } = element;

  const isNeedToCorrect =
    inputValue &&
    text &&
    selectionStart === selectionEnd &&
    selectionStart != null &&
    selectionStart > 0 &&
    !isSpecialCharsBefore(mask, selectionStart);

  if (!isNeedToCorrect) {
    return;
  }

  const position = selectionStart as number;

  for (let i = 0; i < position; i += 1) {
    const maskHead = mask.substr(i, position);
    const textHead = text.substr(i, position);

    if (maskHead === textHead) {
      element.selectionStart = i;
      element.selectionEnd = i;
      return;
    }
  }
}

/**
 * Свойства целевого компонента.
 *
 * Важно: казалось бы, отчего бы тут не указать constraint'ы для `value` и
 * `onChange` - так же правильнее! А вот хрен. Компонент TextField из
 * `@material-ui/core` тогда теряет половину свойств, так уж он типизирован.
 */
type InnerProps = {};

/**
 * Итоговые свойства компонента.
 *
 * Внимание: мы не производим здесь `Omit<TProps, 'onChange'>` не случайно.
 * Да, так мы рискуем получить неоднозначность в свойствах, но зато не ломается
 * типизация свойств компонентов из `@material-ui/core` (проверялось на
 * `TextField`).
 */
type OuterProps<TProps extends InnerProps> = TProps & {
  /**
   * Обрабатывает изменение текущего значения поля ввода.
   * @param value Новое значение.
   */
  onChange?: (value: string) => void;

  /**
   * Маска ввода, в которой '0' означает любую цифру, 'a' - любую букву и '*' -
   * любой символ.
   */
  mask: string;
};

/**
 * Возвращает обёртку над указанным компонентом поля ввода, которая добавляет
 * ему функционал ограничения ввода по маске.
 *
 * В компонент добавляется новое свойство `mask` - маска ввода. Также у
 * компонента меняется свойство `onChange`: вместо события в него теперь
 * передаётся просто новое значение поля ввода.
 * @param Target Компонент поля ввода.
 */
export default function withInputMask<TProps extends InnerProps>(
  Target: ComponentType<TProps>
) {
  /**
   * Обёртка для подключения библиотеки imask.
   */
  const WrappedTarget = IMaskMixin(Target);

  /**
   * HOC.
   */
  const WithInputMask: FC<OuterProps<TProps>> = ({
    onChange,
    onPaste,
    mask,
    ...props
  }: any) => {
    function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
      if (onPaste) {
        onPaste(event);
      }

      const element = event.target as HTMLInputElement;
      const text = event.clipboardData.getData('Text');

      correctSelectionOnPaste(element, mask, text);
    }

    return (
      <WrappedTarget
        {...props}
        onAccept={onChange}
        onPaste={handlePaste}
        mask={mask}
        overwrite
      />
    );
  };

  WithInputMask.displayName = `WithInputMask(${
    Target.displayName || Target.name
  })`;

  return WithInputMask;
}
