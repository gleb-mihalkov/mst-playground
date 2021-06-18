import { types } from 'mobx-state-tree';

import StorageKey from 'consts/StorageKey';
import getStore from 'utils/getStore';
import AuthTokens from 'entities/AuthTokens';

/**
 * Модель сценария авторизации пользователя в системе.
 */
export default types
  .model('AuthModel')

  .props({
    /**
     * Токен, используемый для обновления `accessToken`.
     */
    refreshToken: types.maybe(types.string),

    /**
     * Токен, используемый для аутентификации пользователя в системе.
     */
    accessToken: types.maybe(types.string),
  })

  .views((self) => ({
    /**
     * Указывает, что текущий пользователь авторизован в системе.
     */
    get isAuthorized() {
      return Boolean(self.refreshToken);
    },
  }))

  .actions((self) => ({
    /**
     * @inheritdoc
     */
    afterMount() {
      self.refreshToken = getStore(self).storage.api.get(StorageKey.AUTH_TOKEN);
    },

    /**
     * Сохраняет новые значения токенов авторизации пользователя в системе.
     * @param refresh Токен, используемый для обновления `accessToken`.
     * @param access Токен, используемый для авторизации пользователя в системе.
     */
    saveTokens(refresh: string, access: string) {
      self.refreshToken = refresh;
      self.accessToken = access;

      getStore(self).storage.api.set(StorageKey.AUTH_TOKEN, self.refreshToken);
    },

    /**
     * Удаляет сохранённые токены авторизации пользователя в системе (если они
     * были).
     */
    deleteTokens() {
      self.refreshToken = undefined;
      self.accessToken = undefined;

      getStore(self).storage.api.remove(StorageKey.AUTH_TOKEN);
    },
  }))

  .actions((self) => ({
    /**
     * Отказывает в доступе на текущую страницу. При этом её адрес сохраняется,
     * и после входа в систему пользователь будет перенаправлен обратно.
     */
    deny() {
      // TODO: Взять из роутера текущий адрес и сохранить в модели, затем
      // отправить в раздел входа.
    },

    /**
     * Авторизует пользователя с указанными токенами. Если перед авторизацией
     * пользователь пытался попасть на некую страницу в приватной зоне сайта,
     * он будет туда перенаправлен.
     * @param tokens Токены авторизации.
     */
    async authorize(tokens: AuthTokens) {
      self.saveTokens(tokens.refresh, tokens.access);

      // TODO: Взять из модели исходный адрес, и, если он не void, отправить
      // туда пользователя.
    },
  }));
