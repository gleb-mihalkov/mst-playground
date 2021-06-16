import { types } from 'mobx-state-tree';

import StorageModel from './StorageModel';
import AuthModel from './AuthModel';
import RpcModel from './RpcModel';
import LoginModel from './LoginModel';

/**
 * Хранилище моделей системы.
 */
export default types
  .model('RootModel')

  .props({
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
  });
