import { runInAction } from 'mobx';
import { types } from 'mobx-state-tree';

import LoginError from 'consts/LoginError';
import RpcErrorCode from 'consts/RpcErrorCode';
import RpcHelper from 'helpers/RpcHelper';

import getStore from 'utils/getStore';
import assign from 'utils/assign';
import AuthTokens from 'entities/AuthTokens';
import { strictEqual } from 'assert';

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
     * Ошибка, которая возникла во время прохождения сценария.
     */
    error: types.maybe(
      types.enumeration<LoginError>(Object.values(LoginError))
    ),
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

      assign(self, {
        error: undefined,
        pending: true,
      });

      let tokens: AuthTokens;

      try {
        tokens = await store.rpc.api.fetchTokens(username, password);
      } catch (error) {
        if (RpcHelper.isError(error, RpcErrorCode.BAD_AUTH_CREDENTIALS)) {
          assign(self, {
            error: LoginError.BAD_CREDENTIALS,
            pending: false,
          });

          return;
        }

        assign(self, {
          pending: false,
        });

        throw error;
      }

      await store.auth.authorize(tokens);
      assign(self, { pending: false });
    },
  }));
