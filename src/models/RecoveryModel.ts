import { types } from 'mobx-state-tree';

import RpcHelper from 'helpers/RpcHelper';
import getStore from 'utils/getStore';
import assign from 'utils/assign';
import RpcErrorCode from 'consts/RpcErrorCode';
import RecoveryStep from 'consts/RecoveryStep';

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
    isLimitExceeded: types.optional(types.boolean, false),

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
        return RecoveryStep.NEW_PASSWORD;
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
            isLimitExceeded: true,
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
            isLimitExceeded: true,
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
    },

    /**
     * Вызывает переход на предыдущий шаг сценария восстановления пароля. Если
     * пользователь находится на первом шаге, вызывает переход на предыдущую
     * страницу в истории.
     */
    async back() {
      switch (self.step) {
        case RecoveryStep.NEW_PASSWORD: {
          assign(self, { code: undefined });
          return;
        }

        case RecoveryStep.CODE: {
          assign(self, { phone: undefined });
          return;
        }

        default: {
          const store = getStore(self);
          store.router.api.back();
          return;
        }
      }
    },
  }));
