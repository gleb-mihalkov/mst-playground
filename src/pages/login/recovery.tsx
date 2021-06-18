import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

import LoginCard from 'components/login/LoginCard';
import RecoveryStepper from 'components/recovery/RecoveryStepper';
import RecoveryBackButton from 'components/recovery/RecoveryBackButton';

/**
 * Представляет страницу восстановления пароля при входе в систему.
 */
const LoginRecoveryPage: FC = () => {
  const router = useRouter();

  function back() {
    router.back();
  }

  return (
    <LoginCard heading="Восстановление пароля" actions={<RecoveryBackButton />}>
      <RecoveryStepper />
    </LoginCard>
  );
};

export default LoginRecoveryPage;
