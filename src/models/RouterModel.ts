import { types } from 'mobx-state-tree';
import { NextRouter } from 'next/router';
import path from 'path/posix';

import ParsedUrlQuery from 'types/ParsedUrlQuery';

/**
 * Модель сценария взаимодействия с маршрутизатором приложения.
 */
export default types
  .model('RouterModel')

  .props({
    /**
     * Адрес текущей страницы.
     */
    pathname: types.optional(types.string, ''),
  })

  .extend((self) => {
    let instance: NextRouter;

    return {
      views: {
        /**
         * Предоставляет ссылку на экземпляр сервиса.
         */
        get api() {
          return instance;
        },
      },

      actions: {
        /**
         * Обновляет активный экземпляр контекста маршрутизатора.
         * @param router Экземпляр роутера.
         */
        updateRouter(router: NextRouter) {
          instance = router;

          if (self.pathname === '') {
            self.pathname = router.pathname;
          }
        },

        /**
         * Обновляет текущий путь к странице.
         * @param pathname Путь.
         */
        updatePathname(pathname: string) {
          self.pathname = pathname;
        },
      },
    };
  });
