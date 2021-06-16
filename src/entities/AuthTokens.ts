/**
 * Коллекция токенов, используемых для авторизации в системе.
 */
interface AuthTokens {
  /**
   * Токен, используемый для продления даннной пары токенов.
   */
  refresh: string;

  /**
   * Токен, по которому происходит авторизация в RPC API.
   */
  access?: string;
}

export default AuthTokens;
