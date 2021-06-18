import { FC } from 'react';
import { observer } from 'mobx-react';

import useStore from 'hooks/useStore';
import RecoveryPhoneForm from './RecoveryPhoneForm';
import RecoveryCodeForm from './RecoveryCodeForm';
import RecoveryNewPasswordForm from './RecoveryNewPasswordForm';
import RecoveryStep from 'consts/RecoveryStep';

/**
 * Отображает один из трёх шагов восстановления пароля (в зависимости от того,
 * на какой стадии процесса находится пользователь).
 */
const RecoveryStepper: FC = () => {
  const store = useStore();

  switch (store.recovery.step) {
    case RecoveryStep.NEW_PASSWORD: {
      return <RecoveryNewPasswordForm />;
    }

    case RecoveryStep.CODE: {
      return <RecoveryCodeForm />;
    }

    default: {
      return <RecoveryPhoneForm />;
    }
  }
};

export default observer(RecoveryStepper);
