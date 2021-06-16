import { FC } from 'react';
import Link from 'next/link';

import Route from 'consts/Route';

/**
 * Представляет страницу восстановления пароля при входе в систему.
 */
const LoginRecoveryPage: FC = () => (
  <>
    <h1>Recovery Page</h1>
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

export default LoginRecoveryPage;
