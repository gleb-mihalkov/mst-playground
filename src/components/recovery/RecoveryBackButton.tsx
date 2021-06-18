import { FC } from 'react';
import { Button } from '@material-ui/core';
import useStore from 'hooks/useStore';

/**
 * Отображает кнопку перехода на предыдущий шаг восстановления пароля.
 */
const RecoveryBackButton: FC = () => {
  const store = useStore();

  return (
    <Button color="primary" onClick={store.recovery.back}>
      Назад
    </Button>
  );
};

export default RecoveryBackButton;
