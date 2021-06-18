import { types } from 'mobx-state-tree';

import RpcHelper from 'helpers/RpcHelper';
import getStore from 'utils/getStore';
import assign from 'utils/assign';
import RpcErrorCode from 'consts/RpcErrorCode';
import RecoveryStep from 'consts/RecoveryStep';
import AuthTokens from 'entities/AuthTokens';
import StorageKey from 'consts/StorageKey';

/**
 * Модель сценария восстановления пароля пользователя.
 */
export default types
  .model('RecoveryModel')

  .props({
    /**
     * Указывает, что в данный момент происходит отправка данных на сервер.
     */
    pending: types.optional(types.boolean, false),

    /**
     * Указывает, что либо у пользователя превышен лимит отправки запросов
     * кода подтверждения на телефон, либо превышен лимит попыток отправить
     * код подтверждения.
     *
     * Пока не известно, когда следует сбрасывать этот флаг. Либо сохранять
     * время, через которое снова можно, либо сохранять телефон, с которого
     * больше нельзя... Пока пускай будет как есть - демка же.
     */
    isTriesExceeded: types.optional(types.boolean, false),

    /**
     * Номер телефона, который ввёл пользователь.
     */
    phone: types.maybe(types.string),

    /**
     * Код подтверждения, который ввёл пользователь.
     */
    code: types.maybe(types.string),
  })

  .views((self) => ({
    /**
     * Текущий шаг сценария восстановления пароля.
     */
    get step() {
      if (self.code) {
        return RecoveryStep.PASSWORD;
      }

      if (self.phone) {
        return RecoveryStep.CODE;
      }

      return RecoveryStep.PHONE;
    },
  }))

  .actions((self) => ({
    /**
     * Обрабатывает отправку формы ввода телефона на первом шаге восстановления
     * пароля. Если пользователь не превысил лимит отправок, переводит его
     * на следующий шаг. Если превысил - вешает соответствующий флаг.
     * @param phone Номер телефона.
     */
    async submitPhone(phone: string) {
      assign(self, { pending: true });

      const store = getStore(self);

      try {
        await store.rpc.api.requestRecoveryCode(phone);
      } catch (error) {
        if (
          RpcHelper.isError(
            error,
            RpcErrorCode.RECOVERY_CODE_REQUESTS_LIMIT_EXCEEDED
          )
        ) {
          assign(self, {
            isTriesExceeded: true,
            pending: false,
          });
          return;
        }

        assign(self, { pending: false });
        throw error;
      }

      assign(self, {
        phone,
        pending: false,
      });

      store.storage.api.set(StorageKey.RECOVERY_PHONE, phone);
    },

    /**
     * Обрабатывает отправку формы ввода кода подтверждения из СМС на втором
     * шаге восстановления пароля. Если пользователь не превысил лимит отправок,
     * переводит его на следующий шаг. Если превысил - вешает соответствующий
     * флаг.
     * @param code Код подтверждения.
     */
    async submitCode(code: string) {
      if (!self.phone) {
        throw new Error(`Expect self.phone to be defined`);
      }

      const store = getStore(self);

      assign(self, { pending: true });

      try {
        await store.rpc.api.confirmRecoveryCode(code, self.phone);
      } catch (error) {
        if (
          RpcHelper.isError(
            error,
            RpcErrorCode.RECOVERY_CODE_CONFIRMATIONS_LIMIT_EXCEEDED
          )
        ) {
          assign(self, {
            isTriesExceeded: true,
            pending: false,
          });
          return;
        }

        assign(self, { pending: false });
        throw error;
      }

      assign(self, {
        code,
        pending: false,
      });

      store.storage.api.set(StorageKey.RECOVERY_CODE, code);
    },

    /**
     * Обрабатывает отправку формы ввода нового пароля на третьем шаге
     * восстановления. После успешной отправки пользователь делается
     * авторизованным.
     * @param password Пароль.
     */
    async submitPassword(password: string) {
      if (!self.phone) {
        throw new Error(`Expect self.phone to be defined`);
      }

      if (!self.code) {
        throw new Error(`Expect self.code to be defined`);
      }

      assign(self, { pending: true });

      const store = getStore(self);

      let tokens: AuthTokens;

      try {
        tokens = await store.rpc.api.changePassword(
          password,
          self.phone,
          self.code
        );
      } catch (error) {
        assign(self, { pending: false });
        throw error;
      }

      await store.auth.authorize(tokens);

      assign(self, {
        pending: false,
        phone: undefined,
        code: undefined,
      });

      store.storage.api.remove(StorageKey.RECOVERY_PHONE);
      store.storage.api.remove(StorageKey.RECOVERY_CODE);
    },

    /**
     * Вызывает переход на предыдущий шаг сценария восстановления пароля. Если
     * пользователь находится на первом шаге, вызывает переход на предыдущую
     * страницу в истории.
     */
    async back() {
      const store = getStore(self);

      switch (self.step) {
        case RecoveryStep.PASSWORD: {
          store.storage.api.remove(StorageKey.RECOVERY_CODE);
          assign(self, { code: undefined });
          return;
        }

        case RecoveryStep.CODE: {
          store.storage.api.remove(StorageKey.RECOVERY_PHONE);
          assign(self, { phone: undefined });
          return;
        }

        default: {
          store.router.api.back();
          return;
        }
      }
    },

    /**
     * Прерывает процесс востановления пароля, очищая все сохранённые данные.
     */
    abort() {
      const store = getStore(self);

      assign(self, {
        pending: false,
        phone: undefined,
        code: undefined,
      });

      store.storage.api.remove(StorageKey.RECOVERY_PHONE);
      store.storage.api.remove(StorageKey.RECOVERY_CODE);
    },

    /**
     * @inheritdoc
     */
    afterMount() {
      const store = getStore(self);

      self.phone = store.storage.api.get(StorageKey.RECOVERY_PHONE);
      self.code = store.storage.api.get(StorageKey.RECOVERY_CODE);
    },
  }));
