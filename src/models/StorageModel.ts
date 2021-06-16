import { types } from 'mobx-state-tree';

import StorageService from 'services/StorageService';

/**
 * Модель сценария взаимодействия с сервисом, отвечающим за постоянное хранение
 * значений в localStorage.
 */
export default types.model('StorageModel').volatile(() => ({
  /**
   * Ссылка на экземпляр сервиса.
   */
  api: new StorageService(),
}));
