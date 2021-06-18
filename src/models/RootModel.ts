import { types } from 'mobx-state-tree';

import StorageModel from './StorageModel';
import AuthModel from './AuthModel';
import RpcModel from './RpcModel';
import LoginModel from './LoginModel';
import RecoveryModel from './RecoveryModel';
import RouterModel from './RouterModel';

/**
 * Хранилище моделей системы.
 */
export default types
  .model('RootModel')

  .props({
    /**
     * Модель сценария взаимодействия с маршрутизатором приложения.
     */
    router: types.optional(RouterModel, () => RouterModel.create()),

    /**
     * Модель сценария взаимодействия с сервисом, отвечающим за постоянное
     * хранение значений в localStorage.
     */
    storage: types.optional(StorageModel, () => StorageModel.create()),

    /**
     * Модель авторизации текущего пользователя.
     */
    auth: types.optional(AuthModel, () => AuthModel.create()),

    /**
     * Модель сценария взаимодействия с RPC API.
     */
    rpc: types.optional(RpcModel, () => RpcModel.create()),

    /**
     * Модель сценария входа в систему.
     */
    login: types.optional(LoginModel, () => LoginModel.create()),

    /**
     * Модель сценария восстановления пароля пользователя.
     */
    recovery: types.optional(RecoveryModel, () => RecoveryModel.create()),
  });
