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
 * `to` адрес. При этом делается запись в браузерной истории.
 */
const Redirect: FC<Props> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return null;
};

export default Redirect;
