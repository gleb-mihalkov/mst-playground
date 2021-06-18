import { FC } from 'react';

import LoginCard from 'components/login/LoginCard';
import RecoveryStep from 'components/recovery/RecoverySteps';
import RecoveryBackButton from 'components/recovery/RecoveryBackButton';

/**
 * Представляет страницу восстановления пароля при входе в систему.
 */
const LoginRecoveryPage: FC = () => (
  <LoginCard heading="Восстановление пароля" actions={<RecoveryBackButton />}>
    <RecoveryStep />
  </LoginCard>
);

export default LoginRecoveryPage;
