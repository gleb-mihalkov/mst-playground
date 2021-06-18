import { FC } from 'react';
import { Button } from '@material-ui/core';

import useStore from 'hooks/useStore';

/**
 * Отображает кнопку, которая провоцирует выход из системы.
 */
const AccountLogout: FC = () => {
  const store = useStore();

  function onClick() {
    store.auth.deleteTokens();
  }

  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Выйти
    </Button>
  );
};

export default AccountLogout;
