import { FC } from 'react';

import Replace from 'components/router/Replace';
import Route from 'consts/Route';

/**
 * Представляет главную страницу сайта.
 */
const HomeIndexPage: FC = () => <Replace to={Route.ACCOUNT} />;

export default HomeIndexPage;
