import { FC } from 'react';
import Link from 'next/link';

import Route from 'consts/Route';

/**
 * Представляет главную страницу приватной части системы.
 */
const AccountIndexPage: FC = () => (
  <>
    <h1>Account Page</h1>
    <nav>
      <Link href={Route.LOGIN}>
        <a>To Login</a>
      </Link>
      <Link href={Route.RECOVERY}>
        <a>To Recovery</a>
      </Link>
      <Link href={Route.ACCOUNT}>
        <a>To Account</a>
      </Link>
    </nav>
  </>
);

export default AccountIndexPage;
