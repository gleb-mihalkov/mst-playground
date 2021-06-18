import { types } from 'mobx-state-tree';

import RpcHelper from 'helpers/RpcHelper';
import getStore from 'utils/getStore';
import assign from 'utils/assign';
import RpcErrorCode from 'consts/RpcErrorCode';

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
     * Указывает, что у пользователя превышен лимит отправки запросов
     * кода подтверждения на телефон.
     *
     * Пока не известно, когда следует сбрасывать этот флаг. Либо сохранять
     * время, через которое снова можно, либо сохранять телефон, с которого
     * больше нельзя... Пока пускай будет как есть - демка же.
     */
    isRequestsLimitExceeded: types.optional(types.boolean, false),
  })

  .actions((self) => ({
    /**
     * Обрабатывает отправку формы ввода телефона на первом шаге восстановления
     * пароля. Если пользователь не превысил лимит отправок, отравляет его
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
            isRequestsLimitExceeded: true,
            pending: false,
          });
          return;
        }

        assign(self, { pending: false });
        throw error;
      }

      // TODO: Переход на следующий шаг.

      assign(self, { pending: false });
    },
  }));
