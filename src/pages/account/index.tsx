import { FC } from 'react';
import { Container } from '@material-ui/core';

import AccountLogout from 'components/account/AccountLogout';

/**
 * Представляет главную страницу приватной части системы.
 */
const AccountIndexPage: FC = () => (
  <Container>
    <h1>Account Page</h1>
    <p>
      <AccountLogout />
    </p>
  </Container>
);

export default AccountIndexPage;
