import { useRouter } from 'next/dist/client/router';
import { FC, useEffect } from 'react';

/**
 * Свойства компонента.
 */
type Props = {
  /**
   * Адрес страницы, на которую следует перейти.
   */
  to: string;
};

/**
 * Будучи подключён в DOM, вызывает перенаправление на указанный в свойстве
 * `to` адрес. Запись в истории при этом не добавляется.
 */
const Replace: FC<Props> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return null;
};

export default Replace;
