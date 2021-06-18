import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';

import useStore from 'hooks/useStore';
import RecoveryPhoneForm from './RecoveryPhoneForm';
import RecoveryCodeForm from './RecoveryCodeForm';
import RecoveryPasswordForm from './RecoveryPasswordForm';
import RecoveryStep from 'consts/RecoveryStep';

/**
 * Отображает один из трёх шагов восстановления пароля (в зависимости от того,
 * на какой стадии процесса находится пользователь).
 */
const RecoverySteps: FC = () => {
  const store = useStore();

  useEffect(() => () => store.recovery.abort(), [store]);

  switch (store.recovery.step) {
    case RecoveryStep.PASSWORD: {
      return <RecoveryPasswordForm />;
    }

    case RecoveryStep.CODE: {
      return <RecoveryCodeForm />;
    }

    default: {
      return <RecoveryPhoneForm />;
    }
  }
};

export default observer(RecoverySteps);
