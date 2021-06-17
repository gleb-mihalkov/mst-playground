import { types } from 'mobx-state-tree';

import RpcErrorCode from 'consts/RpcErrorCode';
import RpcHelper from 'helpers/RpcHelper';
import getStore from 'utils/getStore';
import assign from 'utils/assign';
import AuthTokens from 'entities/AuthTokens';

/**
 * Модель сценария входа пользователя в систему.
 */
export default types
  .model('LoginModel')

  .props({
    /**
     * Указывает, что в данный момент происходит отправка данных на сервер.
     */
    pending: types.optional(types.boolean, false),

    /**
     * Если сервер ответил, что переданное реквизиты входа неверны, введённое
     * пользователем имя сохраняется сюда. Поле используется для отображения
     * ошибки на форме.
     */
    badUsername: types.maybe(types.string),

    /**
     * Если сервер ответил, что переданные реквизиты входа неверны, введённый
     * пользователем пароль сохраняется сюда. Поле используется для
     * отображения ошибки на форме.
     */
    badPassword: types.maybe(types.string),
  })

  .actions((self) => ({
    /**
     * Отправляет указанные имя пользователя и его пароль на сервер и, если
     * реквизиты правильные, отправляет пользователя на форму подтверждения
     * входа.
     * @param username Имя пользователя.
     * @param password Пароль пользователя.
     */
    async submitCredentials(username: string, password: string) {
      if (self.pending) {
        throw new Error(`Expect 'self.pending' to be false`);
      }

      const store = getStore(self);

      if (store.auth.isAuthorized) {
        throw new Error(`Expect current user to be unauthorized`);
      }

      assign(self, { pending: true });

      let tokens: AuthTokens;

      try {
        tokens = await store.rpc.api.fetchTokens(username, password);
      } catch (error) {
        if (RpcHelper.isError(error, RpcErrorCode.BAD_AUTH_CREDENTIALS)) {
          assign(self, {
            badUsername: username,
            badPassword: password,
            pending: false,
          });
          return;
        }

        assign(self, { pending: false });
        throw error;
      }

      await store.auth.authorize(tokens);
      assign(self, { pending: false });
    },
  }));
