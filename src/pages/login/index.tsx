import { FC } from 'react';
import { Button } from '@material-ui/core';

import LoginCard from 'components/login/LoginCard';
import LoginCredentialsForm from 'components/login/LoginCredentialsForm';
import Link from 'components/router/Link';
import Route from 'consts/Route';

/**
 * Представляет страницу входа в систему.
 */
const LoginIndexPage: FC = () => (
  <LoginCard
    heading="Войти"
    actions={
      <Button
        component={Link}
        href={Route.RECOVERY}
        underline="none"
        color="primary"
      >
        Восстановление пароля
      </Button>
    }
  >
    <LoginCredentialsForm />
  </LoginCard>
);

export default LoginIndexPage;
