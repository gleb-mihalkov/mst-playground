import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

import LoginCard from 'components/login/LoginCard';
import RecoveryPhoneForm from 'components/recovery/RecoveryPhoneForm';

/**
 * Представляет страницу восстановления пароля при входе в систему.
 */
const LoginRecoveryPage: FC = () => {
  const router = useRouter();

  function back() {
    router.back();
  }

  return (
    <LoginCard
      heading="Восстановление пароля"
      actions={
        <Button color="primary" onClick={back}>
          Назад
        </Button>
      }
    >
      <RecoveryPhoneForm />
    </LoginCard>
  );
};

export default LoginRecoveryPage;
