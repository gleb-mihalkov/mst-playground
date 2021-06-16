import AuthTokens from 'entities/AuthTokens';
import { types } from 'mobx-state-tree';
import RpcService from 'services/RpcService';
import getStore from 'utils/getStore';

/**
 * Модель сценария взаимодействия с RPC API.
 */
export default types.model('RpcModel').volatile((self) => {
  function getTokens() {
    const store = getStore(self);

    if (!store.auth.refreshToken) {
      return undefined;
    }

    const tokens: AuthTokens = {
      refresh: store.auth.refreshToken,
      access: store.auth.accessToken,
    };

    return tokens;
  }

  function onTokensUpdate(refresh: string, access: string) {
    const store = getStore(self);
    store.auth.saveTokens(refresh, access);
  }

  function onTokensDelete() {
    const store = getStore(self);
    store.auth.deleteTokens();
  }

  return {
    /**
     * Ссылка на экземпляр сервиса.
     */
    api: new RpcService({
      onTokensUpdate,
      onTokensDelete,
      getTokens,
    }),
  };
});
