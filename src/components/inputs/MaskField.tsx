import { FC, ClipboardEvent } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
// @ts-ignore
import { IMaskMixin } from 'react-imask';

/**
 * Свойства компонента.
 */
type Props = TextFieldProps & {
  /**
   * Обрабатывает изменение текущего значения поля ввода.
   * @param value Новое значение.
   */
  onChange: (value: string) => void;

  /**
   * Маска поля ввода. '0' в ней означает любое число, 'a' - любой буквенный
   * символ, а '*' - просто любой символ.
   */
  mask: string;
};

/**
 * Обёртка для подключения библиотеки imask.
 */
const WrappedField = IMaskMixin(TextField);

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
 * Отображает поле ввода текста по маске.
 */
const MaskField: FC<Props> = ({ onChange, onPaste, mask, ...props }) => {
  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    if (onPaste) {
      onPaste(event);
    }

    const element = event.target as HTMLInputElement;
    const text = event.clipboardData.getData('Text');

    correctSelectionOnPaste(element, mask, text);
  }

  return (
    <WrappedField
      {...props}
      onAccept={onChange}
      onPaste={handlePaste}
      mask={mask}
      overwrite
    />
  );
};

export default MaskField;
