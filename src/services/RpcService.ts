import RpcErrorCode from 'consts/RpcErrorCode';
import RpcMethod from 'consts/RpcMethod';
import AuthTokens from 'entities/AuthTokens';
import RpcError from 'errors/RpcError';

/**
 * Конфигурация сервиса.
 */
interface Config {
  /**
   * Возвращает коллекцию токенов для авторизации в API.
   */
  getTokens?: () => AuthTokens | undefined;

  /**
   * Функция, которая вызывается, когда связка токенов авторизации обновляется.
   * @param refresh Новый токен обновления связки.
   * @param access Новый токен авторизации.
   */
  onTokensUpdate?: (refresh: string, access: string) => void;

  /**
   * Функция, которая вызывается, когда текущая связка токенов была
   * инвалидирована RPC API.
   */
  onTokensDelete?: () => void;
}

/**
 * Предоставляет низкоуровневые методы для взаимодействия с RPC API.
 */
export default class RpcService {
  /**
   * Конфигурация сервиса.
   */
  private readonly config: Config;

  /**
   * Адрес конечной точки RPC API.
   */
  private readonly endpoint: string = '/api/rpc';

  /**
   * Создаёт экземпляр сервиса с указанной конфигурацией.
   * @param config Конфигурация.
   */
  public constructor(config: Config = {}) {
    this.config = config;
  }

  /**
   * Вызывает указанный метод RPC с переданными параметрами.
   * @param method Метод RPC.
   * @param params Параметры, передаваемые в метод.
   * @param headers Коллекция дополнительных заголовков запроса.
   */
  public async fetch(method: RpcMethod, params: any = {}, headers: any = {}) {
    Boolean(method);
    Boolean(params);
    Boolean(headers);
    Boolean(this.config);
  }

  /**
   * Конструирует объект ошибки API. Используется только в мок-апах.
   * @param method Метод, вызвавший ошибку.
   * @param params Параметры вызова метода.
   * @param code Код ошибки.
   */
  private makeError(method: RpcMethod, params: any, code: RpcErrorCode) {
    const error = new RpcError(this.endpoint, method, params, {}, code, '');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, this.makeError);
    }
  }

  /**
   * Возвращает пару токенов для авторизации указанного пользователя.
   * @param username Имя пользователя.
   * @param password Пароль.
   */
  public async fetchTokens(username: string, password: string) {
    const params = { username, password };

    await this.fetch(RpcMethod.AUTHORIZE, params);

    if (username !== 'admin' || password !== '1234') {
      throw this.makeError(
        RpcMethod.AUTHORIZE,
        params,
        RpcErrorCode.BAD_AUTH_CREDENTIALS
      );
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.8lSCknTnRANlJ0AVzCgO2yF838WYA7bLaAR7vAKnofo';

    const tokens: AuthTokens = {
      refresh: token,
      access: token,
    };

    return tokens;
  }

  /**
   * Указывает серверу выслать код подтверждения входа на телефон пользователя,
   * имеющего указанный логин и пароль.
   * @param username Имя пользователя.
   * @param password Пароль.
   */
  public async requestAuthCode(username: string, password: string) {
    const params = {
      username,
      password,
    };

    await this.fetch(RpcMethod.REQUEST_AUTH_CODE, params);

    if (username === 'admin' && password === '1234') {
      return;
    }

    throw this.makeError(
      RpcMethod.REQUEST_AUTH_CODE,
      params,
      RpcErrorCode.BAD_AUTH_CREDENTIALS
    );
  }

  /**
   * Отправляет указанный код подтверждения входа пользователя с переданными
   * реквизитами на сервер, и, если данные валидны, получает от него токены
   * авторизации в RPC API.
   * @param username Имя пользователя.
   * @param password Пароль пользователя.
   * @param code Код подтверждения входа.
   */
  public async confirmAuthCode(
    username: string,
    password: string,
    code: string
  ) {
    const params = {
      username,
      password,
      code,
    };

    await this.fetch(RpcMethod.CONFIRM_AUTH_CODE, params);

    if (code !== '1234') {
      throw this.makeError(
        RpcMethod.CONFIRM_AUTH_CODE,
        params,
        RpcErrorCode.BAD_AUTH_CODE
      );
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.8lSCknTnRANlJ0AVzCgO2yF838WYA7bLaAR7vAKnofo';

    const tokens: AuthTokens = {
      refresh: token,
      access: token,
    };

    return tokens;
  }
}
